# 🧪 Modo Teste - Sem Backend

## ✅ CONFIGURAÇÃO ATUAL

O app está configurado em **MODO TESTE** para demonstrar a funcionalidade offline-first **sem precisar de um backend rodando**.

### O que isso significa?

- ✅ Você pode testar TODA a funcionalidade offline-first
- ✅ As operações são "simuladas" como se houvesse um servidor
- ✅ A fila de sincronização funciona normalmente
- ✅ Os ícones de status aparecem corretamente
- ❌ Não há integração real com servidor (ainda)

---

## 🎯 Como Usar

### 1. Testar Modo Offline

```
1. Abrir o app (já está funcionando normalmente)
2. Ativar Modo Avião no dispositivo
3. Criar/editar/deletar tarefas
4. Observar badges "Pendente" (nuvem cortada 🟠)
5. Fechar e reabrir app → dados persistem ✅
```

### 2. Testar Sincronização (Simulada)

```
1. Com tarefas pendentes na fila
2. Desativar Modo Avião
3. Observar:
   - Indicador muda para "Online" 🟢
   - Mensagem "Sincronizando..." aparece
   - Após ~2 segundos:
     ✅ "Sincronização concluída com sucesso"
     🧪 "MODO TESTE ATIVO: Operações simuladas com sucesso"
   - Badges mudam para "Sincronizado" ✅
```

### 3. Ver Logs no Console

```
I/flutter: 🧪 MODO TESTE: Simulando createTask - Minha Tarefa
I/flutter: 📤 CREATE: Minha Tarefa
I/flutter: ✅ Sincronização concluída: 1 sucesso(s), 0 erro(s)
I/flutter: 🧪 MODO TESTE ATIVO: Operações simuladas com sucesso
```

---

## 🔧 Como Desabilitar o Modo Teste (Conectar Backend Real)

### Passo 1: Configurar Backend

Siga as instruções em `BACKEND_SETUP.md` para rodar um servidor Node.js local.

### Passo 2: Desabilitar Modo Teste

**Arquivo:** `lib/services/api_service.dart` (linha ~15)

```dart
// ANTES (Modo Teste)
bool testMode = true;

// DEPOIS (Backend Real)
bool testMode = false;
```

### Passo 3: Ajustar URL da API

```dart
// Para emulador Android
final String baseUrl = 'http://10.0.2.2:3000/api/tasks';

// Para dispositivo físico (substitua pelo seu IP)
final String baseUrl = 'http://192.168.1.100:3000/api/tasks';
```

### Passo 4: Rebuild do App

```bash
flutter run
```

---

## 📊 Comparação: Modo Teste vs Backend Real

| Funcionalidade | Modo Teste 🧪 | Backend Real 🌐 |
|----------------|---------------|-----------------|
| Criar tarefas offline | ✅ | ✅ |
| Editar tarefas offline | ✅ | ✅ |
| Deletar tarefas offline | ✅ | ✅ |
| Persistência local | ✅ | ✅ |
| Fila de sincronização | ✅ | ✅ |
| Indicadores de status | ✅ | ✅ |
| Sincronização simulada | ✅ | ❌ |
| Sincronização real com servidor | ❌ | ✅ |
| Teste de conflito LWW | ❌ | ✅ |
| Dados compartilhados entre dispositivos | ❌ | ✅ |

---

## 🎓 Por que usar Modo Teste?

### ✅ Vantagens

1. **Demonstração rápida** - Não precisa configurar servidor
2. **Testes de UI** - Validar fluxos e indicadores visuais
3. **Desenvolvimento offline** - Trabalhar sem internet
4. **Prototipação** - Mostrar conceitos antes de implementar backend
5. **Validação de requisitos** - Provar que offline-first funciona

### ⚠️ Limitações

1. Não testa comunicação HTTP real
2. Não valida conflitos Last-Write-Wins com servidor
3. Não persiste dados entre dispositivos
4. Não testa timeouts e erros de rede reais

---

## 🚀 Fluxo Recomendado

### Fase 1: Validação Local (ATUAL - Modo Teste)
```
✅ Testar funcionalidade offline-first
✅ Validar persistência local
✅ Verificar indicadores visuais
✅ Demonstrar em sala de aula
```

### Fase 2: Integração Backend (Futuro)
```
⬜ Configurar backend (Node.js/Firebase/Supabase)
⬜ Desabilitar testMode
⬜ Testar sincronização real
⬜ Validar conflitos Last-Write-Wins
⬜ Deploy em produção
```

---

## 🐛 Troubleshooting

### Erro: "TimeoutException"

**Causa:** Modo teste estava desabilitado sem backend rodando

**Solução:** 
```dart
// lib/services/api_service.dart
bool testMode = true;  // ← Certifique-se que está true
```

### Sincronização não acontece

**Verificar:**
1. ✅ Modo Avião foi desativado?
2. ✅ Indicador mostra "Online"?
3. ✅ Há itens na fila? (criar tarefa offline primeiro)

### Badges não aparecem

**Solução:** Hot Reload
```bash
# No terminal ou press 'r' no console
r
```

---

## 📝 Notas Importantes

> **PARA DEMONSTRAÇÃO EM SALA:**
> - Modo Teste é **PERFEITO** para demonstrar todos os requisitos
> - Funciona **100% offline** sem depender de servidor externo
> - Mostra **TODOS** os indicadores visuais corretamente
> - Validação completa de persistência e fila de sincronização

> **PARA PRODUÇÃO:**
> - Desabilite modo teste
> - Configure backend real
> - Teste comunicação HTTP
> - Valide conflitos LWW com dados reais

---

## 🎯 Checklist de Teste (Modo Teste)

- [ ] Criar tarefa em Modo Avião
- [ ] Ver badge "Pendente" 🟠
- [ ] Fechar e reabrir app (dados persistem)
- [ ] Desativar Modo Avião
- [ ] Ver "Online" no AppBar 🟢
- [ ] Ver mensagem "Sincronizando..."
- [ ] Ver mensagem "Sincronização concluída" ✅
- [ ] Ver badge mudar para "Sincronizado" ✅
- [ ] Ver log "MODO TESTE ATIVO" no console

**Todos marcados?** 🎉 **Offline-First funcionando perfeitamente!**

---

**Status Atual:** 🧪 **MODO TESTE ATIVO**

Para ativar backend real, siga instruções acima ou consulte `BACKEND_SETUP.md`
