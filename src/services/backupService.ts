import { UserProfile, SavedQuestion } from '../types';

/**
 * Serviço de Backup e Exportação de Dados
 * Permite que usuários exportem e importem seu progresso
 */

export interface BackupData {
  version: string;
  timestamp: number;
  profile: UserProfile;
  questions: SavedQuestion[];
  tasks: Array<{ id: string; text: string; completed: boolean }>;
  settings: Record<string, any>;
}

export interface BackupMetadata {
  id: string;
  timestamp: number;
  size: number;
  version: string;
}

export class BackupService {
  private static readonly BACKUP_VERSION = '1.0.0';
  private static readonly ENCRYPTION_KEY = 'organistuda_backup_key';

  /**
   * Cria backup completo dos dados do usuário
   */
  static async createBackup(
    profile: UserProfile,
    questions: SavedQuestion[],
    tasks: any[],
    settings: Record<string, any>
  ): Promise<BackupData> {
    const backup: BackupData = {
      version: this.BACKUP_VERSION,
      timestamp: Date.now(),
      profile,
      questions,
      tasks,
      settings,
    };

    return backup;
  }

  /**
   * Exporta backup como JSON
   */
  static exportAsJSON(backup: BackupData): string {
    return JSON.stringify(backup, null, 2);
  }

  /**
   * Exporta backup como arquivo para download
   */
  static downloadBackup(backup: BackupData, filename?: string): void {
    const json = this.exportAsJSON(backup);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename || `organistuda_backup_${backup.timestamp}.json`;
    link.click();

    URL.revokeObjectURL(url);
  }

  /**
   * Importa backup de arquivo JSON
   */
  static async importFromJSON(jsonString: string): Promise<BackupData | null> {
    try {
      const backup = JSON.parse(jsonString) as BackupData;

      // Validar estrutura do backup
      if (!this.validateBackupStructure(backup)) {
        throw new Error('Estrutura de backup inválida');
      }

      return backup;
    } catch (error) {
      console.error('Erro ao importar backup:', error);
      return null;
    }
  }

  /**
   * Importa backup de arquivo selecionado pelo usuário
   */
  static async importFromFile(file: File): Promise<BackupData | null> {
    try {
      const content = await file.text();
      return this.importFromJSON(content);
    } catch (error) {
      console.error('Erro ao ler arquivo de backup:', error);
      return null;
    }
  }

  /**
   * Valida estrutura do backup
   */
  private static validateBackupStructure(backup: any): boolean {
    return (
      backup.version &&
      backup.timestamp &&
      backup.profile &&
      backup.questions !== undefined &&
      backup.tasks !== undefined &&
      backup.settings !== undefined
    );
  }

  /**
   * Restaura dados de um backup
   */
  static async restoreBackup(backup: BackupData): Promise<boolean> {
    try {
      // Salvar dados restaurados em localStorage
      localStorage.setItem('profile', JSON.stringify(backup.profile));
      localStorage.setItem('questions', JSON.stringify(backup.questions));
      localStorage.setItem('tasks', JSON.stringify(backup.tasks));
      localStorage.setItem('settings', JSON.stringify(backup.settings));

      console.log('✅ Backup restaurado com sucesso');
      return true;
    } catch (error) {
      console.error('Erro ao restaurar backup:', error);
      return false;
    }
  }

  /**
   * Cria backup automático
   */
  static async createAutoBackup(
    profile: UserProfile,
    questions: SavedQuestion[],
    tasks: any[],
    settings: Record<string, any>
  ): Promise<void> {
    try {
      const backup = await this.createBackup(profile, questions, tasks, settings);
      const backups = this.getAutoBackups();

      // Manter apenas últimos 5 backups
      if (backups.length >= 5) {
        const oldestBackup = backups.reduce((oldest, current) =>
          current.timestamp < oldest.timestamp ? current : oldest
        );
        this.deleteAutoBackup(oldestBackup.id);
      }

      const metadata: BackupMetadata = {
        id: `backup_${Date.now()}`,
        timestamp: backup.timestamp,
        size: JSON.stringify(backup).length,
        version: backup.version,
      };

      localStorage.setItem(`auto_backup_${metadata.id}`, JSON.stringify(backup));
      localStorage.setItem('auto_backups_metadata', JSON.stringify([...backups, metadata]));

      console.log('✅ Auto-backup criado');
    } catch (error) {
      console.error('Erro ao criar auto-backup:', error);
    }
  }

