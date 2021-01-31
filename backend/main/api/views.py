from django.http import Http404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from rest_framework import mixins
from rest_framework import generics

from main.models import Ingrediente,Sandwich,Sand_Ing,Pedido,Ped_Sand

from main.api.serializers import IngredienteSerializer,SandwichSerializer,Sand_IngSerializer,PedidoSerializer,Ped_SandSerializer

# vistas basadas en clases genéricas:

# ingredientes
class IngredienteList(generics.ListCreateAPIView):
    queryset = Ingrediente.objects.all()
    serializer_class = IngredienteSerializer


class IngredienteDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ingrediente.objects.all()
    serializer_class = IngredienteSerializer


#Sandwich


class SandwichList(generics.ListCreateAPIView):
    queryset = Sandwich.objects.all()
    serializer_class = SandwichSerializer


class SandwichDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Sandwich.objects.all()
    serializer_class = SandwichSerializer


#Sand_Ing

class  Sand_IngList(generics.ListCreateAPIView):
    queryset = Sand_Ing.objects.all()
    serializer_class = Sand_IngSerializer


class Sand_IngDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Sand_Ing.objects.all()
    serializer_class = Sand_IngSerializer


#Pedido

class PedidoList(generics.ListCreateAPIView):
    queryset = Pedido.objects.all()
    serializer_class = PedidoSerializer


class PedidoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Pedido.objects.all()
    serializer_class = PedidoSerializer

#Ped_Sand

class Ped_SandList(generics.ListCreateAPIView):
    queryset = Ped_Sand.objects.all()
    serializer_class = Ped_SandSerializer


class Ped_SandDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ped_Sand.objects.all()
    serializer_class = Ped_SandSerializer