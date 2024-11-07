import { NextResponse } from "next/server";
import { supabase } from "@/app/utils/supabaseClient";

const generateShortId = () => Math.random().toString().substring(2, 8);

export async function POST(request) {
  const { url, user_id, customLink } = await request.json();
  const shortId = customLink || generateShortId();

  const { data: existingLink, error: existingError } = await supabase
    .from("urls")
    .select("short_id")
    .eq("short_id", shortId)
    .single();

  if (existingLink) {
    return NextResponse.json(
      { error: "El link personalizado ya está en uso." },
      { status: 409 }
    );
  }

  const { data, error } = await supabase
    .from("urls")
    .insert([
      { original_url: url, short_id: shortId, user_id: user_id || null },
    ]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${shortId}`,
  });
}
