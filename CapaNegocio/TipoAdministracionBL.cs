using CapaDatos;
using CapaEntidad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaNegocio
{
    public class TipoAdministracionBL
    {
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
