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
    public class TipoAdministracionDAL:CadenaDAL
    {
        public int EliminarTipoAdministracion(int id)
        {
            // 0 indica error
            int rpta = 0;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    // Eliminacion Fisica
                    using (SqlCommand cmd = new SqlCommand("uspEliminarTipoAdministracion", cn))
                    {
                        //Indico que es consulta SQL
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@iidtipoadministracion", id);
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

        public int guardarTipoAdministracion(TipoAdministracionCLS oTipoAdministracionCLS)
        {
            // 0 indica error
            int rpta = 0;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("uspGuardarTipoAdministracion", cn))
                    {
                        //Indico que es Procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@iidtipoadministracion", oTipoAdministracionCLS.iidtipoadministracion);
                        cmd.Parameters.AddWithValue("@nombre", oTipoAdministracionCLS.nombre);
                        cmd.Parameters.AddWithValue("@descripcion", oTipoAdministracionCLS.descripcion);
                        SqlParameter parametro = null;
                        if (oTipoAdministracionCLS.iidtipoadministracion == 0)
                        {
                            parametro = cmd.Parameters.Add("@@identity", SqlDbType.Int);
                            parametro.Direction = ParameterDirection.ReturnValue;
                        }
                        //Insert , Update y Delete (El numero de filas afectadas)
                        rpta = cmd.ExecuteNonQuery();
                        if (rpta == 1 && oTipoAdministracionCLS.iidtipoadministracion == 0)
                        {
                            //Obtiene el Id que se genera al insertar
                            rpta = (int)parametro.Value;
                        }
                        //Si es 1 es que es Ok , si es 0 es que no se realizo
                    }
                }
                catch (Exception ex)
                {
                    cn.Close();
                    rpta = 0;
                }


            }
            return rpta;

        }

        public List<TipoAdministracionCLS> listarTipoAdministracion()
        {
            List<TipoAdministracionCLS> lista = null;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("uspListarTipoAdministracion", cn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);
                        if (drd != null)
                        {
                            lista = new List<TipoAdministracionCLS>();
                            int postId = drd.GetOrdinal("IIDTIPOADMINISTRACION");
                            int postNombre = drd.GetOrdinal("NOMBRE");
                            int postDescripcion = drd.GetOrdinal("DESCRIPCION");
                            TipoAdministracionCLS oTipoAdministracionCLS;
                            while (drd.Read())
                            {
                                oTipoAdministracionCLS = new TipoAdministracionCLS();
                                oTipoAdministracionCLS.iidtipoadministracion = drd.IsDBNull(postId) ? 0 : drd.GetInt32(postId);
                                oTipoAdministracionCLS.nombre = drd.IsDBNull(postNombre) ? "" : drd.GetString(postNombre);
                                oTipoAdministracionCLS.descripcion = drd.IsDBNull(postDescripcion) ? "" : drd.GetString(postDescripcion);
                                lista.Add(oTipoAdministracionCLS);
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
