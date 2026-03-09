# 🛠 Correção Definitiva do Erro upload-artifact v3

## 1️⃣ Procurar em TODO o repositório

No GitHub:

1. Abra o repositório
2. Aperte `t` ou use a busca do repositório
3. Pesquise exatamente: `upload-artifact@v3`

Se aparecer em qualquer arquivo `.yml`, precisa corrigir.

---

## 2️⃣ Corrigir a versão

Trocar todas as ocorrências:

**Antes:**
```yaml
uses: actions/upload-artifact@v3
```

**Depois:**
```yaml
uses: actions/upload-artifact@v4
```

---

## 3️⃣ Verificar também download de artefatos

Procurar: `download-artifact@v3`

Trocar para: `download-artifact@v4`

---

## 4️⃣ Conferir a pasta correta

Os arquivos normalmente estão em: `.github/workflows/`

Exemplos de arquivos a verificar:
- `android-build.yml`
- `build.yml`
- `release.yml`
- `ci.yml`
- `deploy.yml`

**Todos devem ser verificados.**

---

## 5️⃣ Commit da correção

Depois de corrigir:

```bash
git add .
git commit -m "fix: update deprecated artifact actions to v4"
git push
```

---

## ⚠️ Motivo do erro

O GitHub desativou oficialmente `upload-artifact v3` em 2024, então qualquer workflow que ainda use essa versão falha automaticamente no setup job.

---

## ✅ Resultado esperado após corrigir

- ✅ Workflow roda normalmente
- ✅ Build do APK funciona
- ✅ Artefatos são enviados corretamente

---

**Dúvidas?** Verifique a documentação oficial: https://github.com/actions/upload-artifact
