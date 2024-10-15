using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.context;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HistorialCompraController : ControllerBase
    {
        private readonly AppDbContext _context;

        public HistorialCompraController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("usuario/{id_usuario}")]
        public async Task<ActionResult<IEnumerable<object>>> GetHistorialCompras(int id_usuario)
        {
            // Obtener los historiales de compra para el usuario específico
            var historiales = await _context.historial_compra
                .Where(h => h.id_usuario == id_usuario)
                .Select(h => new
                {
                    h.id_historial_compra,
                    h.id_usuario,
                    h.valorapagar,
                    h.valorpagado,
                    h.valordevuelto,
                    h.fecha,
                    h.estado,
                    h.ip,
                    DetalleCompra = h.detalle_compra.Select(dc => new
                    {
                        dc.id_detalle_compra, // Incluye la clave
                        dc.cantidad,
                        dc.valor,
                        dc.total,
                        ProductoNombre = _context.producto
                            .Where(p => p.id_producto == dc.id_producto)
                            .Select(p => p.nombre)
                            .FirstOrDefault()
                    }).ToList(),
                    DetalleServicio = h.detalle_servicio.Select(ds => new
                    {
                        ds.id_detalle_servicio, // Incluye la clave
                        ds.valor,
                        ds.operacion,
                        ServicioNombre = _context.servicio
                            .Where(s => s.id_servicio == ds.id_servicio)
                            .Select(s => s.nombre)
                            .FirstOrDefault()
                    }).ToList()
                })
                .ToListAsync(); // Realiza la consulta antes de agrupar

            // Agrupar los historiales por id_historial_compra y consolidar datos
            var resultado = historiales
                .GroupBy(h => h.id_historial_compra)
                .Select(g => new
                {
                    Historial = g.First(), // Selecciona un historial para mostrar
                    DetallesCompra = g.SelectMany(h => h.DetalleCompra).Distinct(),
                    DetallesServicio = g.SelectMany(h => h.DetalleServicio).Distinct()
                })
                .ToList();

            // Limpiar el resultado para evitar referencias innecesarias
            var cleanedResult = resultado.Select(r => new
            {
                r.Historial.id_historial_compra,
                r.Historial.id_usuario,
                r.Historial.valorapagar,
                r.Historial.valorpagado,
                r.Historial.valordevuelto,
                r.Historial.fecha,
                r.Historial.estado,
                r.Historial.ip,
                DetalleCompra = r.DetallesCompra,
                DetalleServicio = r.DetallesServicio
            });

            return Ok(cleanedResult);
        }

        [HttpPost]
        public async Task<ActionResult<historial_compra>> PostHistorialCompra([FromBody] historial_compra historial)
        {
            try
            {
                if (historial == null)
                {
                    return BadRequest(new { message = "El objeto historial es nulo." });
                }

                // Asignar la fecha actual si no se proporciona
                if (historial.fecha == null)
                {
                    historial.fecha = DateTime.UtcNow; // Usa DateTime.Now si deseas la hora local
                }

                // Guardar historial_compra primero
                _context.historial_compra.Add(historial);
                await _context.SaveChangesAsync(); // Guarda para obtener el ID

                // Guardar detalle_compra si existe
                if (historial.detalle_compra != null && historial.detalle_compra.Any())
                {
                    foreach (var detalle in historial.detalle_compra)
                    {
                        // Asignamos la relación correcta
                        detalle.id_historial_compra = historial.id_historial_compra;

                        // Comprobar si ya existe un registro igual en detalle_compra
                        var exists = await _context.detalle_compra
                            .AnyAsync(d => d.id_historial_compra == detalle.id_historial_compra && d.id_producto == detalle.id_producto);

                        if (!exists)
                        {
                            // Asegúrate de que la propiedad id_detalle_compra no se esté modificando
                            _context.detalle_compra.Add(detalle);
                        }
                    }
                }

                // Guardar detalle_servicio si existe
                if (historial.detalle_servicio != null && historial.detalle_servicio.Any())
                {
                    foreach (var detalle in historial.detalle_servicio)
                    {
                        // Asignamos la relación correcta
                        detalle.id_historial_compra = historial.id_historial_compra;

                        // Comprobar si ya existe un registro igual en detalle_servicio
                        var exists = await _context.detalle_servicio
                            .AnyAsync(d => d.id_historial_compra == detalle.id_historial_compra && d.id_servicio == detalle.id_servicio);

                        if (!exists)
                        {
                            // Asegúrate de que la propiedad id_detalle_servicio no se esté modificando
                            _context.detalle_servicio.Add(detalle);
                        }
                    }
                }

                // Guardar todos los cambios de detalle después de agregar todos los detalles.
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetHistorialCompra), new { id_historial_compra = historial.id_historial_compra }, historial);
            }
            catch (DbUpdateException dbEx)
            {
                return BadRequest(new { message = dbEx.InnerException?.Message ?? dbEx.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Ocurrió un error en el servidor.", error = ex.Message });
            }
        }












        // GET: api/historialcompra/{id_historial_compra}
        [HttpGet("{id_historial_compra}")]
        public async Task<ActionResult<historial_compra>> GetHistorialCompra(int id_historial_compra)
        {
            var historial = await _context.historial_compra
                .Include(h => h.detalle_compra)
                .Include(h => h.detalle_servicio)
                .FirstOrDefaultAsync(h => h.id_historial_compra == id_historial_compra);

            if (historial == null)
            {
                return NotFound();
            }

            return historial;
        }

        // PUT: api/historialcompra/{id_historial_compra}
        [HttpPut("{id_historial_compra}")]
        public async Task<IActionResult> PutHistorialCompra(int id_historial_compra, historial_compra historial)
        {
            if (id_historial_compra != historial.id_historial_compra)
            {
                return BadRequest();
            }

            historial.fecha_actualizacion = DateTime.UtcNow;
            _context.Entry(historial).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HistorialCompraExists(id_historial_compra))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            var detallesCompra = await _context.detalle_compra.Where(d => d.id_historial_compra == id_historial_compra).ToListAsync();
            _context.detalle_compra.RemoveRange(detallesCompra);
            await _context.SaveChangesAsync();

            foreach (var detalle in historial.detalle_compra)
            {
                detalle.id_historial_compra = id_historial_compra;
                detalle.fecha_creacion = DateTime.UtcNow;
                detalle.fecha_actualizacion = DateTime.UtcNow;
                _context.detalle_compra.Add(detalle);
            }

            var detallesServicio = await _context.detalle_servicio.Where(d => d.id_historial_compra == id_historial_compra).ToListAsync();
            _context.detalle_servicio.RemoveRange(detallesServicio);
            await _context.SaveChangesAsync();

            foreach (var detalle in historial.detalle_servicio)
            {
                detalle.id_historial_compra = id_historial_compra;
                detalle.fecha_creacion = DateTime.UtcNow;
                detalle.fecha_actualizacion = DateTime.UtcNow;
                _context.detalle_servicio.Add(detalle);
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/historialcompra/{id_historial_compra}
        [HttpDelete("{id_historial_compra}")]
        public async Task<IActionResult> DeleteHistorialCompra(int id_historial_compra)
        {
            var historial = await _context.historial_compra.FindAsync(id_historial_compra);
            if (historial == null)
            {
                return NotFound();
            }

            var detallesCompra = await _context.detalle_compra.Where(d => d.id_historial_compra == id_historial_compra).ToListAsync();
            _context.detalle_compra.RemoveRange(detallesCompra);

            var detallesServicio = await _context.detalle_servicio.Where(d => d.id_historial_compra == id_historial_compra).ToListAsync();
            _context.detalle_servicio.RemoveRange(detallesServicio);

            _context.historial_compra.Remove(historial);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool HistorialCompraExists(int id_historial_compra)
        {
            return _context.historial_compra.Any(e => e.id_historial_compra == id_historial_compra);
        }
    }
}
