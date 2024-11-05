import { NextResponse } from "next/server";
import { supabase } from "@/app/utils/supabaseClient";

const generateShortId = () => Math.random().toString().substring(2, 8);

export async function POST(request) {
  const { url, user_id } = await request.json();
  const shortId = generateShortId();

  const { data, error } = await supabase
    .from("urls")
    .insert([
      { original_url: url, short_id: shortId, user_id: user_id || null },
    ]);

  // const { data, error } = await supabase.from('urls').insert([
  //     { original_url: url, short_id: shortId, user_id: user.id},
  // ])

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}${shortId}`,
  });
}
