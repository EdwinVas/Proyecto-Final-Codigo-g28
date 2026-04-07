import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, ChevronDown } from "lucide-react";

export default function UserMenu({ userName, onLogout }) {
  const initials = userName
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-xl bg-[#0b1220] px-3 py-1.5 text-sm text-white ring-1 ring-white/10 hover:bg-white/5">
          <Avatar className="h-6 w-6">
            <AvatarImage src="" />
            <AvatarFallback className="bg-[#ff6247] text-xs font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>

          <span className="max-w-[120px] truncate">{userName}</span>
          <ChevronDown className="h-4 w-4 text-white/60" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-44 rounded-xl bg-[#0b1220] text-white ring-1 ring-white/10"
      >
        <DropdownMenuItem
          onClick={onLogout}
          className="cursor-pointer gap-2 text-red-400 focus:bg-white/5"
        >
          <LogOut className="h-4 w-4" />
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
