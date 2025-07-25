import { Zap } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-18 h-18 flex items-center justify-center">
              <img
                src="/RAVENBI.png"
                alt="Logo"
                className="w-15 h-14 object-contain"
              />
            </div>
          </div>
        </div>
    </header>
  );
}