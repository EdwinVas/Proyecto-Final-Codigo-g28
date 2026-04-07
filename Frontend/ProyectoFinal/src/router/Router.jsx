import { BrowserRouter, Routes, Route } from "react-router";
import Home from "@/pages/Home/Home";
import Login from "@/pages/Login/Login";
import Register from "@/pages/Register/Register";
import ProtectedRoute from "@/components/protected-route";

// path = la URL del navegador
// http://localhost:5173/ -> Raiz (Home)
// http://localhost:5173/login -> Login
function Router() {
    return (
        <BrowserRouter>
            <Routes>
                {/* <Route path="*" element={<>Page Not Found</>} /> */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<Home />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;