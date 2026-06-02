from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import DoencaViewSet, FarmacoViewSet, SintomaViewSet, TriagemView, VariavelViewSet

router = DefaultRouter()
router.register("farmacos", FarmacoViewSet, basename="farmaco")
router.register("sintomas", SintomaViewSet, basename="sintoma")
router.register("doencas", DoencaViewSet, basename="doenca")
router.register("variaveis", VariavelViewSet, basename="variavel")

urlpatterns = [
    path("", include(router.urls)),
    path("triagem/", TriagemView.as_view(), name="triagem"),
]
