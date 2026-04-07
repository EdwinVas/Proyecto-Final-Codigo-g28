import Header from "@/components/header";
import MainCard from "@/components/main_card";
import Devices from "@/components/devices";
import { getDevices } from "@/services/api";
import useUserStore from "@/stores/useStore";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Graphic from "@/components/graphic";
import MonthSelect from "@/components/select_month";
import { AddDeviceModal } from "@/components/add-device-modal";
import { Plus } from "lucide-react";

function Home() {
    const { user } = useUserStore();
    const [userName, setUserName] = useState(user ? `${user.nombre} ${user.apellido}` : "");
    const [firstName, setFirstName] = useState(user ? user.nombre : "");
    const [devices, setDevices] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState("Jul");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const handleGetDevices = async () => {
        const { ok, message, data } = await getDevices();

        if (!ok) {
            toast.error(message);
            return;
        }

        setDevices(data);
    };

    useEffect(() => {
        handleGetDevices();
    }, []);

    const shadow = "shadow-[0_0_25px_-5px_rgba(255,255,255,0.25)]"


    return (
        <div className="min-h-screen bg-[#121220] text-white overflow-auto">
            <Header username={userName} shadow={shadow} />
            <div className="flex flex-col md:flex-row p-3">
                <MainCard firstName={firstName} shadow={shadow} />
                <div className="flex flex-col mt-4 md:mt-0 md:pl-8 w-full md:w-2/3 gap-3">
                    <div className="flex justify-between items-center pr-4">
                        <h2 className="text-2xl">Mis dispositivos</h2>
                        <button 
                            onClick={() => setIsAddModalOpen(true)}
                            className="bg-zinc-800 hover:bg-zinc-700 text-white w-10 h-10 flex border border-zinc-700 rounded-full justify-center items-center shadow-md transition-transform hover:scale-105"
                            title="Añadir dispositivo"
                        >
                            <Plus size={20} />
                        </button>
                    </div>
                    <Devices devices={devices} />
                </div>
            </div>
            <div className="flex flex-col mt-4 gap-3 w-full">
                <div className="flex flex-row justify-center gap-4">
                    <span className="text-2xl">Consumo de energía</span>
                    <MonthSelect value={selectedMonth} onChange={setSelectedMonth} setSelectedMonth={setSelectedMonth} />
                </div>
                <div className="w-full">
                    <Graphic selectedMonth={selectedMonth} />
                </div>
            </div>
            
            <AddDeviceModal 
                isOpen={isAddModalOpen} 
                onClose={() => setIsAddModalOpen(false)} 
                onDeviceAdded={handleGetDevices} 
            />
        </div>
    )
}

export default Home;