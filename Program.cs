using backend.context;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Configurar DbContext para usar SQL Server con resiliencia a errores transitorios
builder.Services.AddDbContext<AppDbContext>(options =>
	options.UseSqlServer(
		builder.Configuration.GetConnectionString("Conexion"),
		sqlOptions => sqlOptions.EnableRetryOnFailure()  // Habilitar la resiliencia a errores transitorios
	)
);

builder.Services.AddCors(options =>
{
	options.AddPolicy("AllowReactApp",
		policy =>
		{
			policy.WithOrigins("http://localhost:3000") // Cambia esta URL según la URL de tu app React
				  .AllowAnyHeader()
				  .AllowAnyMethod();
		});
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

// Usar CORS
app.UseCors("AllowReactApp");
app.UseAuthorization();

app.MapControllers();

app.Run();
