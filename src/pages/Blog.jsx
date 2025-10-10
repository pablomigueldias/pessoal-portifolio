import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import posts from "../data/posts/index.js";
import Container from "../components/ui/Container.jsx";
import Section from "../components/ui/Section.jsx";
import { motion } from "framer-motion";


function uniq(arr) { return Array.from(new Set(arr)); }
const PAGE_SIZE = 6;

export default function Blog() {
    const [query, setQuery] = useState("");
    const [tag, setTag] = useState("Todas");
    const [page, setPage] = useState(1);

    const allTags = useMemo(() => ["Todas", ...uniq(posts.flatMap(p => p.tags || []))], []);

    const filtered = useMemo(() => {
        const q = query.toLowerCase().trim();
        let list = posts;
        if (tag !== "Todas") list = list.filter(p => (p.tags || []).includes(tag));
        if (q) {
            list = list.filter(p =>
                p.title.toLowerCase().includes(q) ||
                (p.excerpt || "").toLowerCase().includes(q) ||
                (p.tags || []).some(t => t.toLowerCase().includes(q))
            );
        }
        return list.sort((a, b) => new Date(b.date) - new Date(a.date));
    }, [query, tag]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    function go(p) { setPage(Math.min(totalPages, Math.max(1, p))); }

    return (
        <Section id="blog" title="Blog" subtitle="Artigos e notas">
            <Container>
               
                <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6">
                    <input
                        value={query}
                        onChange={e => { setQuery(e.target.value); setPage(1); }}
                        placeholder="Buscar por título, tag..."
                        className="w-full md:max-w-md bg-transparent border border-black/10 dark:border-white/10 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <div className="relative flex flex-wrap gap-2">
                        {allTags.map((t) => {
                            const activePill = tag === t;
                            return (
                                <motion.button
                                    key={t}
                                    onClick={() => { setTag(t); setPage(1); }}
                                    aria-pressed={activePill}
                                    whileTap={{ scale: 0.96 }}
                                    className={`group relative px-3 py-1 rounded-full text-sm border transition-transform duration-300 transform-gpu
          ${activePill
                                            ? "border-indigo-500 text-indigo-600 dark:text-indigo-400"
                                            : "border-black/10 dark:border-white/10 text-black/70 dark:text-white/80 hover:bg-black/5 dark:hover:bg-white/10"}`}
                                >
                                    
                                    <span className="block transition-transform duration-300 group-hover:[transform:perspective(1200px)_rotateX(1.2deg)_rotateY(-1.2deg)]">
                                        {t}
                                    </span>

                                    {/* Indicador ativo deslizante */}
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

                {/* Lista */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pageItems.map(p => (
                        <Link
                            key={p.slug}
                            to={`/blog/${p.slug}`}
                            className="group block rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 hover:border-indigo-500/40 transition"
                        >
                            <div className="aspect-[16/10] overflow-hidden">
                                <img src={p.cover} alt={p.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition" loading="lazy" />
                            </div>
                            <div className="p-4">
                                <time className="text-xs text-black/50 dark:text-white/50">{new Date(p.date).toLocaleDateString()}</time>
                                <h3 className="font-semibold text-lg mt-1">{p.title}</h3>
                                <p className="text-sm text-black/60 dark:text-white/60 mt-1">{p.excerpt}</p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {p.tags?.map(t => (
                                        <span key={t} className="px-2 py-0.5 rounded-full text-xs bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">{t}</span>
                                    ))}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Paginação */}
                {totalPages > 1 && (
                    <div className="mt-8 flex items-center gap-2">
                        <button onClick={() => go(page - 1)} disabled={page === 1} className="px-3 py-1 rounded-lg border disabled:opacity-50">Anterior</button>
                        <span className="text-sm">Página {page} de {totalPages}</span>
                        <button onClick={() => go(page + 1)} disabled={page === totalPages} className="px-3 py-1 rounded-lg border disabled:opacity-50">Próxima</button>
                    </div>
                )}
            </Container>
        </Section>
    );
}
