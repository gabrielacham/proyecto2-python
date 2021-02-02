from django.contrib import admin
from .models import Sandwich, Ingrediente, Pedido#,Sand_Ing

class SandwichInline(admin.TabularInline):
    model = Sandwich
    

class PedidoAdmin(admin.ModelAdmin):
     fieldsets = [
    (None, {'fields': ['descrip_pedido','fecha_pedido','precio_pedido','porcentaje_oferta']}),
    ]
     inlines = [SandwichInline]
     list_display = ('descrip_pedido','fecha_pedido')
     list_filter = ['fecha_pedido']
     search_fields = ['descrip_pedido']

admin.site.register(Pedido,PedidoAdmin)


