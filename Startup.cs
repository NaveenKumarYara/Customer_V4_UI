using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tenendus.HttpClient;
using Tenendus.HttpClient.Helpers;
using Tenendus.HttpClient.Interfaces;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Tenendus.ORCA.Renewals.Simulator.UI
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddMvc();
      services.AddCors(options =>
      {
        options.AddPolicy("AllowAnyOrigin",
            builder => builder
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader()
        );
      });

      services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
      services.AddTransient<IRequestHeaderProvider>(c => new RequestHeaderProvider("ORCA.UIAPI"));
      services.AddTransient<IRestHttpClientFactory, RestHttpClientFactory>();
      services.AddTransient<IRestClient, StandardHttpClient>();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }
      app.Use(async (context, next) =>
      {
        await next();
        if (context.Response.StatusCode == 404 && !context.Request.Path.Value.StartsWith("/api/"))
        {
          context.Request.Path = "/index.html";
          await next();
        }
      });
      app.UseStaticFiles();
      app.UseDefaultFiles();
      app.UseMvcWithDefaultRoute();
      app.UseCors("AllowAnyOrigin");
    }
  }
}
