import { NextResponse } from "next/server";
import { supabase } from "@/app/utils/supabaseClient";

const generateShortId = () => Math.random().toString().substring(2, 8)

export async function POST(request) {
    const { url } = await request.json()
    const shortId = generateShortId()

    const { data, error } = await supabase.from('urls').insert([
        { original_url: url, short_id: shortId},
    ])

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json({ short_url: `${process.env.NEXT_PUBLIC_BASE_URL}/${shortId}` })
}