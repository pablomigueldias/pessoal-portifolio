import { useEffect } from "react";
import { setMeta, setOG, setLink } from "../../lib/head";

export default function Head({
  title,
  description,
  canonical,
  og = {},
}) {
  useEffect(() => {
    if (title) document.title = title;
    setMeta("description", description);
    setLink("canonical", canonical);

    // Open Graph básicos
    setOG("og:title", og.title ?? title);
    setOG("og:description", og.description ?? description);
    setOG("og:type", og.type ?? "website");
    setOG("og:url", og.url ?? (canonical || window.location.href));
    setOG("og:image", og.image);

    // Twitter cards (opcional)
    setMeta("twitter:card", og.image ? "summary_large_image" : "summary");
    setMeta("twitter:title", og.title ?? title);
    setMeta("twitter:description", og.description ?? description);
    setMeta("twitter:image", og.image);
  }, [title, description, canonical, og]);

  return null; // não renderiza nada na UI
}
