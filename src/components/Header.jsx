import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const nav = [
    { to: "/", label: "Início" },
    { to: "/portfolio", label: "Portfólio" },
    // { to: "/blog", label: "Blog" },
    { to: "/#sobre", label: "Sobre" },
    { to: "/contato", label: "Contato" },
];

export default function Header() {
    const [open, setOpen] = useState(false);

    // trava o scroll quando o menu mobile está aberto
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => (document.body.style.overflow = "");
    }, [open]);

    return (
        <header
            className={[
                "sticky top-0 z-50 border-b border-black/10 dark:border-white/10",
                // 🔒 no mobile: fundo sólido; no md+ volta a ter blur/transparência
                "bg-white dark:bg-neutral-950",
                "md:backdrop-blur md:bg-white/70 md:dark:bg-black/30",
            ].join(" ")}
        >
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="font-extrabold tracking-tight">
                    PabloOrtiz<span className="text-indigo-500">.</span>
                </Link>

                {/* desktop nav */}
                <nav className="hidden md:flex gap-6">
                    {nav.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                `text-sm ${isActive
                                    ? "text-indigo-500"
                                    : "text-black/70 dark:text-white/80 hover:text-black dark:hover:text-white"
                                }`
                            }
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                {/* Ações do header */}
                <div className="flex items-center gap-4">
                    {/* botão CV no desktop */}
                    <a
                        href="/Curriculo - Pablo Miguel Dias Ortiz.pdf"
                        download
                        className="hidden md:inline-block px-4 py-2 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition"
                    >
                        Baixar CV
                    </a>

                    <ThemeToggle />

                    {/* botão mobile */}
                    <button
                        className="md:hidden p-2 rounded-xl bg-black/10 dark:bg-white/10"
                        onClick={() => setOpen(true)}
                        aria-label="Abrir menu"
                        aria-haspopup="menu"
                        aria-expanded={open}
                    >
                        ☰
                    </button>
                </div>
            </div>

            {/* drawer mobile */}
            {open && (
                <div
                    className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                    onClick={() => setOpen(false)}
                    aria-hidden
                >
                    <aside
                        role="menu"
                        className="absolute right-0 top-0 h-full w-72 bg-white dark:bg-neutral-950 border-l border-black/10 dark:border-white/10 shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* topo do drawer */}
                        <div className="sticky top-0 bg-white/95 dark:bg-neutral-950/95 px-6 py-5 border-b border-black/10 dark:border-white/10 flex items-center justify-between">
                            <span className="font-bold">Menu</span>
                            <button
                                className="p-2 rounded-lg bg-black/10 dark:bg-white/10"
                                onClick={() => setOpen(false)}
                                aria-label="Fechar menu"
                            >
                                ✕
                            </button>
                        </div>

                        <nav className="grid gap-2 p-6">
                            {nav.map((item) => (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    onClick={() => setOpen(false)}
                                    className={({ isActive }) =>
                                        [
                                            "rounded-lg px-3 py-2 text-sm transition",
                                            isActive
                                                ? "bg-indigo-500 text-white"
                                                : "text-black/80 dark:text-white/80 hover:bg-black/10 dark:hover:bg-white/10",
                                        ].join(" ")
                                    }
                                >
                                    {item.label}
                                </NavLink>
                            ))}
                        </nav>

                        {/* botão CV no mobile */}
                        <div className="px-6 mt-auto">
                            <a
                                href="/Curriculo - Pablo Miguel Dias Ortiz.pdf"
                                download
                                className="block w-full text-center px-4 py-2 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition"
                            >
                                Baixar CV
                            </a>
                        </div>
                    </aside>
                </div>
            )}
        </header>
    );
}
