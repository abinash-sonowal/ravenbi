import { Zap } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border h-16">
      <div className="h-full flex items-center px-6">
        <div className="w-50 h-20 flex items-center justify-center flex-shrink-0">
          <img
            src="/RAVENBI.png"
            alt="Logo"
            className="w-48 h-16 object-contain"
          />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="text-2xl text-gray-800">
            Seamless BI File Converter
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            Version 1.0
          </div>
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        </div>
      </div>
    </header>
  );
}