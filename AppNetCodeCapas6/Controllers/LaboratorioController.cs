using CapaDatos;
using CapaEntidad;
using CapaNegocio;
using Microsoft.AspNetCore.Mvc;

namespace AppNetCodeCapas6.Controllers
{
    public class LaboratorioController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public List<LaboratorioCLS> listarLaboratorio()
        {
            LaboratorioBL obj = new LaboratorioBL();
            return obj.listarLaboratorio();
        }
        public List<LaboratorioCLS> filtrarLaboratorio(LaboratorioCLS objLab)
        {
            LaboratorioDAL obj = new LaboratorioDAL();
            return obj.filtrarLaboratorio(objLab);
        }

        // 1 (correcto) y 0 (incorrecto)
        public int guardarDatos(LaboratorioCLS oLaboratorio)
        {
            LaboratorioDAL obj = new LaboratorioDAL();
            return obj.guardarLaboratorio(oLaboratorio);
        }

        public LaboratorioCLS recuperarLaboratorio(int id)
        {
            LaboratorioDAL obj = new LaboratorioDAL();
            return obj.recuperarLaboratorio(id);
        }

        public int eliminarLaboratorio(int id)
        {
            LaboratorioDAL obj = new LaboratorioDAL();
            return obj.eliminarLaboratorio(id);
        }
    }
}