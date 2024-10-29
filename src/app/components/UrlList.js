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
    <div>
      <h2>Mis URLs Acortadas</h2>
      <ul>
        {urls.map((url) => (
          <li key={url.short_id}>
            <a href={url.original_url}>{url.original_url}</a> - {url.short_id}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UrlList
