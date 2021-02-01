from django.db import models
import datetime

class Pedido(models.Model):
    descrip_pedido = models.CharField(max_length=200)
    precio_pedido = models.DecimalField(max_digits=8,decimal_places=2, default=0)
    fecha_pedido = models.DateTimeField('Fecha del Pedido')
    porcentaje_oferta = models.DecimalField(max_digits=8,decimal_places=2, default=0)
    
    def __str__(self):
        return self.descrip_pedido 

    def was_published_recently(self):
        return self.fecha_pedido >= timezone.now() - datetime.timedelta(days=1)


class Ingrediente(models.Model):
    nombre_ingrediente = models.CharField(max_length=200)
    precio_ingrediente = models.DecimalField(max_digits=8,decimal_places=2, default=0)
    
    def __str__(self):
        return self.nombre_ingrediente



class Sandwich(models.Model):
    tamano_sandwich = models.CharField(max_length=200)
    precio_sandwich = models.DecimalField(max_digits=8,decimal_places=2, default=0)
    pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE)
    ingrediente = models.ManyToManyField(Ingrediente)

    def __str__(self):
        return self.tamano_sandwich


#class Sand_Ing(models.Model):
 #   tipo_sandwich = models.ForeignKey(Sandwich, on_delete=models.CASCADE)
  #  ingrediente = models.ForeignKey(Ingrediente, on_delete=models.CASCADE)

