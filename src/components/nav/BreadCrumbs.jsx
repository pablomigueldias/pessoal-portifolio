import { Link, useLocation } from "react-router-dom";

export default function Breadcrumbs() {
  const { pathname } = useLocation(); // ex: /portfolio/landing-pmdo
  const parts = pathname.split("/").filter(Boolean); // ["portfolio","landing-pmdo"]

  // mapa de rótulos legíveis (opcional)
  const labels = {
    portfolio: "Portfólio",
    blog: "Blog",
    contato: "Contato",
  };

  const crumbs = parts.map((seg, i) => {
    const to = "/" + parts.slice(0, i + 1).join("/");
    const label = labels[seg] || decodeURIComponent(seg).replace(/-/g, " ");
    return { to, label };
  });

  // na home, não mostra
  if (parts.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="text-sm mb-4">
      <ol className="flex items-center gap-2 text-black/60 dark:text-white/60">
        <li>
          <Link to="/" className="hover:underline">Início</Link>
        </li>
        {crumbs.map((c, idx) => (
          <li key={c.to} className="flex items-center gap-2">
            <span>›</span>
            {idx === crumbs.length - 1 ? (
              <span className="text-black dark:text-white">{c.label}</span>
            ) : (
              <Link to={c.to} className="hover:underline">{c.label}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
