# 📱 Task Manager - Implementação Offline-First

## ✅ Implementação Completa

Este aplicativo implementa completamente os requisitos de **Offline-First** conforme especificado no documento `Offiline-First.md`.

---

## 🎯 Requisitos Técnicos Implementados

### 1. ✅ Persistência Local (SQLite)

**Implementado em:** `lib/services/database_service.dart`

- ✅ Todas as tarefas são salvas localmente no SQLite **ANTES** de tentar enviar à API
- ✅ Tabela `tasks` com todos os campos necessários incluindo:
  - `lastModified` - Para resolução de conflitos Last-Write-Wins
  - `syncStatus` - Para rastrear estado de sincronização (0=synced, 1=pending)
- ✅ Tabela `sync_queue` para gerenciar fila de sincronização
- ✅ Migrações automáticas de banco de dados (versão 7)

### 2. ✅ Detector de Conectividade

**Implementado em:** `lib/services/connectivity_service.dart`

- ✅ Uso do pacote `connectivity_plus` para monitorar estado da rede
- ✅ Indicador visual no topo da tela:
  - 🟢 **Verde "Online"** quando há conexão
  - 🔴 **Vermelho "Offline"** quando sem conexão
- ✅ Stream reativo que notifica mudanças de conectividade
- ✅ Notificações via SnackBar ao mudar de estado

### 3. ✅ Fila de Sincronização

**Implementado em:** `lib/services/sync_service.dart` e `lib/models/sync_queue.dart`

- ✅ Tabela `sync_queue` no SQLite armazena todas as operações pendentes
- ✅ Cada ação CREATE/UPDATE/DELETE feita offline gera registro na fila
- ✅ Campos da fila incluem:
  - `operation` - Tipo de operação (CREATE/UPDATE/DELETE)
  - `data` - JSON da Task
  - `retryCount` - Contador de tentativas
  - `error` - Último erro de sincronização
- ✅ Sincronização automática ao detectar conexão
- ✅ Processamento sequencial da fila com retry em caso de erro

### 4. ✅ Resolução de Conflitos (Last-Write-Wins)

**Implementado em:** `lib/services/sync_service.dart` (método `_syncUpdate`)

- ✅ Comparação de timestamps `lastModified` entre versão local e servidor
- ✅ Se servidor mais recente → sobrescreve local
- ✅ Se local mais recente → envia para servidor
- ✅ Timestamp atualizado automaticamente a cada modificação

---

## 🎬 Roteiro de Demonstração

### 1. 🛫 Prova de Vida Offline

**Passos:**
1. ✅ Ativar **Modo Avião** no dispositivo
2. ✅ Criar **2 novas tarefas**
3. ✅ Editar **1 tarefa existente**
4. ✅ Observar ícones de status:
   - 🟠 Badge **"Pendente"** (nuvem cortada) em tarefas não sincronizadas
   - 🔴 Indicador **"Offline"** no AppBar

**Código relevante:**
- `lib/widgets/task_card.dart` - Badges de status de sincronização
- `lib/screens/task_list_screen.dart` - Indicador de conectividade

### 2. 💾 Persistência

**Passos:**
1. ✅ **Fechar o app completamente** (kill process)
2. ✅ **Reabrir o app** (ainda em Modo Avião)
3. ✅ Verificar que **todos os dados estão presentes**

**Garantido por:**
- Todas as operações salvam no SQLite local antes de qualquer tentativa de API
- Banco de dados persiste entre sessões

### 3. 🔄 Sincronização

**Passos:**
1. ✅ **Desativar Modo Avião** (restaurar conexão)
2. ✅ Observar:
   - 🟢 Indicador muda para **"Online"**
   - 🔄 SnackBar mostra **"ONLINE - Sincronizando..."**
   - ✅ Badges mudam de **"Pendente"** para **"Sincronizado"**
3. ✅ Verificar no backend que os dados foram enviados

**Código relevante:**
```dart
// lib/services/sync_service.dart - linha ~17
ConnectivityService.instance.connectionStream.listen((isOnline) {
  if (isOnline) {
    syncAll(); // Sincroniza automaticamente ao detectar conexão
  }
});
```

### 4. ⚔️ Prova de Conflito (Last-Write-Wins)

