// Esta capa se encarga de definir las clases que representan las entidades u objetos del negocio, osea los datos que va obtener el negocio.

namespace CapaEntidad
{
    public class TipoMedicamentoCLS
    {
        public int iidtipomedicamento { get; set; }
        public string nombre { get; set; }
        public string descripcion { get; set; }
    }
}