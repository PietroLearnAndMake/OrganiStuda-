/**
 * Serviço de Notificações Push
 * Gerencia lembretes de estudo, alertas de streak e notificações de tarefas
 */

export interface PushNotification {
  id: string;
  title: string;
  body: string;
  type: 'study_reminder' | 'streak_alert' | 'task_reminder' | 'achievement_unlock';
  scheduledTime: number; // timestamp
  isScheduled: boolean;
  isDelivered: boolean;
}

export interface NotificationSettings {
  enableStudyReminders: boolean;
  enableStreakAlerts: boolean;
  enableTaskReminders: boolean;
  enableAchievementNotifications: boolean;
  studyReminderTime: string; // HH:mm
  streakAlertThreshold: number; // horas antes de quebrar
}

export class NotificationService {
  private notifications: Map<string, PushNotification> = new Map();
  private settings: NotificationSettings = {
    enableStudyReminders: true,
    enableStreakAlerts: true,
    enableTaskReminders: true,
    enableAchievementNotifications: true,
    studyReminderTime: '09:00',
    streakAlertThreshold: 2,
  };

  /**
   * Inicializa o serviço de notificações
   */
  async initialize(): Promise<void> {
    try {
      // Verificar permissões de notificação
      if ('Notification' in window) {
        if (Notification.permission === 'default') {
          await Notification.requestPermission();
        }
      }

      // Carregar configurações salvas
      this.loadSettings();

      console.log('✅ Serviço de notificações inicializado');
    } catch (error) {
      console.error('Erro ao inicializar notificações:', error);
    }
  }

  /**
   * Agenda lembrete de estudo diário
   */
  scheduleStudyReminder(time: string): void {
    if (!this.settings.enableStudyReminders) return;

    const notification: PushNotification = {
      id: `study_reminder_${Date.now()}`,
      title: '📚 Hora de Estudar!',
      body: 'Comece uma sessão de estudo e ganhe XP!',
      type: 'study_reminder',
      scheduledTime: this.parseTime(time),
      isScheduled: true,
      isDelivered: false,
    };

    this.notifications.set(notification.id, notification);
    this.persistNotification(notification);
    this.scheduleNotification(notification);
  }

  /**
   * Agenda alerta de streak prestes a quebrar
   */
  scheduleStreakAlert(hoursUntilReset: number): void {
    if (!this.settings.enableStreakAlerts) return;
    if (hoursUntilReset > this.settings.streakAlertThreshold) return;

    const notification: PushNotification = {
      id: `streak_alert_${Date.now()}`,
      title: '🔥 Seu Streak está em Risco!',
      body: `Você tem apenas ${hoursUntilReset}h para manter sua sequência. Estude agora!`,
      type: 'streak_alert',
      scheduledTime: Date.now() + 5 * 60 * 1000, // 5 minutos
      isScheduled: true,
      isDelivered: false,
    };

    this.notifications.set(notification.id, notification);
    this.persistNotification(notification);
    this.scheduleNotification(notification);
  }

  /**
   * Agenda lembrete de tarefa
   */
  scheduleTaskReminder(taskId: string, taskTitle: string, dueTime: number): void {
    if (!this.settings.enableTaskReminders) return;

    const notification: PushNotification = {
      id: `task_reminder_${taskId}`,
      title: '✅ Tarefa Pendente',
      body: `Lembre-se de completar: ${taskTitle}`,
      type: 'task_reminder',
      scheduledTime: dueTime,
      isScheduled: true,
      isDelivered: false,
    };

    this.notifications.set(notification.id, notification);
    this.persistNotification(notification);
    this.scheduleNotification(notification);
  }

  /**
   * Notifica desbloqueio de conquista
   */
  notifyAchievementUnlock(achievementName: string, icon: string): void {
    if (!this.settings.enableAchievementNotifications) return;

    const notification: PushNotification = {
      id: `achievement_${Date.now()}`,
      title: `${icon} Conquista Desbloqueada!`,
      body: `Parabéns! Você desbloqueou: ${achievementName}`,
      type: 'achievement_unlock',
      scheduledTime: Date.now(),
      isScheduled: false,
      isDelivered: true,
    };

    this.notifications.set(notification.id, notification);
    this.showNotification(notification);
  }

