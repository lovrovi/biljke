using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BiljkeApi.models


{
    public class ListaUpotreba
    {
        public string vrstaUpotrebe  { get; set; }
        public string opisUpotrebe { get; set; }
    }
    public class Biljka
    {
        public int BiljkaId { get; set; }
        public string BiljkaNaziv { get; set; }
        public string BiljkaVrsta { get; set; }
        public int BiljkaIdUpute { get; set; }
        public string SlikaUrl { get; set; }

        public int UputeId { get; set; }
        public string VrijemeSadnje { get; set; }
        public string VrijemeBranja { get; set; }
        public string UputeOpis { get; set; }

        public int UpotrebeId { get; set; }

        public int BiljkaIDbu { get; set; }
        public int UpotrebeIDbu { get; set; }


        public ListaUpotreba[] ListaUpotreba { get; set; }
    }
}
