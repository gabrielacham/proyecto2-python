from django.contrib import admin
from .models import Sandwich, Ingrediente, Pedido


#admin.site.register(Sand_Ing)

class SandwichInline(admin.StackedInline):
    model=Sandwich
    readonly_fields = ('tamano_sandwich','precio_sandwich','pedido','ingrediente')
    extra = 0
    can_delete = False

class PedidoAdmin(admin.ModelAdmin):
    fieldsets = [
    ("informacion del pedido", {'fields': ['fecha_pedido','descrip_pedido']}),
    ('Informacion de pago', {'fields': ['precio_pedido','porcentaje_oferta']}),]
    inlines = [SandwichInline]
    readonly_fields=['precio_pedido','porcentaje_oferta','fecha_pedido','descrip_pedido']
    list_display = ('descrip_pedido','fecha_pedido','was_published_recently')
    list_filter = ['fecha_pedido']
    search_fields = ['descrip_pedido']
    ordering = ["fecha_pedido"]
     

class SandwichAdmin(admin.ModelAdmin):
    fieldsets = [
    (None, {'fields': ['tamano_sandwich','precio_sandwich','pedido','ingrediente']}),]
    list_display = ('tamano_sandwich','precio_sandwich','pedido')
    list_filter = ['tamano_sandwich']


class IngredienteAdmin(admin.ModelAdmin):
    fieldsets = [
    (None, {'fields': ['nombre_ingrediente','precio_ingrediente']}),
    ]
    list_display = ('nombre_ingrediente','precio_ingrediente')
    list_filter = ['nombre_ingrediente']



admin.site.register(Sandwich, SandwichAdmin)
admin.site.register(Ingrediente, IngredienteAdmin)
admin.site.register(Pedido, PedidoAdmin)

# Register your models here.
