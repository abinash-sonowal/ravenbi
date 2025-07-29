import { ReactNode } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "./ui/select";

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
    <div className="card-professional p-4">
      <div className="flex items-center space-x-2 mb-2">
        {icon}
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      </div>
      
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}