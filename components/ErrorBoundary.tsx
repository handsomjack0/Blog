import React, { ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-red-100 dark:border-red-900/30">
            <h1 className="text-xl font-bold text-red-600 mb-4 flex items-center">
              <span className="mr-2">⚠️</span> Something went wrong
            </h1>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
              The application encountered a critical error and could not render.
            </p>
            <div className="bg-gray-100 dark:bg-black/50 p-4 rounded-lg text-xs font-mono overflow-auto max-h-48 mb-6 border border-gray-200 dark:border-gray-700">
              {this.state.error?.message || "Unknown error"}
            </div>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-4 rounded-xl transition-colors shadow-lg shadow-red-500/20"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}