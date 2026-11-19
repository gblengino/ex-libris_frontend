"use client"

import { useAuth } from "../providers/AuthProvider"
import ProfileCard from "./ProfileCard";

export default function MyProfileCard() {
    
    const { user } = useAuth();
    
    return (
        <ProfileCard user={user}/>
    )
}