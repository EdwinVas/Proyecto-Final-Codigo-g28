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
import { validateLogin } from "@/lib/auth";
import { toast } from "sonner";
import useUserStore from "@/stores/useStore";
import { useNavigate, Link } from "react-router";

export function LoginForm({ className, ...props }) {
  const setUser = useUserStore((state) => state.setUser);

  const navigate = useNavigate();

  const [values, setValues] = useState({
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
    const response = await validateLogin(values.email, values.password);
    if (!response.ok) {
      toast.error(response.message);
      return;
    }
    setUser(response.user);

    // redirect /
    navigate("/");
    toast.success("Bienvenido!!");
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Ingresa con tu cuenta</CardTitle>
          <CardDescription>
            Introduce tu correo electrónico a continuación para iniciar sesión
            en tu cuenta.{" "}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  value={values.email}
                  name="email"
                  onChange={handleInputChange}
                  placeholder="usuaio@example.com"
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
                />
              </Field>
              <Field>
                <Button type="submit">Iniciar Sesión</Button>
                <FieldDescription className="text-center">
                  No tienes una cuenta? <Link to="/register" className="underline">Registrate</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}