import { X, CheckCircle, AlertTriangle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LogEntry {
  type: string;
  message: string;
  time: string;
}

interface LogModalProps {
  logs: LogEntry[];
  onClose: () => void;
}

export function LogModal({ logs, onClose }: LogModalProps) {
  const getLogIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      default:
        return <Info className="w-4 h-4 text-info" />;
    }
  };

  const getLogStyle = (type: string) => {
    switch (type) {
      case 'success':
        return 'status-success border-l-4';
      case 'warning':
        return 'status-warning border-l-4';
      default:
        return 'status-info border-l-4';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="card-elevated w-full max-w-4xl max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">Processing Logs</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="hover:bg-muted"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-3">
            {logs.map((log, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg border-l-4 bg-opacity-50 ${getLogStyle(log.type)}`}
              >
                <div className="flex items-start space-x-3">
                  {getLogIcon(log.type)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-xs font-medium uppercase">
                        {log.type}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {log.time}
                      </span>
                    </div>
                    <p className="text-sm text-foreground">{log.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}