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

		// GET api/FormularioMascota/5
		[HttpGet("{id}", Name = "GetMascota")]
		public ActionResult Get(int id)
		{
			try
			{
				var mascota = context.mascota.FirstOrDefault(m => m.id == id);
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

				mascota.estado = mascota.estado ?? "Inactivo";
				mascota.ip = mascota.ip ?? "0.0.0.0";

				if (mascota.fecha_ingreso == default(DateTime))
				{
					mascota.fecha_ingreso = DateTime.UtcNow;
				}

				if (mascota.fecha_actualizacion == default(DateTime))
				{
					mascota.fecha_actualizacion = DateTime.UtcNow;
				}

				context.mascota.Add(mascota);
				context.SaveChanges();

				return CreatedAtRoute("GetMascota", new { id = mascota.id }, mascota);
			}
			catch (Exception ex)
			{
				// Mostrar la excepción interna en el mensaje de error
				return BadRequest($"Error al guardar la mascota: {ex.InnerException?.Message ?? ex.Message}");
			}
		}



		// PUT api/FormularioMascota/5
		[HttpPut("{id}")]
		public ActionResult Put(int id, [FromBody] mascota mascota)
		{
			try
			{
				if (mascota == null || mascota.id != id)
				{
					return BadRequest("El cuerpo de la solicitud no es válido.");
				}

				context.Entry(mascota).State = EntityState.Modified;
				context.SaveChanges(); // Corregido
				return CreatedAtRoute("GetMascota", new { id = mascota.id }, mascota);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		// DELETE api/FormularioMascota/5
		[HttpDelete("{id}")]
		public ActionResult Delete(int id)
		{
			try
			{
				var mascota = context.mascota.FirstOrDefault(m => m.id == id);
				if (mascota != null)
				{
					context.mascota.Remove(mascota);
					context.SaveChanges(); // Corregido
					return Ok(id);
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
