using Microsoft.AspNetCore.Mvc;
using System;
using Microsoft.Extensions.Configuration;

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CapaNegocio;
using CapaEntidad;
using System.IO;
namespace AppNetCodeCapas6.Controllers
{
    public class PersonaController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public List<PersonaCLS> listarPersona()
        {
            PersonaBL oPersonaBL = new PersonaBL();
            return oPersonaBL.listarPersona();
        }

        public List<PersonaCLS> filtrarPersona(PersonaCLS oPersonaCLS)
        {
            PersonaBL oPersonaBL = new PersonaBL();
            return oPersonaBL.filtrarPersona(oPersonaCLS);
        }
    }
}
