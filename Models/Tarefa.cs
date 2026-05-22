public class Tarefa
{
    public int Id { get; set; }
    public string Titulo { get; set; }
    public string Descricao { get; set; }
    public string Status { get; set; } = "Pendente";
    public DateTime DataCriacao { get; set; } = DateTime.Now;
}
