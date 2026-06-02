import re
import unicodedata


EMPTY_VALUES = {"", "-", "—", "completar"}


def normalize(value):
    return (
        unicodedata.normalize("NFD", str(value or ""))
        .encode("ascii", "ignore")
        .decode("ascii")
        .lower()
        .strip()
    )


def is_filled(value):
    return normalize(value) not in EMPTY_VALUES


def split_list(value):
    return [item.strip() for item in str(value or "").split(",") if item.strip()]


def slugify_text(value):
    slug = re.sub(r"[^a-z0-9]+", "-", normalize(value))
    return slug.strip("-")


def score_farmaco(farmaco, query, disease_hints=None):
    normalized_query = normalize(query)
    disease_hints = disease_hints or []
    searchable = normalize(
        " ".join(
            [
                farmaco.nome_comercial,
                farmaco.principio_ativo,
                farmaco.classe,
                farmaco.indicacoes_principais,
                farmaco.mecanismo_acao,
            ]
        )
    )

    if not normalized_query:
        return 1

    score = 0
    if normalized_query in normalize(farmaco.nome_comercial):
        score += 8
    if normalized_query in normalize(farmaco.principio_ativo):
        score += 7
    if normalized_query in normalize(farmaco.classe):
        score += 4
    if normalized_query in normalize(farmaco.indicacoes_principais):
        score += 5
    if normalized_query in searchable:
        score += 2

    indications = normalize(farmaco.indicacoes_principais)
    for disease in disease_hints:
        if normalize(disease.nome) in indications:
            score += 5

    return score
