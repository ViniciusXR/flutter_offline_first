# 📱 Task Manager Pro - Offline-First

Aplicativo completo de gerenciamento de tarefas desenvolvido em Flutter com arquitetura **Offline-First**, permitindo operação total sem internet e sincronização automática quando a conexão retornar.

---

## 📑 Índice

- [✨ Funcionalidades](#-funcionalidades)
  - [🔄 Offline-First (NOVO!)](#-offline-first-novo)
  - [📝 Gerenciamento de Tarefas](#-gerenciamento-de-tarefas)
  - [📷 Câmera e Galeria](#-câmera-e-galeria)
  - [📍 GPS e Localização](#-gps-e-localização)
  - [📳 Sensores](#-sensores)
  - [🎨 Interface](#-interface)
- [🎯 O que é Offline-First?](#-o-que-é-offline-first)
- [🔄 Antes e Depois da Implementação](#-antes-e-depois-da-implementação)
- [🛠️ Tecnologias Utilizadas](#️-tecnologias-utilizadas)
- [🚀 Como Executar](#-como-executar)
- [📊 Estrutura do Projeto](#-estrutura-do-projeto)
- [📱 Permissões Necessárias](#-permissões-necessárias)
- [🎬 Como Demonstrar Offline-First](#-como-demonstrar-offline-first)
- [🖥️ Backend](#️-backend)
- [⚙️ Configuração de Modo](#️-configuração-de-modo)
- [🔧 Detalhes Técnicos](#-detalhes-técnicos)
- [🐛 Solução de Problemas](#-solução-de-problemas)
- [📝 Licença](#-licença)
- [👨‍💻 Desenvolvido por](#-desenvolvido-por)

---

## ✨ Funcionalidades

### 🔄 Offline-First (NOVO!)

**A principal funcionalidade deste projeto!**

- ✅ **Operação 100% offline** - Crie, edite e delete tarefas sem internet
- ✅ **Persistência local SQLite** - Dados salvos instantaneamente no dispositivo
- ✅ **Fila de sincronização** - Todas as operações offline são enfileiradas
- ✅ **Sincronização automática** - Ao detectar conexão, sincroniza automaticamente
- ✅ **Indicador visual de conectividade** - Badge Online (🟢) / Offline (🔴) no AppBar
- ✅ **Status de sincronização por tarefa** - Badges "Pendente" (🟠) / "Sincronizado" (✅)
- ✅ **Resolução de conflitos Last-Write-Wins** - Versão mais recente prevalece
- ✅ **Modo Teste** - Demonstre offline-first sem precisar de backend
- ✅ **Notificações de sincronização** - Feedback visual de todas as operações
- ✅ **Retry automático** - Tentativas automáticas em caso de falha
- ✅ **Rastreamento de erros** - Log completo de problemas de sincronização

### 📝 Gerenciamento de Tarefas
- ✅ Criar, editar e excluir tarefas (online ou offline)
- ✅ Marcar tarefas como completas
- ✅ Níveis de prioridade (Baixa, Média, Alta, Urgente)
- ✅ Descrição opcional para cada tarefa
- ✅ Data de criação e última modificação automáticas
- ✅ Timestamps para resolução de conflitos

### 📷 Câmera e Galeria
- ✅ **Tirar fotos** com a câmera do dispositivo
- ✅ **Selecionar foto da galeria** (seleção única)
- ✅ **Selecionar múltiplas fotos da galeria** (até 10 fotos por tarefa)
- ✅ Visualizar fotos em galeria interativa fullscreen
- ✅ Swipe entre fotos com navegação fluida
- ✅ Zoom e pan nas fotos (pinça para ampliar)
- ✅ Armazenamento local das imagens
- ✅ Remover fotos individuais ou todas de uma vez
- ✅ Miniaturas com scroll horizontal
- ✅ Contador visual de fotos
- ✅ Preview inteligente no card (grid 2x2 para múltiplas fotos)

### 📍 GPS e Localização
- ✅ Adicionar localização às tarefas
- ✅ Obter localização atual automaticamente
- ✅ Geocodificação reversa (converter coordenadas em endereço)
- ✅ Filtrar tarefas por proximidade
- ✅ Formatação visual de coordenadas

### 📳 Sensores
- ✅ Detecção de shake (agitar o celular)
- ✅ r tarefas rapidamente por shake
- ✅ Feedback tátil (vibração)
- ✅ Diálogo de seleção ao detectar shake

### 🎨 Interface
- ✅ Design moderno com Material Design 3
- ✅ Filtros de tarefas (Todas, Pendentes, Concluídas, Próximas)
- ✅ Cards coloridos por prioridade
- ✅ Animações e transições suaves
- ✅ Estatísticas visuais (Total, Concluídas, Taxa de conclusão)
- ✅ Indicadores de estado (Online/Offline, Pendente/Sincronizado)
- ✅ Badges informativos (Fotos, Localização, Shake, Sync)

---

## 🎯 O que é Offline-First?

**Offline-First** é uma arquitetura de desenvolvimento onde o aplicativo é projetado para funcionar **primeiramente offline**, tratando a conexão com internet como um bônus, não como requisito.

### 🔑 Princípios Fundamentais

1. **Persistência Local como Prioridade**
   - Todos os dados são salvos localmente **PRIMEIRO**
   - SQLite armazena tudo no dispositivo
   - Operações instantâneas sem depender de rede

2. **Fila de Sincronização**
   - Operações offline são registradas em uma fila
   - Quando conexão retorna, fila é processada automaticamente
   - Retry automático em caso de falha

3. **Resolução de Conflitos**
   - **Last-Write-Wins (LWW)**: Versão com timestamp mais recente vence
   - Comparação de `lastModified` entre versão local e servidor
   - Sobrescreve automaticamente a versão mais antiga

4. **Feedback Visual**
   - Usuário sempre sabe se está online ou offline
   - Status de sincronização visível em cada tarefa
   - Notificações claras de sucesso/erro

### 💡 Por que Offline-First?

✅ **Melhor experiência do usuário**
- App funciona mesmo sem internet (metrô, avião, áreas rurais)
- Sem espera por carregamentos
- Resposta instantânea a todas as ações

✅ **Maior confiabilidade**
- Dados nunca perdidos
- Sincronização em background
- Tolerante a falhas de rede

✅ **Performance superior**
- Leitura/escrita local é 100x mais rápida que API
- Sem latência de rede
- Interface sempre responsiva

### 🏗️ Arquitetura Implementada

```
┌─────────────────────────────────────────────┐
│           UI Layer (Flutter)                │
│  TaskListScreen | TaskFormScreen            │
└───────────────┬─────────────────────────────┘
                │
┌───────────────▼─────────────────────────────┐
│         Service Layer                       │
│  ┌──────────────┐  ┌──────────────┐         │
│  │ SyncService  │  │Connectivity  │         │
│  │ (fila, LWW)  │  │  Service     │         │
│  └──────┬───────┘  └───────┬──────┘         │
│         │                  │                │
│  ┌──────▼──────────────────▼───────┐        │
│  │    ApiService (HTTP)            │        │
│  └─────────────────────────────────┘        │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│        Data Layer (SQLite)                  │
│  ┌─────────────┐  ┌──────────────┐          │
│  │   tasks     │  │  sync_queue  │          │
│  │  (dados)    │  │  (operações) │          │
│  └─────────────┘  └──────────────┘          │
└─────────────────────────────────────────────┘
```

### 📋 Fluxo de Operação

**Online:**
```
Usuário cria tarefa
    ↓
Salva no SQLite ✅
    ↓
Adiciona à sync_queue
    ↓
Envia para API imediatamente
    ↓
Remove da fila se sucesso
    ↓
Atualiza status: "Sincronizado" ✅
```

**Offline:**
```
Usuário cria tarefa (sem internet)
    ↓
Salva no SQLite ✅
    ↓
Adiciona à sync_queue
    ↓
Marca como "Pendente" 🟠
    ↓
(espera conexão...)
    ↓
Detecta internet 🟢
    ↓
Processa fila automaticamente
    ↓
Envia para API
    ↓
Atualiza status: "Sincronizado" ✅
```

---

## 🔄 Antes e Depois da Implementação

### ❌ ANTES (Versão Inicial)

**Características:**
- ✅ Apenas persistência local (SQLite)
- ✅ Câmera e múltiplas fotos
- ✅ GPS e sensores
- ❌ **Sem sincronização com servidor**
- ❌ **Sem indicadores de conectividade**
- ❌ **Sem fila de operações offline**
- ❌ **Sem resolução de conflitos**

**Limitações:**
- Dados existiam apenas no dispositivo local
- Sem backup em nuvem
- Impossível compartilhar tarefas entre dispositivos
- Perda total de dados ao desinstalar app

**Arquivos principais:**
```
lib/
├── models/task.dart (6 campos)
├── services/database_service.dart (v6)
└── screens/task_list_screen.dart
```

### ✅ DEPOIS (Offline-First Completo)

**Características:**
- ✅ Persistência local (SQLite)
- ✅ Câmera e múltiplas fotos
- ✅ GPS e sensores
- ✅ **Sincronização automática com servidor**
- ✅ **Indicador visual Online/Offline**
- ✅ **Fila de sincronização persistente**
- ✅ **Resolução de conflitos Last-Write-Wins**
- ✅ **Modo Teste (funciona sem backend)**
- ✅ **Badges de status por tarefa**
- ✅ **Retry automático**
- ✅ **Notificações de sincronização**

**Melhorias:**
- ✅ Dados sincronizados na nuvem
- ✅ Backup automático
- ✅ Compartilhamento entre dispositivos (com backend real)
- ✅ Funciona 100% offline
- ✅ Sincronização inteligente ao reconectar
- ✅ Feedback visual completo

**Arquivos adicionados/modificados:**

```diff
lib/
├── models/
│   ├── task.dart (8 campos: +lastModified, +syncStatus)
+   └── sync_queue.dart (NOVO)
├── services/
│   ├── database_service.dart (v6 → v7: +sync_queue table)
+   ├── connectivity_service.dart (NOVO)
+   ├── api_service.dart (NOVO)
+   └── sync_service.dart (NOVO)
├── screens/
│   ├── task_list_screen.dart (+indicador conectividade, +listeners)
│   └── task_form_screen.dart (+integração sync)
└── widgets/
    └── task_card.dart (+badges sync status)
```

**Dependências adicionadas:**
```yaml
# pubspec.yaml
+ connectivity_plus: ^6.0.5  # Detector de rede
+ http: ^1.2.0              # Cliente HTTP
```

### 📊 Comparação Visual

| Aspecto | ANTES | DEPOIS |
|---------|-------|--------|
| **Funciona offline** | ✅ | ✅ |
| **Persistência local** | ✅ | ✅ |
| **Sincronização servidor** | ❌ | ✅ |
| **Indicador conectividade** | ❌ | ✅ (🟢/🔴) |
| **Fila de sincronização** | ❌ | ✅ (sync_queue) |
| **Resolução de conflitos** | ❌ | ✅ (LWW) |
| **Badges status** | ❌ | ✅ (Pendente/Sincronizado) |
| **Modo Teste** | ❌ | ✅ |
| **Notificações sync** | ❌ | ✅ |
| **Retry automático** | ❌ | ✅ |
| **Timestamps** | createdAt | createdAt + lastModified |
| **Tabelas BD** | 1 (tasks) | 2 (tasks + sync_queue) |
| **Versão BD** | v6 | v7 |

### 🎯 Mudanças Específicas no Código

#### 1. **Model Task** (task.dart)
```dart
// ANTES
class Task {
  final DateTime createdAt;
  // ...
}

// DEPOIS
class Task {
  final DateTime createdAt;
  final DateTime lastModified;    // NOVO: para LWW
  final int syncStatus;           // NOVO: 0=synced, 1=pending
  
  bool get isSynced => syncStatus == 0;   // NOVO
  bool get isPending => syncStatus == 1;  // NOVO
}
```

#### 2. **Database Service** (database_service.dart)
```dart
// ANTES: v6, apenas tasks
CREATE TABLE tasks (...)

// DEPOIS: v7, tasks + sync_queue
CREATE TABLE tasks (
  ...,
  lastModified TEXT,     // NOVO
  syncStatus INTEGER     // NOVO
)

CREATE TABLE sync_queue (  // TABELA NOVA
  id INTEGER PRIMARY KEY,
  taskId INTEGER,
  operation TEXT,
  data TEXT,
  createdAt TEXT,
  retryCount INTEGER,
  error TEXT
)
```

#### 3. **Task List Screen** (task_list_screen.dart)
```dart
// ANTES: apenas lista tarefas
AppBar(title: Text('Minhas Tarefas'))

// DEPOIS: com indicador de conectividade
AppBar(
  title: Row(
    children: [
      Text('Minhas Tarefas'),
      // NOVO: Badge Online/Offline
      Container(
        child: Row([
          Icon(_isOnline ? cloud_done : cloud_off),
          Text(_isOnline ? 'Online' : 'Offline'),
        ])
      )
    ]
  )
)

// NOVO: Listeners de conectividade
ConnectivityService.instance.connectionStream.listen(...)
SyncService.instance.syncStatusStream.listen(...)
```

#### 4. **Task Card** (task_card.dart)
```dart
// ANTES: apenas badges de prioridade, fotos, etc
Wrap(children: [
  // Prioridade, Fotos, Localização...
])

// DEPOIS: + badges de sincronização
Wrap(children: [
  // Prioridade, Fotos, Localização...
  
  // NOVO: Status de sincronização
  if (task.isPending)
    Badge(icon: cloud_off, text: 'Pendente'),
  else if (task.isSynced)
    Badge(icon: cloud_done, text: 'Sincronizado'),
])
```

#### 5. **Task Form Screen** (task_form_screen.dart)
```dart
// ANTES: apenas salva localmente
await DatabaseService.instance.create(newTask);

// DEPOIS: salva + enfileira para sync
final created = await DatabaseService.instance.create(newTask);

// NOVO: Adiciona à fila de sincronização
await SyncService.instance.queueOperation(
  operation: 'CREATE',
  task: created,
);
```

---

## 🛠️ Tecnologias Utilizadas

### Core
- **Flutter** ^3.9.2 & **Dart** - Framework multiplataforma
- **Material Design 3** - Design system moderno

### Persistência e Sincronização
- **sqflite** ^2.3.0 - Banco de dados SQLite local
- **path_provider** ^2.1.1 - Diretórios do sistema
- **connectivity_plus** ^6.0.5 - **[NOVO]** Detector de conectividade
- **http** ^1.2.0 - **[NOVO]** Cliente HTTP para API

### Multimídia
- **camera** ^0.10.5+9 - Acesso à câmera nativa
- **image_picker** ^1.0.7 - Seleção de imagens da galeria

### Localização
- **geolocator** ^10.1.0 - GPS e geolocalização
- **geocoding** ^2.1.1 - Geocodificação reversa

### Sensores e Feedback
- **sensors_plus** ^4.0.2 - Acelerômetro (shake detection)
- **vibration** ^2.0.0 - Feedback tátil
- **permission_handler** ^11.3.1 - Gerenciamento de permissões

### Utilidades
- **uuid** ^4.2.1 - Geração de IDs únicos
- **intl** ^0.19.0 - Formatação de datas
- **flutter_local_notifications** ^17.2.3 - Notificações locais
- **timezone** ^0.9.4 - Gerenciamento de fusos horários

---

## 🚀 Como Executar

### 1️⃣ Clone o repositório
```bash
git clone https://github.com/ViniciusXR/flutter_offline_first.git
cd flutter_offline_first
```

### 2️⃣ Instale as dependências
```bash
flutter pub get
```

### 3️⃣ Execute o aplicativo
```bash
flutter run
```

### 4️⃣ (Opcional) Configurar Backend Real

**IMPORTANTE:** O app vem configurado em **MODO TESTE** e funciona perfeitamente sem backend!

Para conectar a um backend real, veja a seção [🖥️ Backend](#️-backend) abaixo.

---

## 📊 Estrutura do Projeto

```
lib/
├── main.dart
├── models/
│   ├── task.dart                    # Model com lastModified e syncStatus
│   └── sync_queue.dart              # 🆕 Model para fila de sincronização
├── screens/
│   ├── task_list_screen.dart        # ✏️ Com indicador conectividade
│   ├── task_form_screen.dart        # ✏️ Com integração sync
│   └── camera_screen.dart
├── services/
│   ├── database_service.dart        # ✏️ v7 com sync_queue
│   ├── camera_service.dart
│   ├── location_service.dart
│   ├── sensor_service.dart
│   ├── connectivity_service.dart    # 🆕 Monitor de rede
│   ├── api_service.dart             # 🆕 Cliente HTTP
│   └── sync_service.dart            # 🆕 Gerenciador de sincronização
└── widgets/
    ├── task_card.dart               # ✏️ Com badges de sync
    └── location_picker.dart

Documentação/
├── README.md                        # ✏️ Este arquivo
├── OFFLINE_FIRST_IMPLEMENTATION.md  # 🆕 Documentação técnica completa
├── BACKEND_SETUP.md                 # 🆕 Como configurar backend
├── MODO_TESTE.md                    # 🆕 Guia do modo teste
└── Offiline-First.md                # Especificação original
```

**Legenda:**
- 🆕 = Arquivo novo (offline-first)
- ✏️ = Arquivo modificado (offline-first)

---

## 📱 Permissões Necessárias

### Android (`android/app/src/main/AndroidManifest.xml`)
```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.VIBRATE" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

### iOS (`ios/Runner/Info.plist`)
```xml
<key>NSCameraUsageDescription</key>
<string>Precisamos de acesso à câmera para tirar fotos das tarefas</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>Precisamos de acesso à galeria para selecionar fotos</string>
<key>NSLocationWhenInUseUsageDescription</key>
<string>Precisamos de sua localização para tarefas baseadas em GPS</string>
```

---

## 🎬 Como Demonstrar Offline-First

Siga este roteiro para demonstrar todas as funcionalidades:

### 1. 🛫 Prova de Vida Offline

1. ✅ **Ativar Modo Avião** no dispositivo
2. ✅ Observar indicador mudar para 🔴 **"Offline"**
3. ✅ **Criar 2 novas tarefas**
   - Ex: "Comprar pão", "Estudar Flutter"
4. ✅ **Editar 1 tarefa existente**
   - Mudar título ou prioridade
5. ✅ **Observar badges** nas tarefas:
   - 🟠 **"Pendente"** (nuvem cortada)
   - Ícone de nuvem offline

**Resultado esperado:**
```
✅ Tarefas criadas localmente
✅ Badges "Pendente" visíveis
✅ App totalmente funcional offline
```

### 2. 💾 Persistência

1. ✅ **Fechar o app completamente**
   - Matar processo ou fechar emulador
2. ✅ **Reabrir o app** (ainda em Modo Avião)
3. ✅ **Verificar** que todos os dados estão presentes

**Resultado esperado:**
```
✅ Todas as tarefas offline ainda estão lá
✅ Status "Pendente" preservado
✅ Fotos e dados intactos
```

### 3. 🔄 Sincronização

1. ✅ **Desativar Modo Avião** (restaurar conexão)
2. ✅ **Observar mudanças**:
   - Indicador muda para 🟢 **"Online"**
   - SnackBar: "🟢 ONLINE - Sincronizando..."
   - Aguardar ~2 segundos
   - SnackBar: "✅ Sincronização concluída com sucesso"
3. ✅ **Verificar badges**:
   - Mudam de 🟠 "Pendente" para ✅ "Sincronizado"

**Logs esperados no console:**
```
I/flutter: 🟢 ONLINE
I/flutter: 🔄 Conexão restaurada - iniciando sincronização...
I/flutter: 📋 2 operação(ões) na fila
I/flutter: 🧪 MODO TESTE: Simulando createTask - Comprar pão
I/flutter: 📤 CREATE: Comprar pão
I/flutter: 🧪 MODO TESTE: Simulando createTask - Estudar Flutter
I/flutter: 📤 CREATE: Estudar Flutter
I/flutter: ✅ Sincronização concluída: 2 sucesso(s), 0 erro(s)
I/flutter: 🧪 MODO TESTE ATIVO: Operações simuladas com sucesso
```

### 4. ⚔️ Prova de Conflito (com Backend Real)

**Nota:** Requer `testMode = false` e backend rodando.

1. ✅ **Criar tarefa online** e esperar sincronizar
2. ✅ **Ativar Modo Avião**
3. ✅ **Editar tarefa offline**
   - Ex: "Tarefa 1" → "Tarefa 1 - Editado Offline"
   - Timestamp: 14:00:00
4. ✅ **Via Postman**, editar mesma tarefa no servidor
   - Ex: "Tarefa 1" → "Tarefa 1 - Editado Server"
   - Timestamp: 14:05:00 (mais recente)
5. ✅ **Desativar Modo Avião**
6. ✅ **Observar resultado**:
   - Versão do servidor prevalece (LWW)
   - Título final: "Tarefa 1 - Editado Server"

---

## 🖥️ Backend

### 🎯 Visão Geral

O projeto inclui um backend simples em **Node.js/Express** para demonstrar a sincronização Offline-First. O backend armazena dados em memória e é ideal para testes e demonstrações.

**Características:**
- ✅ API RESTful completa (CRUD)
- ✅ Armazenamento em memória (perfeito para testes)
- ✅ Logs detalhados de todas as operações
- ✅ Suporte a timestamps para LWW (Last-Write-Wins)
- ✅ Health check endpoint
- ✅ Fácil configuração (2 comandos)

### 📦 Instalação

No diretório raiz do projeto:

```bash
# Instalar dependências
npm install

# Iniciar servidor
npm start
```

O servidor estará rodando em:
- **http://localhost:3000** (local)
- **http://10.0.2.2:3000** (Android Emulator)

### 🔌 Endpoints da API

| Método | Endpoint | Descrição | Body |
|--------|----------|-----------|------|
| GET | `/api/health` | Health check | - |
| GET | `/api/tasks` | Listar todas as tarefas | - |
| GET | `/api/tasks/:id` | Buscar tarefa por ID | - |
| POST | `/api/tasks` | Criar nova tarefa | Task JSON |
| PUT | `/api/tasks/:id` | Atualizar tarefa | Task JSON |
| DELETE | `/api/tasks/:id` | Deletar tarefa | - |

### 🧪 Testar com Postman/cURL

#### Health Check
```bash
curl http://localhost:3000/api/health
```

**Resposta:**
```json
{
  "status": "ok",
  "timestamp": "2025-11-30T14:00:00.000Z"
}
```

#### Criar Tarefa
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Minha Tarefa",
    "description": "Descrição da tarefa",
    "priority": "high",
    "isCompleted": false,
    "createdAt": "2025-11-30T14:00:00.000Z",
    "lastModified": "2025-11-30T14:00:00.000Z"
  }'
```

**Resposta:**
```json
{
  "id": 1,
  "title": "Minha Tarefa",
  "description": "Descrição da tarefa",
  "priority": "high",
  "isCompleted": false,
  "createdAt": "2025-11-30T14:00:00.000Z",
  "lastModified": "2025-11-30T14:00:00.000Z"
}
```

#### Listar Tarefas
```bash
curl http://localhost:3000/api/tasks
```

#### Atualizar Tarefa
```bash
curl -X PUT http://localhost:3000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{
    "id": 1,
    "title": "Tarefa EDITADA",
    "description": "Editada via API",
    "priority": "urgent",
    "isCompleted": false,
    "lastModified": "2025-11-30T15:00:00.000Z"
  }'
```

#### Deletar Tarefa
```bash
curl -X DELETE http://localhost:3000/api/tasks/1
```

### ⚙️ Configurar no App Flutter

#### 1. Desabilitar Modo Teste

Edite `lib/services/api_service.dart`:

```dart
// Linha 20
bool testMode = false;  // Mude de true para false
```

#### 2. Configurar URL do Backend

**Para Android Emulator:**
```dart
// Linha 15
final String baseUrl = 'http://10.0.2.2:3000/api/tasks';
```

**Para Dispositivo Físico:**
```dart
// Use seu IP local (descubra com `ipconfig` no Windows ou `ifconfig` no Mac/Linux)
final String baseUrl = 'http://192.168.1.100:3000/api/tasks';
```

**Importante:** Certifique-se de que o celular e o computador estão na **mesma rede WiFi**!

#### 3. Rebuild do App

```bash
flutter run
```

### 🧪 Teste de Conflito (LWW)

#### Cenário 1: Servidor Vence (Timestamp mais recente)

1. **📱 App (Online):** Crie tarefa "Teste Conflito"
2. **✈️ App:** Ative Modo Avião
3. **📱 App (Offline):** Edite para "Teste Conflito - APP" (timestamp: 14:00:00)
4. **💻 Postman:** Edite para "Teste Conflito - SERVIDOR" (timestamp: 14:05:00 - mais recente!)
   ```bash
   curl -X PUT http://localhost:3000/api/tasks/1 \
     -H "Content-Type: application/json" \
     -d '{
       "id": 1,
       "title": "Teste Conflito - SERVIDOR",
       "lastModified": "2025-11-30T14:05:00.000Z"
     }'
   ```
5. **🌐 App:** Desative Modo Avião
6. **✅ Resultado:** Título fica "Teste Conflito - SERVIDOR" (versão do servidor prevalece)

**Logs esperados:**
```
🔄 Conexão restaurada - iniciando sincronização...
📋 1 operação(ões) na fila
📤 UPDATE: Teste Conflito - APP
⬇️ Servidor mais recente - atualizando local
✅ Sincronização concluída: 1 sucesso(s), 0 erro(s)
```

#### Cenário 2: App Vence (Timestamp mais recente)

1. **📱 App (Online):** Crie tarefa "Teste 2"
2. **💻 Postman:** Edite para "Teste 2 - SERVIDOR" (timestamp: 14:00:00 - mais antigo)
3. **✈️ App:** Ative Modo Avião
4. **📱 App (Offline):** Edite para "Teste 2 - APP" (timestamp: 14:10:00 - mais recente!)
5. **🌐 App:** Desative Modo Avião
6. **✅ Resultado:** Título fica "Teste 2 - APP" (versão do app prevalece)

**Logs esperados:**
```
📤 UPDATE: Teste 2 - APP
⬆️ Local mais recente - atualizando servidor
✅ Sincronização concluída: 1 sucesso(s), 0 erro(s)
```

### 📊 Logs do Servidor

O servidor mostra logs detalhados de todas as operações:

```
╔════════════════════════════════════════════╗
║  Backend Task Manager Offline-First        ║
╚════════════════════════════════════════════╝

✅ Servidor rodando em http://localhost:3000
📱 Para Android Emulator: http://10.0.2.2:3000
🌐 Para dispositivo físico: http://SEU_IP:3000

Endpoints disponíveis:
  GET    /api/health          - Health check
  GET    /api/tasks           - Listar todas as tarefas
  GET    /api/tasks/:id       - Buscar tarefa por ID
  POST   /api/tasks           - Criar nova tarefa
  PUT    /api/tasks/:id       - Atualizar tarefa
  DELETE /api/tasks/:id       - Deletar tarefa

⏳ Aguardando requisições...

2025-11-30T14:00:00.000Z - POST /api/tasks
➕ Tarefa criada: Minha Tarefa (ID: 1)

2025-11-30T14:05:00.000Z - PUT /api/tasks/1
✏️ Tarefa atualizada: Tarefa Editada (ID: 1)
   lastModified: 2025-11-30T14:05:00.000Z

2025-11-30T14:10:00.000Z - GET /api/tasks
📋 Retornando 1 tarefa(s)
```

### ⚠️ Notas Importantes

- ✅ Dados armazenados **em memória** (perdidos ao reiniciar)
- ✅ Perfeito para **testes e demonstrações**
- ✅ **Não requer** banco de dados
- ❌ **Não usar** em produção real

### 🐛 Troubleshooting do Backend

#### Erro "Cannot find module 'express'"

```bash
npm install
```

#### App não conecta ao servidor

**Verificações:**
1. ✅ Servidor está rodando? (`npm start`)
2. ✅ Health check funciona? (`curl http://localhost:3000/api/health`)
3. ✅ Firewall permite porta 3000?
4. ✅ App e PC na mesma WiFi? (para dispositivo físico)
5. ✅ URL correta no `api_service.dart`?
6. ✅ `testMode = false`?

**Para Android Emulator:**
- Use `http://10.0.2.2:3000` (não `localhost`)

**Para Dispositivo Físico:**
- Descubra seu IP local:
  ```bash
  # Windows
  ipconfig
  
  # Mac/Linux
  ifconfig
  ```
- Use `http://SEU_IP:3000`
- Certifique-se de estar na mesma rede WiFi

---

## ⚙️ Configuração de Modo

### 🧪 Modo Teste (Atual - Padrão)

**Vantagens:**
- ✅ Funciona sem backend
- ✅ Demonstra todas as funcionalidades
- ✅ Ideal para apresentações
- ✅ Sincronização simulada

**Configuração:**
```dart
// lib/services/api_service.dart (linha 15)
bool testMode = true;  // ← MODO TESTE ATIVO
```

### 🌐 Modo Backend Real

**Requisitos:**
- Backend Node.js/Express rodando
- Endpoints REST implementados
- Conectividade de rede

**Configuração:**
```dart
// lib/services/api_service.dart

// 1. Desabilitar modo teste
bool testMode = false;

// 2. Configurar URL
// Para emulador Android:
final String baseUrl = 'http://10.0.2.2:3000/api/tasks';

// Para dispositivo físico (use seu IP local):
final String baseUrl = 'http://192.168.1.100:3000/api/tasks';
```

**Como obter seu IP:**
```bash
# Windows
ipconfig

# Mac/Linux
ifconfig
```

**Rebuild:**
```bash
flutter run
```

---

## 🔧 Detalhes Técnicos

### 🗄️ Estrutura do Banco de Dados (SQLite v7)

#### Tabela `tasks`
```sql
CREATE TABLE tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  priority TEXT NOT NULL,
  completed INTEGER NOT NULL,
  createdAt TEXT NOT NULL,
  photoPaths TEXT,              -- paths separados por |
  completedAt TEXT,
  completedBy TEXT,
  latitude REAL,
  longitude REAL,
  locationName TEXT,
  lastModified TEXT NOT NULL,   -- 🆕 Para Last-Write-Wins
  syncStatus INTEGER DEFAULT 0  -- 🆕 0=synced, 1=pending
)
```

#### Tabela `sync_queue` 🆕
```sql
CREATE TABLE sync_queue (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  taskId INTEGER,               -- NULL para DELETE
  operation TEXT NOT NULL,      -- CREATE, UPDATE, DELETE
  data TEXT,                    -- JSON da Task
  createdAt TEXT NOT NULL,
  retryCount INTEGER DEFAULT 0,
  error TEXT                    -- Último erro
)
```

### 🔄 Fluxo de Sincronização

```
┌─────────────────────────────────────────┐
│  1. Usuário faz ação (CREATE/UPDATE/    │
│     DELETE) offline                     │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│  2. Salva no SQLite (tasks)             │
│     syncStatus = 1 (pendente)           │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│  3. Adiciona à fila (sync_queue)        │
│     operation, data, createdAt          │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│  4. ConnectivityService detecta         │
│     mudança para ONLINE                 │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│  5. SyncService.syncAll() é chamado     │
│     automaticamente                     │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│  6. Para cada item na fila:             │
│     - CREATE: ApiService.createTask()   │
│     - UPDATE: Compara lastModified (LWW)│
│     - DELETE: ApiService.deleteTask()   │
└──────────────┬──────────────────────────┘
               │
        ┌──────┴──────┐
        │             │
┌───────▼──────┐ ┌────▼───────┐
│   SUCESSO    │ │   ERRO     │
└───────┬──────┘ └───┬────────┘
        │            │
┌───────▼──────┐ ┌───▼─────────────┐
│ Remove da    │ │ Incrementa      │
│ sync_queue   │ │ retryCount      │
│              │ │ Salva erro      │
└───────┬──────┘ └───┬─────────────┘
        │            │
┌───────▼────────────▼─────┐
│ Atualiza syncStatus:     │
│ 0 (synced) ou            │
│ 1 (pending se erro)      │
└──────────────────────────┘
```

### 🏆 Last-Write-Wins (LWW) - Resolução de Conflitos

```dart
// lib/services/sync_service.dart - _syncUpdate()

// 1. Buscar versão do servidor
final serverTask = await ApiService.instance.fetchTask(localTask.id!);

// 2. Comparar timestamps
if (serverTask.lastModified.isAfter(localTask.lastModified)) {
  // ⬇️ SERVIDOR VENCE
  print('⬇️ Servidor mais recente - atualizando local');
  await DatabaseService.instance.update(serverTask);
  
} else {
  // ⬆️ LOCAL VENCE
  print('⬆️ Local mais recente - atualizando servidor');
  await ApiService.instance.updateTask(localTask);
}
```

**Exemplo prático:**
```
Tarefa ID=1:
├─ Versão Local:  lastModified = 2024-11-30T14:00:00Z
└─ Versão Server: lastModified = 2024-11-30T14:05:00Z

Resultado: Servidor vence (14:05 > 14:00)
→ Versão local sobrescrita com dados do servidor
```

### 📊 Estados de Sincronização

```dart
// Valores de syncStatus
0 = Sincronizado ✅
1 = Pendente 🟠

// Getters auxiliares (task.dart)
bool get isSynced => syncStatus == 0;
bool get isPending => syncStatus == 1;
```

### 🔄 Migração de Banco de Dados

```dart
// v6 → v7 (database_service.dart)

if (oldVersion < 7) {
  // Adicionar campos às tasks
  await db.execute('ALTER TABLE tasks ADD COLUMN lastModified TEXT');
  await db.execute('ALTER TABLE tasks ADD COLUMN syncStatus INTEGER DEFAULT 0');
  
  // Preencher lastModified com createdAt
  await db.execute('''
    UPDATE tasks 
    SET lastModified = createdAt 
    WHERE lastModified IS NULL
  ''');
  
  // Criar tabela sync_queue
  await db.execute('''
    CREATE TABLE sync_queue (...)
  ''');
}
```

### 🎨 Indicadores Visuais

#### AppBar - Status de Conectividade
```dart
Container(
  color: _isOnline ? Colors.green : Colors.red,
  child: Row([
    Icon(_isOnline ? Icons.cloud_done : Icons.cloud_off),
    Text(_isOnline ? 'Online' : 'Offline'),
  ])
)
```

#### TaskCard - Badges de Sincronização
```dart
if (task.isPending)
  Badge(
    icon: Icons.cloud_off,
    color: Colors.orange,
    text: 'Pendente'
  )
else if (task.isSynced)
  Badge(
    icon: Icons.cloud_done,
    color: Colors.teal,
    text: 'Sincronizado'
  )
```

---


## 🐛 Solução de Problemas

### Erro de banco de dados (coluna ausente)
**Solução:** Desinstale e reinstale completamente:
```bash
flutter run --uninstall-first
```

### Timeout ao sincronizar (TimeoutException)
**Causa:** Modo teste desabilitado sem backend rodando

**Solução:**
```dart
// lib/services/api_service.dart
bool testMode = true;  // ← Ative o modo teste
```

### Sincronização não acontece
**Verificações:**
1. ✅ Desativou Modo Avião?
2. ✅ Indicador mostra "Online" 🟢?
3. ✅ Há tarefas com badge "Pendente" 🟠?
4. ✅ Aguardou ~2 segundos?

**Debug:**
```bash
# Ver logs no console
flutter run --verbose
```

### Badges não aparecem
**Solução:** Hot Reload
```bash
# No terminal Flutter
r  # ← pressione 'r'
```

### Fotos não aparecem
**Verificações:**
1. ✅ Permissões de câmera concedidas?
2. ✅ Permissões de galeria concedidas?
3. ✅ Espaço em disco disponível?

### Backend não conecta
**Para dispositivo físico:**
1. Dispositivo e PC na mesma rede Wi-Fi
2. Firewall permite porta 3000
3. Use IP local, não localhost

**Teste de conectividade:**
```bash
# No navegador do celular
http://SEU_IP:3000/api/health
```

---

## 📝 Licença

MIT License - veja [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Desenvolvido por

**Vinicius Xavier Ramalho**

- 🎓 Disciplina: Laboratório de Desenvolvimento de Aplicações Móveis e Distribuídas
- 🏫 Instituição: PUC Minas
- 📅 Período: 2025/2
- 📧 GitHub: [@ViniciusXR](https://github.com/ViniciusXR)
