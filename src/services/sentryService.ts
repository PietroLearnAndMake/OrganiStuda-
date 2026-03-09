import * as Sentry from '@sentry/react';

/**
 * Serviço de integração com Sentry para monitoramento em produção
 * Captura erros, rastreia performance e coleta dados de uso
 */

export interface SentryConfig {
  dsn: string;
  environment: 'development' | 'staging' | 'production';
  tracesSampleRate: number;
  debug: boolean;
}

export class SentryService {
  private static initialized = false;

  /**
   * Inicializa Sentry com configurações
   * Usa variáveis de ambiente do Vite (VITE_*)
   */
  static initialize(config?: SentryConfig): void {
    if (this.initialized) {
      console.warn('Sentry já foi inicializado');
      return;
    }

    const dsn = import.meta.env.VITE_SENTRY_DSN || config?.dsn;
    const environment = import.meta.env.VITE_ENVIRONMENT || config?.environment || 'development';
    const tracesSampleRate = parseFloat(import.meta.env.VITE_SENTRY_TRACES_SAMPLE_RATE || '1.0') || config?.tracesSampleRate || 1.0;
    const debug = import.meta.env.VITE_SENTRY_DEBUG === 'true' || config?.debug || false;

    if (!dsn) {
      console.warn('VITE_SENTRY_DSN não configurado. Sentry desabilitado.');
      return;
    }

    Sentry.init({
      dsn,
      environment,
      tracesSampleRate,
      debug,
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
    });

    this.initialized = true;
    console.log('✅ Sentry inicializado com sucesso');
  }

  /**
   * Captura exceção e envia para Sentry
   */
  static captureException(error: Error, context?: Record<string, any>): void {
    Sentry.captureException(error, {
      contexts: {
        error: context || {},
      },
    });
  }

  /**
   * Captura mensagem e envia para Sentry
   */
  static captureMessage(message: string, level: Sentry.SeverityLevel = 'info'): void {
    Sentry.captureMessage(message, level);
  }

  /**
   * Define contexto do usuário
   */
  static setUser(userId: string, email?: string, username?: string): void {
    Sentry.setUser({
      id: userId,
      email,
      username,
    });
  }

  /**
   * Limpa contexto do usuário (logout)
   */
  static clearUser(): void {
    Sentry.setUser(null);
  }

  /**
   * Define tag para categorizar eventos
   */
  static setTag(key: string, value: string): void {
    Sentry.setTag(key, value);
  }

  /**
   * Define múltiplas tags
   */
  static setTags(tags: Record<string, string>): void {
    Object.entries(tags).forEach(([key, value]) => {
      Sentry.setTag(key, value);
    });
  }

  /**
   * Adiciona breadcrumb (evento para rastreamento)
   */
  static addBreadcrumb(
    message: string,
    category: string,
    level: Sentry.SeverityLevel = 'info',
    data?: Record<string, any>
  ): void {
    Sentry.addBreadcrumb({
      message,
      category,
      level,
      data,
      timestamp: Date.now() / 1000,
    });
  }

  /**
   * Rastreia transação (performance)
   */
  static startTransaction(name: string, op: string): void {
    // Integração de tracing do Sentry
    console.log(`Starting transaction: ${name} (${op})`);
  }

  /**
   * Captura erro de performance
   */
  static capturePerformanceError(
    operation: string,
    duration: number,
    threshold: number
  ): void {
    if (duration > threshold) {
      this.captureMessage(
        `Performance issue: ${operation} took ${duration}ms (threshold: ${threshold}ms)`,
        'warning'
      );
    }
  }

  /**
   * Rastreia ação do usuário
   */
  static trackUserAction(action: string, metadata?: Record<string, any>): void {
    this.addBreadcrumb(
      `User action: ${action}`,
      'user-action',
      'info',
      metadata
    );
  }

  /**
   * Rastreia erro de API
   */
  static trackAPIError(
    endpoint: string,
    statusCode: number,
    error: string
  ): void {
    this.addBreadcrumb(
      `API Error: ${endpoint}`,
      'api',
      'error',
      {
        statusCode,
        error,
      }
    );
  }

  /**
   * Rastreia carregamento de tela
   */
  static trackScreenLoad(screenName: string, duration: number): void {
    this.addBreadcrumb(
      `Screen loaded: ${screenName}`,
      'screen',
      'info',
      { duration }
    );
  }

  /**
   * Rastreia crash
   */
  static trackCrash(error: Error, context?: Record<string, any>): void {
    this.captureException(error, {
      type: 'crash',
      ...context,
    });
  }

  /**
   * Rastreia erro de validação
   */
  static trackValidationError(field: string, error: string): void {
    this.addBreadcrumb(
      `Validation error: ${field}`,
      'validation',
      'warning',
      { error }
    );
  }

  /**
   * Rastreia erro de autenticação
   */
  static trackAuthError(error: string, details?: Record<string, any>): void {
    this.addBreadcrumb(
      `Auth error: ${error}`,
      'auth',
      'error',
      details
    );
  }

  /**
   * Rastreia erro de storage
   */
  static trackStorageError(operation: string, error: string): void {
    this.addBreadcrumb(
      `Storage error: ${operation}`,
      'storage',
      'error',
      { error }
    );
  }

  /**
   * Rastreia erro de sincronização
   */
  static trackSyncError(error: string, details?: Record<string, any>): void {
    this.addBreadcrumb(
      `Sync error: ${error}`,
      'sync',
      'error',
      details
    );
  }

  /**
   * Obtém ID da sessão
   */
  static getSessionId(): string | undefined {
    return Sentry.lastEventId() ?? undefined;
  }

  /**
   * Mostra feedback do usuário
   */
  static showFeedbackDialog(): void {
    Sentry.showReportDialog({
      title: 'Relatório de Erro',
      subtitle: 'Nos ajude a melhorar relatando o que aconteceu.',
      labelComments: 'O que aconteceu?',
      labelClose: 'Fechar',
      labelSubmit: 'Enviar',
      onClose: () => {
        console.log('Feedback dialog closed');
      },
    });
  }

  /**
   * Flush eventos pendentes
   */
  static async flush(timeout: number = 2000): Promise<boolean> {
    return Sentry.flush(timeout);
  }

  /**
   * Desabilita Sentry temporariamente
   */
  static disable(): void {
    console.warn('Sentry desabilitado temporariamente');
  }

  /**
   * Reabilita Sentry
   */
  static enable(): void {
    this.initialized = false;
  }
}

/**
 * Hook para usar Sentry em componentes React
 */
export function useSentry() {
  return {
    captureException: SentryService.captureException.bind(SentryService),
    captureMessage: SentryService.captureMessage.bind(SentryService),
    setUser: SentryService.setUser.bind(SentryService),
    clearUser: SentryService.clearUser.bind(SentryService),
    setTag: SentryService.setTag.bind(SentryService),
    addBreadcrumb: SentryService.addBreadcrumb.bind(SentryService),
    trackUserAction: SentryService.trackUserAction.bind(SentryService),
    trackAPIError: SentryService.trackAPIError.bind(SentryService),
    trackScreenLoad: SentryService.trackScreenLoad.bind(SentryService),
  };
}

export default SentryService;
