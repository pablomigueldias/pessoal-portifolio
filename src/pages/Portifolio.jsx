import { useMemo, useState } from "react";
import data from "../data/portifolio.json"
import Container from "../components/ui/Container.jsx";
import Section from "../components/ui/Section.jsx";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Tag({ children }) {
    return (
        <span className="px-2 py-0.5 rounded-full text-[11px] bg-black/60 text-white/90 dark:bg-white/20 backdrop-blur border border-white/20">
            {children}
        </span>
    );
}


export function ProjectCard({ p, i = 0 }) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className="group relative rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 transform-gpu will-change-transform"
        >
            {/* Imagem */}
            <div className="aspect-[16/10] overflow-hidden relative transition-transform duration-300 group-hover:[transform:perspective(1200px)_rotateX(1.2deg)_rotateY(-1.2deg)]">
                <img
                    src={p.cover}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-500 md:group-hover:scale-[1.06]"
                    loading="lazy"
                />

                {/* Overlay (desktop) */}
                <div className="hidden md:block pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Base: título + categorias (somem no hover em md+) */}
                <div
                    className="absolute left-0 right-0 bottom-0 p-4 flex flex-col gap-2 z-10
                     md:transition-all md:duration-300 md:group-hover:opacity-0 md:group-hover:translate-y-2"
                >
                    <h3 className="font-semibold text-white drop-shadow-[0_1px_1px_rgba(0,0,0,.4)]">
                        {p.title}
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                        {(p.categories || []).map((c) => <Tag key={c}>{c}</Tag>)}
                    </div>
                </div>

                {/* Conteúdo no hover (aparece por cima) */}
                <div className="hidden md:flex absolute inset-0 p-4 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex-col justify-end z-20">
                    {p.summary && (
                        <p className="text-sm text-white/90 mb-3 drop-shadow-[0_1px_1px_rgba(0,0,0,.4)]">
                            {p.summary}
                        </p>
                    )}
                    <div className="flex flex-wrap gap-2">
                        <Link
                            to={`/portfolio/${p.slug}`}
                            className="pointer-events-auto px-3 py-1.5 rounded-lg bg-white text-black text-sm font-medium hover:bg-white/90 transition"
                        >
                            Ver detalhes
                        </Link>
                        {p.demo && (
                            <a
                                href={p.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="pointer-events-auto px-3 py-1.5 rounded-lg border border-white/50 text-white text-sm hover:bg-white/10 transition"
                            >
                                Demo
                            </a>
                        )}
                        {p.repo && (
                            <a
                                href={p.repo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="pointer-events-auto px-3 py-1.5 rounded-lg border border-white/50 text-white text-sm hover:bg-white/10 transition"
                            >
                                Código
                            </a>
                        )}
                    </div>
                </div>

                {/* Link invisível cobrindo o card no desktop */}
                <Link
                    to={`/portfolio/${p.slug}`}
                    aria-label={`Abrir projeto ${p.title}`}
                    className="hidden md:block absolute inset-0"
                    tabIndex={-1}
                />
            </div>

            {/* Mobile: detalhes sempre visíveis */}
            <div className="md:hidden p-4">
                <h3 className="font-semibold">{p.title}</h3>
                {p.summary && (
                    <p className="text-sm text-black/70 dark:text-white/70 mt-1">
                        {p.summary}
                    </p>
                )}

                <div className="mt-3 flex flex-wrap gap-1.5">
                    {(p.categories || []).map((c) => (
                        <span
                            key={c}
                            className="px-2 py-0.5 rounded-full text-[11px] bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10"
                        >
                            {c}
                        </span>
                    ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                    <Link
                        to={`/portfolio/${p.slug}`}
                        className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition"
                    >
                        Ver detalhes
                    </Link>
                    {p.demo && (
                        <a
                            href={p.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/10 text-sm hover:bg-black/5 dark:hover:bg-white/10 transition"
                        >
                            Demo
                        </a>
                    )}
                    {p.repo && (
                        <a
                            href={p.repo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/10 text-sm hover:bg-black/5 dark:hover:bg-white/10 transition"
                        >
                            Código
                        </a>
                    )}
                </div>
            </div>
        </motion.article>
    );
}

// Página com filtros + busca + grid
export default function PortfolioPage() {
    const [active, setActive] = useState("Todos");
    const [query, setQuery] = useState("");

    const categories = useMemo(() => {
        const all = data.flatMap((p) => p.categories || []);
        return ["Todos", ...Array.from(new Set(all))];
    }, []);

    const filtered = useMemo(() => {
        const base =
            active === "Todos" ? data : data.filter((p) => (p.categories || []).includes(active));
        if (!query.trim()) return base;
        const q = query.toLowerCase();
        return base.filter((p) => {
            const inTitle = (p.title || "").toLowerCase().includes(q);
            const inSummary = (p.summary || "").toLowerCase().includes(q);
            const inTags = (p.tags || []).some((t) => t.toLowerCase().includes(q));
            const inCats = (p.categories || []).some((c) => c.toLowerCase().includes(q));
            return inTitle || inSummary || inTags || inCats;
        });
    }, [active, query]);

    return (
        <Section id="portfolio" title="Portfólio" subtitle="Trabalhos selecionados">
            <Container>
                {/* Busca + filtros */}
                <div className="mb-6 flex flex-col md:flex-row md:items-center gap-3">
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Buscar por título, tag..."
                        className="w-full md:max-w-md bg-transparent border border-black/10 dark:border-white/10 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <div className="relative flex flex-wrap gap-2">
                        {categories.map((cat) => {
                            const activePill = active === cat;
                            return (
                                <motion.button
                                    key={cat}
                                    onClick={() => setActive(cat)}
                                    aria-pressed={activePill}
                                    className={`relative px-3 py-1 rounded-full text-sm border transition
          ${activePill
                                            ? "border-indigo-500 text-indigo-600 dark:text-indigo-400"
                                            : "border-black/10 dark:border-white/10 text-black/70 dark:text-white/80 hover:bg-black/5 dark:hover:bg-white/10"}`}
                                    whileTap={{ scale: 0.96 }}
                                >
                                    {cat}
                                    {activePill && (
                                        <motion.span
                                            layoutId="active-pill"
                                            className="absolute inset-0 -z-10 rounded-full bg-indigo-500/10"
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                </motion.button>
                            );
                        })}
                    </div>

                </div>

                {/* Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((p, i) => (
                        <ProjectCard key={p.slug} p={p} i={i} />
                    ))}
                </div>
            </Container>
        </Section>
    );
}
