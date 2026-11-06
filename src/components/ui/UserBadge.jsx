import { User } from "lucide-react";

export default function UserBadge(){
    return (
        <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center">
            <User size={15} className="flex items-center justify-center"/>
        </div>
    )
}