/**
 * Serviço de Monitoramento de Erros e Logging
 * Captura automaticamente exceções e registra logs estruturados
 */

export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  CRITICAL = 'CRITICAL',
}

export interface LogEntry {
  id: string;
  timestamp: number;
  level: LogLevel;
  message: string;
  screen?: string;
  action?: string;
  stackTrace?: string;
  metadata?: Record<string, any>;
}

class ErrorService {
  private logs: LogEntry[] = [];
  private maxLogs = 1000;
  private currentScreen: string = 'unknown';
  private currentAction: string = '';

  constructor() {
    this.setupGlobalErrorHandler();
    this.setupUnhandledRejectionHandler();
  }

  /**
   * Configura handler para erros globais
   */
  private setupGlobalErrorHandler(): void {
    window.addEventListener('error', (event) => {
      this.captureError(
        event.error || new Error(event.message),
        'Global Error Handler'
      );
    });
  }

  /**
   * Configura handler para promessas rejeitadas não tratadas
   */
  private setupUnhandledRejectionHandler(): void {
    window.addEventListener('unhandledrejection', (event) => {
      this.captureError(
        event.reason || new Error('Unhandled Promise Rejection'),
        'Unhandled Rejection'
      );
    });
  }

  /**
   * Define a tela atual para contexto de erro
   */
  setCurrentScreen(screen: string): void {
    this.currentScreen = screen;
  }

  /**
   * Define a ação atual para contexto de erro
   */
  setCurrentAction(action: string): void {
    this.currentAction = action;
  }

  /**
   * Captura um erro com contexto completo
   */
  captureError(error: Error | unknown, context?: string): void {
    const stackTrace = error instanceof Error ? error.stack : 'No stack trace';
    const message = error instanceof Error ? error.message : String(error);

    this.log(
      LogLevel.ERROR,
      message,
      {
        screen: this.currentScreen,
        action: this.currentAction,
        context,
      },
      stackTrace
    );

    // Enviar para servidor em produção
    if (process.env.NODE_ENV === 'production') {
      this.sendToServer({
        level: LogLevel.ERROR,
        message,
        stackTrace,
        screen: this.currentScreen,
        action: this.currentAction,
        context,
      });
    }
  }

  /**
   * Registra um log estruturado
   */
  log(
    level: LogLevel,
    message: string,
    metadata?: Record<string, any>,
    stackTrace?: string
  ): void {
    const entry: LogEntry = {
      id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      level,
      message,
      screen: this.currentScreen,
      action: this.currentAction,
      stackTrace,
      metadata,
    };

    this.logs.push(entry);

    // Manter apenas os últimos N logs
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    // Log no console em desenvolvimento
    if (process.env.NODE_ENV === 'development') {
      const style = this.getConsoleStyle(level);
      console.log(
        `%c[${level}] ${message}`,
        style,
        metadata || ''
      );
    }

    // Salvar em localStorage para análise posterior
    this.saveLogs();
  }

  /**
   * Obtém estilo para console baseado no nível
   */
  private getConsoleStyle(level: LogLevel): string {
    const styles: Record<LogLevel, string> = {
      [LogLevel.DEBUG]: 'color: #888; font-weight: normal;',
      [LogLevel.INFO]: 'color: #0066cc; font-weight: bold;',
      [LogLevel.WARN]: 'color: #ff9900; font-weight: bold;',
      [LogLevel.ERROR]: 'color: #cc0000; font-weight: bold;',
      [LogLevel.CRITICAL]: 'color: #ff0000; background: #ffcccc; font-weight: bold;',
    };
    return styles[level];
  }

  /**
   * Salva logs em localStorage
   */
  private saveLogs(): void {
    try {
      localStorage.setItem('organistuda_logs', JSON.stringify(this.logs));
    } catch (error) {
      console.warn('Erro ao salvar logs:', error);
    }
  }

  /**
   * Carrega logs do localStorage
   */
  loadLogs(): void {
    try {
      const saved = localStorage.getItem('organistuda_logs');
      if (saved) {
        this.logs = JSON.parse(saved);
      }
    } catch (error) {
      console.warn('Erro ao carregar logs:', error);
    }
  }

  /**
   * Obtém todos os logs
   */
  getLogs(level?: LogLevel): LogEntry[] {
    if (level) {
      return this.logs.filter((log) => log.level === level);
    }
    return this.logs;
  }

  /**
   * Obtém logs de erro
   */
  getErrorLogs(): LogEntry[] {
    return this.logs.filter((log) => log.level === LogLevel.ERROR || log.level === LogLevel.CRITICAL);
  }

  /**
   * Limpa todos os logs
   */
  clearLogs(): void {
    this.logs = [];
    localStorage.removeItem('organistuda_logs');
  }

  /**
   * Exporta logs como JSON
   */
  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }

  /**
   * Envia logs para servidor (implementar conforme necessário)
   */
  private sendToServer(data: any): void {
    // Implementar envio para servidor de logging
    // Ex: Sentry, LogRocket, etc.
    console.log('Enviando log para servidor:', data);
  }

  /**
   * Métodos de conveniência
   */
  debug(message: string, metadata?: Record<string, any>): void {
    this.log(LogLevel.DEBUG, message, metadata);
  }

  info(message: string, metadata?: Record<string, any>): void {
    this.log(LogLevel.INFO, message, metadata);
  }

  warn(message: string, metadata?: Record<string, any>): void {
    this.log(LogLevel.WARN, message, metadata);
  }

  error(message: string, metadata?: Record<string, any>): void {
    this.log(LogLevel.ERROR, message, metadata);
  }

  critical(message: string, metadata?: Record<string, any>): void {
    this.log(LogLevel.CRITICAL, message, metadata);
  }
}

export const errorService = new ErrorService();

// Carregar logs ao inicializar
errorService.loadLogs();
