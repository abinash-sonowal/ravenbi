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
      <div className="text-center space-y-4 mb-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-success to-success/80 flex items-center justify-center shadow-lg">
          <CheckCircle className="w-8 h-8 text-[#fff]" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Conversion Completed!</h2>
          <p className="text-base text-muted-foreground">
            Your {capitalize(source)} file has been converted to {capitalize(target)} format.
          </p>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Metrics Card */}
        <div className="card-professional p-4 rounded-md">
          <div className="flex items-center space-x-2 mb-4">
            <BarChart3 className="w-5 h-5 text-red-500" />
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
        {/* Conversion Details Card */}
        <div className="card-professional p-4 rounded-md">
          <div className="flex items-center space-x-2 mb-4">
            <CheckCircle className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-semibold text-foreground">Conversion Details</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-md">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span className="font-medium text-blue-700">Uploaded</span>
              </div>
              <span className="text-blue-600 font-semibold">2 files</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-md">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-medium text-green-700">Successful</span>
              </div>
              <span className="text-green-600 font-semibold">1 file</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-md">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="font-medium text-red-700">Failed</span>
              </div>
              <span className="text-red-600 font-semibold">1 file</span>
            </div>
          </div>
        </div>

        {/* Download Card */}
        <div className="card-professional p-4 w-full md:col-span-2 rounded-md">
          <div className="flex items-center space-x-2 mb-4">
            <Download className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-semibold text-foreground">Compare and Download Files</h3>
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm font-mono text-muted-foreground break-all">{fileName}</p>
            </div>
          </div>
          
          
          <div className="space-y-4">
            
            
            <div className="flex gap-2">
              <Button
                onClick={onCompare}
                variant="outline"
                className="flex-1 hover:bg-blue-500/5 hover:border-blue-500/50"
              >
                <Code className="w-4 h-4 mr-2 text-blue-500" />
                Compare Output
              </Button>
              
              <Button
                onClick={onDownload}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Files
              </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}