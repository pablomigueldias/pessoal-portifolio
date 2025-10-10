import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

const nav = [
    { to: "/", label: "Início" },
    { to: "/portfolio", label: "Portfólio" },
    //{ to: "/blog", label: "Blog" },
    { to: "/#sobre", label: "Sobre" },
    { to: "/contato", label: "Contato" },
];

export default function Header() {
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 backdrop-blur bg-white/70 dark:bg-black/30 border-b border-black/10 dark:border-white/10">
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
                    >
                        ☰
                    </button>
                </div>
            </div>

            {/* drawer mobile */}
            {open && (
                <div
                    className="md:hidden fixed inset-0 z-50 bg-black/60"
                    onClick={() => setOpen(false)}
                >
                    <aside
                        className="absolute right-0 top-0 h-full w-72 bg-white dark:bg-[#111] border-l border-black/10 dark:border-white/10 p-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <span className="font-bold">Menu</span>
                            <button
                                className="p-2 rounded-lg bg-black/10 dark:bg-white/10"
                                onClick={() => setOpen(false)}
                                aria-label="Fechar menu"
                            >
                                ✕
                            </button>
                        </div>
                        <nav className="grid gap-3 mb-6">
                            {nav.map((item) => (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    onClick={() => setOpen(false)}
                                    className={({ isActive }) =>
                                        `rounded-lg px-3 py-2 ${isActive
                                            ? "bg-indigo-500 text-white"
                                            : "hover:bg-black/10 dark:hover:bg-white/10"
                                        }`
                                    }
                                >
                                    {item.label}
                                </NavLink>
                            ))}
                        </nav>

                        {/* botão CV no mobile */}
                        <a
                            href="Curriculo - Pablo Miguel Dias Ortiz.pdf"
                            download
                            className="block w-full text-center px-4 py-2 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition"
                        >
                            Baixar CV
                        </a>
                    </aside>
                </div>
            )}
        </header>
    );
}

