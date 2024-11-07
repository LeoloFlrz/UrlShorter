import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

const UrlList = ({ user }) => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const fetchUrls = async () => {
      if (user) {
        const { data } = await supabase
          .from("urls")
          .select("*")
          .eq("user_id", user.id);

        setUrls(data);
      }
    };

    fetchUrls();
  }, [user]);

  return (
    <div className="flex items-center justify-center mt-10">
      <div className="w-full max-w-4x1 rounded p-6">
        <h2 className="text-center text-lg font-semibold mb-4">
          Mis URLs Acortadas
        </h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="p-2 border-r border-gray-300 text-left">
                Link original
              </th>
              <th className="p-2 border-r border-gray-300 text-left">
                Link acortado
              </th>
              <th className="p-2 text-left">Acceso</th>
            </tr>
          </thead>
          <tbody>
            {urls.map((url) => (
              <tr key={url.short_id} className="border-b border-gray-200">
                <td className="p-6 border-r border-gray-200">
                  <a
                    href={url.original_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    {url.original_url}
                  </a>
                </td>
                <td className="p-6 border-r border-gray-200">{`${window.location.origin}/${url.short_id}`}</td>
                <td className="p-6">
                  <a
                    href={`/${url.short_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white rounded bg-blue-500 px-4 py-2 hover:bg-blue-600 transition duration-500"
                  >
                    Acceder
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UrlList;
