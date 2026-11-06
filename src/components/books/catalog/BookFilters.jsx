import Input from "../../ui/Input"
import Select from "../../ui/Select"

export default function BookFilters() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                    Filtros
                </h2>
                <button className="text-sm text-ink hover:underline hover:cursor-pointer">
                    Limpiar
                </button>
            </div>
            <div className="flex flex-col gap-4">
                <h3 className="text-sm font-semibold">
                    Género
                </h3>
                <Select name="genre" id="genre" defaultValue="">
                    <option value="">Todos los géneros</option>
                    <option value="1">Fantasía</option>
                    <option value="2">Ciencia ficción</option>
                </Select>
            </div>
            <div className="flex flex-col gap-4">
                <h3 className="text-sm font-semibold">
                    Autor
                </h3>
                <Input 
                    type="text"
                    placeholder="Buscar autor..."    
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-sm font-semibold">
                    Editorial
                </h3>
                <Input
                    type="text"
                    placeholder="Buscar editorial..." 
                />
            </div>
        </div>
    )
}