import { Navigate, Outlet } from "react-router";
import useUserStore from "@/stores/useStore";

function ProtectedRoute() {
    const { isAuthenticated } = useUserStore();

    if (!isAuthenticated) {
        return <Navigate to={"/login"} replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;