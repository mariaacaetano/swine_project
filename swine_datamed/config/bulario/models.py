from django.db import models


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Sintoma(TimeStampedModel):
    nome = models.CharField(max_length=180, unique=True)

    class Meta:
        ordering = ["nome"]

    def __str__(self):
        return self.nome


class Doenca(TimeStampedModel):
    nome = models.CharField(max_length=220, unique=True)
    tipo = models.CharField(max_length=160, blank=True)
    fase_comum = models.CharField(max_length=180, blank=True)
    sintomas_texto = models.TextField(blank=True)
    sintomas = models.ManyToManyField(Sintoma, related_name="doencas", blank=True)

    class Meta:
        ordering = ["nome"]

    def __str__(self):
        return self.nome


class Variavel(TimeStampedModel):
    nome = models.CharField(max_length=220, unique=True)
    descricao = models.TextField(blank=True)

    class Meta:
        ordering = ["nome"]

    def __str__(self):
        return self.nome


class Farmaco(TimeStampedModel):
    nome_comercial = models.CharField(max_length=220, unique=True)
    principio_ativo = models.CharField(max_length=260, blank=True)
    classe = models.CharField(max_length=220, blank=True)
    indicacoes_principais = models.TextField(blank=True)
    posologia = models.TextField(blank=True)
    via_administracao = models.CharField(max_length=220, blank=True)
    carencia = models.CharField(max_length=220, blank=True)
    contraindicacoes = models.TextField(blank=True)
    reacoes_adversas = models.TextField(blank=True)
    mecanismo_acao = models.TextField(blank=True)
    precaucoes = models.TextField(blank=True)
    doencas_relacionadas = models.ManyToManyField(Doenca, related_name="farmacos", blank=True)

    class Meta:
        ordering = ["nome_comercial"]

    def __str__(self):
        return self.nome_comercial
