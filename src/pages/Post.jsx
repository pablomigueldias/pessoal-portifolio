import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import DOMPurify from "dompurify";

import posts from "../data/posts/index.js";
import Container from "../components/ui/Container";
import Breadcrumbs from "../components/nav/BreadCrumbs.jsx";

// --- helpers ---
function getCover(post) {
    if (!post?.cover) return { src: "", alt: post?.title || "" };
    if (typeof post.cover === "string") {
        return { src: post.cover, alt: post.title || "" };
    }
    return {
        src: post.cover.src || "",
        alt: post.cover.alt || post.title || "",
    };
}

function estimateReadingMinutes(input) {
    const html = input ?? ""; // trata null/undefined
    const text = String(html).replace(/<[^>]+>/g, " ");
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 220));
}

export default function Post() {
    const { slug } = useParams();

    const safeList = useMemo(() => Array.isArray(posts) ? posts : [], []);
    const post = useMemo(
        () => safeList.find((p) => p.slug === slug),
        [safeList, slug]
    );

    if (!post) {
        return (
            <Container className="py-16">
                <p className="text-red-500 font-semibold">Post não encontrado.</p>
                <Link className="text-indigo-500 underline" to="/blog">
                    Voltar
                </Link>
            </Container>
        );
    }

    const { src: coverSrc, alt: coverAlt } = getCover(post);

    const displayDate = useMemo(() => {
        try {
            return new Date(post.date).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
            });
        } catch {
            return post.date;
        }
    }, [post.date]);

    const baseForReading = post?.html ?? post?.content ?? "";
    const readingMinutes = post.readingMinutes ?? estimateReadingMinutes(baseForReading);

    const safeHTML = DOMPurify.sanitize(post.html ?? "");

    const uniqueTags = Array.from(new Set(post.tags ?? []));

    return (
        <Container className="py-10 max-w-3xl">
            <Breadcrumbs />
            <Link to="/blog" className="text-sm text-indigo-500 underline">
                ← Voltar
            </Link>

            <h1 className="text-3xl font-extrabold mt-3">{post.title}</h1>

            <div className="mt-1 flex items-center gap-2 text-xs text-black/50 dark:text-white/50">
                <time dateTime={post.date}>{displayDate}</time>
                <span>•</span>
                <span>{readingMinutes} min de leitura</span>
            </div>

            {coverSrc && (
                <img
                    src={coverSrc}
                    alt={coverAlt}
                    className="mt-6 rounded-xl border border-black/10 dark:border-white/10 w-full h-auto object-cover"
                    loading="lazy"
                />
            )}

            <article className="prose prose-neutral dark:prose-invert prose-indigo max-w-none mt-6">
                {post.html ? (
                    <div dangerouslySetInnerHTML={{ __html: safeHTML }} />
                ) : post.content ? (
                    <p className="text-black/60 dark:text-white/60">
                        (Este post usa <code>content</code> em vez de <code>html</code>. Como você não usa
                        parser de Markdown, converta para HTML ou instale um.)
                    </p>
                ) : (
                    <p className="text-black/60 dark:text-white/60">Sem conteúdo.</p>
                )}
            </article>

            {uniqueTags.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                    {uniqueTags.map((t, i) => (
                        <span
                            key={`${t}-${i}`}
                            className="px-2 py-0.5 rounded-full text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10"
                        >
                            {t}
                        </span>
                    ))}
                </div>
            )}
        </Container>
    );
}
