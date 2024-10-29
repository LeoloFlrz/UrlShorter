'use client'
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch('api/shortener', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    })

    const data = await response.json()
    if (data.shortUrl) setShortUrl(data.shortUrl)
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>Acortador de URLs</h1>
        <form onSubmit={handleSubmit}>
          <input 
            type="text"
            className="text-black"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Introduce tu URL"
          />
          <button type="submit">Acortar</button>
        </form>
        {shortUrl && <p>URL Acortada: <a href={shortUrl}>{shortUrl}</a></p>}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        
      </footer>
    </div>
  );
}
