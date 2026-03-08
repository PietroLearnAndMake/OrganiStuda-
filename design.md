# Design de Interface - OrganiStuda Android

## 📱 Visão Geral

O OrganiStuda é uma plataforma de produtividade e gamificação para estudantes de alto desempenho. O design segue os princípios de **Apple Human Interface Guidelines (HIG)** com foco em **mobile portrait (9:16)** e **uso com uma mão**.

---

## 🎯 Screen List

### 1. **Home Screen** (Tab: Home)
- **Conteúdo Principal:**
  - Greeting com nome do usuário
  - Card de Streak (dias consecutivos com ícone 🔥)
  - Card de XP/Nível atual
  - Quick stats (total de questões, acertos, taxa)
  - CTA "Começar Estudo" (botão primário)

- **Funcionalidade:**
  - Exibição de progresso diário
  - Motivação visual com badges
  - Acesso rápido a Pomodoro e Questões

---

### 2. **Questions Screen** (Tab: Questions)
- **Conteúdo Principal:**
  - Filtros: Instituição (ENEM, Exames MEC), Disciplina (Mat, Port, Bio, etc.)
  - Lista de disciplinas com ícones
  - Contador de questões por disciplina
  - Search bar para buscar por tópico

- **Funcionalidade:**
  - Seleção de disciplina → Tópicos → Questões
  - Histórico de erros e acertos destacado
  - Botão "Começar" para iniciar sessão de estudo

---

### 3. **Question Detail Screen**
- **Conteúdo Principal:**
  - Número da questão (ex: "3 de 10")
  - Texto da questão (scrollável se longo)
  - 4-5 opções de resposta (radio buttons)
  - Botão "Enviar Resposta"

- **Funcionalidade:**
  - Feedback imediato (verde = correto, vermelho = errado)
  - Exibição de explicação após resposta
  - Botão "Próxima Questão" ou "Voltar"
  - Ganho de XP visível ao acertar

---

### 4. **Pomodoro Screen** (Tab: Pomodoro)
- **Conteúdo Principal:**
  - Timer circular grande (25:00 ou 5:00)
  - Indicador de fase (Trabalho / Pausa)
  - Botões: Play, Pause, Stop
  - Contador de ciclos completados hoje
  - XP ganho nesta sessão

- **Funcionalidade:**
  - Notificação ao fim do timer
  - Haptic feedback ao completar ciclo
  - Sincronização automática com widget Android
  - Histórico de sessões

---

### 5. **Tasks Screen** (Tab: Tasks)
- **Conteúdo Principal:**
  - Input field para criar nova tarefa
  - Lista de tarefas (pendentes + concluídas)
  - Checkbox para marcar como concluída
  - Botão de delete (swipe ou ícone)
  - Contador (ex: "3 de 5 concluídas")

- **Funcionalidade:**
  - Persistência local
  - Animação ao marcar como concluída
  - Remoção de tarefas antigas

---

### 6. **Achievements Screen** (Tab: Achievements)
- **Conteúdo Principal:**
  - Grid de badges/conquistas
  - Badges desbloqueadas (coloridas) vs bloqueadas (cinza)
  - Descrição ao tocar em um badge
  - Botão "Compartilhar" para cada conquista

- **Funcionalidade:**
  - Desbloquear badges por milestones (100 XP, 7 dias streak, etc.)
  - Animação de desbloqueio
  - Compartilhamento via sistema (WhatsApp, Instagram, etc.)

---

### 7. **Profile Screen** (Tab: Profile)
- **Conteúdo Principal:**
  - Foto de perfil (grande, circular)
  - Nome do usuário
  - Nível e XP total
  - Estatísticas: Total de questões, Taxa de acurácia, Tempo total
  - Botão "Editar Perfil"
  - Toggle Modo Escuro/Claro
  - Botão "Logout"

- **Funcionalidade:**
  - Edição de nome e foto
  - Visualização de histórico de XP
  - Sincronização com backend (futuro)

---

## 🎨 Color Palette

| Token | Light | Dark | Uso |
|-------|-------|------|-----|
| **Primary** | `#0a7ea4` | `#0a7ea4` | Botões, CTAs, highlights |
| **Background** | `#ffffff` | `#151718` | Fundo das telas |
| **Surface** | `#f5f5f5` | `#1e2022` | Cards, containers |
| **Foreground** | `#11181C` | `#ECEDEE` | Texto principal |
| **Muted** | `#687076` | `#9BA1A6` | Texto secundário |
| **Success** | `#22C55E` | `#4ADE80` | Respostas corretas, checkmarks |
| **Error** | `#EF4444` | `#F87171` | Respostas erradas, alertas |
| **Warning** | `#F59E0B` | `#FBBF24` | Avisos, notificações |
| **Streak** | `#FF6B35` | `#FF6B35` | Ícone de fogo, sequência |

