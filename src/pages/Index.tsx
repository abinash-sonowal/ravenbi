import { useState, useEffect } from 'react';
import { Database, Target, ArrowRight, FileText, CheckCircle, Zap, Rocket, Settings, RefreshCw, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

import { Header } from "@/components/Header";
import { SelectionCard } from "@/components/SelectionCard";
import { FileUpload } from "@/components/FileUpload";
import { ProgressCard } from "@/components/ProgressCard";
import { ConversionResults } from "@/components/ConversionResults";
import { LogModal } from "@/components/LogModal";
import { CompareModal } from "@/components/CompareModal";
import { MetadataUpload } from "@/components/MetadataUpload";

interface LogEntry {
  type: string;
  message: string;
  time: string;
}

const Index = () => {
  const { toast } = useToast();
  const [source, setSource] = useState('');
  const [target, setTarget] = useState('');
  const [inputFile, setInputFile] = useState<File | null>(null);
  const [converted, setConverted] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [fileError, setFileError] = useState('');
  const [showCompare, setShowCompare] = useState(false);
  const [showLogDetails, setShowLogDetails] = useState(false);
  const [sourceFileContent, setSourceFileContent] = useState('');
  const [actualsFileContent, setActualsFileContent] = useState('');
  const [metadataFolder, setMetadataFolder] = useState<FileList | null>(null);
  const [metadataError, setMetadataError] = useState('');

  // Progress bar logic: smoothly increase during conversion, 100% when done
  let progressPercent = 0;
  if (logs.length > 0) {
    if (isConverting) {
      // Smooth increments during conversion with smaller jumps
      progressPercent = Math.min(100, Math.round((logs.length / 8) * 100));
    } else if (converted) {
      progressPercent = 100;
    }
  }
  const isConvertingOrConverted = isConverting || converted;

  let statusText = 'Configure your conversion settings to begin';
  if (inputFile && !isConverting && !converted) statusText = `Ready to convert ${inputFile.name}`;
  if (isConverting) statusText = `Converting to ${capitalize(target)}...`;
  if (converted) statusText = 'Conversion completed !';

  const handleFileChange = (file: File | null) => {
    if (file) {
      const name = file.name.toLowerCase();
      let valid = false;
      let error = '';
      
      if (source === 'tableau') {
        valid = name.endsWith('.twb') ;
        if (!valid) error = 'Please upload a .twb';
      }
      
      if (valid) {
        setInputFile(file);
        setFileError('');
        setConverted(false);
        setLogs([]);
      } else {
        setInputFile(null);
        setFileError(error);
      }
    } else {
      setInputFile(null);
      setFileError('');
    }
  };

  const handleConvert = async () => {
    setLogs([]);
    setIsConverting(true);
    setConverted(false);

    // Simulate log updates
    const fakeLogs = [
      { type: 'info', message: 'Starting conversion...', time: new Date().toLocaleTimeString() },
      { type: 'info', message: 'Reading input file...', time: new Date().toLocaleTimeString() },
      { type: 'info', message: 'Validating file format...', time: new Date().toLocaleTimeString() },
      { type: 'info', message: 'Extracting metadata...', time: new Date().toLocaleTimeString() },
      { type: 'info', message: 'Processing data structures...', time: new Date().toLocaleTimeString() },
      { type: 'info', message: 'Converting visualizations...', time: new Date().toLocaleTimeString() },
      { type: 'info', message: 'Generating output files...', time: new Date().toLocaleTimeString() },
      { type: 'info', message: 'Applying formatting...', time: new Date().toLocaleTimeString() },
      { type: 'info', message: 'Optimizing performance...', time: new Date().toLocaleTimeString() },
      { type: 'info', message: 'Validating output...', time: new Date().toLocaleTimeString() },
      { type: 'info', message: 'Creating backup...', time: new Date().toLocaleTimeString() },
      { type: 'info', message: 'Finalizing conversion...', time: new Date().toLocaleTimeString() },
    ];

    let logIndex = 0;

    const logInterval = setInterval(() => {
      setLogs((prev) => [...prev, fakeLogs[logIndex]]);
      logIndex++;
      if (logIndex === fakeLogs.length) {
        clearInterval(logInterval);
        setTimeout(() => {
          setLogs((prev) => [
            ...prev,
            { type: 'success', message: 'Conversion complete!', time: new Date().toLocaleTimeString() }
          ]);
          setIsConverting(false);
          setConverted(true);
          toast({
            title: "Conversion Complete",
            description: "Your BI conversion has been completed successfully.",
          });
        }, 1000);
      }
    }, 800);
  };

  const getOutputExtension = () => {
    if (target === 'looker') return 'lookml';
    if (target === 'powerbi') return 'pbit';
    return 'out';
  };
  
  const getGeneratedFileName = () => {
    if (!inputFile || !target) return '';
    const base = inputFile.name.replace(/\.[^/.]+$/, '');
    return `${base}_to_${target}.${getOutputExtension()}`;
  };

  function capitalize(str: string) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const handleDownload = async () => {
    const filename = getGeneratedFileName();
    const fileUrl = `/Downloadable/${encodeURIComponent(filename)}`;
  
    try {
      const response = await fetch(fileUrl);
  
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
      }
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
      
      toast({
        title: "Download Started",
        description: `Downloading ${filename}`,
      });
      
    } catch (error) {
      console.error('Download failed:', error);
      toast({
        title: "Download Failed",
        description: `Could not download the file "${filename}". It may not exist on the server.`,
        variant: "destructive",
      });
    }
  };

  const allInputsProvided = source && target && inputFile && !fileError;

  useEffect(() => {
    if (showCompare && inputFile) {
      let name_of_file = inputFile.name.split('.')[0];

      fetch('/Inputs/' + name_of_file + '/' + inputFile.name)
        .then(res => res.ok ? res.text() : Promise.reject('Not found'))
        .then(setSourceFileContent)
        .catch(() => setSourceFileContent('File not found.'));

      if (target === 'powerbi') {
        fetch('/Output/' + name_of_file + '/DataModelSchema')
          .then(res => res.ok ? res.text() : Promise.reject('Not found'))
          .then(setActualsFileContent)
          .catch(() => setActualsFileContent('File not found.'));
      }else if (target === 'looker') {
        fetch('/Output/looker/' + name_of_file +'/' + name_of_file +'.model.lkml')
          .then(res => res.ok ? res.text() : Promise.reject('Not found'))
          .then(setActualsFileContent)
          .catch(() => setActualsFileContent('File not found.'));
      }
    }
  }, [showCompare, inputFile]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Left Sidebar - Configuration */}
            <div className="lg:col-span-1 space-y-2">
              <SelectionCard
                icon={<Database className="w-5 h-5 text-blue-500" />}
                title="Source BI Tool"
                value={source}
                onChange={setSource}
                options={[{ value: 'tableau', label: 'Tableau' }]}
                placeholder="Select source BI tool"
              />
              
              <SelectionCard
                icon={<Target className="w-5 h-5 text-red-500" />}
                title="Target BI Tool"
                value={target}
                onChange={setTarget}
                options={[
                  // { value: 'looker', label: 'Looker' },
                  { value: 'powerbi', label: 'Power BI' }
                ]}
                placeholder="Select target BI tool"
              />
              
              <FileUpload
                source={source}
                inputFile={inputFile}
                onFileChange={handleFileChange}
                fileError={fileError}
              />

              <MetadataUpload
                onFolderChange={setMetadataFolder}
                folderError={metadataError}
              />
              
              <Button
                onClick={handleConvert}
                disabled={!allInputsProvided || isConverting}
                className="w-full button-brand"
                size="lg"
              >
                <Rocket className="w-5 h-5 mr-2 text-white" />
                {isConverting ? 'Converting...' : 'Start Conversion'}
              </Button>
            </div>
 
            {/* Right side - Tagline and main content */}
            <div className="lg:col-span-3 relative">
              {/* Vertical Divider */}
              <div className="hidden lg:block absolute left-0 -top-24 bottom-0 w-0.5 bg-border shadow-sm"></div>
              {/* Centered Tagline */}
              {/* <div className="text-center mb-8">
                <h2 className="text-3xl font-extrabold text-foreground mb-2">Seamless BI File Conversion</h2>
                <p className="text-muted-foreground">
                  {converted 
                    ? "Your files are ready for download and analysis"
                    : "Select your source and target BI tools, then upload your file to begin"
                  }
                </p>
              </div> */}

              
              {/* Main Content Area */}
              <div className="space-y-4">
                {/* Progress or Completion UI */}
                {isConverting ? (
                  <ProgressCard
                    progressPercent={progressPercent}
                    onViewDetails={() => setShowLogDetails(true)}
                  />
                ) : null}
                
                {/* Results or Placeholder */}
                <div className="p-4 ">
                  {!converted ? (
                    <div className="text-center py-16">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                        <FileText className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <h1 className="text-2xl font-semibold text-foreground mb-2">Configure your migration settings to begin</h1>
                      <p className="text-muted-foreground">
                        Your converted files and conversion metrics will appear here once the process is complete.
                      </p>
                    </div>
                  ) : (
                    <ConversionResults
                      source={source}
                      target={target}
                      fileName={getGeneratedFileName()}
                      inputFileName={inputFile?.name || ''} 
                      onDownload={handleDownload}
                      onCompare={() => setShowCompare(true)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      {showLogDetails && (
        <LogModal
          logs={logs}
          onClose={() => setShowLogDetails(false)}
        />
      )}

      {showCompare && (
        <CompareModal
          source={source}
          target={target}
          sourceContent={sourceFileContent}
          targetContent={actualsFileContent}
          onClose={() => setShowCompare(false)}
        />
      )}
    </div>
  );
};

export default Index;
