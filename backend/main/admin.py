from django.contrib import admin
from .models import Sandwich, Ingrediente, Pedido

<<<<<<< HEAD
admin.site.register(Sandwich)
admin.site.register(Ingrediente)
#admin.site.register(Sand_Ing)
=======
class SandwichInline(admin.TabularInline):
    model = Sandwich
>>>>>>> 908e7f0782fc4661be134b4f43b0c1be10cbfd5a

class SandwichInline(admin.StackedInline):
    model=Sandwich
    extra = 0

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


<<<<<<< HEAD

class PedidoAdmin(admin.ModelAdmin):
    fieldsets = [
    ("informacion del pedido", {'fields': ['fecha_pedido','descrip_pedido']}),
    ('Informacion de pago', {'fields': ['precio_pedido','porcentaje_oferta']}),]
    readonly_fields=['precio_pedido','porcentaje_oferta','fecha_pedido','descrip_pedido']
    inlines = [SandwichInline]


admin.site.register(Pedido, PedidoAdmin)

# Register your models here.
=======
>>>>>>> 908e7f0782fc4661be134b4f43b0c1be10cbfd5a
