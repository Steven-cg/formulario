using backend.context;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FormularioMascotaController : ControllerBase
    {
        private readonly AppDbContext context;

        public FormularioMascotaController(AppDbContext context)
        {
            this.context = context;
        }

        // GET: api/FormularioMascota
        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                var mascotas = context.mascota.ToList();
                return Ok(mascotas);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET api/FormularioMascota/{id_mascota}
        [HttpGet("{id_mascota}", Name = "GetMascota")]
        public ActionResult Get(int id_mascota)
        {
            try
            {
                var mascota = context.mascota.FirstOrDefault(m => m.id_mascota == id_mascota);
                if (mascota == null)
                {
                    return NotFound("Mascota no encontrada.");
                }
                return Ok(mascota);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST api/FormularioMascota
        [HttpPost]
        public ActionResult Post([FromBody] mascota mascota)
        {
            try
            {
                if (mascota == null)
                {
                    return BadRequest("El cuerpo de la solicitud está vacío.");
                }

                // Establecer valores predeterminados
                mascota.estado = mascota.estado ?? "Inactivo";
                mascota.ip = mascota.ip ?? "0.0.0.0";

                // Asignar fechas
                mascota.fecha_creacion = DateTime.UtcNow;
                mascota.fecha_actualizacion = DateTime.UtcNow;

                context.mascota.Add(mascota);
                context.SaveChanges();

                return CreatedAtRoute("GetMascota", new { id_mascota = mascota.id_mascota }, mascota);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error al guardar la mascota: {ex.InnerException?.Message ?? ex.Message}");
            }
        }

        // PUT api/FormularioMascota/{id_mascota}
        [HttpPut("{id_mascota}")]
        public ActionResult Put(int id_mascota, [FromBody] mascota mascota)
        {
            try
            {
                if (mascota == null || mascota.id_mascota != id_mascota)
                {
                    return BadRequest("El cuerpo de la solicitud no es válido.");
                }

                // Actualizar el estado de la mascota
                context.Entry(mascota).State = EntityState.Modified;
                context.SaveChanges();

                return CreatedAtRoute("GetMascota", new { id_mascota = mascota.id_mascota }, mascota);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE api/FormularioMascota/{id_mascota}
        [HttpDelete("{id_mascota}")]
        public ActionResult Delete(int id_mascota)
        {
            try
            {
                var mascota = context.mascota.FirstOrDefault(m => m.id_mascota == id_mascota);
                if (mascota != null)
                {
                    context.mascota.Remove(mascota);
                    context.SaveChanges();
                    return Ok(id_mascota);
                }
                else
                {
                    return NotFound("El registro no se encontró.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
