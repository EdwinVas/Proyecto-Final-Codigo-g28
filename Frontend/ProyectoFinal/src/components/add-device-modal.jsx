import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import { toast } from "sonner";
import { addDevice } from "@/services/api";
import { X } from "lucide-react";

export function AddDeviceModal({ isOpen, onClose, onDeviceAdded }) {
  const [nombre, setNombre] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.Ripple = false;
    e.preventDefault();
    if (!nombre.trim()) return;

    setIsLoading(true);
    const response = await addDevice(nombre);
    
    if (response.ok) {
        toast.success("Dispositivo creado correctamente");
        setNombre("");
        onDeviceAdded(); // refresh list
        onClose(); // close modal
    } else {
        toast.error("Error: " + response.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 w-full max-w-sm shadow-xl relative animate-in fade-in zoom-in-95 duration-200">
        
        <button 
            onClick={onClose} 
            className="absolute right-4 top-4 text-zinc-400 hover:text-white transition-colors"
        >
            <X size={20} />
        </button>

        <h2 className="text-xl font-bold mb-2">Añadir Dispositivo</h2>
        <p className="text-sm text-zinc-400 mb-6">
          Ingresa un nombre para registrar tu nuevo dispositivo.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Field>
            <FieldLabel htmlFor="device-name">Nombre del dispositivo</FieldLabel>
            <Input 
                id="device-name"
                placeholder="Ej. Foco Principal" 
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                autoFocus
                required
            />
          </Field>
          
          <div className="flex justify-end gap-3 mt-4">
            <Button type="button" variant="ghost" onClick={onClose}>
                Cancelar
            </Button>
            <Button type="submit" disabled={isLoading || !nombre.trim()}>
                {isLoading ? "Guardando..." : "Guardar"}
            </Button>
          </div>
        </form>

      </div>
    </div>
  );
}
