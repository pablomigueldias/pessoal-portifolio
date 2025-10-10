import { FaReact, FaNode, FaGitAlt, FaJava } from "react-icons/fa";
import { motion } from "framer-motion";
import { FaPython } from "react-icons/fa";
import { DiMsqlServer } from "react-icons/di";


const skills = [
    { icon: <FaReact />, title: "React", desc: "Componentes, hooks, estado e rotas." },
    { icon: <DiMsqlServer />, title: "SQL", desc: "Banco de dados e build leve." },
    { icon: <FaJava />, title: "Java", desc: "Design consistente com utilitários." },
    { icon: <FaPython />, title: "Python", desc: "Microinterações e transições suaves." },
    { icon: <FaGitAlt />, title: "Git", desc: "Fluxo de versionamento e PRs." },
    { icon: <FaNode />, title: "Node", desc: "APIs simples e integrações." }
];

export default function Skills() {
    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((s, i) => (
                <motion.div
                    key={s.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="group rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 p-4 hover:border-indigo-500/40 transition"
                >
                    <div className="text-2xl mb-2">{s.icon}</div>
                    <h3 className="font-semibold">{s.title}</h3>
                    <p className="text-sm text-black/60 dark:text-white/60 mt-1">{s.desc}</p>
                </motion.div>
            ))}
        </div>
    );
}
