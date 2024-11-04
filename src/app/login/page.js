"use client";
import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { redirect } from "next/dist/server/api-utils";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Error: " + error.message);
        return;
      }

      alert("¡Sesión iniciada correctamente!");
      return router.push('/')
    } catch (err) {
      console.error("Unexpected error", err);
      alert("Ocurrió un error inesperado. Inténtalo nuevamente.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
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
    </div>
  );
};

export default Login;
