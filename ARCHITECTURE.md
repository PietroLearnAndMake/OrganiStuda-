# Arquitetura do OrganiStuda - Refatoração v2.0

## 📐 Visão Geral

O OrganiStuda foi refatorado seguindo os princípios de **Clean Architecture** e **Separation of Concerns**. A base de código foi reorganizada de um monolito de 2681 linhas para uma estrutura modular e escalável.

---

## 🏗️ Estrutura de Pastas

```
src/
├── App.tsx                 # App principal (< 200 linhas)
├── AppRefactored.tsx       # Nova versão refatorada
├── main.tsx                # Entry point
├── index.css               # Estilos globais
│
├── context/
│   └── AppContext.tsx      # Contexto global de estado
│
├── components/             # Componentes de UI reutilizáveis
│   ├── StreakWidget.tsx
│   ├── StatsWidget.tsx
│   ├── QuestionCard.tsx
│   ├── PomodoroTimer.tsx
│   ├── TaskList.tsx
│   └── AchievementBadge.tsx
│
├── screens/                # Telas principais
│   ├── HomeScreen.tsx
│   ├── QuestionsScreen.tsx
│   ├── PomodoroScreen.tsx
│   ├── TasksScreen.tsx
│   └── AchievementsScreen.tsx
│
├── hooks/                  # Hooks customizados
│   ├── usePomodoro.ts      # Gerenciamento de Pomodoro
│   ├── useStreak.ts        # Gerenciamento de Streak
│   ├── useXP.ts            # Gerenciamento de XP e Nível
│   └── useApp.ts           # Hook para acessar AppContext
│
├── services/               # Lógica de negócio
│   ├── questionService.ts  # Gerenciamento de questões
│   ├── storageService.ts   # Persistência com IndexedDB
│   ├── errorService.ts     # Monitoramento de erros
│   └── syncService.ts      # Sincronização offline-first
│
├── utils/                  # Funções auxiliares
│   ├── formatters.ts       # Formatação de dados
│   ├── validators.ts       # Validação de dados
│   └── helpers.ts          # Funções utilitárias
│
├── types/                  # Definições de tipos TypeScript
│   └── index.ts
│
├── data/                   # Dados estáticos
│   ├── questionBank.ts
│   └── enemData.ts
│
└── index.css               # Estilos com Tailwind
```

---

## 🔄 Fluxo de Dados

### 1. **Context API (Estado Global)**

O `AppContext` gerencia todo o estado global da aplicação:

```
AppProvider
├── profile (UserProfile)
├── subjects (Subject[])
├── savedQuestions (SavedQuestion[])
├── tasks (Task[])
├── currentTab (string)
├── darkMode (boolean)
└── isOnline (boolean)
```

Componentes acessam via `useApp()`:

```typescript
const { profile, setProfile, subjects, setSubjects } = useApp();
```

### 2. **Hooks Customizados**

Encapsulam lógica de estado reutilizável:

- **usePomodoro()** - Gerencia timer, modo trabalho/pausa
- **useStreak()** - Calcula dias consecutivos, melhor sequência
- **useXP()** - Calcula XP, nível, progresso

### 3. **Services (Lógica de Negócio)**

Implementam regras de negócio independentes de UI:

- **questionService** - Validação de questões, detecção de duplicatas
- **storageService** - Persistência com IndexedDB, backup, restore
- **errorService** - Captura de erros, logging estruturado
- **syncService** - Sincronização offline-first (futuro)

### 4. **Componentes (UI)**

Componentes reutilizáveis que recebem dados via props:

```typescript
<StreakWidget streak={7} bestStreak={14} darkMode={true} />
<StatsWidget savedQuestions={questions} darkMode={true} />
```

---

## 🔐 Separação de Responsabilidades

