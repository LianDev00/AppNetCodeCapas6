using CapaDatos;
using CapaEntidad;
using CapaNegocio;
using Microsoft.AspNetCore.Mvc;

namespace AppNetCodeCapas6.Controllers
{
    public class TipoAdministracionController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public int guardarTipoAdministracion(TipoAdministracionCLS oTipoAdministracionCLS)
        {
            TipoAdministracionBL obj = new TipoAdministracionBL();
            return obj.guardarTipoAdministracion(oTipoAdministracionCLS);
        }

        public List<TipoAdministracionCLS> listarTipoAdministracion()
        {
            TipoAdministracionBL obj = new TipoAdministracionBL();
            return obj.listarTipoAdministracion();
        }
    }
}
