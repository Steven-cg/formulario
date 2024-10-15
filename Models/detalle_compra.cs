using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models
{
    public class detalle_compra
    {
        [Key]
        public int id_detalle_compra { get; set; }

        public int? id_historial_compra { get; set; }  // Foreign key

        public int id_producto { get; set; } // Now referencing the product

        public int cantidad { get; set; }
        public decimal valor { get; set; }
        public decimal total { get; set; }
        public DateTime? fecha_creacion { get; set; }
        public DateTime? fecha_actualizacion { get; set; }

        //// Navigation property (optional)
        //[ForeignKey("id_historial_compra")]
        //[JsonIgnore]
        //public virtual historial_compra historial_compra { get; set; }

        //[ForeignKey("id_producto")]
        //[JsonIgnore]
        //public virtual producto producto { get; set; }

    }
}
