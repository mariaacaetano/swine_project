from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Doenca, Farmaco, Sintoma, Variavel
from .serializers import DoencaSerializer, FarmacoSerializer, SintomaSerializer, VariavelSerializer
from .utils import normalize, score_farmaco, split_list


def disease_hints_for_query(query):
    normalized_query = normalize(query)
    if not normalized_query:
        return []

    hints = set()

    for sintoma in Sintoma.objects.prefetch_related("doencas"):
        symptom = normalize(sintoma.nome)
        if symptom and (symptom in normalized_query or normalized_query in symptom):
            hints.update(sintoma.doencas.all())

    for doenca in Doenca.objects.all():
        text = normalize(" ".join([doenca.nome, doenca.sintomas_texto, doenca.tipo, doenca.fase_comum]))
        if normalized_query in text:
            hints.add(doenca)

    return list(hints)


class FarmacoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Farmaco.objects.prefetch_related("doencas_relacionadas").all()
    serializer_class = FarmacoSerializer
    lookup_field = "id"

    @action(detail=False, methods=["get"])
    def buscar(self, request):
        query = request.query_params.get("q", "")
        disease_hints = disease_hints_for_query(query)
        scored = [
            (farmaco, score_farmaco(farmaco, query, disease_hints))
            for farmaco in self.get_queryset()
        ]
        results = [
            farmaco
            for farmaco, score in sorted(scored, key=lambda item: (-item[1], item[0].nome_comercial))
            if score > 0
        ]

        return Response(
            {
                "query": query,
                "disease_hints": DoencaSerializer(disease_hints, many=True).data,
                "results": FarmacoSerializer(results, many=True).data,
            }
        )


class SintomaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Sintoma.objects.prefetch_related("doencas").all()
    serializer_class = SintomaSerializer


class DoencaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Doenca.objects.prefetch_related("sintomas").all()
    serializer_class = DoencaSerializer


class VariavelViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Variavel.objects.all()
    serializer_class = VariavelSerializer


class TriagemView(APIView):
    def post(self, request):
        text = request.data.get("texto", "")
        normalized_text = normalize(text)
        scores = {}
        matched_symptoms = []

        for sintoma in Sintoma.objects.prefetch_related("doencas"):
            symptom = normalize(sintoma.nome)
            if symptom and symptom in normalized_text:
                matched_symptoms.append(sintoma)
                for doenca in sintoma.doencas.all():
                    scores[doenca.id] = scores.get(doenca.id, 0) + 2

        for doenca in Doenca.objects.all():
            for symptom in split_list(doenca.sintomas_texto):
                if normalize(symptom) and normalize(symptom) in normalized_text:
                    scores[doenca.id] = scores.get(doenca.id, 0) + 1

        ranked = sorted(
            Doenca.objects.filter(id__in=scores.keys()),
            key=lambda doenca: -scores[doenca.id],
        )[:4]

        farmacos = []
        haystack = normalize(" ".join([text, *[doenca.nome for doenca in ranked]]))
        for farmaco in Farmaco.objects.all():
            indications = normalize(farmaco.indicacoes_principais)
            if any(normalize(doenca.nome) in indications for doenca in ranked):
                farmacos.append(farmaco)
            elif any(normalize(item) in haystack for item in split_list(farmaco.indicacoes_principais)):
                farmacos.append(farmaco)

        return Response(
            {
                "sintomas_reconhecidos": SintomaSerializer(matched_symptoms[:8], many=True).data,
                "hipoteses": [
                    {
                        **DoencaSerializer(doenca).data,
                        "score": scores[doenca.id],
                    }
                    for doenca in ranked
                ],
                "farmacos_relacionados": FarmacoSerializer(farmacos[:3], many=True).data,
                "aviso": "Apoio à triagem; não substitui avaliação de médico-veterinário.",
            }
        )
