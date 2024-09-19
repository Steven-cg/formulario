using System;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
	public class mascota
	{
		[Key]
		public int id { get; set; }

		[Required]
		[MaxLength(100)]
		public string nombre { get; set; }

		[Required]
		public int edad { get; set; } // Eliminado MaxLength

		[MaxLength(50)]
		public string? raza { get; set; }

		[MaxLength(50)]
		public string? especie { get; set; }

		[MaxLength(30)]
		public string? color { get; set; }

		[MaxLength(50)]
		public string? estado { get; set; }

		[MaxLength(50)]
		public string? ip { get; set; }

		public DateTime fecha_ingreso { get; set; }

		public DateTime fecha_actualizacion { get; set; }
	}
}
