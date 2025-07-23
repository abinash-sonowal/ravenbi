import { ReactNode } from "react";

interface SelectionCardProps {
  icon: ReactNode;
  title: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string; }>;
  placeholder: string;
}

export function SelectionCard({ icon, title, value, onChange, options, placeholder }: SelectionCardProps) {
  return (
    <div className="card-professional p-6">
      <div className="flex items-center space-x-2 mb-4">
        {icon}
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      </div>
      
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-all duration-200"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}