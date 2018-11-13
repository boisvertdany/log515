from django.urls import include, path

from . import views

urlpatterns = [
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('album/', views.ListAlbum.as_view()),
    path('album/<int:pk>/', views.DetailAlbum.as_view()),
]
