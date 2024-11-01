'use client'
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('URL a acortar:', url);

    const response = await fetch('/api/shortener', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Error al acortar la URL:', data.error || 'Unknown error');
      alert('Error al acortar la URL');
      return;
    }

    if (data.shortUrl) {
      setShortUrl(data.shortUrl);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-lg p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center">Acortador de links</h1>
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input 
            type="text"
            className="text-black flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Introduce tu URL"
            required
          />
          <button 
            type="submit" 
            className="bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 transition duration-300"
          >
            Acortar
          </button>
        </form>
        {shortUrl && (
          <p className="mt-4 text-center">
            URL Acortada: <a className="text-blue-500 hover:underline" href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
          </p>
        )}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
