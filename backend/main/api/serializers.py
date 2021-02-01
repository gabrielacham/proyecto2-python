from rest_framework import serializers
from main.models import Ingrediente, Sandwich, Pedido

# class IngredienteSerializer(serializers.Serializer):
#     nombre_ingrediente  = serializers.CharField(max_length=200)
#     precio_ingrediente = serializers.DecimalField(max_digits=8,decimal_places=2, default=0)

# class SandwichSerializer(serializers.Serializer):
#     tamano_sandwich = serializers.CharField(max_length=50)
#     precio_sandwich = serializers.DecimalField(max_digits=8,decimal_places=2, default=0)
#     ingredientes= IngredienteSerializer(read_only=True, many=True)

#     def create(self, validated_data):
#         return Sandwich.objects.create(**validated_data)

# class PedidoSerializer(serializers.Serializer):
#     descrip_pedido = serializers.CharField(max_length=200)
#     precio_pedido = serializers.DecimalField(max_digits=8,decimal_places=2, default=0)
#     fecha_pedido  = serializers.DateTimeField('Fecha del Pedido')
#     porcentaje_oferta= serializers.DecimalField(max_digits=8,decimal_places=2, default=0)
#     sandwichs= SandwichSerializer(read_only=True, many=True)

class IngredienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingrediente
        fields = '__all__'

class SandwichSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sandwich
        fields = '__all__'

class PedidoSerializer(serializers.ModelSerializer):
    sandwichs= SandwichSerializer(read_only=True, many=True)
    class Meta:
        model = Pedido
        fields = '__all__'

# class IngredienteSerializer(serializers.Serializer):
#     nombre_ingrediente  = serializers.CharField(max_length=200)
#     precio_ingrediente = serializers.DecimalField(max_digits=8,decimal_places=2, default=0)

# class SandwichSerializer(serializers.Serializer):
#     tamano_sandwich = serializers.CharField(max_length=50)
#     precio_sandwich = serializers.DecimalField(max_digits=8,decimal_places=2, default=0)
#     ingredientes= IngredienteSerializer(read_only=True, many=True)

#     def create(self, validated_data):
#         return Sandwich.objects.create(**validated_data)

# class PedidoSerializer(serializers.Serializer):
#     descrip_pedido = serializers.CharField(max_length=200)
#     precio_pedido = serializers.DecimalField(max_digits=8,decimal_places=2, default=0)
#     fecha_pedido  = serializers.DateTimeField('Fecha del Pedido')
#     porcentaje_oferta= serializers.DecimalField(max_digits=8,decimal_places=2, default=0)
#     sandwichs= SandwichSerializer(read_only=True, many=True)