---

## 🔄 Key User Flows

### Flow 1: Estudar uma Questão
```
Home → "Começar Estudo" 
  → Selecionar Disciplina (ex: Matemática)
  → Selecionar Tópico (ex: Álgebra)
  → Question Detail Screen
  → Selecionar opção
  → Enviar Resposta
  → Feedback (✓ ou ✗)
  → Ver Explicação
  → Próxima Questão ou Voltar
```

### Flow 2: Completar Sessão Pomodoro
```
Home → Pomodoro Tab
  → Iniciar (Play)
  → Timer 25 minutos (trabalho)
  → Notificação ao fim
  → Pausa 5 minutos
  → Repetir ou Parar
  → Ganhar XP
  → Sincronizar com widget
```

### Flow 3: Gerenciar Tarefas
```
Home → Tasks Tab
  → Criar tarefa (input + Enter)
  → Listar tarefas
  → Marcar como concluída (checkbox)
  → Remover tarefa (swipe/delete)
  → Persistência local
```

### Flow 4: Visualizar Conquistas
```
Home → Achievements Tab
  → Ver grid de badges
  → Tocar em badge para detalhes
  → Compartilhar (botão Share)
  → Abrir app de mensagem
```

---

## 🎯 Micro-Interações

### 1. **Button Press**
- Scale: 0.97
- Haptic: Light impact
- Duration: 80ms

### 2. **Card Tap**
- Opacity: 0.7
- Duration: 100ms

### 3. **Streak Unlock**
- Animation: Bounce + Glow
- Haptic: Success notification
- Duration: 500ms

### 4. **XP Gain**
- Animation: Float up + Fade out
- Text: "+10 XP"
- Duration: 1000ms

### 5. **Checkbox Toggle**
- Animation: Scale + Rotate
- Haptic: Light impact
- Duration: 200ms

---

## 📐 Layout Guidelines

### Safe Area Handling
- Use `ScreenContainer` para todas as telas
- Respeitar notch (iPhone X+) e home indicator
- Tab bar não sobrepõe conteúdo

### Typography
- **Heading 1:** 32px, Bold, Foreground
- **Heading 2:** 24px, Semibold, Foreground
- **Body:** 16px, Regular, Foreground
- **Caption:** 12px, Regular, Muted

### Spacing
- Padding padrão: 16px
- Gap entre elementos: 8px, 12px, 16px
- Radius: 12px (cards), 8px (buttons)

### Touch Targets
- Mínimo: 44x44px (Apple HIG)
- Botões: 48x48px
- Ícones: 24x24px

---

## 🌙 Dark Mode

- Automático baseado em preferência do sistema
- Toggle manual em Profile
- Cores ajustadas para contraste adequado
- Sem uso de `dark:` prefix (CSS variables)

---

## 📊 Wireframe Summary

```
┌─────────────────────┐
│   Home Screen       │
├─────────────────────┤
│ 👋 Olá, Estudante   │
│ ┌─────────────────┐ │
│ │ 🔥 Streak: 7    │ │
│ └─────────────────┘ │
│ ┌─────────────────┐ │
│ │ ⭐ XP: 450      │ │
│ │ Level 5         │ │
│ └─────────────────┘ │
│ ┌─────────────────┐ │
│ │ 📊 Stats        │ │
│ │ 45 questões     │ │
│ │ 88% acertos     │ │
│ └─────────────────┘ │
│ [Começar Estudo]    │
├─────────────────────┤
│ 🏠 📚 ⏱️ ✅ 🏆 👤 │
└─────────────────────┘
```

---

## ✅ Checklist de Implementação

- [ ] Criar componentes por tela
- [ ] Implementar navegação com Expo Router
- [ ] Adicionar animações com Reanimated
- [ ] Integrar persistência com AsyncStorage
- [ ] Testar em dispositivos reais
- [ ] Validar acessibilidade (contrast, touch targets)
- [ ] Otimizar performance (lazy loading, memoization)

---

**Design finalizado em:** 08/03/2026
**Status:** Pronto para implementação
