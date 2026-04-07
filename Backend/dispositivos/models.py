from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from .auth_manager import UsuarioManager

# Create your models here.
class UsuariosModel(AbstractBaseUser, PermissionsMixin):
    id = models.AutoField(primary_key=True, unique=True, null=False)
    nombre = models.CharField(max_length=100, null=False)
    apellido = models.CharField(max_length=100)
    correo = models.CharField(max_length=100, unique=True, null=False)

    ## Privilegios del usuario
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)

    ## Atributo que se utilizará para ingresar al panel administrativo
    USERNAME_FIELD = 'correo'

    ## Fields requeridos para crear un super usuario
    REQUIRED_FIELDS = ['nombre', 'apellido']

    objects = UsuarioManager()

    class Meta:
        db_table = 'usuarios'

class GruposModel(models.Model):
    id = models.AutoField(primary_key=True, unique=True, null=False)
    nombre = models.CharField(max_length=100, null=False)
    is_active = models.BooleanField(default=True)
    usuario = models.ForeignKey(UsuariosModel, on_delete=models.RESTRICT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'grupos'

class DispositivosModel(models.Model):
    id = models.AutoField(primary_key=True, unique=True, null=False)
    usuario = models.ForeignKey(UsuariosModel, on_delete=models.RESTRICT)
    grupo = models.ForeignKey(GruposModel, on_delete=models.RESTRICT)
    nombre = models.CharField(max_length=100, null=False)
    is_active = models.BooleanField(default=True) # Por defecto al crear un dispositivo estara activo
    on_off = models.BooleanField(default=False) # Por defecto al crear un dispositivo estara apagado
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    class Meta:
        db_table = 'dispositivos'