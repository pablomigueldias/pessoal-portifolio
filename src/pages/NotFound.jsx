import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="py-24 text-center">
            <h1 className="text-6xl font-extrabold">404</h1>
            <p className="mt-2 text-black/60 dark:text-white/60">
                Ops! Página não encontrada.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
                <Link to="/" className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white">
                    Voltar ao início
                </Link>
                <Link to="/portfolio" className="px-4 py-2 rounded-xl border border-black/10 dark:border-white/10">
                    Ver portfólio
                </Link>
            </div>
        </div>
    );
}
