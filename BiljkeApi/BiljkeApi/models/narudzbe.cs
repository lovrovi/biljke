using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BiljkeApi.models
{
    public class ListaBiljkaStanje
    {
        public string nazivBiljke { get; set; }
        public string nazivImanja { get; set; }
        public int cijena { get; set; }
        public string mjernaJedinica { get; set; }
        public float kolicina { get; set; }

    }
    public class Narudzbe
    {
        public int NarudzbaId { get; set; }
        public string NarudzbaStatus { get; set; }
        public string NarudzbaIznos { get; set; }
        public string Oznaka { get; set; }
        public string NazivKupca { get; set; }
        public string DatumPocetka { get; set; }
        public string DatumKraja { get; set; }
        public string Vrsta { get; set; }
        public string NazivValute { get; set; }
        public int StanjeId { get; set; }
        public string NS_Kolicina { get; set; }
        public string NS_Iznos { get; set; }
        public ListaBiljkaStanje[] ListaBiljkaStanje { get; set; }
    }
}
