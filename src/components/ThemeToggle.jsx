import { use, useEffect, useState } from "react"
import { FiSun, FiMoon } from "react-icons/fi"



const ThemeToggle = () => {
    const [dark, setDark] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem('theme');
        const isDark = stored ? stored === 'dark' : true;
        setDark(isDark);
        document.documentElement.classList.toggle('dark', isDark);
    }, []);

    const toggle = () => {
        const next = !dark;
        setDark(next);
        localStorage.setItem('theme', next ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', next);
    };

    return (
        <button
            onClick={toggle}
            className="p-2 rounded-xl bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 transition"
            aria-label="Alternar tema"
            title="Alternar tema"
        >
            {dark ? <FiSun /> : <FiMoon />}
        </button>
    )
}

export default ThemeToggle
