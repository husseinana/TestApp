using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using TesApp.Models;
using System.IO;
using Microsoft.Extensions.FileProviders;
using Microsoft.AspNetCore.Hosting;

namespace TesApp.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class RecipeController : Controller
    {
        IConfiguration _configuration;
        private readonly IFileProvider _fileProvider;
        IWebHostEnvironment _env;
        public RecipeController(IConfiguration configuration, IFileProvider fileProvider, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _fileProvider = fileProvider;
            _env = env;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string connString = _configuration.GetConnectionString("TestAppConn");
            string sql = @"select * from Recipes";
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
        public JsonResult Post(Recipes rec)
        {
            string connString = _configuration.GetConnectionString("TestAppConn");
            string sql = $@"insert into Recipes values ('{rec.RecipeName}')";
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

            return new JsonResult("Recipe Added");
        }

        

        [HttpPut]
        public JsonResult Put(Recipes rec)
        {
            string connString = _configuration.GetConnectionString("TestAppConn");
            string sql = $@"update Recipes set RecipeName = '{rec.RecipeName}' where RecipeID = {rec.RecipeId}";
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

            return new JsonResult("Recipe Updated");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string connString = _configuration.GetConnectionString("TestAppConn");
            string sql = $@"delete from Recipes where RecipeID = {id}";
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

            return new JsonResult("Recipe Deleted");
        }


        [HttpGet]
        [Route("GetAllItems")]
        public JsonResult GetAllItems()
        {
            string connString = _configuration.GetConnectionString("TestAppConn");
            string sql = @"select ItemName from Items";
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
        [Route("SaveFile")]
        public JsonResult SaveFile()
        {

            try
            {
                var httpReq = Request.Form;
                var postedFile = httpReq.Files[0];
                string fileName = postedFile.FileName;
                string phyPath = _env.ContentRootPath + "/Photos/" + fileName;
                using (var stream = new FileStream(phyPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);

                }
                return new JsonResult(fileName);

            }
            catch
            {
                return new JsonResult("notfound.png");
            }

        }
    }
}
