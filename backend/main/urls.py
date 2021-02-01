from django.urls import path
from . import views

from .api.views import SandwichList,PedidoList


urlpatterns = [


    path('api/san/', SandwichList.as_view() , name='san'),
    path('api/pedido/', PedidoList.as_view() , name='pedido'),

]