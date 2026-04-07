export async function getLocation(city) {
    const BASE_URL = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=es&format=json`;
    const response = await fetch(BASE_URL);
    const data = await response.json();
    return data;
}