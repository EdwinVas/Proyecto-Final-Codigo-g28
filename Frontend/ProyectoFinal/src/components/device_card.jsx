import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { deviceIcon } from "../stores/deviceIcon"
import { updateDevice } from "../services/api"

function DeviceCard(props) {
    const [isOn, setIsOn] = useState(props.device.on_off);
    const [isLoading, setIsLoading] = useState(false);

    let state = isOn ? "Encendido" : "Apagado";

    const handleToggle = async (checked) => {
        setIsLoading(true);
        setIsOn(checked);
        const result = await updateDevice(props.device.id, { on_off: checked });
        if (!result.ok) {
            setIsOn(!checked); // Reset to previous state
            console.error(result.message);
        }
        setIsLoading(false);
    };

    return (
        <div
            className={`w-full bg-dark-500 md:justify-start border-2 border-[#9494ec] rounded-lg`}>
            <div className="flex flex-col p-4 w-full">
                <p className="flex items-center text-xl justify-center font-semibold mb-2">{deviceIcon[props.device.icon]?.icono || '🔌'} {props.device.nombre || props.device.name}</p>
                <div className="text-2xl flex items-center justify-center space-x-2">
                    <Switch id={`device-${props.device.id}`} checked={isOn} onCheckedChange={handleToggle} disabled={isLoading} />
                    <Label htmlFor={`device-${props.device.id}`}>{state}</Label>
                </div>
            </div>
        </div>
    );
}

export default DeviceCard;
