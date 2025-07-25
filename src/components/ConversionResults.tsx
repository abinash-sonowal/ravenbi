import { Download, BarChart3, CheckCircle, X, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface ConversionResultsProps {
  source: string;
  target: string;
  fileName: string;
  inputFileName: string;
  onDownload: () => void;
  onCompare: () => void;
}

export function ConversionResults({ source, target, fileName, inputFileName, onDownload, onCompare }: ConversionResultsProps) {
  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
  const [metrics, setMetrics] = useState('');
  useEffect(() => {
    if (inputFileName) {
      let name_of_file = inputFileName.split('.')[0];
      fetch(`/Metrics/${name_of_file}.txt`)
        .then(res => res.ok ? res.text() : Promise.reject('Not found'))
        .then(setMetrics)
        .catch(() => setMetrics('Metrics not found.'));
    }
  }, [inputFileName]);

  return (
    <div className="space-y-4">
      {/* Success Header (smaller) */}
      <div className="text-center space-y-2 mb-2">
        <div className="w-10 h-10 mx-auto rounded-full bg-gradient-to-br from-success to-success/80 flex items-center justify-center shadow-lg">
          <CheckCircle className="w-5 h-5 text-[#fff]" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-foreground mb-1">Conversion Successful!</h2>
          <p className="text-sm text-muted-foreground">
            Your {capitalize(source)} file has been converted to {capitalize(target)} format.
          </p>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Metrics Card */}
        <div className="card-professional p-4">
          <div className="flex items-center space-x-2 mb-4">
            <BarChart3 className="w-5 h-5 text-brand-primary" />
            <h2 className="text-lg font-semibold text-foreground">Input File Details</h2>
          </div>
          
          <div className="space-y-2">
            <div className="bg-white rounded-lg max-h-48 overflow-y-auto p-1 space-y-2">
              {metrics
                ? metrics.split(/\r?\n/).filter(Boolean).map((line, idx) => {
                    // Try to split by two or more spaces or tabs, fallback to first colon or tab
                    let [key, ...rest] = line.split(/\s{2,}|\t+|: /);
                    let value = rest.join(' ').trim();
                    if (!value && key && key.includes(' ')) {
                      // Fallback: split by last space
                      const lastSpace = key.lastIndexOf(' ');
                      if (lastSpace !== -1) {
                        value = key.slice(lastSpace + 1);
                        key = key.slice(0, lastSpace);
                      }
                    }
                    return (
                      <div key={idx} className="flex items-start bg-white rounded-lg p-1">
                        <span className="flex-1 text-base font-medium text-muted-foreground whitespace-pre-wrap break-all pr-2">{key}</span>
                        <span className="text-base font-mono text-foreground whitespace-pre-wrap break-all text-right min-w-[40px]">{value}</span>
                      </div>
                    );
                  })
                : <div className="p-4 text-base text-muted-foreground">No metrics data available.</div>}
            </div>
          </div>
        </div>

        {/* Download Card */}
        <div className="card-professional p-4">
          <div className="flex items-center space-x-2 mb-4">
            <Download className="w-5 h-5 text-brand-primary" />
            <h3 className="text-lg font-semibold text-foreground">Download File</h3>
          </div>
          
          <div className="space-y-4">
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm font-mono text-muted-foreground break-all">{fileName}</p>
            </div>
            <Button
              onClick={onCompare}
              variant="outline"
              className="w-full mb-2 hover:bg-brand-primary/5 hover:border-brand-primary/50"
            >
              <Code className="w-4 h-4 mr-2" />
              Compare Output
            </Button>
            
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