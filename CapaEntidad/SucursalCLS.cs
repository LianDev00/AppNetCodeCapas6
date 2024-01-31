using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class SucursalCLS
    {
        public int iidsucursal {  get; set; }
        public string nombre { get; set; }
        public string direccion { get; set; }
        public byte[] foto { get; set; }
        public string nombrefoto { get; set; }
        public string base64 { get; set; }
    }
}
