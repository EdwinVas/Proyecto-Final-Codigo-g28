import { Navigate } from "react-router";
import { LoginForm } from "@/components/login-form";
import useUserStore from "@/stores/useStore";

function Login() {
    const { isAuthenticated } = useUserStore();

    if (isAuthenticated) {
        return <Navigate to={"/"} replace />;
    }

    return (
        <div className="h-screen flex flex-col justify-center p-6 max-w-lg mx-auto">
            <p className="text-4xl font-bold text-center mb-6">Domotica</p>
            <LoginForm />
        </div>
    );
}

export default Login;