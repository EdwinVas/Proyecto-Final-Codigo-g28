import useUserStore from '@/stores/useStore';

export const API_BASE_URL = "http://127.0.0.1:8000/dispositivos";

export async function getDevices() {
    try {
        const token = useUserStore.getState()?.user?.access;
        const response = await fetch(`${API_BASE_URL}/usuario/dispositivos`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            return {
                ok: false,
                message: "Error al intentar obtener dispositivos.",
            };
        }

        const dataResponse = await response.json();
        return { ok: true, data: dataResponse.data };
    } catch (error) {
        return {
            ok: false,
            message: String(error),
        };
    }
}

export async function addDevice(nombre) {
    try {
        const token = useUserStore.getState()?.user?.access;
        const response = await fetch(`${API_BASE_URL}/usuario/dispositivos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ nombre })
        });

        if (!response.ok) {
            return {
                ok: false,
                message: "Error al intentar crear el dispositivo.",
            };
        }

        const dataResponse = await response.json();
        return { ok: true, data: dataResponse.data };
    } catch (error) {
        return {
            ok: false,
            message: String(error),
        };
    }
}

export async function updateDevice(id, data) {
    try {
        const token = useUserStore.getState()?.user?.access;
        const response = await fetch(`${API_BASE_URL}/usuario/dispositivo/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            return {
                ok: false,
                message: "Error al intentar actualizar el dispositivo.",
            };
        }

        const dataResponse = await response.json();
        return { ok: true, data: dataResponse.data };
    } catch (error) {
        return {
            ok: false,
            message: String(error),
        };
    }
}