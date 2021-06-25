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
    public class NarudzbeController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public NarudzbeController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                    SELECT N.idNarudzba, N.status, N.iznos as narudzbaIznos, N.nazivKupca, N.datumPocetka, N.datumKraja, N.vrsta as vrstaNarudzba, V.Oznaka as valuta
                    FROM Narudzba N
                    JOIN Valuta V ON N.idValuta = V.idValuta
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
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpPost("{id}")]
        public JsonResult Post(int id)
        {
            string query = @"
                   SELECT B.Naziv, NS.kolicina, NS.iznos
                    FROM Narudzba_stanje NS
                    JOIN Stanje S on NS.idStanje = S.idStanje
                    JOIN Biljka B ON B.idBiljka = S.idBiljke
                    WHERE NS.idNarudzba = " + id + @"
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
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }


        [HttpPost]
        public JsonResult Post(Narudzbe narudzbe)
        {
            string subQuery = "";
            for (int i = 0; i < narudzbe.ListaBiljkaStanje.Length; i++)
            {
                subQuery += @"SET @StanjeId = (SELECT TOP 1 idStanje FROM Stanje WHERE idBiljke = (SELECT idBiljke FROM Biljka WHERE Naziv = '"+narudzbe.ListaBiljkaStanje[i].nazivBiljke+ @"')
                 AND idImanje = (SELECT TOP 1 idImanje FROM Imanje WHERE naziv = '" + narudzbe.ListaBiljkaStanje[i].nazivImanja + @"') )
                INSERT INTO Narudzba_stanje(idStanje, idNarudzba, kolicina, iznos)
                VALUES(@StanjeId, @NarudzbaId, " + narudzbe.ListaBiljkaStanje[i].kolicina + @", " + narudzbe.ListaBiljkaStanje[i].cijena * narudzbe.ListaBiljkaStanje[i].kolicina + @")";

            }
            string query = @"
                BEGIN TRANSACTION
                DECLARE @ValutaId int
                SET @ValutaId = (SELECT TOP 1 idValuta FROM Valuta WHERE Oznaka = '" + narudzbe.Oznaka + @"')

                DECLARE @NarudzbaId int
                INSERT INTO	Narudzba (status, iznos, nazivKupca, datumPocetka, datumKraja, vrsta, idValuta)
                VALUES ('u tijeku', " + narudzbe.NarudzbaIznos + @", '" + narudzbe.NazivKupca + @"', '" + narudzbe.DatumPocetka + @"', '" + narudzbe.DatumKraja + @"',
                '" + narudzbe.Vrsta + @"', @ValutaId)
                SELECT @NarudzbaId = SCOPE_IDENTITY();


                DECLARE @StanjeId int
                "+subQuery+@"
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

            return new JsonResult("added");
        }

        [HttpPut]
        public JsonResult Put(Narudzbe narudzbe)
        {
            
            string query = @"
                    UPDATE Narudzba SET status = '" + narudzbe.NarudzbaStatus + @"' WHERE idNarudzba = " + narudzbe.NarudzbaId + @"
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

        [HttpGet("{search}")]
        public JsonResult Get(string search)
        {
            string query = @"
                    SELECT B.idBiljka, B.Naziv nazivBiljke, S.cijena, S.mjernaJedinica, I.naziv nazivImanja
                    FROM Stanje S
                    JOIN Biljka B ON B.idBiljka = S.idBiljke
                    JOIN Imanje I ON S.idImanje = I.idImanje
                    WHERE B.Naziv LIKE '%" + search + @"%'
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
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }


        [HttpDelete]
        public JsonResult Delete(Narudzbe narudzbe)
        {
            string query = @"
            set xact_abort on
            BEGIN TRANSACTION
            DELETE FROM Narudzba_stanje WHERE idNarudzba = " + narudzbe.NarudzbaId + @"
            DELETE FROM Narudzba WHERE idNarudzba = " + narudzbe.NarudzbaId + @"
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

            return new JsonResult("Deleted Successfully");
        }
    }
}
