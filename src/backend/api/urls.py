from django.urls import include, path

from . import views

urlpatterns = [
    path('', views.ListUser.as_view()),
    path('user/', views.DetailUser.as_view()),
    path('auth/', include('rest_auth.urls')),
    path('auth/register/', include('rest_auth.registration.urls')),
    path('album/', views.ListAlbum.as_view()),
    path('album/<int:pk>/', views.DetailAlbum.as_view()),
    path('photo/', views.ListPhoto.as_view()),
    path('photo/<int:pk>/', views.DetailPhoto.as_view()),
]
