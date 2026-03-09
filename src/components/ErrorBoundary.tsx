import React, { ReactNode } from 'react';
import * as Sentry from '@sentry/react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary global para capturar erros não tratados
 * Integrado com Sentry para monitoramento em produção
 */
export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log para console em desenvolvimento
    console.error('Error caught by boundary:', error);
    console.error('Error info:', errorInfo);

    // Enviar para Sentry
    Sentry.captureException(error, {
      contexts: {
        react: {
          componentStack: errorInfo.componentStack,
        },
      },
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-background">
          <div className="max-w-md w-full p-6 bg-surface rounded-lg shadow-lg border border-border">
            <h1 className="text-2xl font-bold text-error mb-4">
              ⚠️ Algo deu errado
            </h1>
            <p className="text-muted mb-4">
              Desculpe, ocorreu um erro inesperado. Por favor, tente novamente.
            </p>
            {this.state.error && (
              <details className="mb-4 p-3 bg-background rounded border border-border text-sm">
                <summary className="cursor-pointer font-semibold text-foreground">
                  Detalhes do erro
                </summary>
                <pre className="mt-2 text-xs overflow-auto text-error">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
            <button
              onClick={this.handleReset}
              className="w-full px-4 py-2 bg-primary text-background font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Tentar Novamente
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default Sentry.withErrorBoundary(ErrorBoundary, {
  fallback: (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-error mb-2">
          ⚠️ Erro Crítico
        </h1>
        <p className="text-muted">
          Por favor, recarregue a página.
        </p>
      </div>
    </div>
  ),
});
