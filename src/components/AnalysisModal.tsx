import { X, Code } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AnalysisModalProps {
  source: string;
  target: string;
  sourceContent: string;
  targetContent: string;
  onClose: () => void;
}

export function AnalysisModal({ source, target, sourceContent, targetContent, onClose }: AnalysisModalProps) {
  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="card-elevated w-full max-w-6xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-2">
            <Code className="w-5 h-5 text-brand-primary" />
            <h2 className="text-xl font-bold text-foreground">
              Code Analysis: {capitalize(source)} vs {capitalize(target)}
            </h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="hover:bg-muted"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex-1 overflow-hidden p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            {/* Source Code */}
            <div className="flex flex-col h-full">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-success"></div>
                <h3 className="font-semibold text-foreground">{capitalize(source)} Source</h3>
              </div>
              <div className="flex-1 p-4 bg-muted rounded-lg border border-success/20 overflow-auto">
                <pre className="text-sm text-foreground whitespace-pre-wrap font-mono leading-relaxed">
                  {sourceContent || 'No source content available.'}
                </pre>
              </div>
            </div>

            {/* Target Code */}
            <div className="flex flex-col h-full">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-brand-primary"></div>
                <h3 className="font-semibold text-foreground">{capitalize(target)} Output</h3>
              </div>
              <div className="flex-1 p-4 bg-muted rounded-lg border border-brand-primary/20 overflow-auto">
                <pre className="text-sm text-foreground whitespace-pre-wrap font-mono leading-relaxed">
                  {targetContent || 'No output content available.'}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}