export default function Footer() {
    return (
        <footer className="border-t border-black/10 dark:border-white/10">
            <div className="container mx-auto px-4 py-10 text-sm text-black/60 dark:text-white/60">
                © {new Date().getFullYear()} — PabloOrtiz. Todos os direitos reservados.
            </div>
        </footer>
    );
}
