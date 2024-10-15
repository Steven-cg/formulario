using System;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class mascota
    {
        [Key]
        public int id_mascota { get; set; }  // Modificado a id_mascota

        [Required]
        public int id_usuario { get; set; }  // Nuevo campo id_usuario

        [Required]
        [MaxLength(100)]
        public string nombre { get; set; }

        [Required]
        public int edad { get; set; }

        [MaxLength(100)]  // Modificado a 100 caracteres
        public string? raza { get; set; }

        [MaxLength(100)]  // Modificado a 100 caracteres
        public string? especie { get; set; }

        [MaxLength(50)]
        public string? estado { get; set; }

        [MaxLength(45)]  // Ajustado el tamaño del campo ip a 45 caracteres
        public string? ip { get; set; }

        public DateTime fecha_creacion { get; set; }  // Modificado a fecha_creacion

        public DateTime fecha_actualizacion { get; set; }
    }
}
