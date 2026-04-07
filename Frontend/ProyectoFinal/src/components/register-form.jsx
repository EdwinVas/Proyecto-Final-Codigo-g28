import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { registerUser } from "@/lib/auth";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { Link } from "react-router";

export function RegisterForm({ className, ...props }) {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await registerUser(
        values.nombre, 
        values.apellido, 
        values.email, 
        values.password
    );

    if (!response.ok) {
      toast.error(response.message);
      return;
    }

    toast.success("Cuenta creada exitosamente. Por favor, inicia sesión.");
    
    // redirect /login
    navigate("/login");
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Crea una cuenta</CardTitle>
          <CardDescription>
            Introduce tus datos a continuación para registrarte
            en Domótica.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <div className="flex flex-row gap-4">
                  <Field>
                    <FieldLabel htmlFor="nombre">Nombre</FieldLabel>
                    <Input
                      id="nombre"
                      type="text"
                      value={values.nombre}
                      name="nombre"
                      onChange={handleInputChange}
                      placeholder="Ej. Juan"
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="apellido">Apellido</FieldLabel>
                    <Input
                      id="apellido"
                      type="text"
                      value={values.apellido}
                      name="apellido"
                      onChange={handleInputChange}
                      placeholder="Ej. Pérez"
                      required
                    />
                  </Field>
              </div>
              
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  value={values.email}
                  name="email"
                  onChange={handleInputChange}
                  placeholder="usuario@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                </div>
                <Input
                  id="password"
                  value={values.password}
                  name="password"
                  type="password"
                  onChange={handleInputChange}
                  required
                  minLength={6}
                />
              </Field>
              <Field>
                <Button type="submit">Registrarse</Button>
                <FieldDescription className="text-center">
                  ¿Ya tienes cuenta? <Link to="/login" className="underline">Inicia Sesión</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
