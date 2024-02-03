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
            TipoAdministracionDAL obj = new TipoAdministracionDAL();
            return obj.guardarTipoAdministracion(oTipoAdministracionCLS);
        }

        public List<TipoAdministracionCLS> listarTipoAdministracion()
        {
            TipoAdministracionDAL obj = new TipoAdministracionDAL();
            return obj.listarTipoAdministracion();
        }

        public int EliminarTipoAdministracion(int id)
        {
            TipoAdministracionDAL obj = new TipoAdministracionDAL();
            return obj.EliminarTipoAdministracion(id);
        }
    }
}
