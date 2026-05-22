# ✦ Task Manager — Desafio Técnico Bootcamp Web Front

Aplicação web completa para gerenciamento de tarefas, desenvolvida com **Angular 17** no front-end e **ASP.NET Core 8 Web API** no back-end, com persistência em **SQL Server** via **Entity Framework Core**.

---

## 📁 Estrutura do Projeto

```
task-manager/
├── TaskManager.API/              # Back-end ASP.NET Core
│   ├── Controllers/
│   │   └── TarefasController.cs  # Endpoints REST
│   ├── Data/
│   │   └── AppDbContext.cs        # DbContext do EF Core
│   ├── Models/
│   │   └── Tarefa.cs             # Entidade principal
│   ├── Migrations/               # Migrations do EF Core
│   ├── appsettings.json          # String de conexão
│   └── Program.cs                # Configuração da aplicação
│
└── task-manager-frontend/        # Front-end Angular 17
    └── src/
        └── app/
            ├── models/
            │   └── tarefa.model.ts       # Interface TypeScript
            ├── services/
            │   └── tarefa.service.ts     # HttpClient + endpoints
            └── tarefas/
                ├── tarefa-lista/         # Listagem + filtro + exclusão
                └── tarefa-form/          # Criação e edição
```

---

## ✅ Funcionalidades Implementadas

### Back-end (API REST)
| Método | Endpoint              | Descrição               |
|--------|-----------------------|-------------------------|
| GET    | `/api/tarefas`        | Listar todas as tarefas (suporta `?status=Pendente`) |
| GET    | `/api/tarefas/{id}`   | Buscar tarefa por ID    |
| POST   | `/api/tarefas`        | Criar nova tarefa       |
| PUT    | `/api/tarefas/{id}`   | Atualizar tarefa        |
| DELETE | `/api/tarefas/{id}`   | Excluir tarefa          |

### Front-end (Angular)
- ✅ Listagem de tarefas em cards responsivos
- ✅ Criação de tarefa via formulário reativo
- ✅ Edição de tarefa existente
- ✅ Exclusão com confirmação
- ✅ Filtro por status (Todos / Pendente / Concluída)
- ✅ Validação de formulário com mensagens de erro
- ✅ Mensagens de sucesso/erro com auto-dismiss
- ✅ Estado de carregamento (spinner)
- ✅ Consumo da API com `HttpClient` e `Observable`
- ✅ Organizado em componentes e service

---

## 🛠️ Pré-requisitos

Certifique-se de ter instalado:

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js 18+](https://nodejs.org/) e npm
- [Angular CLI 17](https://angular.io/cli): `npm install -g @angular/cli`
- [SQL Server](https://www.microsoft.com/pt-br/sql-server/sql-server-downloads) (ou SQL Server Express)
- [EF Core Tools](https://learn.microsoft.com/ef/core/cli/dotnet): `dotnet tool install --global dotnet-ef`

---

## 🚀 Como Rodar o Projeto

### 1. Configurar o Banco de Dados

Abra o `TaskManager.API/appsettings.json` e ajuste a string de conexão:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=TaskManagerDB;Trusted_Connection=True;TrustServerCertificate=True;"
  }
}
```

> **Usando SQL Server com autenticação de usuário/senha?** Substitua por:
> ```
> Server=localhost;Database=TaskManagerDB;User Id=seu_usuario;Password=sua_senha;TrustServerCertificate=True;
> ```

### 2. Rodar o Back-end

```bash
# Entrar na pasta da API
cd TaskManager.API

# Restaurar pacotes
dotnet restore

# Aplicar migrations e criar o banco
dotnet ef database update

# Iniciar a API
dotnet run
```

A API estará disponível em:
- `http://localhost:5000` (HTTP)
- Swagger UI: `http://localhost:5000/swagger`

### 3. Rodar o Front-end

```bash
# Em outro terminal, entrar na pasta do frontend
cd task-manager-frontend

# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
ng serve
```

O front-end estará disponível em: **http://localhost:4200**

---

## 🗃️ Migrations (EF Core)

As migrations já estão incluídas no projeto. Caso precise recriar:

```bash
cd TaskManager.API

# Remover migrations existentes (se necessário)
dotnet ef migrations remove

# Criar nova migration
dotnet ef migrations add InitialCreate

# Aplicar ao banco
dotnet ef database update
```

---

## 🔧 Variáveis de Configuração

### Back-end — `appsettings.json`
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "..."   // String de conexão SQL Server
  }
}
```

### Front-end — `tarefa.service.ts`
```typescript
private readonly apiUrl = 'http://localhost:5000/api/tarefas';
```
> Altere esta URL se a API rodar em porta diferente.

---

## 📦 Tecnologias Utilizadas

| Camada     | Tecnologia                        |
|------------|-----------------------------------|
| Front-end  | Angular 17 (Standalone Components)|
| Back-end   | ASP.NET Core 8 Web API (C#)       |
| ORM        | Entity Framework Core 8           |
| Banco      | SQL Server                        |
| Estilo     | SCSS com Design Tokens CSS        |
| Tipografia | Playfair Display + Lora (Google Fonts) |
| HTTP       | Angular HttpClient                |
| Formulário | Angular Reactive Forms            |

---

## 📋 Entidade Tarefa

```csharp
public class Tarefa
{
    public int Id { get; set; }           // Auto-gerado
    public string Titulo { get; set; }    // Obrigatório, max 200
    public string Descricao { get; set; } // Opcional, max 1000
    public string Status { get; set; }    // "Pendente" | "Concluída"
    public DateTime DataCriacao { get; set; } // Auto-preenchido
}
```

---

## 💡 Exemplo de Uso da API

### Criar uma tarefa
```http
POST http://localhost:5000/api/tarefas
Content-Type: application/json

{
  "titulo": "Estudar Angular",
  "descricao": "Revisar componentes standalone e signals",
  "status": "Pendente"
}
```

### Listar tarefas pendentes
```http
GET http://localhost:5000/api/tarefas?status=Pendente
```

### Atualizar status
```http
PUT http://localhost:5000/api/tarefas/1
Content-Type: application/json

{
  "id": 1,
  "titulo": "Estudar Angular",
  "descricao": "Revisar componentes standalone e signals",
  "status": "Concluída"
}
```

---

## 🐛 Problemas Comuns

**"A API não está respondendo"**
- Verifique se `dotnet run` está ativo e rodando na porta 5000
- Confirme a URL em `tarefa.service.ts`

**"Erro de CORS"**
- O CORS já está configurado para `http://localhost:4200` em `Program.cs`
- Se usar outra porta no Angular, atualize a policy em `Program.cs`

**"Erro ao aplicar migration"**
- Confirme que o SQL Server está rodando
- Verifique a string de conexão em `appsettings.json`
- Execute: `dotnet ef database update --verbose` para detalhes

---

## 📝 Licença

Projeto desenvolvido para fins de avaliação técnica — Bootcamp Web Front (Angular + ASP.NET).

---

## 👩‍💻 Desenvolvedora

Jessica Feliciano  
GitHub: https://github.com/JessicaFeliciano1808
