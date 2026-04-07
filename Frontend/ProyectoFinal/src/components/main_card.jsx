import bgImage from "../assets/summer-landscape-48.png"
import useAPIWeather from "../hooks/useAPIWeather"
import { weatherDescription } from "../stores/weatherDescription"

function MainCard(props) {

    const { weather, loading, error, city, country } = useAPIWeather();

    return (
        <div
            className={`bg-size-[35%_100%] bg-no-repeat bg-position-[95%_center] w-full h-[240px] ${props.shadow} md:justify-start md:w-1/3`}
            style={{ backgroundImage: `url(${bgImage})` }}>
            <div className="flex flex-col p-6 md:p-10 w-2/3">
                <h1 className="text-4xl">Hola {props.firstName}!</h1>
                <p className="my-2 text-sm text-blue-300">
                    Bienvenido a tu panel de control! La calidad del aire es buena y fresca, puedes salir hoy
                </p>
                {loading ? (
                    <p>Cargando...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : weather ? (
                    <div>
                        <p className="text-2xl">+{weather.temperature}°C {weatherDescription[weather.weathercode]?.icono}</p>
                        <p className="text-sm">{city}, {country}</p>
                        <p className="text-sm">
                            {weatherDescription[weather.weathercode]?.descripcion}
                        </p>
                    </div>
                ) : (
                    <p>Datos del clima no disponibles</p>
                )}
            </div>
        </div>
    );
}

export default MainCard;
