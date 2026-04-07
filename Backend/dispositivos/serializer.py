from rest_framework import serializers
from .models import UsuariosModel, GruposModel, DispositivosModel

class UsuariosSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsuariosModel
        fields = ['id', 'nombre', 'apellido', 'correo', 'is_staff', 'is_active']

class UnUsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsuariosModel
        fields = ['id', 'nombre', 'apellido', 'correo', 'is_active']

class GrupoSerializer(serializers.ModelSerializer):
    class Meta:
        model = GruposModel
        fields = '__all__'

class DispositivoSerializer(serializers.ModelSerializer):
    class Meta:
        model = DispositivosModel
        fields = '__all__'

class RegistroSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = UsuariosModel
        fields = ['id', 'nombre', 'apellido', 'correo', 'password']
        
    def create(self, validated_data):
        usuario = UsuariosModel(
            nombre=validated_data['nombre'],
            apellido=validated_data['apellido'],
            correo=validated_data['correo'],
            is_active=True,
            is_staff=False
        )
        usuario.set_password(validated_data['password'])
        usuario.save()
        return usuario