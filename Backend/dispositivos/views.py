from rest_framework import generics, response, request, status
from .models import UsuariosModel, GruposModel, DispositivosModel
from .serializer import UsuariosSerializer, GrupoSerializer, DispositivoSerializer, UnUsuarioSerializer, RegistroSerializer

################### Vista solo es para el personal administrativo ###################

### Usuarios
class UsuariosViewSet(generics.ListCreateAPIView):
    def get(self, request):
        ## Solo se muestra los usuarios activos
        usuarios = UsuariosModel.objects.all()
        if not usuarios.exists():
            return response.Response(data={
                'message': 'No se encontraron usuarios'
            }, status=status.HTTP_404_NOT_FOUND)
        serializer = UsuariosSerializer(usuarios, many=True)
        return response.Response(data={
            'message': 'Usuarios obtenidos correctamente',
            'data': serializer.data
        }, status=status.HTTP_200_OK)
    
    def post(self, request: request.Request):
        serializer = UsuariosSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return response.Response(data={
                'message': 'Usuario creado correctamente',
                'data': serializer.data
            }, status=status.HTTP_201_CREATED)
        return response.Response(data={
            'message': 'Error al crear el usuario',
            'data': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

class UpdateUsuarioViewSet(generics.UpdateAPIView):
    def put(self, request, id):
        usuario = UsuariosModel.objects.get(id=id)
        serializer = UsuariosSerializer(usuario, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return response.Response(data={
                'message': 'Usuario actualizado correctamente',
                'data': serializer.data
            }, status=status.HTTP_200_OK)
        return response.Response(data={
            'message': 'Error al actualizar el usuario',
            'data': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

class DeleteUsuarioViewSet(generics.DestroyAPIView):
    ## Los usuarios solo se deben archivar
    def delete(self, request, id):
        usuario = UsuariosModel.objects.get(id=id)
        usuario.is_active = False
        usuario.save()
        return response.Response(data={
            'message': 'Usuario eliminado correctamente'
        }, status=status.HTTP_200_OK)

### Grupos
class GruposViewSet(generics.ListCreateAPIView):
    def get(self, request):
        ## Solo se muestra los usuarios activos
        grupos = GruposModel.objects.all()
        if not grupos.exists():
            return response.Response(data={
                'message': 'No se encontraron grupos'
            }, status=status.HTTP_404_NOT_FOUND)
        serializer = GrupoSerializer(grupos, many=True)
        return response.Response(data={
            'message': 'Grupos obtenidos correctamente',
            'data': serializer.data
        }, status=status.HTTP_200_OK)

class DispositivosViewSet(generics.ListCreateAPIView):
    def get(self, request):
        ## Solo se muestra los usuarios activos
        dispositivos = DispositivosModel.objects.all()
        if not dispositivos.exists():
            return response.Response(data={
                'message': 'No se encontraron dispositivos'
            }, status=status.HTTP_404_NOT_FOUND)
        serializer = DispositivoSerializer(dispositivos, many=True)
        return response.Response(data={
            'message': 'Dispositivos obtenidos correctamente',
            'data': serializer.data
        }, status=status.HTTP_200_OK)

################### Vista para usuarios ###################
class UsuarioViewSet(generics.ListCreateAPIView):
    def get(self, request):
        ## Solo se muestra los usuarios activos                                            
        usuarios = UsuariosModel.objects.filter(id=request.user.id, is_active=True)
        if not usuarios.exists():
            return response.Response(data={
                'message': 'No se encontraron usuarios'
            }, status=status.HTTP_404_NOT_FOUND)
        serializer = UnUsuarioSerializer(usuarios.first())
        return response.Response(data={
            'message': 'Usuarios obtenidos correctamente',
            'data': serializer.data
        }, status=status.HTTP_200_OK)

class DispositivosUsuarioViewSet(generics.ListCreateAPIView):
    def get(self, request):
        ## Solo se muestra los dispositivos activos del usuario
        usuario = request.user
        if not usuario.is_authenticated:
            return response.Response(data={
                'message': 'Usuario no autenticado'
            }, status=status.HTTP_401_UNAUTHORIZED)
        dispositivos = DispositivosModel.objects.filter(usuario=usuario.id, is_active=True)
        if not dispositivos.exists():
            return response.Response(data={
                'message': 'No se encontraron dispositivos'
            }, status=status.HTTP_404_NOT_FOUND)
        serializer = DispositivoSerializer(dispositivos, many=True)
        return response.Response(data={
            'message': 'Dispositivos obtenidos correctamente',
            'data': serializer.data
        }, status=status.HTTP_200_OK)

    def post(self, request):
        usuario = request.user
        if not usuario.is_authenticated:
            return response.Response(data={
                'message': 'Usuario no autenticado'
            }, status=status.HTTP_401_UNAUTHORIZED)
            
        # Asignamos o creamos un grupo por defecto
        grupo, created = GruposModel.objects.get_or_create(
            usuario=usuario,
            nombre="Mis Dispositivos",
            defaults={"is_active": True}
        )
        
        # Modificamos el payload para inyectar llaves foráneas
        mutable_data = request.data.copy()
        mutable_data['usuario'] = usuario.id
        mutable_data['grupo'] = grupo.id
        
        serializer = DispositivoSerializer(data=mutable_data)
        if serializer.is_valid():
            serializer.save()
            return response.Response(data={
                'message': 'Dispositivo creado correctamente',
                'data': serializer.data
            }, status=status.HTTP_201_CREATED)
            
        return response.Response(data={
            'message': 'Error al crear el dispositivo',
            'data': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

class DispositivoUsuarioViewSet(generics.RetrieveUpdateDestroyAPIView):
    def get(self, request, id):
        ## Solo se muestra los dispositivos activos del usuario
        usuario = request.user
        if not usuario.is_authenticated:
            return response.Response(data={
                'message': 'Usuario no autenticado'
            }, status=status.HTTP_401_UNAUTHORIZED)
        dispositivo = DispositivosModel.objects.filter(id=id, usuario=usuario.id, is_active=True).first()
        if not dispositivo.exists():
            return response.Response(data={
                'message': 'No se encontraron dispositivos'
            }, status=status.HTTP_404_NOT_FOUND)
        serializer = DispositivoSerializer(dispositivo)
        return response.Response(data={
            'message': 'Dispositivos obtenidos correctamente',
            'data': serializer.data
        }, status=status.HTTP_200_OK)
    
    def put(self, request: request.Request, id):
        usuario = request.user
        if not usuario.is_authenticated:
            return response.Response(data={
                'message': 'Usuario no autenticado'
            }, status=status.HTTP_401_UNAUTHORIZED)
        dispositivo = DispositivosModel.objects.filter(id=id, usuario=usuario.id, is_active=True).first()
        if not dispositivo:
            return response.Response(data={
                'message': 'No se encontraron dispositivos'
            }, status=status.HTTP_404_NOT_FOUND)
        serializer = DispositivoSerializer(dispositivo, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return response.Response(data={
                'message': 'Dispositivo actualizado correctamente',
                'data': serializer.data
            }, status=status.HTTP_200_OK)
        return response.Response(data={
            'message': 'Error al actualizar el dispositivo',
            'data': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

## Grupos
class GruposUsuarioViewSet(generics.ListCreateAPIView):
    def get(self, request):
        ## Solo se muestra los grupos activos del usuario
        usuario = request.user
        if not usuario.is_authenticated:
            return response.Response(data={
                'message': 'Usuario no autenticado'
            }, status=status.HTTP_401_UNAUTHORIZED)
        grupos = GruposModel.objects.filter(usuario=usuario.id, is_active=True)
        if not grupos.exists():
            return response.Response(data={
                'message': 'No se encontraron grupos'
            }, status=status.HTTP_404_NOT_FOUND)
        serializer = GrupoSerializer(grupos)
        return response.Response(data={
            'message': 'Grupos obtenidos correctamente',
            'data': serializer.data
        }, status=status.HTTP_200_OK)

class GrupoUsuarioViewSet(generics.RetrieveUpdateDestroyAPIView):
    def get(self, request, id):
        ## Solo se muestra los grupos activos del usuario
        usuario = request.user
        if not usuario.is_authenticated:
            return response.Response(data={
                'message': 'Usuario no autenticado'
            }, status=status.HTTP_401_UNAUTHORIZED)
        grupo = GruposModel.objects.filter(id=id, usuario=usuario.id, is_active=True).first()
        if not grupo.exists():
            return response.Response(data={
                'message': 'No se encontraron grupos'
            }, status=status.HTTP_404_NOT_FOUND)
        serializer = GrupoSerializer(grupo)
        return response.Response(data={
            'message': 'Grupos obtenidos correctamente',
            'data': serializer.data
        }, status=status.HTTP_200_OK)

    def put(self, request: request.Request, id):
        ## Solo se muestra los grupos activos del usuario
        usuario = request.user
        if not usuario.is_authenticated:
            return response.Response(data={
                'message': 'Usuario no autenticado'
            }, status=status.HTTP_401_UNAUTHORIZED)
        grupo = GruposModel.objects.filter(id=id, usuario=usuario.id, is_active=True).first()
        if not grupo.exists():
            return response.Response(data={
                'message': 'No se encontraron grupos'
            }, status=status.HTTP_404_NOT_FOUND)
        serializer = GrupoSerializer(grupo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return response.Response(data={
                'message': 'Grupo actualizado correctamente',
                'data': serializer.data
            }, status=status.HTTP_200_OK)
        return response.Response(data={
            'message': 'Error al actualizar el grupo',
            'data': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

class RegistroAPIView(generics.CreateAPIView):
    serializer_class = RegistroSerializer
    permission_classes = [] # Allow any user to register

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return response.Response(data={
                'message': 'Usuario registrado correctamente',
            }, status=status.HTTP_201_CREATED)
        return response.Response(data={
            'message': 'Error al registrar el usuario',
            'data': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)