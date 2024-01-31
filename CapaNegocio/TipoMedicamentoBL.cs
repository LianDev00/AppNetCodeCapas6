// Esta capa se encarga de la logica de negocio, osea de procesar la informacion que proviene del cliente.

using CapaDatos;
using CapaEntidad;
using CapaDatos;
using CapaEntidad;
using System.Collections.Generic;

namespace CapaNegocio
{
    public class TipoMedicamentoBL
    {
        public List<TipoMedicamentoCLS> listarTipoMedicamento()
        {
            TipoMedicamentosDAL obj = new TipoMedicamentosDAL();
            return obj.listarTipoMedicamento();
        }

        public List<TipoMedicamentoCLS> filtrarTipoMedicamento(string nombretipo)
        {
            TipoMedicamentosDAL obj = new TipoMedicamentosDAL();
            return obj.filtrarTipoMedicamento(nombretipo);
        }

        public int guardarTipoMedicamento(TipoMedicamentoCLS oTipoMedicamentoCLS)
        {
            TipoMedicamentosDAL obj = new TipoMedicamentosDAL();
            return obj.guardarTipoMedicamento(oTipoMedicamentoCLS);
        }

        public TipoMedicamentoCLS recuperarTipoMedicamento(int iidtipomedicamento)
        {
            TipoMedicamentosDAL obj = new TipoMedicamentosDAL();
            return obj.recuperarTipoMedicamento(iidtipomedicamento);
        }

        public int editarTipoMedicamento(TipoMedicamentoCLS oTipoMedicamentoCLS)
        {
            TipoMedicamentosDAL obj = new TipoMedicamentosDAL();
            return obj.editarTipoMedicamento(oTipoMedicamentoCLS);
        }

        public int eliminarTipoMedicamento(int id)
        {
            TipoMedicamentosDAL obj = new TipoMedicamentosDAL();
            return obj.eliminarTipoMedicamento(id);
        }
    }
}