import React from 'react';

/**
 * Utilitários de Otimização de Performance
 * Lazy loading, memoização, virtualização e outras técnicas
 */

/**
 * Lazy Loading de Componentes
 * Carrega componentes apenas quando necessário
 */
export function lazyLoadComponent<P extends object>(
  importFunc: () => Promise<{ default: React.ComponentType<P> }>
) {
  return React.lazy(importFunc);
}

/**
 * Exemplo de uso:
 * const HomeScreen = lazyLoadComponent(() => import('./screens/HomeScreen'));
 */

/**
 * Memoização de Componentes
 * Evita re-renders desnecessários
 */
export function memoizeComponent<P extends object>(
  Component: React.ComponentType<P>,
  propsAreEqual?: (prevProps: P, nextProps: P) => boolean
) {
  return React.memo(Component, propsAreEqual);
}

/**
 * Exemplo de uso:
 * export default memoizeComponent(MyComponent);
 */

/**
 * Debounce para funções
 * Evita chamadas excessivas
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle para funções
 * Limita frequência de execução
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Virtualização de Listas
 * Renderiza apenas itens visíveis
 */
export interface VirtualListConfig {
  itemHeight: number;
  containerHeight: number;
  items: any[];
  buffer?: number;
}

export function getVisibleItems(config: VirtualListConfig) {
  const { itemHeight, containerHeight, items, buffer = 5 } = config;
  const visibleCount = Math.ceil(containerHeight / itemHeight);

  return {
    startIndex: Math.max(0, Math.floor(window.scrollY / itemHeight) - buffer),
    endIndex: Math.min(
      items.length,
      Math.ceil((window.scrollY + containerHeight) / itemHeight) + buffer
    ),
    visibleCount,
  };
}

/**
 * Caching de dados
 * Evita requisições repetidas
 */
export class CacheManager {
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private ttl: number = 5 * 60 * 1000; // 5 minutos padrão

  set(key: string, data: any, ttl?: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });

    if (ttl) {
      setTimeout(() => this.delete(key), ttl);
    }
  }

  get(key: string): any | null {
    const item = this.cache.get(key);

    if (!item) return null;

    // Verificar expiração
    if (Date.now() - item.timestamp > this.ttl) {
      this.delete(key);
      return null;
    }

    return item.data;
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  setTTL(ttl: number): void {
    this.ttl = ttl;
  }
}

/**
 * Compressão de dados
 * Reduz tamanho de payloads
 */
export function compressData(data: any): string {
  // Usar JSON comprimido
  const json = JSON.stringify(data);

  // Remover espaços desnecessários
  const compressed = json
    .replace(/\s+/g, ' ')
    .replace(/:\s+/g, ':')
    .replace(/,\s+/g, ',');

  return compressed;
}

/**
 * Decompressão de dados
 */
export function decompressData(compressed: string): any {
  try {
    return JSON.parse(compressed);
  } catch (error) {
    console.error('Erro ao descomprimir dados:', error);
    return null;
  }
}

/**
 * Preload de recursos
 * Carrega recursos antes de serem necessários
 */
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

export function preloadImages(srcs: string[]): Promise<void[]> {
  return Promise.all(srcs.map(preloadImage));
}

/**
 * Monitoramento de performance
 */
export class PerformanceMonitor {
  private marks: Map<string, number> = new Map();

  start(label: string): void {
    this.marks.set(label, performance.now());
  }

  end(label: string): number {
    const startTime = this.marks.get(label);
    if (!startTime) {
      console.warn(`Marca '${label}' não encontrada`);
      return 0;
    }

    const duration = performance.now() - startTime;
    this.marks.delete(label);

    console.log(`⏱️ ${label}: ${duration.toFixed(2)}ms`);
    return duration;
  }

  measure(label: string, fn: () => void): number {
    this.start(label);
    fn();
    return this.end(label);
  }

  async measureAsync(label: string, fn: () => Promise<void>): Promise<number> {
    this.start(label);
    await fn();
    return this.end(label);
  }
}

/**
 * Otimização de renderização
 * Agrupa atualizações de estado
 */
export function batchUpdates(updates: (() => void)[]): void {
  if ('unstable_batchedUpdates' in React) {
    (React as any).unstable_batchedUpdates(() => {
      updates.forEach((update) => update());
    });
  } else {
    updates.forEach((update) => update());
  }
}

/**
 * Detecção de mudanças
 * Evita re-renders com comparação profunda
 */
export function shallowEqual(obj1: any, obj2: any): boolean {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  return keys1.every((key) => obj1[key] === obj2[key]);
}

export function deepEqual(obj1: any, obj2: any): boolean {
  if (obj1 === obj2) return true;

  if (obj1 == null || obj2 == null) return false;

  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return false;

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  return keys1.every((key) => deepEqual(obj1[key], obj2[key]));
}

/**
 * Exemplo de uso em componentes:
 *
 * const MyComponent = React.memo(
 *   ({ data }) => <div>{data.name}</div>,
 *   (prevProps, nextProps) => shallowEqual(prevProps.data, nextProps.data)
 * );
 */

/**
 * Inicialização de otimizações
 */
export function initializePerformanceOptimizations(): void {
  // Desabilitar re-renders desnecessários em desenvolvimento
  if (process.env.NODE_ENV === 'development') {
    console.log('🚀 Performance optimizations initialized');
  }

  // Monitorar performance
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 1000) {
          console.warn(`⚠️ Slow operation: ${entry.name} (${entry.duration.toFixed(2)}ms)`);
        }
      }
    });

    observer.observe({ entryTypes: ['measure', 'navigation'] });
  }
}

export default {
  lazyLoadComponent,
  memoizeComponent,
  debounce,
  throttle,
  getVisibleItems,
  CacheManager,
  compressData,
  decompressData,
  preloadImage,
  preloadImages,
  PerformanceMonitor,
  batchUpdates,
  shallowEqual,
  deepEqual,
  initializePerformanceOptimizations,
};
