import { useEffect, useMemo, useRef, useState } from "react";
import Container from "../components/ui/Container";
import Section from "../components/ui/Section";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xjkabypp";

// ======== Validators ========
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
const NAME_RE = /^[A-Za-zÀ-ÿ'’ -]{2,}$/; // letras, acentos, espaços, hífen, apóstrofo
const URL_RE = /(https?:\/\/|www\.)/i;     // detecta URLs
const MAX = { name: 80, subject: 120, message: 3000 };

function validateName(v) {
    const s = (v || "").trim();
    if (s.length < 2) return "Informe seu nome (mín. 2 caracteres).";
    if (s.length > MAX.name) return `Nome muito longo (máx. ${MAX.name}).`;
    if (!NAME_RE.test(s)) return "Use apenas letras/acentos, espaços e hífens.";
    return "";
}
function validateEmail(v) {
    const s = (v || "").trim();
    if (!s) return "Informe seu e-mail.";
    if (!EMAIL_RE.test(s)) return "E-mail inválido.";
    return "";
}
function validateSubject(v) {
    const s = (v || "").trim();
    if (!s) return ""; // opcional
    if (s.length > MAX.subject) return `Assunto muito longo (máx. ${MAX.subject}).`;
    return "";
}
function validateMessage(v, opts = { blockLinks: true, min: 10 }) {
    const s = (v || "").trim();
    if (s.length < (opts.min ?? 10)) return `Mensagem muito curta (mín. ${opts.min ?? 10}).`;
    if (s.length > MAX.message) return `Mensagem muito longa (máx. ${MAX.message}).`;
    if (opts.blockLinks && URL_RE.test(s)) return "Por segurança, não inclua links/URLs na mensagem.";
    return "";
}

export default function Contact() {
    // form state
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", website: "" }); // website = honeypot
    const [touched, setTouched] = useState({});
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState("idle"); // idle | sending | success | error
    const [errorMsg, setErrorMsg] = useState("");
    const [startedAt] = useState(Date.now());
    const announcerRef = useRef(null);

    // cooldown entre envios (segundos)
    const COOLDOWN_S = 60;
    const lastSentAt = useMemo(() => {
        const raw = localStorage.getItem("contact:lastSentAt");
        return raw ? Number(raw) : 0;
    }, []);

    // validação em tempo real
    function setField(name, value) {
        setForm((f) => ({ ...f, [name]: value }));
        if (touched[name]) {
            // revalida campo alterado
            setErrors((e) => ({ ...e, [name]: validateField(name, value) }));
        }
    }
    function markTouched(name) {
        setTouched((t) => ({ ...t, [name]: true }));
        setErrors((e) => ({ ...e, [name]: validateField(name, form[name]) }));
    }
    function validateField(name, value) {
        switch (name) {
            case "name": return validateName(value);
            case "email": return validateEmail(value);
            case "subject": return validateSubject(value);
            case "message": return validateMessage(value, { blockLinks: true, min: 10 });
            default: return "";
        }
    }
    function validateAll() {
        const e = {
            name: validateName(form.name),
            email: validateEmail(form.email),
            subject: validateSubject(form.subject),
            message: validateMessage(form.message, { blockLinks: true, min: 10 }),
        };
        // remove vazios
        Object.keys(e).forEach((k) => { if (!e[k]) delete e[k]; });
        setErrors(e);
        return e;
    }

    async function onSubmit(e) {
        e.preventDefault();
        setStatus("sending");
        setErrorMsg("");

        // honeypot
        if (form.website) {
            // finge sucesso para bots
            setStatus("success");
            resetForm();
            return;
        }

        // anti-spam 1: tempo mínimo na página (3s)
        if (Date.now() - startedAt < 3000) {
            setStatus("error");
            setErrorMsg("Envio muito rápido — tente novamente.");
            return;
        }

        // anti-spam 2: cooldown (60s)
        const now = Date.now();
        if (lastSentAt && now - lastSentAt < COOLDOWN_S * 1000) {
            const s = Math.ceil((COOLDOWN_S * 1000 - (now - lastSentAt)) / 1000);
            setStatus("error");
            setErrorMsg(`Aguarde ${s}s para enviar novamente.`);
            return;
        }

        // validação final
        const eMap = validateAll();
        if (Object.keys(eMap).length) {
            setStatus("idle");
            // marca todos como tocados para exibir erros
            setTouched({ name: true, email: true, subject: true, message: true });
            return;
        }

        try {
            const fd = new FormData();
            fd.set("name", form.name.trim());
            fd.set("email", form.email.trim());
            fd.set("_replyto", form.email.trim()); // ajuda no fluxo do Formspree
            fd.set("subject", form.subject.trim());
            fd.set("_subject", `[Site] ${form.subject.trim() || "Contato"}`);
            fd.set("message", form.message.trim());
            fd.set("_gotcha", form.website); // compat. honeypot Formspree

            const res = await fetch(FORMSPREE_ENDPOINT, { method: "POST", headers: { Accept: "application/json" }, body: fd });
            if (!res.ok) throw new Error("Falha ao enviar. Tente novamente.");
            const json = await res.json();
            if (!json?.ok && !json?.next) throw new Error("Não foi possível enviar agora.");

            localStorage.setItem("contact:lastSentAt", String(Date.now()));
            setStatus("success");
            resetForm();
        } catch (err) {
            setStatus("error");
            setErrorMsg(err.message || "Erro inesperado. Tente novamente.");
        }
    }

    function resetForm() {
        setForm({ name: "", email: "", subject: "", message: "", website: "" });
        setTouched({});
        setErrors({});
    }

    // foco no feedback ao mudar status
    useEffect(() => {
        if (status !== "idle" && announcerRef.current) announcerRef.current.focus();
    }, [status]);

    const isSending = status === "sending";

    return (
        <Section id="contato" title="Contato" subtitle="Vamos conversar?">
            <Container className="flex justify-center">
                <form
                    onSubmit={onSubmit}
                    noValidate
                    autoComplete="off"
                    aria-busy={isSending}
                    className="grid gap-4 w-full max-w-2xl mx-auto"
                >
                    {/* Honeypot escondido */}
                    <input
                        type="text"
                        name="website"
                        value={form.website}
                        onChange={(e) => setField("website", e.target.value)}
                        tabIndex={-1}
                        autoComplete="off"
                        className="hidden"
                    />

                    <Field
                        id="name"
                        label="Seu nome"
                        value={form.name}
                        onChange={(v) => setField("name", v)}
                        onBlur={() => markTouched("name")}
                        error={touched.name && errors.name}
                        required
                        maxLength={MAX.name}
                        placeholder="Ex.: Ana Souza"
                    />

                    <Field
                        id="email"
                        type="email"
                        label="Seu e-mail"
                        value={form.email}
                        onChange={(v) => setField("email", v)}
                        onBlur={() => markTouched("email")}
                        error={touched.email && errors.email}
                        required
                        placeholder="voce@exemplo.com"
                        inputMode="email"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck={false}
                    />

                    <Field
                        id="subject"
                        label="Assunto (opcional)"
                        value={form.subject}
                        onChange={(v) => setField("subject", v)}
                        onBlur={() => markTouched("subject")}
                        error={touched.subject && errors.subject}
                        maxLength={MAX.subject}
                        placeholder="Como posso ajudar?"
                    />

                    <Field
                        as="textarea"
                        id="message"
                        label={`Mensagem (${form.message.length}/${MAX.message})`}
                        value={form.message}
                        onChange={(v) => setField("message", v)}
                        onBlur={() => markTouched("message")}
                        error={touched.message && errors.message}
                        className="resize-none"
                        required
                        rows={6}
                        maxLength={MAX.message}
                        placeholder="Conte um pouco sobre o projeto (sem links, por favor)."
                    />

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            disabled={isSending}
                            className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white transition"
                        >
                            {isSending ? "Enviando..." : "Enviar"}
                        </button>
                    </div>

                    {/* Feedback acessível */}
                    <div ref={announcerRef} tabIndex={-1} aria-live="polite" className="min-h-5 outline-none text-center">
                        {status === "success" && (
                            <p className="text-emerald-500 text-sm">Mensagem enviada! Vou te responder em breve.</p>
                        )}
                        {status === "error" && (
                            <p className="text-red-500 text-sm">Erro: {errorMsg || "Não foi possível enviar agora."}</p>
                        )}
                    </div>
                </form>
            </Container>
        </Section>
    );
}

/* ---------- Campo reutilizável ---------- */
function Field({
    as = "input",
    id,
    type = "text",
    label,
    value,
    onChange,
    onBlur,
    error,
    required,
    placeholder,
    rows,
    maxLength,
    inputMode,
    autoCapitalize,
    autoCorrect,
    spellCheck,
}) {
    const Tag = as === "textarea" ? "textarea" : "input";
    const invalid = Boolean(error);

    return (
        <div className="grid gap-1">
            <label htmlFor={id} className="text-sm text-black/70 dark:text-white/70">
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            <Tag
                id={id}
                name={id}
                type={as === "textarea" ? undefined : type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onBlur={onBlur}
                placeholder={placeholder}
                rows={rows}
                maxLength={maxLength}
                required={required}
                aria-invalid={invalid}
                aria-describedby={invalid ? `${id}-error` : undefined}
                inputMode={inputMode}
                autoCapitalize={autoCapitalize}
                autoCorrect={autoCorrect}
                spellCheck={spellCheck}
                className={`w-full bg-transparent border rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500
          ${invalid ? "border-red-400 dark:border-red-500" : "border-black/10 dark:border-white/10"}`}
            />

            <div className="flex items-center justify-between">
                {invalid ? (
                    <p id={`${id}-error`} className="text-xs text-red-500">{error}</p>
                ) : (
                    <span className="text-[11px] text-black/40 dark:text-white/40 h-5" />
                )}
                {typeof maxLength === "number" && as === "textarea" && (
                    <span className="text-[11px] text-black/40 dark:text-white/40">{value.length}/{maxLength}</span>
                )}
            </div>
        </div>
    );
}
