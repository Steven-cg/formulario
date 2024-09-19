using backend.context;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Numerics;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace backend.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class FormularioController : ControllerBase
	{

		private readonly AppDbContext context;

		public FormularioController(AppDbContext context) { 
			this.context = context;
		}


		// GET: api/<FormularioController>
		[HttpGet]
		public ActionResult Get()
		{
			try
			{
				return Ok(context.persona.ToList());
			}
			catch (Exception ex)
			{

				return BadRequest(ex.Message);
			}
		}


		// GET api/<FormularioController>/5
		[HttpGet("{id}", Name = "GetGestor")]
		public ActionResult Get(int id)
		{
			try
			{
				var gestor = context.persona.FirstOrDefault(g=> g.id == id);

				return Ok(gestor);
			}
			catch (Exception ex)
			{

				return BadRequest(ex.Message);
			}
		}

		// POST api/<FormularioController>
		[HttpPost]
		public ActionResult Post([FromBody] persona gestor)
		{
			try
			{
				if (gestor == null)
				{
					return BadRequest("El cuerpo de la solicitud está vacío.");
				}

				// Establecer valores predeterminados si los campos opcionales son nulos
				gestor.estado_civil = gestor.estado_civil ?? "No especificado";
				gestor.estado = gestor.estado ?? "Inactivo";
				gestor.ip = gestor.ip ?? "192.168.1.1";

				
				// Asegurar que las fechas estén definidas
				if (gestor.fecha_creacion == default(DateTime))
				{
					gestor.fecha_creacion = DateTime.UtcNow;
				}

				if (gestor.fecha_modificacion == default(DateTime))
				{
					gestor.fecha_modificacion = DateTime.UtcNow;
				}

				context.persona.Add(gestor);
				context.SaveChanges(); // Guardar en la base de datos

				return CreatedAtRoute("GetGestor", new { id = gestor.id }, gestor);
			}
			catch (Exception ex)
			{
				return BadRequest($"Error al guardar la persona: {ex.Message}");
			}
		}


		// PUT api/<FormularioController>/5
		[HttpPut("{id}")]
		public ActionResult Put(int id, [FromBody] persona gestor)
		{
			try
			{
				if (gestor == null || gestor.id != id)
				{
					return BadRequest("El cuerpo de la solicitud no es válido.");
				}

				context.Entry(gestor).State = EntityState.Modified;
				context.SaveChanges(); // Corregido
				return CreatedAtRoute("GetGestor", new { id = gestor.id }, gestor);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		// DELETE api/<FormularioController>/5
		[HttpDelete("{id}")]
		public ActionResult Delete(int id)
		{
			try
			{
				var gestor = context.persona.FirstOrDefault(g => g.id == id);
				if (gestor != null)
				{
					context.persona.Remove(gestor);
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
