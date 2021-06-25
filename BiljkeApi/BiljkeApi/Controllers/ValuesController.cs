using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;

namespace BiljkeApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatistikaController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public StatistikaController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet("{tipStatistike}/{godina}")]
        public JsonResult Get(string tipStatistike, int godina)
        {
            string query = "";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("connString");
            SqlDataReader myReader;
            switch (tipStatistike) {
                case "prihodi":
                    query = @"
                    SELECT CASE 
                        WHEN N.datumKraja LIKE '%.1.%' THEN 'Sijecanj' 
                        WHEN N.datumKraja LIKE '%.2.%' THEN 'Veljaca' 
                        WHEN N.datumKraja LIKE '%.3.%' THEN 'Ozujak' 
                        WHEN N.datumKraja LIKE '%.4.%' THEN 'Travanj' 
                        WHEN N.datumKraja LIKE '%.5.%' THEN 'Svibanj' 
                        WHEN N.datumKraja LIKE '%.6.%' THEN 'Lipanj' 
                        WHEN N.datumKraja LIKE '%.7.%' THEN 'Srpanj' 
                        WHEN N.datumKraja LIKE '%.8.%' THEN 'Kolovoz' 
                        WHEN N.datumKraja LIKE '%.9.%' THEN 'Rujan' 
                        WHEN N.datumKraja LIKE '%.10.%' THEN 'Listopad' 
                        WHEN N.datumKraja LIKE '%.11.%' THEN 'Studeni' 
                        WHEN N.datumKraja LIKE '%.12.%' THEN 'Prosinac'
                        ELSE 'Ostalo' 
                    END AS mjesec,
                    SUM(N.iznos) AS narudzbaIznos
                    FROM Narudzba N
                    WHERE (N.datumKraja LIKE '%.%." + godina + @"' 
                    OR N.datumKraja LIKE '%.%." + godina + @"%')
                    AND N.status LIKE 'zavrsena'
                    GROUP BY CASE 
                        WHEN N.datumKraja LIKE '%.1.%' THEN 'Sijecanj' 
                        WHEN N.datumKraja LIKE '%.2.%' THEN 'Veljaca' 
                        WHEN N.datumKraja LIKE '%.3.%' THEN 'Ozujak' 
                        WHEN N.datumKraja LIKE '%.4.%' THEN 'Travanj' 
                        WHEN N.datumKraja LIKE '%.5.%' THEN 'Svibanj' 
                        WHEN N.datumKraja LIKE '%.6.%' THEN 'Lipanj' 
                        WHEN N.datumKraja LIKE '%.7.%' THEN 'Srpanj' 
                        WHEN N.datumKraja LIKE '%.8.%' THEN 'Kolovoz' 
                        WHEN N.datumKraja LIKE '%.9.%' THEN 'Rujan' 
                        WHEN N.datumKraja LIKE '%.10.%' THEN 'Listopad' 
                        WHEN N.datumKraja LIKE '%.11.%' THEN 'Studeni' 
                        WHEN N.datumKraja LIKE '%.12.%' THEN 'Prosinac'
                        ELSE 'Ostalo' 
                    END 
                    ";

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

                    break;

                case "broj-narudzbi":
                    query = @"
                    SELECT CASE 
                        WHEN N.datumKraja LIKE '%.1.%' THEN 'Sijecanj' 
                        WHEN N.datumKraja LIKE '%.2.%' THEN 'Veljaca' 
                        WHEN N.datumKraja LIKE '%.3.%' THEN 'Ozujak' 
                        WHEN N.datumKraja LIKE '%.4.%' THEN 'Travanj' 
                        WHEN N.datumKraja LIKE '%.5.%' THEN 'Svibanj' 
                        WHEN N.datumKraja LIKE '%.6.%' THEN 'Lipanj' 
                        WHEN N.datumKraja LIKE '%.7.%' THEN 'Srpanj' 
                        WHEN N.datumKraja LIKE '%.8.%' THEN 'Kolovoz' 
                        WHEN N.datumKraja LIKE '%.9.%' THEN 'Rujan' 
                        WHEN N.datumKraja LIKE '%.10.%' THEN 'Listopad' 
                        WHEN N.datumKraja LIKE '%.11.%' THEN 'Studeni' 
                        WHEN N.datumKraja LIKE '%.12.%' THEN 'Prosinac'
                        ELSE 'Ostalo' 
                    END AS mjesec,
                    CASE 
                        WHEN N.status LIKE '%zavrsena%' THEN 'Zavrsene'
                        WHEN N.status LIKE '%u tijeku%' THEN 'U tijeku'
                        WHEN N.status LIKE '%propala%' THEN 'Propale'
                        WHEN N.status LIKE '%greska%' THEN 'Greske'
                        ELSE 'Ostali statusi' 
                    END AS status,
                    COUNT(*) AS brojNarudzbi
                    FROM Narudzba N
                    WHERE N.datumKraja LIKE '%.%." + godina + @"' 
                    OR N.datumKraja LIKE '%.%." + godina + @"%'
                    GROUP BY CASE 
                        WHEN N.datumKraja LIKE '%.1.%' THEN 'Sijecanj' 
                        WHEN N.datumKraja LIKE '%.2.%' THEN 'Veljaca' 
                        WHEN N.datumKraja LIKE '%.3.%' THEN 'Ozujak' 
                        WHEN N.datumKraja LIKE '%.4.%' THEN 'Travanj' 
                        WHEN N.datumKraja LIKE '%.5.%' THEN 'Svibanj' 
                        WHEN N.datumKraja LIKE '%.6.%' THEN 'Lipanj' 
                        WHEN N.datumKraja LIKE '%.7.%' THEN 'Srpanj' 
                        WHEN N.datumKraja LIKE '%.8.%' THEN 'Kolovoz' 
                        WHEN N.datumKraja LIKE '%.9.%' THEN 'Rujan' 
                        WHEN N.datumKraja LIKE '%.10.%' THEN 'Listopad' 
                        WHEN N.datumKraja LIKE '%.11.%' THEN 'Studeni' 
                        WHEN N.datumKraja LIKE '%.12.%' THEN 'Prosinac'
                        ELSE 'Ostalo' 
                    END,
                    CASE 
                        WHEN N.status LIKE '%zavrsena%' THEN 'Zavrsene'
                        WHEN N.status LIKE '%u tijeku%' THEN 'U tijeku'
                        WHEN N.status LIKE '%propala%' THEN 'Propale'
                        WHEN N.status LIKE '%greska%' THEN 'Greske'
                        ELSE 'Ostali statusi' 
                    END
                    ";

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

                    break;

                case "default":
                    return new JsonResult(new object[0]);
                    break;
            }
            return new JsonResult(new object[0]);
        }
    }

    
}
