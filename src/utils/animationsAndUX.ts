/**
 * Utilitários de Animações e Melhorias de UX
 * Transições suaves, feedback visual e interações aprimoradas
 */

/**
 * Configurações de animação padrão
 */
export const AnimationConfig = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  VERY_SLOW: 800,
  EASING: {
    EASE_IN: 'cubic-bezier(0.4, 0, 1, 1)',
    EASE_OUT: 'cubic-bezier(0, 0, 0.2, 1)',
    EASE_IN_OUT: 'cubic-bezier(0.4, 0, 0.2, 1)',
    LINEAR: 'linear',
  },
};

/**
 * Animação de fade in
 */
export function createFadeInAnimation(duration: number = AnimationConfig.NORMAL): string {
  return `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    animation: fadeIn ${duration}ms ${AnimationConfig.EASING.EASE_OUT} forwards;
  `;
}

/**
 * Animação de slide in
 */
export function createSlideInAnimation(
  direction: 'left' | 'right' | 'top' | 'bottom' = 'left',
  distance: number = 20,
  duration: number = AnimationConfig.NORMAL
): string {
  const translateMap = {
    left: `translateX(-${distance}px)`,
    right: `translateX(${distance}px)`,
    top: `translateY(-${distance}px)`,
    bottom: `translateY(${distance}px)`,
  };

  return `
    @keyframes slideIn {
      from { 
        opacity: 0;
        transform: ${translateMap[direction]};
      }
      to { 
        opacity: 1;
        transform: translateX(0) translateY(0);
      }
    }
    animation: slideIn ${duration}ms ${AnimationConfig.EASING.EASE_OUT} forwards;
  `;
}

/**
 * Animação de scale
 */
export function createScaleAnimation(
  startScale: number = 0.95,
  duration: number = AnimationConfig.NORMAL
): string {
  return `
    @keyframes scale {
      from { 
        opacity: 0;
        transform: scale(${startScale});
      }
      to { 
        opacity: 1;
        transform: scale(1);
      }
    }
    animation: scale ${duration}ms ${AnimationConfig.EASING.EASE_OUT} forwards;
  `;
}

/**
 * Animação de bounce
 */
export function createBounceAnimation(duration: number = AnimationConfig.SLOW): string {
  return `
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    animation: bounce ${duration}ms infinite;
  `;
}

/**
 * Animação de pulse
 */
export function createPulseAnimation(duration: number = 2000): string {
  return `
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    animation: pulse ${duration}ms infinite;
  `;
}

/**
 * Animação de shake
 */
export function createShakeAnimation(duration: number = 500): string {
  return `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      75% { transform: translateX(5px); }
    }
    animation: shake ${duration}ms;
  `;
}

/**
 * Transição suave de cores
 */
export function createColorTransition(duration: number = AnimationConfig.NORMAL): string {
  return `
    transition: background-color ${duration}ms ${AnimationConfig.EASING.EASE_IN_OUT},
                color ${duration}ms ${AnimationConfig.EASING.EASE_IN_OUT},
                border-color ${duration}ms ${AnimationConfig.EASING.EASE_IN_OUT};
  `;
}

/**
 * Feedback visual de clique
 */
export function createClickFeedback(): string {
  return `
    @keyframes clickFeedback {
      0% { 
        transform: scale(1);
        opacity: 1;
      }
      100% { 
        transform: scale(1.05);
        opacity: 0;
      }
    }
    
    &:active::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      animation: clickFeedback 600ms ease-out;
    }
  `;
}

/**
 * Animação de carregamento (spinner)
 */
export function createSpinnerAnimation(): string {
  return `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    animation: spin 1s linear infinite;
  `;
}

/**
 * Animação de progresso
 */
export function createProgressAnimation(duration: number = 1500): string {
  return `
    @keyframes progress {
      0% { 
        width: 0%;
        opacity: 1;
      }
      100% { 
        width: 100%;
        opacity: 1;
      }
    }
    animation: progress ${duration}ms ease-out forwards;
  `;
}

/**
 * Toast notification animation
 */
export function createToastAnimation(position: 'top' | 'bottom' = 'bottom'): string {
  const direction = position === 'top' ? '-100%' : '100%';

  return `
    @keyframes toastSlideIn {
      from { 
        transform: translateY(${direction});
        opacity: 0;
      }
      to { 
        transform: translateY(0);
        opacity: 1;
      }
    }
    
    @keyframes toastSlideOut {
      from { 
        transform: translateY(0);
        opacity: 1;
      }
      to { 
        transform: translateY(${direction});
        opacity: 0;
      }
    }
    
    animation: toastSlideIn 300ms ease-out forwards;
    
    &.exit {
      animation: toastSlideOut 300ms ease-in forwards;
    }
  `;
}

