using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using TesApp.Models;

namespace TesApp.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class RecipeItemsController : Controller
    {
        IConfiguration _configuration;
        IWebHostEnvironment _env;
        public RecipeItemsController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string connString = _configuration.GetConnectionString("TestAppConn");
            string sql = @"select * from RecipeItems";
            DataTable table = new DataTable();
            SqlDataReader reader;
            using (SqlConnection conn = new SqlConnection(connString))
            {
                using (SqlCommand sqlCommand = new SqlCommand(sql, conn))
                {
                    conn.Open();
                    reader = sqlCommand.ExecuteReader();
                    table.Load(reader);

                    reader.Close();
                    conn.Close();
                }

            }

            return new JsonResult(table);
        }


        [HttpPost]
        public JsonResult Post(int recID,Items item)
        {
            string connString = _configuration.GetConnectionString("TestAppConn");
            //int recID = GetRecipeID(recName);

            string sql = $@"insert into RecipeItems values ({recID},{item.ItemId},{item.Count})";

            SqlDataReader reader;
            using (SqlConnection conn = new SqlConnection(connString))
            {
                using (SqlCommand sqlCommand = new SqlCommand(sql, conn))
                {
                    conn.Open();
                    reader = sqlCommand.ExecuteReader();

                    reader.Close();
                    conn.Close();
                }

            }

            return new JsonResult("Item Added To Recipe");
        }

        

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string connString = _configuration.GetConnectionString("TestAppConn");
            string sql = $@"delete from RecipeItems where RecipeItemID = {id}";
            SqlDataReader reader;
            using (SqlConnection conn = new SqlConnection(connString))
            {
                using (SqlCommand sqlCommand = new SqlCommand(sql, conn))
                {
                    conn.Open();
                    reader = sqlCommand.ExecuteReader();

                    reader.Close();
                    conn.Close();
                }

            }

            return new JsonResult("Recipe Item Deleted");
        }


        //private void InsertItemToRecipe(string recName, Items item)
        //{
        //    string connString = _configuration.GetConnectionString("TestAppConn");
        //    int recID = GetRecipeID(recName);

        //    string sql = $@"insert into RecipeItems values ({recID},{item.ItemId},{item.Count})";

        //    SqlDataReader reader;
        //    using (SqlConnection conn = new SqlConnection(connString))
        //    {
        //        using (SqlCommand sqlCommand = new SqlCommand(sql, conn))
        //        {
        //            conn.Open();
        //            reader = sqlCommand.ExecuteReader();

        //            reader.Close();
        //            conn.Close();
        //        }

        //    }
        //}

        //private int GetRecipeID(string recName)
        //{
        //    string connString = _configuration.GetConnectionString("TestAppConn");
        //    string sql = $@"select RecipeID from Recipes where RecipeName = '{recName}'";
        //    int id = 0;
        //    SqlDataReader reader;
        //    using (SqlConnection conn = new SqlConnection(connString))
        //    {
        //        using (SqlCommand sqlCommand = new SqlCommand(sql, conn))
        //        {
        //            conn.Open();
        //            reader = sqlCommand.ExecuteReader(CommandBehavior.SingleRow);

        //            while (reader.Read())
        //            {
        //                id = Convert.ToInt32(reader["RecipeID"]);
        //            }

        //            reader.Close();
        //            conn.Close();
        //        }

        //    }
        //    return id;
        //}
    }
}
