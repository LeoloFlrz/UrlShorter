"use client";

import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/navigation";

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error("Error en el registro de usuario: ", error.message);
        // alert(`Error al registrar el usuario: ${error.message}`)
        setErrorMessage('Este email ya ha sido registrado. Inicia sesión o utiliza otro email para el registro')
        return;
      } else {
        setErrorMessage('')
      }

      alert("¡Usuario registrado correctamente!");
      router.push("/");
    } catch (err) {
      console.error("Unexpected error", err);
      alert("Ocurrió un error inesperado. Inténtalo nuevamente.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
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
          className="flex flex-col justify-self-center bg-green-800 p-2 rounded hover:bg-green-700 transition duration-500"
          type="submit"
        >
          Register
        </button>


      </form>
      {errorMessage && <p className="text-red-800">{errorMessage}</p>}
    </div>
    
    
  );
};

export default Register;
