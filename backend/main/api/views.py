from django.http import Http404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from rest_framework import mixins
from rest_framework import generics

from main.models import Ingrediente, Sandwich, Pedido

from main.api.serializers import IngredienteSerializer, SandwichSerializer, PedidoSerializer

class SandwichList(APIView):

    def get(self, request, format=None):
        san= Sandwich.objects.all()
        ser= SandwichSerializer(san, many=True)
        return Response(ser.data)

    def post(self, request, format=None):
        ser= SandwichSerializer(data=request.data)
        if ser.is_valid():
            ser.save()
            return Response(ser.data, status=status.HTTP_201_CREATED)
        return Response(ser.errors, status=status.HTTP_400_BAD_REQUEST)

class PedidoList(APIView):

    def get(self, request, format=None):
        san= Pedido.objects.all()
        ser= PedidoSerializer(san, many=True)
        return Response(ser.data)









# # vistas basadas en clases genéricas:

# # ingredientes
# class IngredienteList(generics.ListCreateAPIView):
#     queryset = Ingrediente.objects.all()
#     serializer_class = IngredienteSerializer


# class IngredienteDetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Ingrediente.objects.all()
#     serializer_class = IngredienteSerializer


# #Sandwich


# class SandwichList(generics.ListCreateAPIView):
#     queryset = Sandwich.objects.all()
#     serializer_class = SandwichSerializer


# class SandwichDetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Sandwich.objects.all()
#     serializer_class = SandwichSerializer


# #Sand_Ing

# class Sand_IngDetailt(generics.ListCreateAPIView):
#     queryset = Sand_IngSerializer.objects.all()
#     serializer_class = Sand_IngSerializer


# class Sand_IngDetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Sand_IngSerializer.objects.all()
#     serializer_class = Sand_IngSerializer


# #Pedido

# class PedidoList(generics.ListCreateAPIView):
#     queryset = Pedido.objects.all()
#     serializer_class = PedidoSerializer


# class PedidoDetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Pedido.objects.all()
#     serializer_class = PedidoSerializer

# #Ped_Sand

# class Ped_SandList(generics.ListCreateAPIView):
#     queryset = Ped_Sand.objects.all()
#     serializer_class = Ped_SandSerializer


# class Ped_SandDetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Ped_Sand.objects.all()
#     serializer_class = Ped_SandSerializer