import { motion } from "framer-motion";
import { ReactTyped } from "react-typed";
import { Link } from "react-router-dom";
import site from "../site.json";
import Container from "../components/ui/Container.jsx";
import Section from "../components/ui/Section.jsx";
import Skills from "../components/home/Skills.jsx";

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function Home() {
    // Fallback atualizado para a nova área
    const typed =
        Array.isArray(site.typed) && site.typed.length > 0
            ? site.typed
            : [site.role || "Engenheiro de Dados", "Analista de Dados", "Machine Learning", "Inteligência Artificial"];

    return (
        <>
            {/* HERO */}
            <div className="relative overflow-hidden">
                <div
                    className="pointer-events-none absolute inset-0 opacity-60 dark:opacity-70"
                    style={{
                        background:
                            "radial-gradient(60rem 60rem at 20% -10%, rgba(99,102,241,.25), transparent 60%), radial-gradient(50rem 40rem at 100% 0%, rgba(16,185,129,.18), transparent 60%)"
                    }}
                />
                <Container className="relative flex flex-col items-center justify-center min-h-[72vh] text-center py-20">
                    <motion.h1
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-extrabold tracking-tight"
                    >
                        {site.name}
                        <span className="text-indigo-500">.</span>
                    </motion.h1>

                    <motion.h2
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        transition={{ delay: 0.15, duration: 0.6 }}
                        className="mt-3 text-lg md:text-xl text-black/70 dark:text-white/80"
                    >
                        <ReactTyped strings={typed} typeSpeed={60} backSpeed={40} loop />
                    </motion.h2>

                    {/* CTA */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="mt-8 flex flex-wrap items-center justify-center gap-3"
                    >
                        <Link
                            to="/portfolio"
                            className="px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-medium transition"
                        >
                            Ver Portfólio
                        </Link>
                        <Link
                            to="/contato"
                            className="px-5 py-2.5 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 transition"
                        >
                            Falar comigo
                        </Link>
                    </motion.div>

                    {/* Tech stack em chips */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        transition={{ delay: 0.45, duration: 0.6 }}
                        className="mt-8 flex flex-wrap justify-center gap-2"
                    >
                        {["Python", "SQL", "Pandas", "Power BI", "TensorFlow", "Machine Learning"].map((t) => (
                            <span
                                key={t}
                                className="px-3 py-1 rounded-full text-xs bg-black/5 dark:bg:white/5 border border-black/10 dark:border-white/10"
                            >
                                {t}
                            </span>
                        ))}
                    </motion.div>
                </Container>
            </div>

            {/* SOBRE */}
            <Section id="sobre" title="Sobre mim" subtitle="Quem eu sou">
                <div className="grid md:grid-cols-[280px,1fr] gap-8 items-start">
                    {/* Avatar */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.5 }}
                        className="mx-auto md:mx-0"
                    >
                        <img
                            src={site.avatar || "/avatar.jpg"}
                            alt={`${site.name} avatar`}
                            className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-2xl border border-black/10 dark:border-white/10 shadow"
                        />
                    </motion.div>

                    {/* Texto e infos */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                    >
                        <h3 className="text-2xl font-bold">
                            {site.role || "Engenheiro de Dados e Inteligência Artificial"}
                        </h3>
                        <p className="mt-3 text-black/70 dark:text-white/70 leading-relaxed">
                            {site.bio ||
                                "Transformo dados em decisões. Trabalho com pipelines (ETL), modelagem preditiva e visualização de dados para gerar impacto real. Experiência com Python, SQL, Pandas e ferramentas de BI. Sempre aprendendo e aplicando IA de forma prática e eficiente."}
                        </p>

                        <ul className="mt-6 grid sm:grid-cols-2 gap-3 text-sm">
                            <li className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                                <span className="block text-black/50 dark:text-white/50">Local</span>
                                <span className="font-semibold">{site.location || "Brasil"}</span>
                            </li>
                            <li className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                                <span className="block text-black/50 dark:text-white/50">Experiência</span>
                                <span className="font-semibold">{(site.years ?? 1)}+ anos</span>
                            </li>
                            <li className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                                <span className="block text-black/50 dark:text-white/50">Stack</span>
                                <span className="font-semibold">Python • SQL • Pandas • Power BI • TensorFlow</span>
                            </li>
                            <li className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                                <span className="block text-black/50 dark:text-white/50">Disponível</span>
                                <span className="font-semibold">Engenharia de Dados / Análise de Dados • PJ</span>
                            </li>
                        </ul>

                        {/* Skills pills */}
                        <div className="mt-6 flex flex-wrap gap-2">
                            {(Array.isArray(site.skills)
                                ? site.skills
                                : ["Python", "SQL", "Pandas", "Power BI", "TensorFlow", "Machine Learning"]
                            ).map((s) => (
                                <span
                                    key={s}
                                    className="px-3 py-1 rounded-full text-xs bg-indigo-500/10 text-indigo-500 border border-indigo-500/20"
                                >
                                    {s}
                                </span>
                            ))}
                        </div>

                        {/* atalhos sociais (se existirem) */}
                        <div className="mt-6 flex flex-wrap gap-3">
                            {site?.socials?.github && (
                                <a
                                    href={site.socials.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 text-sm"
                                >
                                    GitHub
                                </a>
                            )}
                            {site?.socials?.linkedin && (
                                <a
                                    href={site.socials.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 text-sm"
                                >
                                    LinkedIn
                                </a>
                            )}
                        </div>
                    </motion.div>
                </div>
            </Section>

            <Section id="skills" title="Habilidades" subtitle="Tecnologias que uso">
                <Skills />
            </Section>
        </>
    );
}