  /**
   * Obtém lista de auto-backups
   */
  static getAutoBackups(): BackupMetadata[] {
    try {
      const metadata = localStorage.getItem('auto_backups_metadata');
      return metadata ? JSON.parse(metadata) : [];
    } catch (error) {
      console.error('Erro ao obter auto-backups:', error);
      return [];
    }
  }

  /**
   * Restaura auto-backup
   */
  static async restoreAutoBackup(backupId: string): Promise<boolean> {
    try {
      const backupJson = localStorage.getItem(`auto_backup_${backupId}`);
      if (!backupJson) return false;

      const backup = JSON.parse(backupJson) as BackupData;
      return this.restoreBackup(backup);
    } catch (error) {
      console.error('Erro ao restaurar auto-backup:', error);
      return false;
    }
  }

  /**
   * Deleta auto-backup
   */
  static deleteAutoBackup(backupId: string): void {
    try {
      localStorage.removeItem(`auto_backup_${backupId}`);

      const backups = this.getAutoBackups();
      const updated = backups.filter((b) => b.id !== backupId);
      localStorage.setItem('auto_backups_metadata', JSON.stringify(updated));

      console.log('✅ Auto-backup deletado');
    } catch (error) {
      console.error('Erro ao deletar auto-backup:', error);
    }
  }

  /**
   * Exporta relatório de progresso
   */
  static generateProgressReport(profile: UserProfile, questions: SavedQuestion[]): string {
    const totalQuestions = questions.length;
    const correctQuestions = profile.stats.correctQuestions;
    const accuracy = totalQuestions > 0 ? ((correctQuestions / totalQuestions) * 100).toFixed(2) : 0;

    const report = `
# Relatório de Progresso - OrganiStuda

**Data:** ${new Date().toLocaleDateString('pt-BR')}

## Perfil
- **Nome:** ${profile.name}
- **Nível:** ${profile.level}
- **XP Total:** ${profile.xp}
- **Streak Atual:** ${profile.streak} dias 🔥
- **Melhor Streak:** ${profile.bestStreak} dias

## Estatísticas de Estudo
- **Questões Resolvidas:** ${profile.stats.totalQuestions}
- **Questões Corretas:** ${profile.stats.correctQuestions}
- **Taxa de Acerto:** ${accuracy}%
- **Sessões Completadas:** ${profile.stats.sessionsCompleted}
- **Tempo Total de Estudo:** ${Math.floor(profile.totalStudyTime / 60)}h ${profile.totalStudyTime % 60}m

## Metas Semanais
- **Questões:** ${profile.stats.totalQuestions} / ${profile.weeklyGoals.questions}
- **Tempo de Estudo:** ${Math.floor(profile.totalStudyTime / 60)}h / ${Math.floor(profile.weeklyGoals.studyTime / 60)}h

## Conquistas
- **Total Desbloqueadas:** ${profile.achievements.length}

---
*Relatório gerado automaticamente pelo OrganiStuda*
    `.trim();

    return report;
  }

  /**
   * Exporta relatório como arquivo
   */
  static downloadProgressReport(report: string): void {
    const blob = new Blob([report], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `organistuda_progress_${Date.now()}.md`;
    link.click();

    URL.revokeObjectURL(url);
  }

  /**
   * Calcula tamanho total de dados
   */
  static calculateDataSize(backup: BackupData): string {
    const bytes = JSON.stringify(backup).length;

    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  /**
   * Valida integridade do backup
   */
  static validateBackupIntegrity(backup: BackupData): boolean {
    try {
      // Verificar campos obrigatórios
      if (!backup.profile || !backup.questions || !backup.tasks) {
        return false;
      }

      // Verificar tipos de dados
      if (typeof backup.profile !== 'object' || !Array.isArray(backup.questions)) {
        return false;
      }

      // Verificar versão compatível
      const [majorVersion] = backup.version.split('.');
      const [currentMajor] = this.BACKUP_VERSION.split('.');

      if (majorVersion !== currentMajor) {
        console.warn('Versão de backup diferente');
      }

      return true;
    } catch (error) {
      console.error('Erro ao validar integridade:', error);
      return false;
    }
  }

  /**
   * Limpa dados locais (cuidado!)
   */
  static clearAllData(): void {
    if (confirm('Tem certeza que deseja deletar TODOS os dados? Esta ação é irreversível!')) {
      localStorage.clear();
      console.log('⚠️ Todos os dados foram deletados');
    }
  }
}

export default BackupService;
