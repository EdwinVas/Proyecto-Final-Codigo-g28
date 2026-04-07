import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { CalendarDays, ChevronRight } from "lucide-react";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];

export default function MonthSelect({ value, onChange, setSelectedMonth }) {
    const changeMonth = (dir) => {
        const idx = months.indexOf(value);
        const next = months[idx + dir];
        if (next) setSelectedMonth(next);
    };
    return (
        <div className="flex items-center gap-2">
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger className="h-8 w-[110px] rounded-xl bg-[#0b1220] text-xs text-white ring-1 ring-white/10">
                    <CalendarDays className="mr-1 h-3.5 w-3.5 opacity-70" />
                    <SelectValue placeholder="Month" />
                </SelectTrigger>

                <SelectContent className="rounded-xl bg-[#0b1220] text-white ring-1 ring-white/10">
                    {months.map((m) => (
                        <SelectItem key={m} value={m}>
                            {m}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* Botón flecha (>) */}
            <button onClick={() => changeMonth(-1)}>◀</button>
            <button onClick={() => changeMonth(1)}>▶</button>
        </div>
    );
}
