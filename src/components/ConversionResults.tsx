import { Download, BarChart3, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ConversionResultsProps {
  source: string;
  target: string;
  fileName: string;
  onDownload: () => void;
  onAnalyze: () => void;
}

export function ConversionResults({ source, target, fileName, onDownload, onAnalyze }: ConversionResultsProps) {
  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="space-y-6">
      {/* Success Header */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-success to-success/80 flex items-center justify-center shadow-lg">
          <CheckCircle className="w-8 h-8 text-[#fff]" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Conversion Successful!</h2>
          <p className="text-muted-foreground">
            Your {capitalize(source)} file has been converted to {capitalize(target)} format.
          </p>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Metrics Card */}
        <div className="card-professional p-6">
          <div className="flex items-center space-x-2 mb-4">
            <BarChart3 className="w-5 h-5 text-brand-primary" />
            <h3 className="text-lg font-semibold text-foreground">Conversion Metrics</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Columns Detected:</span>
              <span className="font-semibold text-foreground">27</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Tables Found:</span>
              <span className="font-semibold text-foreground">2</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Joins Replicated:</span>
              <span className="font-semibold text-foreground">1</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Warnings:</span>
              <span className="font-semibold text-warning">1</span>
            </div>
          </div>
          
          <Button
            onClick={onAnalyze}
            variant="outline"
            className="w-full mt-4 hover:bg-brand-primary/5 hover:border-brand-primary/50"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Analyze Output
          </Button>
        </div>

        {/* Download Card */}
        <div className="card-professional p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Download className="w-5 h-5 text-brand-primary" />
            <h3 className="text-lg font-semibold text-foreground">Download File</h3>
          </div>
          
          <div className="space-y-4">
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm font-mono text-muted-foreground break-all">{fileName}</p>
            </div>
            
            <Button
              onClick={onDownload}
              className="w-full button-brand"
            >
              <Download className="w-4 h-4 mr-2" />
              Download {capitalize(target)} File
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}