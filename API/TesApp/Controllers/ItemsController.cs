using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using TesApp.Models;

namespace TesApp.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class ItemsController : Controller
    {
        IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public ItemsController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string connString = _configuration.GetConnectionString("TestAppConn");
            string sql = @"select * from Items";
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
        public JsonResult Post(Items item)
        {
            string connString = _configuration.GetConnectionString("TestAppConn");
            string sql = $@"insert into Items values ('{item.ItemName}',{item.Count},'{item.photopath}')";
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

            return new JsonResult("Item Added");
        }

        [HttpPut]
        public JsonResult Put(Items item)
        {
            string connString = _configuration.GetConnectionString("TestAppConn");
            string sql = $@"update Items set ItemName = '{item.ItemName}', Count = {item.Count}, photopath = '{item.photopath}' where ItemID = {item.ItemId}";
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

            return new JsonResult("Item Updated");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string connString = _configuration.GetConnectionString("TestAppConn");
            string sql = $@"delete from Items where ItemID = {id}";
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

            return new JsonResult("Item Deleted");
        }


        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Photos/" + filename;

                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                return new JsonResult(filename);
            }
            catch (Exception)
            {

                return new JsonResult("anonymous.png");
            }
        }
    }
}
