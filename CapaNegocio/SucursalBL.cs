using CapaDatos;
using CapaEntidad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaNegocio
{
    public class SucursalBL
    {
        public List<SucursalCLS> listarSucursal()
        {
            SucursalDAL obj = new SucursalDAL();
            return obj.listarSucursal();
        }
        public List<SucursalCLS> filtrarSucursal(string nombreSucursal)
        {
            SucursalDAL obj = new SucursalDAL();
            return obj.filtrarSucursal(nombreSucursal);
        }

        public int guardarSucursal(SucursalCLS oSucursalCLS)
        {
            SucursalDAL obj = new SucursalDAL();
            return obj.guardarSucursal(oSucursalCLS);
        }

        public SucursalCLS recuperarSucursal(int iidsucursal)
        {
            SucursalDAL obj = new SucursalDAL();
            return obj.recuperarSucursal(iidsucursal);
        }
    }
}
