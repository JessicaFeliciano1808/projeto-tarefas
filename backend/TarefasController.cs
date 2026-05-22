using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManager.API.Data;
using TaskManager.API.Models;

namespace TaskManager.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TarefasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TarefasController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/tarefas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tarefa>>> GetTarefas([FromQuery] string? status)
        {
            var query = _context.Tarefas.AsQueryable();

            if (!string.IsNullOrWhiteSpace(status))
                query = query.Where(t => t.Status == status);

            var tarefas = await query.OrderByDescending(t => t.DataCriacao).ToListAsync();
            return Ok(tarefas);
        }

        // GET: api/tarefas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Tarefa>> GetTarefa(int id)
        {
            var tarefa = await _context.Tarefas.FindAsync(id);

            if (tarefa == null)
                return NotFound(new { message = $"Tarefa com ID {id} não encontrada." });

            return Ok(tarefa);
        }

        // POST: api/tarefas
        [HttpPost]
        public async Task<ActionResult<Tarefa>> PostTarefa(Tarefa tarefa)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            tarefa.DataCriacao = DateTime.UtcNow;
            tarefa.Status = string.IsNullOrWhiteSpace(tarefa.Status) ? "Pendente" : tarefa.Status;

            _context.Tarefas.Add(tarefa);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTarefa), new { id = tarefa.Id }, tarefa);
        }

        // PUT: api/tarefas/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTarefa(int id, Tarefa tarefa)
        {
            if (id != tarefa.Id)
                return BadRequest(new { message = "ID da URL não corresponde ao ID da tarefa." });

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var tarefaExistente = await _context.Tarefas.FindAsync(id);
            if (tarefaExistente == null)
                return NotFound(new { message = $"Tarefa com ID {id} não encontrada." });

            tarefaExistente.Titulo = tarefa.Titulo;
            tarefaExistente.Descricao = tarefa.Descricao;
            tarefaExistente.Status = tarefa.Status;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return StatusCode(500, new { message = "Erro ao atualizar a tarefa." });
            }

            return Ok(tarefaExistente);
        }

        // DELETE: api/tarefas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTarefa(int id)
        {
            var tarefa = await _context.Tarefas.FindAsync(id);

            if (tarefa == null)
                return NotFound(new { message = $"Tarefa com ID {id} não encontrada." });

            _context.Tarefas.Remove(tarefa);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Tarefa excluída com sucesso." });
        }
    }
}
