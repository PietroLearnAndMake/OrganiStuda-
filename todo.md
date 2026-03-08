# OrganiStuda Android - TODO List

## 🎯 Funcionalidades Principais

### Gamificação & Progressão
- [x] Sistema de XP e Nível
- [x] Lógica de downgrade para incentivar constância
- [x] Cálculo de nível baseado em XP
- [x] Persistência de XP em localStorage
- [ ] Sincronização de XP com backend (futuro)
- [ ] Badges e conquistas desbloqueáveis

### Streak & Motivação
- [x] Contador de dias consecutivos
- [x] Visualização semanal (D S T Q Q S S)
- [x] Recorde pessoal (bestStreak)
- [x] Indicador visual com ícone de fogo 🔥
- [x] Widget Android nativo para Streak
- [ ] Notificação push ao quebrar streak

### Banco de Questões
- [x] Banco de questões com múltiplas disciplinas
- [x] Filtros por instituição (ENEM, Exames MEC)
- [x] Filtros por disciplina (Matemática, Português, etc.)
- [x] Histórico de erros e acertos
- [x] Explicações detalhadas
- [ ] Busca por tópico
- [ ] Recomendações inteligentes

### Pomodoro & Foco
- [x] Timer Pomodoro integrado (25 min + 5 min)
- [x] Recompensa de XP ao completar ciclos
- [x] Sincronização com widget Android
- [x] Histórico de sessões
- [ ] Notificação ao fim do timer
- [ ] Haptic feedback ao completar ciclo

### Tarefas (To-Do)
- [x] Criação de tarefas
- [x] Marcação de conclusão
- [x] Exclusão de tarefas
- [x] Persistência local
- [ ] Datas de vencimento
- [ ] Categorias de tarefas

### Dashboard & Estatísticas
- [x] Gráficos semanais com Recharts
- [x] Estatísticas de acertos vs erros
- [x] Taxa de acurácia em tempo real
- [x] Visualização de progresso
- [ ] Gráficos de XP ao longo do tempo
- [ ] Análise de desempenho por disciplina

### Tema & Acessibilidade
- [x] Modo escuro/claro
- [x] Toggle de tema com persistência
- [x] Paleta de cores adaptativa
- [ ] Suporte a acessibilidade (VoiceOver, TalkBack)
- [ ] Aumentar tamanho de fonte

### Perfil & Configurações
- [x] Exibição de perfil do usuário
- [x] Nome e foto de perfil
- [x] Nível e XP total
- [x] Estatísticas gerais
- [ ] Edição de perfil
- [ ] Sincronização com backend

---

## 🐛 Bugs Identificados

### App.tsx (Monolito)
- [ ] **CRÍTICO:** Arquivo com 2681 linhas (refatorar em componentes)
- [ ] **CRÍTICO:** JSX closing tag error em motion.div (linha 1314)
- [ ] **ALTO:** Lógica de negócio misturada com UI
- [ ] **ALTO:** Sem separação de responsabilidades
- [ ] **MÉDIO:** Performance em dispositivos intermediários

### Performance
- [ ] Animações complexas causam lag em dispositivos antigos
- [ ] localStorage não é otimizado para grandes datasets
- [ ] Re-renders desnecessários de componentes

### Integração Nativa
- [ ] Widget Android não sincroniza em tempo real
- [ ] Falta de notificações push
- [ ] Sem acesso a câmera para foto de perfil

### Dados
- [ ] Banco de questões hardcoded (sem backend)
- [ ] Sem sincronização entre dispositivos
- [ ] Sem backup automático

---

## 🏗️ Refatoração & Arquitetura

### Fase 1: Separação de Responsabilidades
- [ ] Extrair componentes UI do App.tsx
- [ ] Criar pasta `components/` com componentes reutilizáveis
- [ ] Criar pasta `hooks/` com hooks customizados
- [ ] Criar pasta `utils/` com funções auxiliares

### Fase 2: Camada de Domínio
- [ ] Criar pasta `domain/` com modelos de negócio
- [ ] Implementar Use Cases para cada funcionalidade
- [ ] Criar Repositories para acesso a dados
- [ ] Definir interfaces de contrato

### Fase 3: Gerenciamento de Estado
- [ ] Implementar Context API para estado global
- [ ] Criar reducers para lógica complexa
- [ ] Adicionar persistência com AsyncStorage

### Fase 4: Testes
- [ ] Testes unitários para Use Cases
- [ ] Testes de integração para Repositories
- [ ] Testes de componentes UI
- [ ] Testes E2E com Detox

---

## 📱 Componentes a Criar

### Componentes de Tela
- [ ] `HomeScreen` - Tela inicial
- [ ] `QuestionsScreen` - Seleção de questões
- [ ] `QuestionDetailScreen` - Detalhes de questão
- [ ] `PomodoroScreen` - Timer Pomodoro
- [ ] `TasksScreen` - Lista de tarefas
- [ ] `AchievementsScreen` - Conquistas
- [ ] `ProfileScreen` - Perfil do usuário

### Componentes Reutilizáveis
- [ ] `StreakWidget` - Widget de sequência
- [ ] `StatsWidget` - Widget de estatísticas
- [ ] `QuestionCard` - Card de questão
- [ ] `DashboardCharts` - Gráficos
- [ ] `PomodoroTimer` - Timer visual
- [ ] `TaskList` - Lista de tarefas
- [ ] `BadgeGrid` - Grid de badges

