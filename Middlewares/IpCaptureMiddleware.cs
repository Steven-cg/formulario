using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace YourNamespace.Middlewares
{
    public class IpCaptureMiddleware
    {
        private readonly RequestDelegate _next;

        public IpCaptureMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            // Captura la dirección IP
            var ipAddress = context.Connection.RemoteIpAddress?.ToString();

            // Almacena la dirección IP en el contexto
            context.Items["ClientIp"] = ipAddress;

            // Llama al siguiente middleware en la cadena
            await _next(context);
        }
    }
}