  /**
   * Mostra notificação imediata
   */
  private showNotification(notification: PushNotification): void {
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(notification.title, {
          body: notification.body,
          icon: '/icon.png',
          badge: '/badge.png',
          tag: notification.type,
          requireInteraction: notification.type === 'streak_alert',
        });

        notification.isDelivered = true;
        this.persistNotification(notification);
      } catch (error) {
        console.error('Erro ao mostrar notificação:', error);
      }
    }
  }

  /**
   * Agenda notificação para tempo futuro
   */
  private scheduleNotification(notification: PushNotification): void {
    const now = Date.now();
    const delay = Math.max(0, notification.scheduledTime - now);

    setTimeout(() => {
      this.showNotification(notification);
    }, delay);
  }

  /**
   * Atualiza configurações de notificação
   */
  updateSettings(settings: Partial<NotificationSettings>): void {
    this.settings = { ...this.settings, ...settings };
    localStorage.setItem('notificationSettings', JSON.stringify(this.settings));
  }

  /**
   * Obtém configurações atuais
   */
  getSettings(): NotificationSettings {
    return { ...this.settings };
  }

  /**
   * Cancela notificação agendada
   */
  cancelNotification(notificationId: string): void {
    this.notifications.delete(notificationId);
    localStorage.removeItem(`notification_${notificationId}`);
  }

  /**
   * Cancela todas as notificações de um tipo
   */
  cancelNotificationsByType(type: PushNotification['type']): void {
    Array.from(this.notifications.values())
      .filter((n) => n.type === type)
      .forEach((n) => this.cancelNotification(n.id));
  }

  /**
   * Obtém todas as notificações
   */
  getAllNotifications(): PushNotification[] {
    return Array.from(this.notifications.values());
  }

  /**
   * Obtém notificações agendadas
   */
  getScheduledNotifications(): PushNotification[] {
    return Array.from(this.notifications.values()).filter((n) => n.isScheduled && !n.isDelivered);
  }

  /**
   * Obtém histórico de notificações entregues
   */
  getDeliveredNotifications(): PushNotification[] {
    return Array.from(this.notifications.values()).filter((n) => n.isDelivered);
  }

  /**
   * Limpa notificações antigas
   */
  clearOldNotifications(daysOld: number = 7): void {
    const cutoffTime = Date.now() - daysOld * 24 * 60 * 60 * 1000;

    Array.from(this.notifications.entries()).forEach(([id, notification]) => {
      if (notification.isDelivered && notification.scheduledTime < cutoffTime) {
        this.cancelNotification(id);
      }
    });
  }

  /**
   * Persiste notificação em localStorage
   */
  private persistNotification(notification: PushNotification): void {
    localStorage.setItem(`notification_${notification.id}`, JSON.stringify(notification));
  }

  /**
   * Carrega notificações do localStorage
   */
  private loadNotifications(): void {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('notification_')) {
        try {
          const data = JSON.parse(localStorage.getItem(key)!);
          this.notifications.set(data.id, data);
        } catch (error) {
          console.error(`Erro ao carregar notificação ${key}:`, error);
        }
      }
    }
  }

  /**
   * Carrega configurações do localStorage
   */
  private loadSettings(): void {
    const saved = localStorage.getItem('notificationSettings');
    if (saved) {
      try {
        this.settings = JSON.parse(saved);
      } catch (error) {
        console.error('Erro ao carregar configurações:', error);
      }
    }
  }

  /**
   * Converte string HH:mm para timestamp
   */
  private parseTime(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    const now = new Date();
    const scheduled = new Date(now);
    scheduled.setHours(hours, minutes, 0, 0);

    // Se o horário já passou hoje, agendar para amanhã
    if (scheduled < now) {
      scheduled.setDate(scheduled.getDate() + 1);
    }

    return scheduled.getTime();
  }

  /**
   * Limpa todas as notificações
   */
  clearAll(): void {
    this.notifications.clear();
    Array.from(localStorage.keys()).forEach((key) => {
      if (key.startsWith('notification_')) {
        localStorage.removeItem(key);
      }
    });
  }
}

export const notificationService = new NotificationService();
export default notificationService;
