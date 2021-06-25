using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BiljkeApi.models
{
    public class Skladiste
    {
        public int StanjeId { get; set; }
        public int StanjeCijena { get; set; }
        public string StanjeMjernaJedinica { get; set; }
        public string StanjeKolicina { get; set; }
        public int BiljkaId { get; set; }
        public string BiljkaNaziv { get; set; }
        public string ImanjeNaziv { get; set; }
        public string BMdatumSadnje { get; set; }
        public string BMdatumBranja { get; set; }
        public int BMidMikrolokacije { get; set; }
        public int BMkolicina { get; set; }
        public string BMkordinate { get; set; }
        public int IdLokacija { get; set; }
        public string NazivLokacije { get; set; }
        public string PutovnicaDrzava { get; set; }
        public string PutovnicaProizvodjac { get; set; }
    }
}
