using CapaEntidad;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Reflection.Metadata.Ecma335;
using System.IO;
using System.Data.SqlClient;
using System.Data;
using System.Collections;

namespace CapaDatos
{
    public class PersonaDAL:CadenaDAL
    {
        public List<PersonaCLS> filtrarPersona(PersonaCLS obj)
        {
            List<PersonaCLS> lista = null;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("uspFiltrarPersona", cn))
                    {
                        //Le indico que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@nombrecompleto",
                            obj.nombrecompleto == null ? "" : obj.nombrecompleto);
                        cmd.Parameters.AddWithValue("@iidsexo",
                          obj.iidsexo);
                        SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);
                        if (drd != null)
                        {
                            lista = new List<PersonaCLS>();
                            int posId = drd.GetOrdinal("IIDPERSONA");
                            int posNombreCompleto = drd.GetOrdinal("NOMBRECOMPLETO");
                            int posNombre = drd.GetOrdinal("NOMBRE");
                            int posNumeroTelefonico = drd.GetOrdinal("NUMEROTELEFONICO");
                            PersonaCLS oPersonaCLS;
                            while (drd.Read())
                            {
                                oPersonaCLS = new PersonaCLS();
                                oPersonaCLS.iidpersona = drd.IsDBNull(posId) ? 0 :
                                    drd.GetInt32(posId);
                                oPersonaCLS.nombrecompleto = drd.IsDBNull(posNombreCompleto) ? "" :
                                    drd.GetString(posNombreCompleto);
                                oPersonaCLS.nombresexo = drd.IsDBNull(posNombre) ? "" :
                                    drd.GetString(posNombre);
                                oPersonaCLS.numerotelefonico = drd.IsDBNull(posNumeroTelefonico) ? "" :
                                 drd.GetString(posNumeroTelefonico);

                                lista.Add(oPersonaCLS);
                            }
                            cn.Close();
                        }

                    }

                }
                catch (Exception ex)
                {
                    cn.Close();
                    //null para mi es error
                    lista = null;
                }

            }


            return lista;
        }

        public List<PersonaCLS> listarPersona()
        {
            List<PersonaCLS> lista = null;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("uspListarPersona", cn))
                    {
                        //Le indico que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);
                        if (drd != null)
                        {
                            lista = new List<PersonaCLS>();
                            int posId = drd.GetOrdinal("IIDPERSONA");
                            int posNombreCompleto = drd.GetOrdinal("NOMBRECOMPLETO");
                            int posNombre = drd.GetOrdinal("NOMBRE");
                            int posNumeroTelefonico = drd.GetOrdinal("NUMEROTELEFONICO");
                            PersonaCLS oPersonaCLS;
                            while (drd.Read())
                            {
                                oPersonaCLS = new PersonaCLS();
                                oPersonaCLS.iidpersona = drd.IsDBNull(posId) ? 0 :
                                    drd.GetInt32(posId);
                                oPersonaCLS.nombrecompleto = drd.IsDBNull(posNombreCompleto) ? "" :
                                    drd.GetString(posNombreCompleto);
                                oPersonaCLS.nombresexo = drd.IsDBNull(posNombre) ? "" :
                                    drd.GetString(posNombre);
                                oPersonaCLS.numerotelefonico = drd.IsDBNull(posNumeroTelefonico) ? "" :
                                 drd.GetString(posNumeroTelefonico);

                                lista.Add(oPersonaCLS);
                            }
                            cn.Close();
                        }

                    }

                }
                catch (Exception ex)
                {
                    cn.Close();
                    //null para mi es error
                    lista = null;
                }

            }


            return lista;
        }


    }
}
