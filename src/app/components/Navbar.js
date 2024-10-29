import Link from "next/link";

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="flex justify-between p-4 text-white w-full">
      <Link href="/">Inicio</Link>
      <div>
        {user ? (
          <>
            <span>{user.email}</span>
            <button onClick={onLogout} className="ml-4">
              Cerrar Sesión
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="ml-4">
              Iniciar Sesión
            </Link>
            <Link href="/register" className="ml-4">
              Registrarse
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar
