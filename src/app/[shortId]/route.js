import { redirect } from "next/navigation";
import { supabase } from "../utils/supabaseClient";

export async function GET(request, { params }) {
  const { shortId } = await params;

  if (!shortId) {
    console.error("missing short id");
    return new Response("URL not found", { status: 404 });
  }

  console.log("Fetching url for short id:", shortId);

  const { data, error } = await supabase
    .from("urls")
    .select("original_url")
    .eq("short_id", shortId)
    .single();

  console.log("Data fetched from database:", data);

  if (error || !data) {
    console.error("Error fetching URL: ", error);
    return new Response("URL not found", { status: 404 });
  }

  const redirectUrl = data.original_url;

  console.log("Redirecting to:", redirectUrl);
  return new Response(null, {
    status: 302,
    headers: {
      Location: redirectUrl,
    },
  });
}
