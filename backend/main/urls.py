from django.urls import path

from . import views
from main.api.views import IngredienteList,IngredienteDetail,         SandwichList,SandwichDetail,                                                         PedidoList, PedidoDetail                             
app_name = 'main'
urlpatterns = [
  

    # API paths:

    #ingrdientes:
    path('api/Ingrediente/', IngredienteList.as_view()),
    path('api/Ingrediente/<int:pk>/', IngredienteDetail.as_view()),

    #Sandwich
    path('api/Sandwich/', SandwichList.as_view()),
    path('api/Sandwich/<int:pk>/', SandwichDetail.as_view()),

    #Sand_Ing
    # path('api/Sand_Ing/', Sand_IngList.as_view()),
    # path('api/Sand_Ing/<int:pk>/',Sand_IngDetail.as_view()),

    #Pedido
    path('api/Pedido/', PedidoList.as_view()),
    path('api/Pedido/<int:pk>/', PedidoDetail.as_view()),

    #Ped_Sand

    # path('api/Ped_Sand/', Ped_SandList.as_view()),
    # path('api/Ped_Sand/<int:pk>/', Ped_SandDetail.as_view()),


]