import type { Category } from '@/types/index';

interface CategoryChipProps {
  category: Category;
  active: boolean;
  onSelect: (slug: string) => void;
}

export function CategoryChip({ category, active, onSelect }: CategoryChipProps) {
  return (
    <button
      onClick={() => onSelect(category.slug)}
      className={`shrink-0 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
        active
          ? 'bg-gradient-to-r from-[#C58B22] to-[#A97916] text-[#06152D] shadow-glow-gold'
          : 'bg-[#091D3A]/60 text-[#F7F8FC] border border-[#1E3A5C] hover:bg-[#C58B22]/20 hover:border-[#C58B22]/50 hover:text-[#C58B22]'
      }`}
    >
      {category.name}
    </button>
  );
}

interface CategoryFiltersProps {
  categories: Category[];
  activeSlug: string | null;
  onSelect: (slug: string | null) => void;
}

export function CategoryFilters({ categories, activeSlug, onSelect }: CategoryFiltersProps) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
      <button
        onClick={() => onSelect(null)}
        className={`shrink-0 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
          activeSlug === null ? 'bg-gradient-to-r from-[#C58B22] to-[#A97916] text-[#06152D] shadow-glow-gold' : 'bg-[#091D3A]/60 text-[#F7F8FC] border border-[#1E3A5C] hover:bg-[#C58B22]/20 hover:border-[#C58B22]/50 hover:text-[#C58B22]'
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <CategoryChip
          key={category.id}
          category={category}
          active={activeSlug === category.slug}
          onSelect={(slug) => onSelect(slug)}
        />
      ))}
    </div>
  );
}