/**
 * Classe para gerenciar toasts
 */
export class ToastManager {
  private toasts: Map<string, { message: string; type: 'success' | 'error' | 'info' | 'warning' }> =
    new Map();

  show(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info', duration: number = 3000) {
    const id = `toast_${Date.now()}`;
    this.toasts.set(id, { message, type });

    setTimeout(() => {
      this.toasts.delete(id);
    }, duration);

    return id;
  }

  success(message: string, duration?: number) {
    return this.show(message, 'success', duration);
  }

  error(message: string, duration?: number) {
    return this.show(message, 'error', duration);
  }

  info(message: string, duration?: number) {
    return this.show(message, 'info', duration);
  }

  warning(message: string, duration?: number) {
    return this.show(message, 'warning', duration);
  }

  getAll() {
    return Array.from(this.toasts.values());
  }

  clear() {
    this.toasts.clear();
  }
}

/**
 * Efeito de hover suave
 */
export function createHoverEffect(): string {
  return `
    transition: all ${AnimationConfig.NORMAL}ms ${AnimationConfig.EASING.EASE_IN_OUT};
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
  `;
}

/**
 * Efeito de foco
 */
export function createFocusEffect(): string {
  return `
    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1),
                  0 0 0 1px rgba(59, 130, 246, 0.5);
    }
  `;
}

/**
 * Animação de sucesso
 */
export function createSuccessAnimation(): string {
  return `
    @keyframes successCheck {
      0% { 
        transform: scale(0) rotate(-45deg);
        opacity: 0;
      }
      50% { 
        transform: scale(1.2) rotate(10deg);
      }
      100% { 
        transform: scale(1) rotate(0deg);
        opacity: 1;
      }
    }
    animation: successCheck 600ms cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
  `;
}

/**
 * Animação de erro
 */
export function createErrorAnimation(): string {
  return `
    @keyframes errorShake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-10px); }
      75% { transform: translateX(10px); }
    }
    animation: errorShake 400ms ease-in-out;
  `;
}

/**
 * Animação de loading skeleton
 */
export function createSkeletonAnimation(): string {
  return `
    @keyframes skeleton {
      0% { background-position: -1000px 0; }
      100% { background-position: 1000px 0; }
    }
    background: linear-gradient(
      90deg,
      #f0f0f0 25%,
      #e0e0e0 50%,
      #f0f0f0 75%
    );
    background-size: 1000px 100%;
    animation: skeleton 2s infinite;
  `;
}

/**
 * Delay em cascata para listas
 */
export function getStaggerDelay(index: number, baseDelay: number = 50): number {
  return index * baseDelay;
}

export function createStaggerAnimation(index: number, baseDelay: number = 50): string {
  return `animation-delay: ${getStaggerDelay(index, baseDelay)}ms;`;
}

/**
 * Gerenciador de animações
 */
export class AnimationManager {
  static async waitForAnimation(element: HTMLElement, animationName: string): Promise<void> {
    return new Promise((resolve) => {
      const handleAnimationEnd = () => {
        element.removeEventListener('animationend', handleAnimationEnd);
        resolve();
      };

      element.addEventListener('animationend', handleAnimationEnd);
    });
  }

  static async waitForTransition(element: HTMLElement): Promise<void> {
    return new Promise((resolve) => {
      const handleTransitionEnd = () => {
        element.removeEventListener('transitionend', handleTransitionEnd);
        resolve();
      };

      element.addEventListener('transitionend', handleTransitionEnd);
    });
  }

  static prefersReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  static disableAnimationsIfNeeded(element: HTMLElement): void {
    if (this.prefersReducedMotion()) {
      element.style.animation = 'none';
      element.style.transition = 'none';
    }
  }
}

export default {
  AnimationConfig,
  createFadeInAnimation,
  createSlideInAnimation,
  createScaleAnimation,
  createBounceAnimation,
  createPulseAnimation,
  createShakeAnimation,
  createColorTransition,
  createClickFeedback,
  createSpinnerAnimation,
  createProgressAnimation,
  createToastAnimation,
  ToastManager,
  createHoverEffect,
  createFocusEffect,
  createSuccessAnimation,
  createErrorAnimation,
  createSkeletonAnimation,
  getStaggerDelay,
  createStaggerAnimation,
  AnimationManager,
};