**Passos:**
1. ✅ No **Modo Avião**, editar uma tarefa existente (ex: mudar título para "Editado Offline")
2. ✅ Via **Postman/Thunder Client**, editar a mesma tarefa no servidor (ex: mudar título para "Editado Server")
3. ✅ Comparar timestamps:
   - Se edição offline foi **DEPOIS** → versão offline prevalece
   - Se edição servidor foi **DEPOIS** → versão servidor prevalece
4. ✅ Desativar Modo Avião e observar qual versão permaneceu

**Código relevante:**
```dart
// lib/services/sync_service.dart - método _syncUpdate
if (serverTask.lastModified.isAfter(localTask.lastModified)) {
  // Servidor vence - atualizar local
  await DatabaseService.instance.update(serverTask);
} else {
  // Local vence - enviar para servidor
  await ApiService.instance.updateTask(localTask);
}
```

---

## 🏗️ Arquitetura Implementada

```
┌─────────────────────────────────────────────────────┐
│                   UI Layer                          │
│  ┌─────────────────┐  ┌─────────────────┐          │
│  │ TaskListScreen  │  │ TaskFormScreen  │          │
│  └────────┬────────┘  └────────┬────────┘          │
└───────────┼────────────────────┼────────────────────┘
            │                    │
┌───────────▼────────────────────▼────────────────────┐
│                Service Layer                        │
│  ┌──────────────┐ ┌──────────────┐ ┌─────────────┐ │
│  │ SyncService  │ │ConnectivityS.│ │ ApiService  │ │
│  └──────┬───────┘ └──────┬───────┘ └──────┬──────┘ │
└─────────┼────────────────┼────────────────┼────────┘
          │                │                │
┌─────────▼────────────────▼────────────────▼────────┐
│              Data Layer                             │
│  ┌──────────────────────────────────────────────┐  │
│  │         DatabaseService (SQLite)             │  │
│  │  ┌──────────┐          ┌──────────────┐     │  │
│  │  │  tasks   │          │  sync_queue  │     │  │
│  │  └──────────┘          └──────────────┘     │  │
│  └──────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────┘
```

---

## 📁 Arquivos Criados/Modificados

### 🆕 Novos Arquivos

1. **`lib/models/sync_queue.dart`**
   - Model para fila de sincronização
   - Armazena operações pendentes (CREATE/UPDATE/DELETE)

2. **`lib/services/connectivity_service.dart`**
   - Monitora estado da rede
   - Emite eventos de mudança de conectividade
   - Singleton pattern para acesso global

3. **`lib/services/api_service.dart`**
   - Cliente HTTP para comunicação com backend
   - Endpoints CRUD completos
   - Timeout e tratamento de erros

4. **`lib/services/sync_service.dart`**
   - Gerencia fila de sincronização
   - Implementa Last-Write-Wins
   - Retry automático em caso de falha
   - Sincronização automática ao detectar conexão

### ✏️ Arquivos Modificados

1. **`pubspec.yaml`**
   - ➕ `connectivity_plus: ^6.0.5`
   - ➕ `http: ^1.2.0`

2. **`lib/models/task.dart`**
   - ➕ Campo `lastModified` (DateTime)
   - ➕ Campo `syncStatus` (int: 0=synced, 1=pending)
   - ➕ Getters `isSynced` e `isPending`

3. **`lib/services/database_service.dart`**
   - ➕ Tabela `sync_queue`
   - ➕ Campos `lastModified` e `syncStatus` na tabela `tasks`
   - ➕ Métodos CRUD para SyncQueue
   - ➕ Migração para versão 7

4. **`lib/screens/task_list_screen.dart`**
   - ➕ Indicador de conectividade no AppBar
   - ➕ Inicialização dos serviços de conectividade e sincronização
   - ➕ Listeners para mudanças de conectividade
   - ➕ Integração com SyncService em operações DELETE e UPDATE

5. **`lib/screens/task_form_screen.dart`**
   - ➕ Integração com SyncService em CREATE e UPDATE
   - ➕ Marca tarefas como `syncStatus=1` ao salvar

6. **`lib/widgets/task_card.dart`**
   - ➕ Badges de status de sincronização
   - 🟠 "Pendente" com ícone cloud_off
   - 🟢 "Sincronizado" com ícone cloud_done

---

## ⚙️ Configuração do Backend

### Endpoint da API

Edite `lib/services/api_service.dart` linha 12-15:

