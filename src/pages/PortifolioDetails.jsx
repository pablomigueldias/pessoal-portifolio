// src/pages/PortfolioDetail.jsx
import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import data from "../data/portifolio.json";
import Container from "../components/ui/Container";
import Breadcrumbs from "../components/nav/BreadCrumbs.jsx";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard } from "swiper/modules";

export default function PortfolioDetail() {
    const { slug } = useParams();
    const project = useMemo(() => data.find((p) => p.slug === slug), [slug]);

    if (!project) {
        return (
            <Container className="py-16">
                <p className="text-red-500 font-semibold">Projeto não encontrado.</p>
                <Link className="text-indigo-500 underline" to="/portfolio">
                    Voltar
                </Link>
            </Container>
        );
    }

    return (
        <Container className="py-10">
            <Breadcrumbs />
            <Link to="/portfolio" className="text-sm text-indigo-500 underline">
                ← Voltar
            </Link>

            <h1 className="text-3xl font-extrabold mt-3">{project.title}</h1>
            <p className="text-black/70 dark:text-white/70 mt-2">{project.summary}</p>

            {/* GALERIA COM SWIPER */}
            <div className="mt-6">
                <Swiper
                    modules={[Navigation, Pagination, Keyboard]}
                    navigation
                    pagination={{ clickable: true }}
                    keyboard={{ enabled: true }}
                    spaceBetween={16}
                    slidesPerView={1}
                    className="rounded-xl border border-black/10 dark:border-white/10 overflow-hidden"
                >
                    {(project.gallery ?? [project.cover]).map((src, i) => (
                        <SwiperSlide key={i}>
                            <img
                                src={src}
                                alt={`${project.title} ${i + 1}`}
                                className="w-full h-auto block"
                                loading="lazy"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="main">
                
            </div>

            {/* Metadados */}
            <div className="mt-6 flex flex-wrap gap-2">
                {project.tags?.map((t) => (
                    <span
                        key={t}
                        className="px-2 py-0.5 rounded-full text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10"
                    >
                        {t}
                    </span>
                ))}
            </div>
        </Container>
    );
}
