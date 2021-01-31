from rest_framework import serializers
from main.models import Ingrediente,Sandwich,Sand_Ing,Pedido,Ped_Sand



class IngredienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingrediente
        fields = ['id', 'question_text', 'pub_date']
        fields = '__all__'

class SandwichSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sandwich
        # fields = ['id', 'question_text', 'pub_date']
        fields = '__all__'


class Sand_IngSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sand_Ing
        # fields = ['id', 'question_text', 'pub_date']
        fields = '__all__'


class PedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pedido
        # fields = ['id', 'question_text', 'pub_date']
        fields = '__all__'

class Ped_SandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ped_Sand
        # fields = ['id', 'question_text', 'pub_date']
        fields = '__all__'
