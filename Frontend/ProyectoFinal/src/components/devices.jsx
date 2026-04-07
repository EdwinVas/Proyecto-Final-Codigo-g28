import DeviceCard from "./device_card";

function Devices({ devices }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {devices.length > 0 ? (
                devices.map((device) => (
                    <DeviceCard key={device.id} device={device} />
                ))
            ) : (
                <p>No hay dispositivos para mostrar.</p>
            )}
        </div>
    );
}

export default Devices;