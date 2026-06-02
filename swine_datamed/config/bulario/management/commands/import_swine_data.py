import csv

from django.conf import settings
from django.core.management.base import BaseCommand

from bulario.models import Doenca, Farmaco, Sintoma, Variavel
from bulario.utils import is_filled, normalize, split_list


def read_csv(path):
    with path.open(encoding="utf-8-sig", newline="") as handle:
        return list(csv.DictReader(handle))


class Command(BaseCommand):
    help = "Importa os CSVs da pasta base_data para o banco relacional."

    def add_arguments(self, parser):
        parser.add_argument("--clear", action="store_true", help="Remove dados existentes antes de importar.")

    def handle(self, *args, **options):
        base_dir = settings.BASE_DIR.parent / "base_data"

        if options["clear"]:
            Farmaco.objects.all().delete()
            Doenca.objects.all().delete()
            Sintoma.objects.all().delete()
            Variavel.objects.all().delete()

        doencas_by_name = {}
        sintomas_by_name = {}

        for row in read_csv(base_dir / "sintomas.csv"):
            symptom_name = row.get("SINTOMA", "").strip()
            if not is_filled(symptom_name):
                continue

            sintoma, _ = Sintoma.objects.update_or_create(nome=symptom_name)
            sintomas_by_name[normalize(symptom_name)] = sintoma

            for disease_name in split_list(row.get("DOENÇAS ASSOCIADAS")):
                doenca, _ = Doenca.objects.get_or_create(nome=disease_name)
                doenca.sintomas.add(sintoma)
                doencas_by_name[normalize(disease_name)] = doenca

        for row in read_csv(base_dir / "doencas.csv"):
            disease_name = row.get("DOENÇA", "").strip()
            if not is_filled(disease_name):
                continue

            doenca, _ = Doenca.objects.update_or_create(
                nome=disease_name,
                defaults={
                    "tipo": row.get("TIPO", "").strip(),
                    "fase_comum": row.get("FASE COMUM", "").strip(),
                    "sintomas_texto": row.get("SINTOMAS", "").strip(),
                },
            )
            doencas_by_name[normalize(disease_name)] = doenca

            for symptom_name in split_list(row.get("SINTOMAS")):
                sintoma, _ = Sintoma.objects.get_or_create(nome=symptom_name)
                doenca.sintomas.add(sintoma)
                sintomas_by_name[normalize(symptom_name)] = sintoma

        for row in read_csv(base_dir / "variaveis.csv"):
            variable_name = row.get("Variável", "").strip()
            if not is_filled(variable_name):
                continue

            Variavel.objects.update_or_create(
                nome=variable_name,
                defaults={"descricao": row.get("Descrição", "").strip()},
            )

        for row in read_csv(base_dir / "farmacos.csv"):
            commercial_name = row.get("Nome comercial", "").strip()
            if not is_filled(commercial_name):
                continue

            farmaco, _ = Farmaco.objects.update_or_create(
                nome_comercial=commercial_name,
                defaults={
                    "principio_ativo": row.get("Princípio ativo", "").strip(),
                    "classe": row.get("Classe", "").strip(),
                    "indicacoes_principais": row.get("Indicações principais", "").strip(),
                    "posologia": row.get("Posologia", "").strip(),
                    "via_administracao": row.get("Via administração", "").strip(),
                    "carencia": row.get("Carência", "").strip(),
                    "contraindicacoes": row.get("Contraindicações", "").strip(),
                    "reacoes_adversas": row.get("Reações adversas", "").strip(),
                    "mecanismo_acao": row.get("Mecanismo de ação", "").strip(),
                    "precaucoes": row.get("Precauções", "").strip(),
                },
            )

            indications = normalize(farmaco.indicacoes_principais)
            related = [
                doenca
                for normalized_name, doenca in doencas_by_name.items()
                if normalized_name and normalized_name in indications
            ]
            farmaco.doencas_relacionadas.set(related)

        self.stdout.write(
            self.style.SUCCESS(
                "Importação concluída: "
                f"{Farmaco.objects.count()} fármacos, "
                f"{Doenca.objects.count()} doenças, "
                f"{Sintoma.objects.count()} sintomas, "
                f"{Variavel.objects.count()} variáveis."
            )
        )
