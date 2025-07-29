import { useState, useCallback } from 'react';
import { Folder, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetadataUploadProps {
  onFolderChange?: (folder: FileList | null) => void;
  folderError?: string;
}

export function MetadataUpload({ onFolderChange, folderError }: MetadataUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<FileList | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      setSelectedFolder(files);
      onFolderChange?.(files);
    }
  }, [onFolderChange]);

  const handleFolderSelection = (files: FileList | null) => {
    setSelectedFolder(files);
    onFolderChange?.(files);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFolderSelection(files);
    }
  };

  return (
    <div className="card-professional p-4">
      <div className="flex items-center space-x-2 mb-2">
        <Folder className="w-5 h-5 text-blue-500" />
        <h3 className="text-lg font-semibold text-foreground">Metadata Folder</h3>
      </div>
      
      <div
        className={cn(
          "upload-zone p-3 text-center cursor-pointer transition-all duration-300 bg-[#fff] border-2 border-dashed border-gray-300 rounded-lg",
          isDragOver && "border-blue-400 bg-blue-50",
          selectedFolder && "border-green-400 bg-green-50"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('folder-input')?.click()}
      >
        <div className="flex flex-col items-center space-y-1">
          <div className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
            isDragOver ? "bg-blue-100" : selectedFolder ? "bg-green-100" : "bg-gray-100"
          )}>
            <Folder className={cn(
              "w-4 h-4 transition-colors duration-300",
              isDragOver ? "text-blue-500" : selectedFolder ? "text-green-500" : "text-gray-400"
            )} />
          </div>
          <div>
            {selectedFolder ? (
              <p className="text-sm font-medium text-green-600 flex items-center justify-center">
                <Folder className="w-4 h-4 mr-1" />
                {selectedFolder.length} files selected
              </p>
            ) : (
              <>
                <p className="text-sm font-medium text-foreground mb-1">
                  Drop your metadata or click to upload
                </p>
                {/* <p className="text-xs text-muted-foreground">
                  Supports folder uploads
                </p> */}
              </>
            )}
          </div>
        </div>
        <input
          id="folder-input"
          type="file"
          className="hidden"
          multiple
          webkitdirectory=""
          directory=""
          onChange={handleFileInputChange}
          {...({} as any)}
        />
      </div>

      {folderError && (
        <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-red-600">{folderError}</span>
          </div>
        </div>
      )}
    </div>
  );
} 