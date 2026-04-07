import { useState, useEffect } from 'react'
import { getLocation } from '../services/apiLocation';
import { getWeather } from '../services/apiWeather';

function useAPIWeather() {
    const [longitude, setLongitude] = useState(-77.0428);       // Longitud de Lima
    const [latitude, setLatitude] = useState(-12.0464);         // Latitud de Lima
    const [country, setCountry] = useState("Peru");
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const handleWeather = async () => {
        setLoading(true);
        try {
            const location = await getLocation('lima');
            // Se actualizan los estados
            setLatitude(location.results?.[0].latitude || -12.0464);
            setLongitude(location.results?.[0].longitude || -77.0428);
            setCountry(location.results?.[0].country || "Peru");
            setCity(location.results?.[0].name || "Lima");
            const data = await getWeather(latitude, longitude);
            // Se actualizan los estados
            setWeather(data.current_weather);
        } catch (error) {
            setError("Error al obtener el clima", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleWeather();
    }, []);

    return {
        longitude,
        latitude,
        country,
        city,
        weather,
        loading,
        error
    };
}

export default useAPIWeather;