| Camada | Responsabilidade | Exemplo |
|--------|------------------|---------|
| **Context** | Estado global | `profile`, `subjects`, `tasks` |
| **Hooks** | Lógica de estado reutilizável | `usePomodoro`, `useStreak`, `useXP` |
| **Services** | Regras de negócio | Cálculo de XP, validação de questões |
| **Components** | Renderização de UI | Botões, cards, listas |
| **Utils** | Funções auxiliares | Formatação, validação |

---

## 📊 Fluxo de Dados Detalhado

### Exemplo: Responder uma Questão

```
1. User clica em "Responder" na QuestionCard
   ↓
2. Component chama questionService.recordAttempt()
   ↓
3. Service atualiza SavedQuestion com nova tentativa
   ↓
4. Component atualiza Context via setSavedQuestions()
   ↓
5. Context salva em localStorage (efeito useEffect)
   ↓
6. StorageService sincroniza com IndexedDB (futuro)
   ↓
7. ErrorService registra qualquer erro no processo
```

---

## 🔄 Persistência de Dados

### localStorage (Atual)

```
enem_profile              → UserProfile
enem_subjects             → Subject[]
enem_saved_questions      → SavedQuestion[]
enem_tasks                → Task[]
enem_streak               → { streak, bestStreak, lastDate }
enem_xp                   → number
enem_theme                → boolean
organistuda_logs          → LogEntry[]
```

### IndexedDB (Futuro)

Estrutura preparada em `storageService.ts`:

```
ObjectStores:
├── profile
├── subjects
├── questions (indexes: subjectId, institution)
├── tasks
├── streak
├── xp_history (indexes: timestamp)
└── sync_queue (indexes: status)
```

---

## 🛡️ Monitoramento de Erros

O `errorService` captura automaticamente:

- Exceções globais
- Promessas rejeitadas não tratadas
- Erros em componentes React

Cada erro registra:

```typescript
{
  id: string;
  timestamp: number;
  level: LogLevel;
  message: string;
  screen: string;           // Tela onde ocorreu
  action: string;           // Ação do usuário
  stackTrace: string;       // Stack trace completo
  metadata: Record<string, any>;
}
```

---

## 🚀 Validação de Questões

### Geração de ID

Formato: `PROVA_ANO_MATERIA_NUMERO`

```typescript
// Exemplo
ENEM_2018_MT_Q12
FUVEST_2016_FIS_Q04
UECE_2020_BIO_Q18
```

### Detecção de Duplicatas

Critérios:

- `texto_da_questao`
- `ano`
- `prova`
- `numero`

Se todos coincidirem, a questão é bloqueada e registrada no log.

---

## 📦 Build & Deployment

### GitHub Actions Pipeline

```
Push → Test → Build → Release
```

Arquivo: `.github/workflows/build.yml`

Garantias:

- ✅ Testes executados antes de build
- ✅ Build falha se houver erros de compilação
- ✅ APK publicado automaticamente em Releases
- ✅ Logs completos disponíveis

---

## 🔄 Migração para Kotlin (Futuro)

A arquitetura atual prepara para migração:

1. **Services** → Use Cases em Kotlin
2. **Context** → ViewModel + LiveData
3. **Hooks** → Observables
4. **Components** → Jetpack Compose

---

## 📝 Checklist de Implementação

- [x] Criar AppContext para estado global
- [x] Implementar hooks customizados (usePomodoro, useStreak, useXP)
- [x] Criar services (questionService, storageService, errorService)
- [x] Refatorar App.tsx para < 200 linhas
- [x] Preparar IndexedDB em storageService
- [x] Configurar GitHub Actions CI/CD
- [ ] Implementar componentes de tela
- [ ] Criar testes unitários
- [ ] Integrar Sentry para produção
- [ ] Documentar APIs

---

## 📚 Referências

- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [React Context API](https://react.dev/reference/react/useContext)
- [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [GitHub Actions](https://docs.github.com/en/actions)

---

**Última atualização:** 08/03/2026
**Status:** Refatoração em progresso
**Versão:** 2.0.0-beta
