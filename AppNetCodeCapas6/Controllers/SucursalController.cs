using CapaEntidad;
using CapaNegocio;
using Microsoft.AspNetCore.Mvc;

namespace AppNetCodeCapas6.Controllers
{
    public class SucursalController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        // Metodo para comunicarse con la Capa de Negocio
        public List<SucursalCLS> listarSucursal()
        {
            SucursalBL obj = new SucursalBL();
            return obj.listarSucursal();
        }

        public List<SucursalCLS> filtrarSucursal(string nombreSucursal)
        {
            SucursalBL obj = new SucursalBL();
            return obj.filtrarSucursal(nombreSucursal);
        }

        public int GuardarDatos(SucursalCLS oSucursalCLS, IFormFile fotoEnviar)
        {
            //IFormFile a byte[]
            byte[] buffer = null;
            string nombreFoto = "";
            if (fotoEnviar != null)
            {
                using (MemoryStream ms = new MemoryStream())
                {
                    fotoEnviar.CopyTo(ms);
                    nombreFoto = fotoEnviar.FileName;
                    //Array de Bytes
                    buffer = ms.ToArray();
                    oSucursalCLS.foto = buffer;
                    oSucursalCLS.nombrefoto = nombreFoto;
                }
            }
            SucursalBL obj = new SucursalBL();
            return obj.guardarSucursal(oSucursalCLS);
        }

        public SucursalCLS recuperarSucursal(int iidsucursal)
        {
            SucursalBL obj = new SucursalBL();
            return obj.recuperarSucursal(iidsucursal);
        }
    }
}
