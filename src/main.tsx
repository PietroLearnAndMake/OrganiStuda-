import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Registrar Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('[PWA] Service Worker registrado com sucesso:', registration);
      })
      .catch(error => {
        console.error('[PWA] Erro ao registrar Service Worker:', error);
      });
  });
}

// Suporte a Notificações Push
if ('Notification' in window && 'serviceWorker' in navigator) {
  if (Notification.permission === 'default') {
    // Não pedir automaticamente, deixar o usuário decidir
  }
}

// Suporte a Share Target
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('message', event => {
    if (event.data.type === 'SHARED_DATA') {
      console.log('[PWA] Dados compartilhados recebidos:', event.data.data);
      window.dispatchEvent(new CustomEvent('shared-data', { detail: event.data.data }));
    }
  });
}

// Detectar modo de instalação (PWA vs Web)
const isInstalledPWA = window.matchMedia('(display-mode: standalone)').matches ||
                       (window.navigator as any).standalone === true ||
                       document.referrer.includes('android-app://');

console.log('[PWA] Modo instalado:', isInstalledPWA);

// Suporte a Periodic Sync (para notificações periódicas)
// Usando cast de tipo para evitar erro TypeScript em ambientes sem suporte
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.ready.then(registration => {
    const reg = registration as ServiceWorkerRegistration & {
      periodicSync?: {
        register: (tag: string, options?: { minInterval: number }) => Promise<void>;
      };
    };
    if (reg.periodicSync) {
      reg.periodicSync.register('periodic-notification', {
        minInterval: 24 * 60 * 60 * 1000 // 24 horas
      }).catch(error => {
        console.log('[PWA] Periodic Sync não suportado ou não permitido:', error);
      });
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
