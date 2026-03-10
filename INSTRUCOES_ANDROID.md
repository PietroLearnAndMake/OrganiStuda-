# 🛠 Tarefa: Criar plataforma Android para gerar APK

O pipeline do GitHub está falhando porque a pasta `android` não existe no repositório.
Sem ela o Gradle não consegue gerar o APK.

## ❌ Erro atual

```
chmod: cannot access 'android/gradlew': No such file or directory
```

Isso significa que o Android ainda não foi inicializado no projeto Capacitor.

---

## 📋 Passo 1 — Instalar dependências

Na raiz do projeto executar:

```bash
pnpm install
```

---

## 📋 Passo 2 — Build do projeto web

```bash
pnpm build
```

---

## 📋 Passo 3 — Criar plataforma Android

Executar:

```bash
npx cap add android
```

Isso irá criar a estrutura:

```
android/
android/app/
android/gradlew
android/build.gradle
android/settings.gradle
```

---

## 📋 Passo 4 — Sincronizar Capacitor

Executar:

```bash
npx cap sync
```

---

## 📋 Passo 5 — Subir a pasta para o repositório

```bash
git add android
git commit -m "feat: add android platform for CI APK build"
git push
```

---

## 📊 Resultado esperado

Depois disso o GitHub Actions vai conseguir:

- ✅ executar `gradlew`
- ✅ buildar o projeto Android
- ✅ gerar APK debug ou release
- ✅ anexar o APK nos artifacts do pipeline

---

## ⚠️ Verificação final

Confirmar que este arquivo existe no repositório:

```
android/gradlew
```

Se existir, o pipeline de build do APK funcionará corretamente.

---

## 🔗 Referências

- [Capacitor Android Documentation](https://capacitorjs.com/docs/android)
- [Gradle Documentation](https://gradle.org/docs/)
