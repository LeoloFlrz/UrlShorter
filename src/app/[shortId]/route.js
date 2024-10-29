import { redirect } from "next/navigation";
import { supabase } from "../utils/supabaseClient";

export async function GET({ params }) {
    const { shortId } = params
    
    const { data, error } = await supabase
        .from('urls')
        .select('original_url')
        .eq('shortId', shortId)
        .single()

    if (error || !data) {
        return new Response('URL not found', { status: 404 })
    }
    
    redirect(data.original_url)
}