import { NextResponse } from "next/server";
import { supabase } from "@/app/utils/supabaseClient";

export async function POST(request) {
    const { email, password } = await request.json();

    const { user, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    
    return NextResponse.json({ user });
}