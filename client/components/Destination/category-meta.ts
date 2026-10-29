// Shared look for each destination category (used by the filter chips and the cards)
export const categoryMeta: Record<string, { emoji: string; chip: string }> = {
  Beach: { emoji: "🏖️", chip: "bg-cyan-500 text-white" },
  Adventure: { emoji: "🧗", chip: "bg-orange-500 text-white" },
  Culture: { emoji: "🏯", chip: "bg-rose-500 text-white" },
  Luxury: { emoji: "💎", chip: "bg-amber-400 text-slate-900" },
  Romantic: { emoji: "💕", chip: "bg-pink-500 text-white" },
  Nature: { emoji: "🌿", chip: "bg-emerald-500 text-white" },
};

export const categoryList = ["All", ...Object.keys(categoryMeta)];

export function getCategoryMeta(name: string) {
  return categoryMeta[name] ?? { emoji: "📍", chip: "bg-sky-500 text-white" };
}
