using CapaEntidad;
using CapaNegocio;
using Microsoft.AspNetCore.Mvc;

namespace AppNetCodeCapas6.Controllers
{
    public class MedicamentoController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public List<MedicamentoCLS> listarMedicamento()
        {
            MedicamentoBL oMedicamentoBL = new MedicamentoBL();
            return oMedicamentoBL.listarMedicamento();
        }

        public MedicamentoComboCLS listarCombosMedicamento()
        {
            MedicamentoBL oMedicamentoBL = new MedicamentoBL();
            return oMedicamentoBL.listarCombosMedicamento();
        }

        public List<MedicamentoCLS> filtrarMedicamento(MedicamentoCLS obj)
        {
            MedicamentoBL oMedicamentoBL = new MedicamentoBL();
            return oMedicamentoBL.filtrarMedicamento(obj);
        }

        public MedicamentoCLS recuperarMedicamento(int iidmedicamento)
        {
            MedicamentoBL oMedicamentoBL = new MedicamentoBL();
            return oMedicamentoBL.recuperarMedicamento(iidmedicamento);
        }

        public int guardarMedicamento(MedicamentoCLS oMedicamentoCLS)
        {
            MedicamentoBL oMedicamentoBL = new MedicamentoBL();
            return oMedicamentoBL.guardarMedicamento(oMedicamentoCLS);
        }

        public int eliminarMedicamento(int id)
        {
            MedicamentoBL oMedicamentoBL = new MedicamentoBL();
            return oMedicamentoBL.eliminarMedicamento(id);
        }
    }
}
