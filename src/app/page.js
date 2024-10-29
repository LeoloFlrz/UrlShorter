'use client'
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState('')
  const [short_url, setShortUrl] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch('api/shortener', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Error al acortar la URL: ', data.error || 'Unknown error')
      alert('Error al acortar la URL')
      return
    }

    if (data.short_url) setShortUrl(data.short_url)
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
        {short_url && <p>URL Acortada: <a href={short_url}>{short_url}</a></p>}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        
      </footer>
    </div>
  );
}
