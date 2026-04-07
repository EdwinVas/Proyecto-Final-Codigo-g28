from django.urls import path
from .views import (
    UsuariosViewSet,
    UpdateUsuarioViewSet,
    DeleteUsuarioViewSet,
    GruposViewSet, 
    DispositivosViewSet, 
    UsuarioViewSet,
    DispositivosUsuarioViewSet,
    DispositivoUsuarioViewSet, 
    GruposUsuarioViewSet,
    GrupoUsuarioViewSet,
    RegistroAPIView
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('usuarios', UsuariosViewSet.as_view()),
    path('usuarios/<int:id>', UpdateUsuarioViewSet.as_view()),
    # path('usuarios/<int:id>', DeleteUsuarioViewSet.as_view()), # (Clash with Update, maybe handle later)
    path('grupos', GruposViewSet.as_view()),
    path('dispositivos', DispositivosViewSet.as_view()),
    path('usuario', UsuarioViewSet.as_view()),
    path('usuario/dispositivos', DispositivosUsuarioViewSet.as_view()),
    path('usuario/dispositivo/<int:id>', DispositivoUsuarioViewSet.as_view()),
    path('usuario/grupos', GruposUsuarioViewSet.as_view()),
    path('usuario/grupo/<int:id>', GrupoUsuarioViewSet.as_view()),
    path('registro', RegistroAPIView.as_view()),
    path('login', TokenObtainPairView.as_view()),
    path('refresh', TokenRefreshView.as_view()),
]