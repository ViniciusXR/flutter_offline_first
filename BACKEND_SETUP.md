# 🔌 Backend API - Exemplo de Implementação

Este documento fornece um exemplo de backend Node.js/Express para testar a funcionalidade offline-first do app.

## 📋 Instalação Rápida

### Opção 1: Node.js + Express

```bash
# Criar pasta do projeto
mkdir task-manager-api
cd task-manager-api

# Inicializar projeto Node
npm init -y

# Instalar dependências
npm install express cors body-parser

# Criar arquivo server.js
```

### server.js

```javascript
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Armazenamento em memória (simples para testes)
let tasks = [];
let nextId = 1;

// ==================== ENDPOINTS ====================

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// GET - Listar todas as tarefas
app.get('/api/tasks', (req, res) => {
  console.log('📥 GET /api/tasks');
  res.json(tasks);
});

// GET - Buscar tarefa por ID
app.get('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);
  
  if (task) {
    console.log(`📥 GET /api/tasks/${id} - Found`);
    res.json(task);
  } else {
    console.log(`📥 GET /api/tasks/${id} - Not Found`);
    res.status(404).json({ error: 'Tarefa não encontrada' });
  }
});

// POST - Criar nova tarefa
app.post('/api/tasks', (req, res) => {
  const newTask = {
    ...req.body,
    id: nextId++,
    lastModified: new Date().toISOString()
  };
  
  tasks.push(newTask);
  console.log(`📤 POST /api/tasks - Created ID ${newTask.id}`);
  res.status(201).json(newTask);
});

// PUT - Atualizar tarefa
app.put('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(t => t.id === id);
  
  if (index !== -1) {
    tasks[index] = {
      ...req.body,
      id: id,
      lastModified: new Date().toISOString()
    };
    console.log(`📝 PUT /api/tasks/${id} - Updated`);
    res.json(tasks[index]);
  } else {
    console.log(`📝 PUT /api/tasks/${id} - Not Found`);
    res.status(404).json({ error: 'Tarefa não encontrada' });
  }
});

// DELETE - Deletar tarefa
app.delete('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(t => t.id === id);
  
  if (index !== -1) {
    tasks.splice(index, 1);
    console.log(`🗑️ DELETE /api/tasks/${id} - Deleted`);
    res.status(204).send();
  } else {
    console.log(`🗑️ DELETE /api/tasks/${id} - Not Found`);
    res.status(404).json({ error: 'Tarefa não encontrada' });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`
  ╔════════════════════════════════════════╗
  ║   🚀 Task Manager API Running!        ║
  ║                                        ║
  ║   📡 Port: ${PORT}                        ║
  ║   🔗 http://localhost:${PORT}            ║
  ║                                        ║
  ║   Endpoints:                           ║
  ║   GET    /api/tasks                    ║
  ║   GET    /api/tasks/:id                ║
  ║   POST   /api/tasks                    ║
  ║   PUT    /api/tasks/:id                ║
  ║   DELETE /api/tasks/:id                ║
  ╚════════════════════════════════════════╝
  `);
});
```

### Rodar o servidor

```bash
node server.js
```

---

## 🧪 Testar com Thunder Client / Postman

### 1. Criar Tarefa

```http
POST http://localhost:3000/api/tasks
Content-Type: application/json

{
  "title": "Tarefa de Teste",
  "description": "Criada via API",
  "priority": "high",
  "completed": false,
  "createdAt": "2024-11-30T10:00:00.000Z"
}
```

### 2. Listar Tarefas

```http
GET http://localhost:3000/api/tasks
```

### 3. Atualizar Tarefa (para teste de conflito)

```http
PUT http://localhost:3000/api/tasks/1
Content-Type: application/json

{
  "title": "Tarefa Editada no Servidor",
  "description": "Esta versão foi editada via API",
  "priority": "urgent",
  "completed": false,
  "createdAt": "2024-11-30T10:00:00.000Z"
}
```

### 4. Deletar Tarefa

```http
DELETE http://localhost:3000/api/tasks/1
```

---

## 📱 Configuração no App Flutter

### Para Emulador Android

```dart
// lib/services/api_service.dart
final String baseUrl = 'http://10.0.2.2:3000/api/tasks';
```

### Para Dispositivo Físico

```bash
# Descobrir seu IP local
ipconfig  # Windows
ifconfig  # Mac/Linux

# Usar IP na configuração
# Exemplo: IP = 192.168.1.100
```

```dart
// lib/services/api_service.dart
final String baseUrl = 'http://192.168.1.100:3000/api/tasks';
```

**IMPORTANTE:** Certifique-se de que:
- ✅ Dispositivo e PC estão na mesma rede Wi-Fi
- ✅ Firewall permite conexões na porta 3000
- ✅ O servidor está rodando (`node server.js`)

---

## 🔍 Logs para Debugging

O servidor mostra logs úteis:

```
📥 GET /api/tasks
📤 POST /api/tasks - Created ID 1
📝 PUT /api/tasks/1 - Updated
🗑️ DELETE /api/tasks/1 - Deleted
```

---

## 🎯 Teste de Conflito Last-Write-Wins

### Cenário de Teste

1. **No app (online):**
   - Criar tarefa "Task 1"
   - Esperar sincronizar

2. **Ativar Modo Avião:**
   - Editar "Task 1" → "Task 1 - Editado Offline"
   - Timestamp: `2024-11-30T14:00:00.000Z`

3. **No Postman (enquanto app está offline):**
   ```http
   PUT http://localhost:3000/api/tasks/1
   {
     "title": "Task 1 - Editado no Servidor",
     "lastModified": "2024-11-30T14:05:00.000Z"
   }
   ```

4. **Desativar Modo Avião:**
   - App sincroniza
   - Versão do servidor prevalece (timestamp mais recente)
   - Título final: "Task 1 - Editado no Servidor"

---

## 🐛 Troubleshooting

### Erro: "Network Error" no app

**Soluções:**
1. Verificar se servidor está rodando
2. Verificar IP/porta corretos
3. Testar no navegador: `http://10.0.2.2:3000/api/health`
4. Verificar firewall do Windows

### Erro: CORS

**Solução:** Já incluído no código (`app.use(cors())`)

### Emulador não alcança localhost

**Solução:** Usar `10.0.2.2` ao invés de `localhost` ou `127.0.0.1`

---

## 📚 Alternativas ao Node.js

### JSON Server (mais rápido para protótipos)

```bash
npm install -g json-server

# Criar db.json
{
  "tasks": []
}

# Rodar
json-server --watch db.json --port 3000
```

### Firebase (produção)
- Realtime Database
- Cloud Firestore
- Autenticação integrada

### Supabase (produção)
- PostgreSQL
- APIs REST automáticas
- Auth e Storage inclusos

---

## 🎓 Recursos Adicionais

- [Express.js Documentation](https://expressjs.com/)
- [Testing REST APIs](https://www.postman.com/api-platform/api-testing/)
- [CORS Explained](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

---

**Pronto para testar!** 🚀

Agora você tem um backend funcional para validar toda a funcionalidade offline-first do aplicativo.
