using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using BiljkeApi.models;

namespace BiljkeApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BiljkaController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public BiljkaController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                    select * 
                    from dbo.Biljka";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("connString");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpGet("{idBiljka}")]
        public JsonResult Get(int idBiljka)
        {
            string query = @"
                    SELECT B.idBiljka, B.Naziv, B.Vrsta, B.slika, U.vrijemeSadnje, U.vrijemeBranja, U.opis as opisUpute,UP.vrstaUpotrebe, BU.opis as opisUpotrebe 
                    from dbo.Biljka B
                    LEFT JOIN dbo.Upute U 
                    ON B.idUpute = U.idUpute
                    LEFT JOIN dbo.Biljka_upotreba BU 
                    ON B.idBiljka = BU.idBiljka 
                    LEFT JOIN dbo.Upotrebe UP 
                    ON BU.idUpotreba = UP.idUpotrebe 
                    WHERE B.idBiljka = " + idBiljka + @"";
            
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("connString");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(Biljka biljka)
        {
            string subQuery = "";
            for (int i = 0; i < biljka.ListaUpotreba.Length; i++)
            {
                subQuery += "SET @upotrebaID = (SELECT idUpotrebe FROM [Upotrebe] WHERE vrstaUpotrebe = '" + biljka.ListaUpotreba[i].vrstaUpotrebe + @"')
                            INSERT INTO [Biljka_upotreba] (idBiljka, idUpotreba, opis) 
                            VALUES (@biljkaId, @upotrebaID, '" + biljka.ListaUpotreba[i].opisUpotrebe + @"')";
                   
            }
            string query = @"
                    SET XACT_ABORT ON
                    BEGIN TRANSACTION

                    DECLARE @uputeId int
                    INSERT INTO [Upute] (vrijemeSadnje, vrijemeBranja, opis) 
                    VALUES ('"+ biljka.VrijemeSadnje + @"', '" + biljka.VrijemeBranja + @"', '" + biljka.UputeOpis + @"')
                    SELECT @uputeId = scope_identity();

                    DECLARE @biljkaId int
                    INSERT INTO [Biljka] (Naziv, Vrsta, idUpute, slika) 
                    VALUES ('" + biljka.BiljkaNaziv + @"', '" + biljka.BiljkaVrsta + @"', @uputeId, '" + biljka.SlikaUrl + @"')
                    SELECT @biljkaId = SCOPE_IDENTITY();

                    DECLARE @upotrebaID int
                    " + subQuery + @"

                    COMMIT ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("connString");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("added");
        }

        [HttpPut]
        public JsonResult Put(Biljka biljka)
        {
            string subQuery = "";
            for (int i = 0; i < biljka.ListaUpotreba.Length; i++)
            {
                subQuery += "SET @upotrebaID = (SELECT idUpotrebe FROM [Upotrebe] WHERE vrstaUpotrebe = '" + biljka.ListaUpotreba[i].vrstaUpotrebe + @"')
                            INSERT INTO [Biljka_upotreba] (idBiljka, idUpotreba, opis) 
                            VALUES (" + biljka.BiljkaId + @", @upotrebaID, '" + biljka.ListaUpotreba[i].opisUpotrebe + @"')";

            }
            string query = @"
                    BEGIN TRANSACTION
                    DELETE FROM Biljka_upotreba WHERE idBiljka = " + biljka.BiljkaId + @"
                    DECLARE @upotrebaID int
                    " + subQuery + @"
                    UPDATE Biljka SET Naziv = '" + biljka.BiljkaNaziv + @"', Vrsta = '" + biljka.BiljkaVrsta + @"', slika = '" + biljka.SlikaUrl + @"'
                    WHERE Biljka.idBiljka = " + biljka.BiljkaId + @" 
                    UPDATE Upute SET vrijemeSadnje = '" + biljka.VrijemeSadnje + @"', vrijemeBranja = '" + biljka.VrijemeBranja + @"', Upute.opis = '" + biljka.UputeOpis + @"'
                    WHERE Upute.idUpute = (SELECT idUpute FROM Biljka WHERE idBiljka = " + biljka.BiljkaId + @")

                    COMMIT
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("connString");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Updated Successfully");
        }


        [HttpDelete]
        public JsonResult Delete(Biljka biljka)
        {
            string query = @"
                    set xact_abort on
                    BEGIN TRANSACTION
                    DELETE FROM [Biljka_upotreba] WHERE idBiljka = '" + biljka.BiljkaId + @"'
                    DELETE FROM [Biljka] WHERE idBiljka = '" + biljka.BiljkaId + @"'
                    DELETE FROM [Upute] WHERE idUpute = '" + biljka.UputeId + @"'
                    COMMIT";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("connString");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Deleted Successfully");
        }
    }
}
