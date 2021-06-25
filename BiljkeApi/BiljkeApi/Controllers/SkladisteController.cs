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
   
    [ApiController]
    public class SkladisteController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public SkladisteController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [Route("api/[controller]")]
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                    SELECT S.idStanje, S.cijena, S.mjernaJedinica, B.naziv nazivBiljke, B.vrsta vrstaBiljke, B.slika slikaBiljke, I.naziv nazivImanja, 
                    BM.datumSadnje, BM.datumBranja, BM.kolicina posadjenaKolicina, M.idMikrolokacija, 
                    I.idImanje, L.idLokacija, L.naziv nazivLokacije, 
                    M.naziv nazivMikrolokacije, S.kolicina obranaKolicina, BM.idBiljkaMikrolokacija
                    FROM Biljka_mikrolokacija BM
                    JOIN Mikrolokacija M ON BM.idMikrolokacija = M.idMikrolokacija
                    JOIN Imanje I ON I.idImanje = M.idImanje
                    JOIN Stanje S ON S.idImanje = I.idImanje
                    JOIN Biljka B ON B.idBiljka = S.idBiljke AND B.idBiljka = BM.idBiljka
                    JOIN Lokacija L ON I.idLokacija = L.idLokacija
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
        [Route("api/[controller]/details")]
        [HttpPost]
        public JsonResult PostDetails(Skladiste skladiste)
        {
            string query = @"
                    SELECT S.idStanje, S.cijena, S.mjernaJedinica, B.naziv nazivBiljke, B.vrsta vrstaBiljke, B.slika slikaBiljke, I.naziv nazivImanja, BM.datumSadnje, BM.datumBranja, BM.kolicina posadjenaKolicina,
                    M.idMikrolokacija, I.idImanje, L.idLokacija, L.naziv nazivLokacije, M.naziv nazivMikrolokacije, S.kolicina obranaKolicina, BM.idBiljkaMikrolokacija, 
                    P.drzava, P.proizvodjac
                    FROM Biljka_mikrolokacija BM
                    JOIN Mikrolokacija M ON BM.idMikrolokacija = M.idMikrolokacija
                    JOIN Imanje I ON I.idImanje = M.idImanje
                    JOIN Stanje S ON S.idImanje = I.idImanje
                    JOIN Biljka B ON B.idBiljka = S.idBiljke AND B.idBiljka = BM.idBiljka
                    JOIN Lokacija L ON I.idLokacija = L.idLokacija
                    JOIN Putovnica P ON P.idPutovnica = BM.idPutovnica
                    WHERE BM.idBiljkaMikrolokacija = " + skladiste.BMidMikrolokacije +@"
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
        [Route("api/[controller]/allMikrolokacije")]
        [HttpGet]
        public JsonResult GetMikrolokacije()
        {
            string query = @"
                    set xact_abort on
                    BEGIN TRANSACTION
                    SELECT M.idMikrolokacija, M.naziv nazivMikrolokacije, M.tip, M.vrstaTla, I.naziv nazivImanja
                    FROM Mikrolokacija M
                    JOIN Imanje I ON I.idImanje = M.idImanje
                    ORDER BY I.naziv
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
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }
        [Route("api/[controller]/lokacije")]
        [HttpGet]
        public JsonResult Get(int none)
        {
            string query = @"
                    SELECT idLokacija, Naziv FROM Lokacija
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
        [Route("api/[controller]/checkStanje")]
        [HttpPost]
        public JsonResult CheckStanjePost(Skladiste skladiste)
        {
            string query = @"
                    DECLARE @imanjeID int
                    SET @imanjeID = (SELECT idImanje FROM Mikrolokacija WHERE idMikrolokacija = " + skladiste.BMidMikrolokacije + @")
                    IF EXISTS (SELECT * FROM Stanje WHERE idBiljke = " + skladiste.BiljkaId + @" AND idImanje = @imanjeID) 
                    BEGIN
                       SELECT kolicina, cijena, mjernaJedinica FROM Stanje WHERE idBiljke = " + skladiste.BiljkaId + @" AND idImanje = @imanjeID
                    END
                    ELSE
                    BEGIN
                        SELECT 0 isExist
                    END
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
        [Route("api/[controller]/imanja")]
        [HttpPost]
        public JsonResult Post(Skladiste skladiste)
        {
            string query = @"
                    SELECT I.idImanje, I.naziv FROM Imanje I WHERE I.idLokacija = (SELECT L.idLokacija FROM Lokacija L WHERE L.naziv = '" + skladiste.NazivLokacije + @"')
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
        [Route("api/[controller]/mikrolokacije")]
        [HttpPost]
        public JsonResult GetByMikrolokacije(Skladiste skladiste)
        {
            string query = @"
                    SELECT M.idMikrolokacija, M.naziv, M.tip FROM Mikrolokacija M WHERE M.idImanje = (SELECT I.idImanje FROM Imanje I WHERE I.naziv = '" + skladiste.ImanjeNaziv + @"')
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

        [Route("api/[controller]/createBiljkaMikrolokacija")]
        [HttpPost]
        public JsonResult PostBiljkaMikrolokacija(Skladiste skladiste)
        {
            
            string query = @"
                        DECLARE @putovnicaID int
                        INSERT INTO Putovnica (drzava, proizvodjac)
                        VALUES ('" + skladiste.PutovnicaDrzava + @"', '" + skladiste.PutovnicaProizvodjac + @"')
                        SET @putovnicaID = scope_identity();

                        INSERT INTO Biljka_mikrolokacija (kordinate, datumSadnje, datumBranja, kolicina, idPutovnica, idBiljka, idMikrolokacija)
                        VALUES ('" + skladiste.BMkordinate + @"', '" + skladiste.BMdatumSadnje + @"', '" + skladiste.BMdatumBranja + @"'," + skladiste.BMkolicina + @", @putovnicaID, " + skladiste.BiljkaId + @", " + skladiste.BMidMikrolokacije + @")

                        DECLARE @imanjeID int
                        SET @imanjeID = (SELECT idImanje FROM Mikrolokacija WHERE idMikrolokacija = " + skladiste.BMidMikrolokacije + @")

                        IF NOT EXISTS (SELECT * FROM Stanje WHERE idBiljke = " + skladiste.BiljkaId + @" AND idImanje = @imanjeID) 
                        BEGIN
                           INSERT INTO Stanje (kolicina, cijena, mjernaJedinica, idBiljke, idImanje)
                           VALUES(" + skladiste.StanjeKolicina + @", " + skladiste.StanjeCijena + @", '" + skladiste.StanjeMjernaJedinica + @"', " + skladiste.BiljkaId + @", @imanjeID)
                        END
                       
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
        [Route("api/[controller]/search")]
        [HttpPost]
        public JsonResult Post(Skladiste skladiste, int none)
        {
            string query = @"
                SELECT B.idBiljka, B.Naziv, B.Vrsta
                FROM Biljka B
                WHERE B.Naziv LIKE '%" + skladiste.BiljkaNaziv + @"%'
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
        [Route("api/[controller]")]
        [HttpPut]
        public JsonResult Put(Skladiste skladiste)
        {
            
            string query = @"
                    UPDATE Biljka_mikrolokacija
                    SET datumBranja = '" + skladiste.BMdatumBranja + @"', kolicina = " + skladiste.BMkolicina + @"
                    WHERE idBiljkaMikrolokacija = " + skladiste.BMidMikrolokacije + @"


                    UPDATE Stanje
                    SET kolicina = " + skladiste.StanjeKolicina + @", cijena = " + skladiste.StanjeCijena + @"
                    WHERE idStanje = " + skladiste.StanjeId + @"

                    UPDATE Putovnica
                    SET drzava = '" + skladiste.PutovnicaDrzava + @"', proizvodjac = '" + skladiste.PutovnicaProizvodjac + @"'
                    WHERE idPutovnica = (SELECT idPutovnica FROM Biljka_mikrolokacija WHERE idBiljkaMikrolokacija = " + skladiste.BMidMikrolokacije + @")
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

        [Route("api/[controller]")]
        [HttpDelete]
        public JsonResult Delete(Skladiste skladiste)
        {
            string query = @"
                DECLARE @PutovnicaID int
                SET @PutovnicaID = (SELECT idPutovnica FROM Biljka_mikrolokacija WHERE idBiljkaMikrolokacija = " + skladiste.BMidMikrolokacije + @")
                

                DELETE FROM Biljka_mikrolokacija 
                WHERE idBiljkaMikrolokacija = " + skladiste.BMidMikrolokacije + @"
                DELETE FROM Putovnica
                WHERE idPutovnica = @PutovnicaID
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

