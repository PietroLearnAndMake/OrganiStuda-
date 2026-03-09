/**
 * Declarações de Tipos Emergenciais (Shims)
 * 
 * Resolve erros TS2307 para módulos sem @types próprios
 * Permite que o compilador TypeScript reconheça módulos nativos
 */

declare module '@capacitor-community/sqlite' {
  export interface CapacitorSQLitePlugin {
    echo(options: { value: string }): Promise<{ value: string }>;
    open(options: { database: string; encrypted?: boolean; mode?: string }): Promise<any>;
    close(options: { database: string }): Promise<any>;
    execute(options: { database: string; statements: string }): Promise<any>;
    query(options: { database: string; statement: string; values?: any[] }): Promise<any>;
    run(options: { database: string; statement: string; values?: any[] }): Promise<any>;
    transaction(options: { database: string; statements: string[] }): Promise<any>;
    deleteDatabase(options: { database: string }): Promise<any>;
    isDBExists(options: { database: string }): Promise<{ result: boolean }>;
  }

  export const CapacitorSQLite: CapacitorSQLitePlugin;
  export default CapacitorSQLite;
}

declare module 'expo-secure-store' {
  export function getItemAsync(key: string): Promise<string | null>;
  export function setItemAsync(key: string, value: string): Promise<void>;
  export function deleteItemAsync(key: string): Promise<void>;
  export function getItem(key: string): string | null;
  export function setItem(key: string, value: string): void;
  export function deleteItem(key: string): void;
}

// Declarações globais adicionais para Capacitor
declare global {
  interface Window {
    Capacitor?: any;
    capacitorExports?: any;
  }
}

export {};
