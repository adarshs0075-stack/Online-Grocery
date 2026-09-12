from django.urls import path
from . import views

urlpatterns = [
    path('', views.login_view, name='login'),
    path('home/', views.home, name='home'),
    path('logout/', views.logout_view, name='logout'),
    path('fruits-veggies/', views.fruits_veggies, name='fruits_veggies'),
    path('m-s/', views.m_s, name='m_s'),
    path('d-e/', views.d_e, name='d_e'),
    path('categories/', views.categories, name='categories'),
    path('track-order/', views.track_order, name='track_order'),
    path('contact/', views.contact, name='contact'),
    

]