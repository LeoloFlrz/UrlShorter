"use client";
import { useEffect, useState } from "react";
import { supabase } from "./utils/supabaseClient";
import Navbar from "./components/Navbar";
import UrlList from "./components/UrlList";
import { useRouter } from "next/navigation";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [customLink, setCustomLink] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      setUser(sessionData?.session?.user || null);
    };

    fetchSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription.unsubscribe();
    };

    // const session = supabase.auth.getSession()
    // setUser(session.user)

    // const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
    //   setUser(session?.user || null)
    // })

    // return () => {
    //   subscription.unsubscribe()
    // }
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    alert("Logged out correctly");
    router.refresh();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("URL a acortar:", url);
    console.log("Usuario actual:", user);

    const response = await fetch("/api/shortener", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url,
        customLink: showCustomInput ? customLink : null,
        user_id: user ? user.id : null,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error al acortar la URL:", data.error || "Unknown error");
      alert("Error al acortar la URL");
      return;
    }

    console.log(data);

    if (data.shortUrl) {
      setShortUrl(data.shortUrl);
      console.log(`Url acortada: ${shortUrl}`);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Navbar user={user} onLogout={handleLogout} />
      <main className="flex flex-col gap-8 row-start-2 items-center  w-full max-w-lg p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center">Acortador de links</h1>
        <form onSubmit={handleSubmit} className="">
          <div className="flex items-center gap-2">
            <input
              type="text"
              className="text-black flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Introduce tu URL"
              required
            />

            {!showCustomInput && (
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 transition duration-300"
              >
                Acortar
              </button>
            )}
          </div>

          {showCustomInput && (
            <div className="flex flex-col items-center">
              <div className="flex items-center mt-5">
                <p className="text-green-400 text-xl mr-1">
                  {`${window.location.origin}`}/
                </p>
                <input
                  type="text"
                  className="text-black flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={customLink}
                  onChange={(event) => setCustomLink(event.target.value)}
                />
              </div>

              {/* <button className="mt-5 rounded bg-blue-600 p-3">
                Acortar link personalizado
              </button> */}
            </div>
          )}

          <div className="flex items-center justify-center">
            <button
              className="m-5 rounded bg-green-700 p-3 transition duration-500 hover:bg-green-800"
              type="button"
              onClick={() => setShowCustomInput(!showCustomInput)}
            >
              Personaliza tu link
            </button>
            {showCustomInput && (
              <button className="rounded bg-blue-600 p-3 hover:bg-blue-800 transition duration-500">
                Acortar link personalizado
              </button>
            )}
          </div>
        </form>
        {shortUrl && (
          <p className="mt-4 text-center">
            URL Acortada:{" "}
            <a
              className="text-blue-500 hover:underline"
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {shortUrl}
            </a>
          </p>
        )}

        <div>{user && <UrlList user={user} />}</div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
