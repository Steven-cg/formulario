using backend.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

public class detalle_servicio
{
    [Key]
    public int id_detalle_servicio { get; set; }

    public int? id_historial_compra { get; set; }  // Foreign key

    public int id_servicio { get; set; } // Now referencing the service

    public decimal valor { get; set; }
    public char operacion { get; set; }

    public DateTime? fecha_creacion { get; set; }
    public DateTime? fecha_actualizacion { get; set; }

    //// Navigation property (optional)
    //[ForeignKey("id_historial_compra")]
    //[JsonIgnore]
    //public virtual historial_compra historial_compra { get; set; }

    //[ForeignKey("id_servicio")]
    //[JsonIgnore]
    //public virtual servicio servicio { get; set; }

}
