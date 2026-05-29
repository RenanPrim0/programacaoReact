import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ListaOs } from "./lista-os"

export function ListaOsDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button"
                  variant="outline"
                  className="bg-slate-500 text-slate-300 hover:bg-slate-800 hover:text-white"
        >Lista Ordens de Serviço</Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-800 text-slate-300">
        <DialogHeader>
          <DialogTitle>Lista Atualizada</DialogTitle>
          <DialogDescription>
            Segue abaixo a lista de ordens de serviço
          </DialogDescription>
        </DialogHeader>
        <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
          
            <ListaOs/>
       
        </div>
      </DialogContent>
    </Dialog>
  )
}