from django.contrib import admin
from .models import Sandwich, Ingrediente, Pedido#,Sand_Ing

admin.site.register(Sandwich)
admin.site.register(Ingrediente)
#admin.site.register(Sand_Ing)

class SandwichInline(admin.StackedInline):
    model=Sandwich
    extra = 0



class PedidoAdmin(admin.ModelAdmin):
    fieldsets = [
    ("informacion del pedido", {'fields': ['fecha_pedido','descrip_pedido']}),
    ('Informacion de pago', {'fields': ['precio_pedido','porcentaje_oferta']}),]
    readonly_fields=['precio_pedido','porcentaje_oferta','fecha_pedido','descrip_pedido']
    inlines = [SandwichInline]


admin.site.register(Pedido, PedidoAdmin)

# Register your models here.
