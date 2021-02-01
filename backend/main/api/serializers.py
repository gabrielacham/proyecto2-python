from rest_framework import serializers
from main.models import Ingrediente,Sandwich,Pedido



class IngredienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingrediente
        
        fields = '__all__'

class SandwichSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sandwich
        
        fields = '__all__'


# class Sand_IngSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Sand_Ing
        
#         fields = '__all__'


class PedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pedido
        
        fields = '__all__'

# class Ped_SandSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Ped_Sand
        
#         fields = '__all__'
