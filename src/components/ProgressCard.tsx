import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProgressCardProps {
  progressPercent: number;
  onViewDetails: () => void;
}

export function ProgressCard({ progressPercent, onViewDetails }: ProgressCardProps) {
  return (
    <div className="card-professional p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Conversion Progress</h3>
        {/* <Button
          variant="outline"
          size="sm"
          onClick={onViewDetails}
          className="flex items-center space-x-1"
        >
          <Eye className="w-4 h-4" />
          <span>View Details</span>
        </Button> */}
      </div>
      
      <div className="space-y-2">
        <div className="relative w-full h-3 bg-muted rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-medium text-[#fff] mix-blend-difference">
              {progressPercent > 0 && `${progressPercent}%`}
            </span>
          </div>
        </div>
        
        {/* <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Converting files...</span>
          <span className="font-medium text-brand-primary">{progressPercent}% Complete</span>
        </div> */}
      </div>
    </div>
  );
}