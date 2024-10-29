import { redirect } from "next/navigation";
import { supabase } from "../utils/supabaseClient";

export async function GET(request, { params }) {

    if (!params || !params.short_id) {
        console.error('params is undefined or shortId is missing')
        return new Response('URL not found', { status: 404 })
    }

    console.log(params)

    const { shortId } = params
    
    const { data, error } = await supabase
        .from('urls')
        .select('original_url')
        .eq('short_id', shortId)
        .single()

    if (error || !data) {
        console.error('Error fetching URL: ', error)
        return new Response('URL not found', { status: 404 })
    }

    return redirect(data.original_url)
}