### Componentes de UI
- [ ] `Button` - Botão customizado
- [ ] `Card` - Card reutilizável
- [ ] `Input` - Input customizado
- [ ] `Modal` - Modal/Dialog
- [ ] `Tabs` - Navegação por abas
- [ ] `ProgressBar` - Barra de progresso

---

## 🔌 Integração com Backend

- [ ] Criar API REST para sincronização
- [ ] Implementar autenticação com OAuth
- [ ] Sincronizar perfil do usuário
- [ ] Sincronizar questões respondidas
- [ ] Sincronizar XP e achievements
- [ ] Implementar notificações push com Firebase

---

## 📚 Documentação

- [ ] README.md com instruções de setup
- [ ] ARCHITECTURE.md com diagrama de arquitetura
- [ ] API.md com documentação de endpoints
- [ ] CONTRIBUTING.md com guia de contribuição
- [ ] CHANGELOG.md com histórico de versões

---

## 🚀 Deploy & Release

- [ ] Configurar CI/CD com GitHub Actions
- [ ] Build APK para Android
- [ ] Build IPA para iOS (futuro)
- [ ] Publicar na Play Store
- [ ] Configurar Firebase Analytics
- [ ] Configurar Crashlytics

---

## 🎯 Milestones

### MVP v1.0 (Atual)
- [x] Funcionalidades básicas implementadas
- [x] UI com Tailwind CSS
- [x] Persistência local
- [ ] Refatoração em componentes
- [ ] Testes básicos

### v1.1 (Próximo)
- [ ] Refatoração completa
- [ ] Testes unitários
- [ ] Performance otimizada

### v2.0 (Futuro)
- [ ] Backend integrado
- [ ] Autenticação com OAuth
- [ ] Sincronização multi-dispositivo
- [ ] Notificações push

### v3.0 (Master)
- [ ] Migração para Kotlin nativo
- [ ] Jetpack Compose para UI
- [ ] Room Database
- [ ] Performance de nível Duolingo

---

**Última atualização:** 08/03/2026
**Status:** Em desenvolvimento
**Prioridade:** CRÍTICA


---

## 🔥 DIRETIVA TÉCNICA - REFATORAÇÃO URGENTE

### 1. Refatoração do App.tsx
- [ ] **CRÍTICO:** Reduzir App.tsx de 2681 para < 200 linhas
- [ ] Extrair componentes de UI (PomodoroTimer, StreakCounter, XPSystem, TaskList, Achievements)
- [ ] Criar pasta `screens/` com Dashboard, Questions, Tasks, Stats
- [ ] Criar pasta `hooks/` com usePomodoro, useStreak, useXP
- [ ] Criar pasta `services/` com xpService, streakService, questionService
- [ ] Separar lógica de estado da camada de interface
- [ ] Validar que componentes contêm apenas lógica de UI
- [ ] Validar que hooks contêm apenas lógica de estado reutilizável
- [ ] Validar que services contêm apenas lógica de negócio

### 2. Organização do Banco de Questões
- [ ] Implementar identificador único obrigatório para cada questão
- [ ] Formato: PROVA_ANO_MATERIA_NUMERO (ex: ENEM_2018_MT_Q12)
- [ ] Gerar IDs automaticamente para questões existentes
- [ ] Validar que nenhuma questão existe sem ID
- [ ] Atualizar schema de dados para incluir ID obrigatório

### 3. Sistema de Detecção de Duplicatas
- [ ] Criar função de validação de duplicatas
- [ ] Critérios: texto_da_questao + ano + prova + numero
- [ ] Bloquear inserção de questões idênticas
- [ ] Registrar eventos de duplicata no log
- [ ] Implementar teste para validação

### 4. Persistência Offline Segura
- [ ] Implementar IndexedDB para armazenamento local
- [ ] Armazenar: progresso, XP, nível, streak, histórico de questões, tarefas
- [ ] Garantir que nenhum dado é perdido após fechamento do app
- [ ] Implementar sincronização segura quando houver conexão
- [ ] Criar mecanismo de backup automático
- [ ] Testar funcionamento offline completo

### 5. Sistema de Monitoramento de Erros
- [ ] Implementar captura automática de exceções
- [ ] Registrar logs estruturados com stack trace
- [ ] Identificar tela onde erro ocorreu
- [ ] Registrar ação do usuário que causou erro
- [ ] Criar dashboard de monitoramento (futuro)
- [ ] Implementar Sentry ou similar para produção

### 6. Pipeline de Build e CI/CD
- [ ] Configurar GitHub Actions para testes automáticos
- [ ] Configurar build automático do APK
- [ ] Publicar APK nas Releases do GitHub
- [ ] Garantir builds reproduzíveis
- [ ] Bloquear deploy em caso de falha de compilação
- [ ] Criar logs completos do pipeline
- [ ] Configurar testes automáticos (unit + integration)

### 7. Documentação Atualizada
- [ ] Atualizar design.md com nova arquitetura
- [ ] Atualizar todo.md com status de refatoração
- [ ] Atualizar ANALISE_ORGANISTUDA.md com novas estruturas
- [ ] Criar ARCHITECTURE.md com diagrama de componentes
- [ ] Criar CONTRIBUTING.md com guia de contribuição
- [ ] Criar API.md com documentação de services

