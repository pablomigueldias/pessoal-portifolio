import { motion } from "framer-motion";
import { FaPython, FaDatabase, FaChartBar, FaBrain, FaGitAlt } from "react-icons/fa";
import { SiPandas, SiTensorflow, SiMysql, SiPostgresql } from "react-icons/si";
import { DiMsqlServer } from "react-icons/di";

const skills = [
    { icon: <FaPython />, title: "Python", desc: "Linguagem principal para análise e IA." },
    { icon: <SiPandas />, title: "Pandas", desc: "Manipulação e limpeza de dados tabulares." },
    { icon: <SiMysql />, title: "MySQL", desc: "Consultas e modelagem de dados relacionais." },
    { icon: <DiMsqlServer />, title: "SQL Server", desc: "Armazenamento e estruturação de dados corporativos." },
    { icon: <SiPostgresql />, title: "PostgreSQL", desc: "Banco de dados avançado e robusto para grandes volumes." },
    { icon: <FaBrain />, title: "Machine Learning", desc: "Criação e treino de modelos inteligentes." },
    { icon: <SiTensorflow />, title: "TensorFlow", desc: "Desenvolvimento e treino de redes neurais." },
    { icon: <FaChartBar />, title: "Data Visualization", desc: "Análise visual e dashboards estratégicos." },
    { icon: <FaDatabase />, title: "ETL / Engenharia de Dados", desc: "Pipelines e integração de múltiplas fontes." },
    { icon: <FaGitAlt />, title: "Git", desc: "Versionamento e colaboração eficiente." }
];

export default function Skills() {
    return (
        <section>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {skills.map((s, i) => (
                    <motion.div
                        key={s.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        whileHover="hover"
                        className="group flex items-start justify-between rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 p-4 hover:border-indigo-500/40 hover:shadow-md transition"
                    >
                        <div>
                            <h3 className="font-semibold">{s.title}</h3>
                            <p className="text-sm text-black/60 dark:text-white/60 mt-1 max-w-[85%]">
                                {s.desc}
                            </p>
                        </div>

                        <motion.div
                            variants={{
                                hover: { scale: 1.3, rotate: 10 },
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 10 }}
                            className="text-3xl text-indigo-500 ml-3"
                        >
                            {s.icon}
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
