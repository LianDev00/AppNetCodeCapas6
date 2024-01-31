using CapaEntidad;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaDatos
{
    public class LaboratorioDAL : CadenaDAL
    {
        public int guardarLaboratorio(LaboratorioCLS oLaboratorioCLS)
        {
            // 0 indica error
            int rpta = 0;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("uspGuardarLaboratorio", cn))
                    {
                        //Indico que es un StoredProcedure SQL
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@idlaboratorio", oLaboratorioCLS.iidlaboratorio);
                        cmd.Parameters.AddWithValue("@nombre", oLaboratorioCLS.nombre);
                        cmd.Parameters.AddWithValue("@direccion", oLaboratorioCLS.direccion);
                        cmd.Parameters.AddWithValue("@personacontacto", oLaboratorioCLS.personacontacto);
                        cmd.Parameters.AddWithValue("@numerocontacto", oLaboratorioCLS.numerocontacto);
                        //Insert , Update y Delete (El numero de filas afectadas)
                        rpta = cmd.ExecuteNonQuery();
                        //Si es 1 es que es Ok , si es 0 es que no se realizo
                    }
                }
                catch (Exception ex)
                {
                    cn.Close();
                }
            }
            return rpta;
        }

        public int eliminarLaboratorio(int id)
        {
            // 0 indica error
            int rpta = 0;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    // Eliminacion Fisica
                    using (SqlCommand cmd = new SqlCommand("uspEliminarLaboratorio", cn))
                    {
                        //Indico que es consulta SQL
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@id", id);
                        //Insert , Update y Delete (El numero de filas afectadas)
                        rpta = cmd.ExecuteNonQuery();
                        //Si es 1 es que es Ok , si es 0 es que no se realizo
                    }
                }
                catch (Exception ex)
                {
                    cn.Close();
                }
            }
            return rpta;
        }

        public LaboratorioCLS recuperarLaboratorio(int iidlaboratorio)
        {
            LaboratorioCLS oLaboratorioCLS = new LaboratorioCLS();
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("uspRecuperarLaboratorio", cn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@id", iidlaboratorio);
                        SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);
                        if (drd != null)
                        {
                            int postId = drd.GetOrdinal("iidlaboratorio");
                            int postNombre = drd.GetOrdinal("nombre");
                            int postDireccion = drd.GetOrdinal("direccion");
                            int postPersonaContacto = drd.GetOrdinal("personacontacto");
                            int postNumeroContacto = drd.GetOrdinal("numerocontacto");
                            while (drd.Read())
                            {
                                oLaboratorioCLS.iidlaboratorio = drd.IsDBNull(postId) ? 0 : drd.GetInt32(postId);
                                oLaboratorioCLS.nombre = drd.IsDBNull(postNombre) ? "" : drd.GetString(postNombre);
                                oLaboratorioCLS.direccion = drd.IsDBNull(postDireccion) ? "" : drd.GetString(postDireccion);
                                oLaboratorioCLS.personacontacto = drd.IsDBNull(postPersonaContacto) ? "" : drd.GetString(postPersonaContacto);
                                oLaboratorioCLS.numerocontacto = drd.IsDBNull(postNumeroContacto) ? "" : drd.GetString(postNumeroContacto);
                            }
                            cn.Close();
                        }
                    }

                }
                catch (Exception ex)
                {
                    cn.Close();
                    oLaboratorioCLS = null;
                }
            }
            return oLaboratorioCLS;
        }

        public List<LaboratorioCLS> listarLaboratorio()
        {
            List<LaboratorioCLS> lista = null;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("uspListarLaboratorio", cn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);
                        if (drd != null)
                        {
                            lista = new List<LaboratorioCLS>();
                            int postId = drd.GetOrdinal("iidlaboratorio");
                            int postNombre = drd.GetOrdinal("nombre");
                            int postDireccion = drd.GetOrdinal("direccion");
                            int postPersonaContacto = drd.GetOrdinal("personacontacto");
                            LaboratorioCLS oLaboratorioCLS;
                            while (drd.Read())
                            {
                                oLaboratorioCLS = new LaboratorioCLS();
                                oLaboratorioCLS.iidlaboratorio = drd.IsDBNull(postId) ? 0 : drd.GetInt32(postId);
                                oLaboratorioCLS.nombre = drd.IsDBNull(postNombre) ? "" : drd.GetString(postNombre);
                                oLaboratorioCLS.direccion = drd.IsDBNull(postDireccion) ? "" : drd.GetString(postDireccion);
                                oLaboratorioCLS.personacontacto = drd.IsDBNull(postPersonaContacto) ? "" : drd.GetString(postPersonaContacto);
                                lista.Add(oLaboratorioCLS);
                            }
                            cn.Close();
                        }
                    }

                }
                catch (Exception ex)
                {
                    cn.Close();
                    lista = null;
                }
            }
            return lista;
        }

        public List<LaboratorioCLS> filtrarLaboratorio(LaboratorioCLS objLab)
        {
            List<LaboratorioCLS> lista = null;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("uspFiltrarLaboratorio", cn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@nombre", objLab.nombre == null ? "" : objLab.nombre);
                        cmd.Parameters.AddWithValue("@direccion", objLab.direccion == null ? "" : objLab.direccion);
                        cmd.Parameters.AddWithValue("@personacontacto", objLab.personacontacto == null ? "" : objLab.personacontacto);
                        SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);
                        if (drd != null)
                        {
                            lista = new List<LaboratorioCLS>();
                            int postId = drd.GetOrdinal("iidlaboratorio");
                            int postNombre = drd.GetOrdinal("nombre");
                            int postDireccion = drd.GetOrdinal("direccion");
                            int postPersonaContacto = drd.GetOrdinal("personacontacto");
                            LaboratorioCLS oLaboratorioCLS;
                            while (drd.Read())
                            {
                                oLaboratorioCLS = new LaboratorioCLS();
                                oLaboratorioCLS.iidlaboratorio = drd.IsDBNull(postId) ? 0 : drd.GetInt32(postId);
                                oLaboratorioCLS.nombre = drd.IsDBNull(postNombre) ? "" : drd.GetString(postNombre);
                                oLaboratorioCLS.direccion = drd.IsDBNull(postDireccion) ? "" : drd.GetString(postDireccion);
                                oLaboratorioCLS.personacontacto = drd.IsDBNull(postPersonaContacto) ? "" : drd.GetString(postPersonaContacto);
                                lista.Add(oLaboratorioCLS);
                            }
                            cn.Close();
                        }
                    }

                }
                catch (Exception ex)
                {
                    cn.Close();
                    lista = null;
                }
            }
            return lista;
        }
    }
}
