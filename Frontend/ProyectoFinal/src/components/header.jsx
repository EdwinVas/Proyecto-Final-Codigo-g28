import logo from "../assets/logo.svg";
import {
    Search,
    Settings,
    Bell,
    User
} from "lucide-react";
import UserMenu from "@/components/user_menu";
import { useNavigate } from "react-router";
import useUserStore from "@/stores/useStore";

function Header(props) {
    const navigate = useNavigate();
    const logout = useUserStore((state) => state.logout);
    const handleLogout = () => {
        logout();
        navigate("/login");
    };
    return (
        <header className="flex flex-row p-6 md:p-10 justify-between md:justify-around gap-auto">
            <section className="bg-blue-500 w-8 xl:w-15 h-8 xl:h-15 rounded-full">
                <a href="/">
                    <img src={logo} alt="Logo" className="w-full h-full object-cover" />
                </a>
            </section>
            <section className="flex flex-row relative md:w-1/3 items-center">
                <Search className="absolute left-2 top-4 md:hidden -translate-y-1/2" size={15} />
                <Search className="absolute left-2 top-5 md:top-1/2 hidden md:block -translate-y-1/2" size={15} />
                <input
                    type="text"
                    placeholder="Search"
                    className={`flex grow px-2 py-0.5 md:h-1/2 text-sm md:text-lg rounded-lg ${props.shadow}  border-white/5 pl-6 md:pl-10`}
                />
            </section>
            <section className="flex flex-row justify-center items-center md:gap-3 xl:gap-5">
                <button className="p-2 rounded-xl bg-[#0e0e1c] shadow-[0_0_30px_-5px_rgba(120,120,255,0.35)] border border-white/5">
                    <Settings className="md:hidden" size={15} />
                    <Settings className="hidden md:block" />
                </button>
                <button className="p-2 rounded-xl bg-[#0e0e1c] shadow-[0_0_25px_-5px_rgba(120,120,255,0.35)] border border-white/5">
                    <Bell className="md:hidden" size={15} />
                    <Bell className="hidden md:block" />
                </button>
                <UserMenu userName={props.username} onLogout={handleLogout} />
            </section>
        </header>
    );
}

export default Header;
