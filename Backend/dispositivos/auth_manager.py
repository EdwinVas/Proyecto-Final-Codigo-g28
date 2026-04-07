from django.contrib.auth.models import BaseUserManager

class UsuarioManager(BaseUserManager):
    def create_superuser(self, correo, nombre, apellido, password):
        if not correo:
            raise ValueError('Se necesita el correo para poder crear el superusuario')

        # Se verifica que el correo sea correcto
        correo_normalizado = self.normalize_email(correo)
        usuario = self.model(
            correo = correo_normalizado,
            nombre = nombre,
            apellido = apellido,
            is_staff = True,
            is_superuser = True,
            is_active = True
        )

        # Se encripta la contraseña
        usuario.set_password(password)
        usuario.save()