```dart
// Para emulador Android
final String baseUrl = 'http://10.0.2.2:3000/api/tasks';

// Para dispositivo físico (substitua pelo seu IP)
// final String baseUrl = 'http://192.168.1.100:3000/api/tasks';

// Para produção
// final String baseUrl = 'https://sua-api.com/api/tasks';
```

### Estrutura Esperada da API

```javascript
// GET /api/tasks - Retorna array de tasks
// GET /api/tasks/:id - Retorna task específica
// POST /api/tasks - Cria nova task
// PUT /api/tasks/:id - Atualiza task
// DELETE /api/tasks/:id - Deleta task

// Estrutura de Task:
{
  "id": 1,
  "title": "Tarefa de exemplo",
  "description": "Descrição...",
  "priority": "medium",
  "completed": false,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "lastModified": "2024-01-01T00:00:00.000Z",
  "syncStatus": 0
  // ... outros campos
}
```

---

## 🧪 Como Testar

### Pré-requisitos
1. ✅ Backend rodando (ou use mock)
2. ✅ Flutter configurado
3. ✅ Dispositivo/emulador com acesso à rede

### Teste 1: Operação Offline Completa
```bash
1. Ativar Modo Avião
2. Criar tarefas
3. Editar tarefas
4. Deletar tarefas
5. Verificar badges "Pendente"
6. Fechar e reabrir app
7. Verificar persistência
8. Desativar Modo Avião
9. Observar sincronização automática
```

### Teste 2: Conflito Last-Write-Wins
```bash
1. Criar tarefa online (deixa sincronizar)
2. Ativar Modo Avião
3. Editar tarefa offline (guardar timestamp)
4. No Postman, editar mesma tarefa (depois do timestamp offline)
5. Desativar Modo Avião
6. Verificar que versão do servidor prevaleceu
```

### Teste 3: Múltiplas Operações em Fila
```bash
1. Ativar Modo Avião
2. CREATE 3 tarefas
3. UPDATE 2 tarefas
4. DELETE 1 tarefa
5. Verificar 6 itens na fila (via debug ou query SQLite)
6. Desativar Modo Avião
7. Observar processamento sequencial
```

---

## 🎓 Notas de Implementação

### Decisões de Design

1. **Sync Status como Integer (0/1)**
   - Facilita queries SQL
   - Expansível para futuros estados (ex: 2=error)

2. **Fila Separada (sync_queue)**
   - Permite retry independente
   - Rastreamento de erros
   - Histórico de sincronização

3. **Last-Write-Wins por Timestamp**
   - Simples e eficaz
   - Sem necessidade de version vectors
   - Adequado para app single-user

4. **Sincronização Automática**
   - Inicia ao detectar conexão
   - Não bloqueia UI
   - Feedback visual ao usuário

### Melhorias Futuras Possíveis

- [ ] Sincronização em background (WorkManager)
- [ ] Compressão de fila (merge de múltiplos UPDATEs)
- [ ] Resolução de conflitos mais sofisticada (CRDTs)
- [ ] Upload de fotos para cloud storage
- [ ] Sincronização incremental (apenas mudanças)
- [ ] Modo de sincronização apenas em WiFi

---

## 📚 Referências

- [Offline-First Architecture](https://www.sqlite.org/appfileformat.html)
- [Connectivity Plus Package](https://pub.dev/packages/connectivity_plus)
- [Flutter HTTP Package](https://pub.dev/packages/http)
- [SQLite Best Practices](https://www.sqlite.org/queryplanner.html)
- [Last-Write-Wins Strategy](https://en.wikipedia.org/wiki/Eventual_consistency)

---

## 👨‍💻 Autor

Implementado seguindo estritamente as especificações do documento `Offiline-First.md`

**Data:** Novembro 2025

---

## 📝 Checklist de Validação

- [x] Persistência local implementada
- [x] Detector de conectividade funcionando
- [x] Fila de sincronização criada
- [x] Resolução de conflitos LWW implementada
- [x] Indicador visual online/offline
- [x] Ícones de status de sincronização
- [x] Operações CREATE offline
- [x] Operações UPDATE offline
- [x] Operações DELETE offline
- [x] Sincronização automática ao conectar
- [x] Persistência após fechar app
- [x] Documentação completa

**Status: ✅ IMPLEMENTAÇÃO COMPLETA**
