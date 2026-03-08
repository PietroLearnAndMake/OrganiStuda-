# Guia de Contribuição - OrganiStuda

Obrigado por querer contribuir com o OrganiStuda! Este guia descreve como colaborar com o projeto de forma eficiente e profissional.

---

## 🎯 Princípios do Projeto

1. **Qualidade acima de velocidade** - Código limpo e bem testado
2. **Documentação é código** - Tudo deve ser documentado
3. **Separação de responsabilidades** - Cada camada tem seu propósito
4. **Offline-first** - O app funciona sem internet
5. **Performance importa** - Otimizar sempre

---

## 📋 Antes de Começar

### Setup Local

```bash
# Clone o repositório
git clone https://github.com/PietroLearnAndMake/OrganiStuda-.git
cd OrganiStudaAndroid

# Instale dependências
pnpm install

# Inicie o servidor de desenvolvimento
pnpm dev
```

### Estrutura de Pastas

Familiarize-se com a arquitetura em `ARCHITECTURE.md`.

---

## 🔄 Fluxo de Trabalho

### 1. Crie uma Branch

```bash
# Para features
git checkout -b feature/nome-da-feature

# Para bugs
git checkout -b fix/descricao-do-bug

# Para documentação
git checkout -b docs/descricao
```

### 2. Faça as Mudanças

Siga os padrões de código abaixo.

### 3. Commit Semântico

```bash
# Feature
git commit -m "feat: adicionar novo componente de dashboard"

# Bug fix
git commit -m "fix: corrigir cálculo de XP em streak"

# Documentação
git commit -m "docs: atualizar ARCHITECTURE.md"

# Refatoração
git commit -m "refactor: simplificar lógica de Pomodoro"

# Testes
git commit -m "test: adicionar testes para questionService"
```

### 4. Push e Pull Request

```bash
git push origin feature/nome-da-feature
```

Abra um Pull Request no GitHub com:

- Título descritivo
- Descrição detalhada das mudanças
- Referência a issues relacionadas
- Screenshots se aplicável

---

## 💻 Padrões de Código

### TypeScript

```typescript
// ✅ BOM: Tipos explícitos
interface UserProfile {
  name: string;
  xp: number;
  level: number;
}

function updateProfile(profile: UserProfile): void {
  // ...
}

// ❌ RUIM: Tipos implícitos
function updateProfile(profile: any) {
  // ...
}
```

### Componentes React

```typescript
// ✅ BOM: Componente funcional com tipos
interface StreakWidgetProps {
  streak: number;
  bestStreak: number;
  darkMode: boolean;
}

export function StreakWidget({ streak, bestStreak, darkMode }: StreakWidgetProps) {
  return (
    <div className={darkMode ? 'bg-dark' : 'bg-light'}>
      {/* ... */}
    </div>
  );
}

// ❌ RUIM: Componente sem tipos
export function StreakWidget(props) {
  return <div>{props.streak}</div>;
}
```

### Hooks Customizados

```typescript
// ✅ BOM: Hook com tipos claros
interface PomodoroState {
  time: number;
  isActive: boolean;
}

export function usePomodoro(): [PomodoroState, PomodoroActions] {
  // ...
}

// ❌ RUIM: Hook sem tipos
export function usePomodoro() {
  // ...
}
```

### Services

```typescript
// ✅ BOM: Service com métodos bem definidos
class QuestionService {
  addQuestion(question: Question, subjectId: string): SavedQuestion | null {
    // Validar duplicata
    // Gerar ID
    // Retornar questão salva
  }

  isDuplicate(question: Question): boolean {
    // ...
  }
}

// ❌ RUIM: Service com muitas responsabilidades
class QuestionService {
  doEverything() {
    // ...
  }
}
```

---

## 🧪 Testes

### Executar Testes

```bash
pnpm test
```

### Escrever Testes

```typescript
// ✅ BOM: Teste claro e focado
describe('useXP', () => {
  it('deve calcular o nível correto baseado em XP', () => {
    const { result } = renderHook(() => useXP(100));
    expect(result.current[0].level).toBe(1);
  });

  it('deve incrementar XP corretamente', () => {
    const { result } = renderHook(() => useXP(0));
    act(() => {
      result.current[1].addXP(50);
    });
    expect(result.current[0].xp).toBe(50);
  });
});
```

### Cobertura de Testes

- Services: 100% de cobertura obrigatória
- Hooks: 80% de cobertura mínima
- Componentes: 60% de cobertura mínima

---

## 📝 Documentação

### Comentários em Código

```typescript
// ✅ BOM: Comentário explicativo
/**
 * Calcula o nível do usuário baseado no XP total
 * Usa crescimento exponencial: 100 * 1.1^(level-1)
 * @param totalXP - XP total acumulado
 * @returns Nível calculado
 */
function calculateLevel(totalXP: number): number {
  // ...
}

// ❌ RUIM: Comentário óbvio
// incrementar o nível
level++;
```

### README para Novas Features

Se adicionar uma feature importante, atualize o `README.md` com:

- O que faz
- Como usar
- Exemplos de código
- Limitações conhecidas

---

## 🐛 Reportar Bugs

### Checklist

- [ ] Reproduzi o bug em ambiente limpo
- [ ] Verifiquei se o bug já foi reportado
- [ ] Incluí passos para reproduzir
- [ ] Incluí logs de erro
- [ ] Incluí versão do navegador/SO

### Template

```markdown
**Descrição do Bug:**
Descreva o que deveria acontecer vs o que realmente acontece.

**Passos para Reproduzir:**
1. Faça isso
2. Depois isso
3. Observe o erro

**Logs:**
```
[Incluir stack trace ou logs aqui]
```

**Ambiente:**
- Browser: Chrome 120
- SO: macOS 14.2
- Versão do App: 2.0.0-beta
```

---

## 🚀 Performance

### Checklist de Performance

- [ ] Componentes são memoizados quando necessário
- [ ] Sem re-renders desnecessários
- [ ] Listas usam `key` prop
- [ ] Imagens são otimizadas
- [ ] Bundle size não aumentou significativamente

### Ferramentas

```bash
# Verificar bundle size
pnpm build
ls -lh dist/

# Analisar performance
pnpm dev  # Abrir DevTools > Performance
```

---

## 📚 Recursos Úteis

- [ARCHITECTURE.md](./ARCHITECTURE.md) - Arquitetura do projeto
- [design.md](./design.md) - Design de interface
- [todo.md](./todo.md) - Tarefas pendentes
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## ✅ Checklist Final

Antes de submeter um PR, verifique:

- [ ] Código segue os padrões do projeto
- [ ] Testes foram adicionados/atualizados
- [ ] Documentação foi atualizada
- [ ] Sem console.log ou código de debug
- [ ] Sem breaking changes (ou documentado)
- [ ] Branch está atualizada com main
- [ ] Commits são semânticos

---

## 🎓 Aprendizado

### Recursos Recomendados

- Clean Code by Robert C. Martin
- The Pragmatic Programmer
- React Patterns
- TypeScript Advanced Types

### Comunidade

- Discussões no GitHub
- Issues para perguntas
- Discussions para ideias

---

**Obrigado por contribuir! 🙏**

Qualquer dúvida, abra uma issue ou entre em contato com a equipe.
