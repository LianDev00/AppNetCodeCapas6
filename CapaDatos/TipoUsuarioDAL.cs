using CapaEntidad;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;

namespace CapaDatos
{
    public class TipoUsuarioDAL : CadenaDAL
    {

        public List<TipoUsuarioCLS> listarTipoUsuario()
        {
            List<TipoUsuarioCLS> lista = null;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("uspListarTipoUsuario", cn))
                    {
                        //Le indico que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlDataReader drd = cmd.ExecuteReader(CommandBehavior.SingleResult);
                        if (drd != null)
                        {
                            lista = new List<TipoUsuarioCLS>();
                            int posId = drd.GetOrdinal("IIDTIPOUSUARIO");
                            int posNombre = drd.GetOrdinal("NOMBRE");
                            int posDESCRIPCION = drd.GetOrdinal("DESCRIPCION");
                            TipoUsuarioCLS oTipoUsuarioCLS;
                            while (drd.Read())
                            {
                                oTipoUsuarioCLS = new TipoUsuarioCLS();
                                oTipoUsuarioCLS.iidtipousuario = drd.IsDBNull(posId) ? 0 : drd.GetInt32(posId);
                                oTipoUsuarioCLS.nombre = drd.IsDBNull(posNombre) ? "" : drd.GetString(posNombre);
                                oTipoUsuarioCLS.descripcion = drd.IsDBNull(posDESCRIPCION) ? "" : drd.GetString(posDESCRIPCION);
                                lista.Add(oTipoUsuarioCLS);
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
