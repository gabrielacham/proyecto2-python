from django.contrib import admin
from .models import Sandwich, Ingrediente, Pedido

class SandwichInline(admin.TabularInline):
    model = Sandwich


class PedidoAdmin(admin.ModelAdmin):
     fieldsets = [
    ('Venta', {'fields': ['descrip_pedido','fecha_pedido','precio_pedido','porcentaje_oferta']}),
    ]
     inlines = [SandwichInline]
     list_display = ('descrip_pedido','fecha_pedido')
     list_filter = ['fecha_pedido']
     search_fields = ['descrip_pedido']

class SandwichAdmin(admin.ModelAdmin):
     fieldsets = [
    (None, {'fields': ['tamano_sandwich','precio_sandwich','pedido','ingrediente']}),
    ]
     list_display = ('tamano_sandwich','precio_sandwich','pedido')
     list_filter = ['tamano_sandwich']


class IngredienteAdmin(admin.ModelAdmin):
     fieldsets = [
    (None, {'fields': ['nombre_ingrediente','precio_ingrediente']}),
    ]
     list_display = ('nombre_ingrediente','nombre_ingrediente')
     list_filter = ['nombre_ingrediente']


admin.site.register(Pedido,PedidoAdmin)
admin.site.register(Sandwich, SandwichAdmin)
admin.site.register(Ingrediente, IngredienteAdmin)


