import { useEffect } from "react";

export default function useSmoothAnchor(offset = 80) {
  useEffect(() => {
    function onClick(e) {
      const a = e.target.closest('a[href^="/#"], a[href^="#"]');
      if (!a) return;

      const id = a.getAttribute("href").replace(/^\//, "").slice(1);
      const el = document.getElementById(id);
      if (!el) return;

      e.preventDefault();

      const y = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: "smooth" });

      // opcional: atualizar hash na URL
      history.replaceState(null, "", `#${id}`);
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [offset]);
}
