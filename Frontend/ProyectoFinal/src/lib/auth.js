import { API_BASE_URL } from "@/services/api";

export async function validateLogin(email, password) {
    try {
        const loginRes = await fetch(`${API_BASE_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ correo: email, password }),
        });

        if (!loginRes.ok) {
            return {
                ok: false,
                message: "Error: Email y/o password incorrectos",
            };
        }

        const tokens = await loginRes.json();
        
        // Obtenemos información del usuario validando el token
        const userRes = await fetch(`${API_BASE_URL}/usuario`, {
            headers: {
                "Authorization": `Bearer ${tokens.access}`
            }
        });

        if (!userRes.ok) {
            return {
                ok: false,
                message: "Error: No se pudo obtener la información del usuario",
            };
        }

        const userData = await userRes.json();
        
        // userData.data porque DRF response format en ese view devuelve { message, data: { ... } }
        return {
            ok: true,
            user: {
                ...userData.data,
                access: tokens.access,
                refresh: tokens.refresh
            },
        };
    } catch {
        return {
            ok: false,
            message: "Error de conexión con el servidor",
        };
    }
}

export async function registerUser(nombre, apellido, correo, password) {
    try {
        const registerRes = await fetch(`${API_BASE_URL}/registro`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ nombre, apellido, correo, password }),
        });

        if (!registerRes.ok) {
            const data = await registerRes.json();
            // Validar si el endpoint manda errores (p.ej. correo ya existe)
            let errorMessage = "Error en el registro";
            if (data?.data?.correo) {
                errorMessage = "Este correo electrónico ya está en uso.";
            }

            return {
                ok: false,
                message: errorMessage,
            };
        }

        return {
            ok: true,
            message: "Usuario registrado correctamente",
        };
    } catch {
        return {
            ok: false,
            message: "Error de conexión con el servidor",
        };
    }
}