import Select from "../../ui/Select"

export default function BookToolbar() {
    return (
        <div className="flex items-center">
            <span className="w-full">
                Ordenar por:
            </span>
            <Select name="ordering" className="w-auto text-sm">
                <option value="title">Título (A-Z)</option>
                <option value="-title">Título (Z-A)</option>
                <option value="">Fecha de publicación (Asc.)</option>
                <option value="">Fecha de publicación (Desc.)</option>
            </Select>
        </div>
    )
}