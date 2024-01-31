using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class MedicamentoCLS
    {
        public int iidmedicamento { get; set; }
        public string codigomedicamento { get; set; }
        public string nombremedicamento { get; set; }
        public string nombrelaboratorio { get; set; }
        public string nombretipomedicamento { get; set; }

        public int iidlaboratorio { get; set; }
        public int iidtipomedicamento { get; set; }

        public string usomedicamento { get; set; }
        public string contenidomedicamento { get; set; }
    }
}