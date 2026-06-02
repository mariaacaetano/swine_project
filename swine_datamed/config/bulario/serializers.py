from rest_framework import serializers

from .models import Doenca, Farmaco, Sintoma, Variavel


class SintomaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sintoma
        fields = ["id", "nome"]


class DoencaSerializer(serializers.ModelSerializer):
    sintomas = SintomaSerializer(many=True, read_only=True)

    class Meta:
        model = Doenca
        fields = ["id", "nome", "tipo", "fase_comum", "sintomas_texto", "sintomas"]


class VariavelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Variavel
        fields = ["id", "nome", "descricao"]


class FarmacoSerializer(serializers.ModelSerializer):
    doencas_relacionadas = DoencaSerializer(many=True, read_only=True)

    class Meta:
        model = Farmaco
        fields = [
            "id",
            "nome_comercial",
            "principio_ativo",
            "classe",
            "indicacoes_principais",
            "posologia",
            "via_administracao",
            "carencia",
            "contraindicacoes",
            "reacoes_adversas",
            "mecanismo_acao",
            "precaucoes",
            "doencas_relacionadas",
        ]
