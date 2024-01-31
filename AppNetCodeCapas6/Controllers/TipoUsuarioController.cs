using CapaEntidad;
using CapaNegocio;
using Microsoft.AspNetCore.Mvc;
using CapaDatos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppNetCodeCapas6.Controllers
{
    public class TipoUsuarioController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public List<TipoUsuarioCLS> listarTipoUsuario()
        {
            TipoUsuarioBL obj = new TipoUsuarioBL();
            return obj.listarTipoUsuario();
        }
    }
}