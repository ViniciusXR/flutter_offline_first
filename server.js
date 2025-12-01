const express = require('express');
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Middleware para logs
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Banco de dados em memória
let tasks = [];
let nextId = 1;

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// GET - Buscar todas as tarefas
app.get('/api/tasks', (req, res) => {
  console.log(`📋 Retornando ${tasks.length} tarefa(s)`);
  res.json(tasks);
});

// GET - Buscar tarefa por ID
app.get('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (task) {
    console.log(`✅ Tarefa encontrada: ${task.title}`);
    res.json(task);
  } else {
    console.log(`❌ Tarefa ${req.params.id} não encontrada`);
    res.status(404).json({ error: 'Tarefa não encontrada' });
  }
});

// POST - Criar nova tarefa
app.post('/api/tasks', (req, res) => {
  const task = {
    ...req.body,
    id: nextId++,
    createdAt: req.body.createdAt || new Date().toISOString(),
    lastModified: req.body.lastModified || new Date().toISOString()
  };
  tasks.push(task);
  console.log(`➕ Tarefa criada: ${task.title} (ID: ${task.id})`);
  res.status(201).json(task);
});

// PUT - Atualizar tarefa existente
app.put('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(t => t.id === id);
  
  if (index !== -1) {
    const updatedTask = {
      ...req.body,
      id: id,
      lastModified: req.body.lastModified || new Date().toISOString()
    };
    tasks[index] = updatedTask;
    console.log(`✏️ Tarefa atualizada: ${updatedTask.title} (ID: ${id})`);
    console.log(`   lastModified: ${updatedTask.lastModified}`);
    res.json(updatedTask);
  } else {
    console.log(`❌ Tarefa ${id} não encontrada para atualizar`);
    res.status(404).json({ error: 'Tarefa não encontrada' });
  }
});

// DELETE - Deletar tarefa
app.delete('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(t => t.id === id);
  
  if (index !== -1) {
    const deletedTask = tasks[index];
    tasks.splice(index, 1);
    console.log(`🗑️ Tarefa deletada: ${deletedTask.title} (ID: ${id})`);
    res.status(204).send();
  } else {
    console.log(`❌ Tarefa ${id} não encontrada para deletar`);
    res.status(404).json({ error: 'Tarefa não encontrada' });
  }
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log('╔════════════════════════════════════════════╗');
  console.log('║  🚀 Backend Task Manager Offline-First    ║');
  console.log('╚════════════════════════════════════════════╝');
  console.log(`\n✅ Servidor rodando em http://localhost:${PORT}`);
  console.log(`📱 Para Android Emulator: http://10.0.2.2:${PORT}`);
  console.log(`🌐 Para dispositivo físico: http://SEU_IP:${PORT}\n`);
  console.log('Endpoints disponíveis:');
  console.log('  GET    /api/health          - Health check');
  console.log('  GET    /api/tasks           - Listar todas as tarefas');
  console.log('  GET    /api/tasks/:id       - Buscar tarefa por ID');
  console.log('  POST   /api/tasks           - Criar nova tarefa');
  console.log('  PUT    /api/tasks/:id       - Atualizar tarefa');
  console.log('  DELETE /api/tasks/:id       - Deletar tarefa');
  console.log('\n⏳ Aguardando requisições...\n');
});
