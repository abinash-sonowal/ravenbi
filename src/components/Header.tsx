import { Zap } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center shadow-lg">
              <span className="text-[#fff] font-bold text-lg">R</span>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-brand-dark to-brand-primary bg-clip-text text-transparent">
                RavenBI
              </h1>
              <p className="text-sm text-muted-foreground">BI Tool Migration Assistant</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 border border-brand-primary/20">
            <Zap className="w-4 h-4 text-brand-primary" />
            <span className="text-sm font-medium text-brand-dark">AI Powered Migration</span>
          </div>
        </div>
      </div>
    </header>
  );
}