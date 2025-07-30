import { useState, useCallback } from "react";
import { Upload, File, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  source: string;
  inputFile: File | null;
  onFileChange: (file: File | null) => void;
  fileError: string;
}

export function FileUpload({ source, inputFile, onFileChange, fileError }: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const acceptedExtensions = source === 'tableau' ? '.twb' : '';
  const isDisabled = !source;

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!isDisabled) {
      setIsDragOver(true);
    }
  }, [isDisabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (isDisabled) return;

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  }, [isDisabled]);

  const handleFileSelection = (file: File) => {
    if (!source) return;

    const name = file.name.toLowerCase();
    let valid = false;

    if (source === 'tableau') {
      valid = name.endsWith('.twb');
    }

    onFileChange(valid ? file : null);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelection(file);
    }
  };

  return (
    <div className="card-professional p-4 rounded-md">
      <div className="flex items-center space-x-2 mb-2">
        <Upload className="w-5 h-5 text-brand-primary" />
        <h3 className="text-lg font-semibold text-foreground">Input File</h3>
      </div>
      
      <div
        className={cn(
          "upload-zone p-2 text-center cursor-pointer transition-all duration-300 bg-[#fff] rounded-md",
          isDragOver && "upload-zone-active",
          isDisabled && "opacity-50 cursor-not-allowed"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !isDisabled && document.getElementById('file-input')?.click()}
      >
        <div className="flex flex-col items-center space-y-2">
          <div className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300",
            isDragOver ? "bg-brand-primary/20" : "bg-muted"
          )}>
            <Upload className={cn(
              "w-6 h-6 transition-colors duration-300",
              isDragOver ? "text-brand-primary" : "text-muted-foreground"
            )} />
          </div>
          <div>
            {inputFile ? (
              <p className="text-lg font-medium text-success flex items-center justify-center">
                <File className="w-5 h-5 mr-2" />
                {inputFile.name}
              </p>
            ) : (
              <>
                <p className="text-sm font-medium text-foreground mb-1">
                  {isDisabled ? "Select a source first" : "Drop your files or click to upload"}
                </p>
                {/* <p className="text-sm text-muted-foreground">
                  {source ? `Supports ${acceptedExtensions}` : "Choose your source BI tool to continue"}
                </p> */}
              </>
            )}
          </div>
        </div>
        <input
          id="file-input"
          type="file"
          className="hidden"
          onChange={handleFileInputChange}
          disabled={isDisabled}
          accept={acceptedExtensions}
        />
      </div>

      {fileError && (
        <div className="mt-4 p-3 bg-destructive/10 rounded-lg border border-destructive/20">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-destructive" />
            <span className="text-sm text-destructive">{fileError}</span>
          </div>
        </div>
      )}
    </div>
  );
}