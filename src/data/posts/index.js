// Carrega todos os .json desta pasta (sem subpastas)
const modules = import.meta.glob("./*.json", { eager: true });

// Alguns bundlers retornam como default; outros como módulo direto.
// Esta função padroniza.
function normalizeModule(mod) {
  // Vite geralmente entrega { default: <obj> }
  if (mod && typeof mod === "object" && "default" in mod) return mod.default;
  return mod;
}

const all = Object.values(modules).map(normalizeModule);

// Remover rascunhos e ordenar por data (desc)
const posts = all
  .filter((p) => !p?.draft)
  .sort((a, b) => new Date(b.date) - new Date(a.date));

export default posts;
