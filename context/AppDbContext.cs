using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.context
{
	public class AppDbContext : DbContext
	{
		public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
		{

		}
		public DbSet<persona> persona {get; set;}
		public DbSet<mascota> mascota { get; set;}

		internal void SaveChange()
		{
			throw new NotImplementedException();
		}
	}
}
