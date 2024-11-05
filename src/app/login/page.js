"use client";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('')
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const session = supabase.auth.getSession();
    setUser(session.user);

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Error: " + error.message);
        setErrorMessage('Error al iniciar sesión. El usuario no está registrado.')
        return;
      }

      alert("¡Sesión iniciada correctamente!");
      return router.push("/");
    } catch (err) {
      console.error("Unexpected error", err);
      alert("Ocurrió un error inesperado. Inténtalo nuevamente.");
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Navbar />

      <main className="flex items-center justify-center">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="text-black m-4 rounded flex flex-col p-1"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="text-black m-4 p-1 rounded"
            required
          />
          <button
            type="submit"
            className=" flex flex-col justify-self-center bg-green-800 p-2 rounded hover:bg-green-700 transition duration-500"
          >
            Login
          </button>
        </form>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </main>
    </div>
  );
};

export default Login;
