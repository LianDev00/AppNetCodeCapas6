using CapaDatos;
using CapaEntidad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace CapaNegocio
{
    public class PersonaBL
    {
        public List<PersonaCLS> listarPersona()
        {
            PersonaDAL oPersonaDAL = new PersonaDAL();
            return oPersonaDAL.listarPersona();
        }
        public List<PersonaCLS> filtrarPersona(PersonaCLS obj)
        {
            PersonaDAL oPersonaDAL = new PersonaDAL();
            return oPersonaDAL.filtrarPersona(obj);
        }
    }
}
