import * as actionsTypes from './actionsTypes';
import axios from '../axios'

// get biljke skladiste

export const skladisteGetLoading = () => ({ 
    type: actionsTypes.SKLADISTE_BILJKE_GET_LOADING,
});

export const skladisteGet = (skladiste) => ({ 
    type: actionsTypes.SKLADISTE_BILJKE_GET,
    skladiste
    
});

export const skladisteGetFail = () => ({ 
    type: actionsTypes.SKLADISTE_BILJKE_GET_FAIL,
});


export const getBiljkeSkladiste = () => {
    return async (dispatch) => {
        dispatch(skladisteGetLoading())
        axios({
            method: "GET",
            url: "api/skladiste"
        })
        .then(data => {
            console.log(data)
            dispatch(skladisteGet(data.data))

        })
        .catch((e) => {
            console.log(e);
            dispatch(skladisteGetFail())
        });
    };
};

// get biljke skladiste details

export const skladisteDetailsGetLoading = () => ({ 
    type: actionsTypes.SKLADISTE_DETAILS_BILJKE_GET_LOADING,
});

export const skladisteDetailsGet = (skladisteDetails) => ({ 
    type: actionsTypes.SKLADISTE_DETAILS_BILJKE_GET,
    skladisteDetails
    
});

export const skladisteDetailsGetFail = () => ({ 
    type: actionsTypes.SKLADISTE_DETAILS_BILJKE_GET_FAIL,
});


export const getBiljkeSkladisteDetails = (BMidMikrolokacije) => {
    return async (dispatch) => {
        dispatch(skladisteDetailsGetLoading())
        axios({
            method: "POST",
            url: "api/skladiste/details/",
            data: {
                BMidMikrolokacije
            }
        })
        .then(data => {
            console.log(data)
            dispatch(skladisteDetailsGet(data.data[0]))

        })
        .catch((e) => {
            console.log(e);
            dispatch(skladisteDetailsGetFail())
        });
    };
};


// get biljke skladiste lokacije

export const lokacijeGetLoading = () => ({ 
    type: actionsTypes.LOKACIJE_GET_LOADING,
});

export const lokacijeGet = (lokacije) => ({ 
    type: actionsTypes.LOKACIJE_GET,
    lokacije
    
});

export const lokacijeGetFail = () => ({ 
    type: actionsTypes.LOKACIJE_GET_FAIL,
});


export const getLokacije = () => {
    return async (dispatch) => {
        dispatch(lokacijeGetLoading())
        axios({
            method: "GET",
            url: "api/skladiste/lokacije",
          
        })
        .then(data => {
            console.log(data)
            dispatch(lokacijeGet(data.data))

        })
        .catch((e) => {
            console.log(e);
            dispatch(lokacijeGetFail())
        });
    };
};

export const getImanjaFromLokacijaLoad = () => ({ 
    type: actionsTypes.GET_IMANJA_LOKACIJA_LOADING,
});

export const getImanjaFromLokacijaSuccess = (imanja) => ({ 
    type: actionsTypes.GET_IMANJA_LOKACIJA,
    imanja
    
});

export const getImanjaFromLokacijaFail = () => ({ 
    type: actionsTypes.GET_IMANJA_LOKACIJA_FAIL,
});


export const getImanjaFromLokacija = (NazivLokacije) => {
    return async (dispatch) => {
        dispatch(getImanjaFromLokacijaLoad())
        axios({
            method: "POST",
            url: "api/skladiste/imanja",
            data: {
                NazivLokacije
            }
          
        })
        .then(data => {
            console.log(data)
            dispatch(getImanjaFromLokacijaSuccess(data.data))

        })
        .catch((e) => {
            console.log(e);
            dispatch(getImanjaFromLokacijaFail())
        });
    };
};

export const getMikrolokacijeFromImanjeLoad = () => ({ 
    type: actionsTypes.GET_MIKROLOKACIJE_IMANJE_LOADING,
});

export const getMikrolokacijeFromImanjeSuccess = (mikrolokacije) => ({ 
    type: actionsTypes.GET_MIKROLOKACIJE_IMANJE,
    mikrolokacije
    
});

export const getMikrolokacijeFromImanjeFail = () => ({ 
    type: actionsTypes.GET_MIKROLOKACIJE_IMANJE_FAIL,
});


export const getMikrolokacijeFromImanje = (ImanjeNaziv) => {
    return async (dispatch) => {
        dispatch(getMikrolokacijeFromImanjeLoad())
        axios({
            method: "POST",
            url: "api/skladiste/mikrolokacije",
            data: {
                ImanjeNaziv
            }
          
        })
        .then(data => {
            console.log(data)
            dispatch(getMikrolokacijeFromImanjeSuccess(data.data))

        })
        .catch((e) => {
            console.log(e);
            dispatch(getMikrolokacijeFromImanjeFail())
        });
    };
};

// create biljka skladiste

export const createBiljkaSkladisteLoad = () => ({ 
    type: actionsTypes.BILJKA_SKLADISTE_CREATE_LOADING,
});
export const createBiljkaSkladisteSuccess = () => ({ 
    type: actionsTypes.BILJKA_SKLADISTE_CREATE,
    
});
export const createBiljkaSkladisteFail = () => ({ 
    type: actionsTypes.BILJKA_SKLADISTE_CREATE_FAIL,
});


export const createBiljkaSkladiste = (BMkordinate, BMdatumSadnje, BMdatumBranja, BMkolicina, BiljkaId, BMidMikrolokacije, StanjeKolicina, StanjeCijena, StanjeMjernaJedinica, PutovnicaProizvodjac, PutovnicaDrzava, getAllBiljkeSkladiste) => {
     return (dispatch) => {

        dispatch(createBiljkaSkladisteLoad())
        axios({
            method: "POST",
            url: "api/skladiste/createBiljkaMikrolokacija",
            data: {
                BMkordinate, 
                BMdatumSadnje,
                BMdatumBranja, 
                BMkolicina, 
                BiljkaId, 
                BMidMikrolokacije, 
                StanjeKolicina, 
                StanjeCijena, 
                StanjeMjernaJedinica,
                PutovnicaProizvodjac, 
                PutovnicaDrzava
            }
        })
        .then(data => {
            console.log(data)
            dispatch(createBiljkaSkladisteSuccess())
            getAllBiljkeSkladiste()
        
        })
        .catch((e) => {
            console.log(e);
            dispatch(createBiljkaSkladisteFail())
        });
    };
   
};

// get biljke mikrolokacija

export const getBiljkeMikrolokacijeLoad = () => ({ 
    type: actionsTypes.GET_BILJKE_MIKROLOKACIJE_LOAD,
});
export const getBiljkeMikrolokacijeSuccess = (biljkeSearchArr) => ({ 
    type: actionsTypes.GET_BILJKE_MIKROLOKACIJE,
    biljkeSearchArr
    
});
export const getBiljkeMikrolokacijeFail = () => ({ 
    type: actionsTypes.GET_BILJKE_MIKROLOKACIJE_FAIL,
});


export const getBiljkeMikrolokacije = (BiljkaNaziv) => {
     return (dispatch) => {

        dispatch(getBiljkeMikrolokacijeLoad())
        axios({
            method: "POST",
            url: "api/skladiste/search",
            data: {
                BiljkaNaziv
            }
        })
        .then(data => {
            console.log(data)
            dispatch(getBiljkeMikrolokacijeSuccess(data.data))
        

        })
        .catch((e) => {
            console.log(e);
            dispatch(getBiljkeMikrolokacijeFail())
        });
    };
   
};

// get mikrolokacije

export const getMikrolokacijeLoad = () => ({ 
    type: actionsTypes.GET_MIKROLOKACIJE_LOAD,
});
export const getMikrolokacijeSuccess = (mikrolokacijeArr) => ({ 
    type: actionsTypes.GET_MIKROLOKACIJE,
    mikrolokacijeArr
    
});
export const getMikrolokacijeFail = () => ({ 
    type: actionsTypes.GET_MIKROLOKACIJE_FAIL,
});


export const getMikrolokacije = () => {
     return (dispatch) => {

        dispatch(getMikrolokacijeLoad())
        axios({
            method: "GET",
            url: "api/skladiste/allMikrolokacije",
        })
        .then(data => {
            console.log(data)
            dispatch(getMikrolokacijeSuccess(data.data))
        

        })
        .catch((e) => {
            console.log(e);
            dispatch(getMikrolokacijeFail())
        });
    };
   
};

export const isStanjeExistSuccess = (isExistObj) => ({ 
    type: actionsTypes.IS_STANJE_EXIST_SUCCESS,
    isExistObj
    
    
});



export const isStanjeExist = (BiljkaId, BMidMikrolokacije) => {
     return (dispatch) => {

        //dispatch(getMikrolokacijeLoad())
        axios({
            method: "POST",
            url: "api/skladiste/checkStanje",
            data: {
                BiljkaId, 
                BMidMikrolokacije
            }
        })
        .then(data => {
            console.log(data.data[0])
            dispatch(isStanjeExistSuccess(data.data[0]))
        

        })
        .catch((e) => {
            console.log(e);
            //dispatch(getMikrolokacijeFail())
        });
    };
   
};

export const resetStateModalForm = () => {
    return {
      type: actionsTypes.SKLADISTE_RESET_MODAL_FORM,
    };
  };
  
  export const loadModal = () => {
    return (dispatch) => {
      dispatch(resetStateModalForm());
    };
  };

  export const filterLokacijeSuccess = (filterArr) => {
    return {
      type: actionsTypes.FILTER_LOKACIJE,
      filterArr
    };
  };
  
  export const filterLokacije = (filterArr) => {
    return (dispatch) => {
      dispatch(filterLokacijeSuccess(filterArr));
    };
  };

// delete biljka stanje

export const deleteBiljkeStanjeLoad = () => ({ 
    type: actionsTypes.BILJKE_STANJE_DELETE_LOADING,
});
export const deleteBiljkeStanjeSuccess = (id) => ({ 
    type: actionsTypes.BILJKE_STANJE_DELETE,
    id
});
export const deleteBiljkeStanjeFail = () => ({ 
    type: actionsTypes.BILJKE_STANJE_DELETE_FAIL,
});


export const deleteBiljkaStanje = (BMidMikrolokacije, getAllBiljke) => {
    return (dispatch) => {
        dispatch(deleteBiljkeStanjeLoad())
      // send request
          axios({
            method: "DELETE",
            url: "api/skladiste",
            data:{
                BMidMikrolokacije
            }
          })
            .then((data) => {
              console.log("deleteAdv:", data);
              dispatch(deleteBiljkeStanjeSuccess(BMidMikrolokacije))
              getAllBiljke()
        })
        .catch((e) => {
            console.log(e);
            dispatch(deleteBiljkeStanjeFail())
        });
    };
  };

  export const biljkeSkladisteUpdateLoading = () => ({ 
    type: actionsTypes.BILJKA_SKLADISTE_UPDATE_LOADING,
});
export const biljkeSkladisteUpdate = () => ({ 
    type: actionsTypes.BILJKA_SKLADISTE_UPDATE,
    
});
export const biljkeSkladisteUpdateFail = () => ({ 
    type: actionsTypes.BILJKA_SKLADISTE_UPDATE_FAIL,
});


export const updateSkladisteBiljka = (BMdatumBranja, BMkolicina, StanjeKolicina,BMidMikrolokacije, StanjeId, StanjeCijena, PutovnicaProizvodjac, PutovnicaDrzava, onCloseModal) => {
    return (dispatch) => {
        dispatch(biljkeSkladisteUpdateLoading())
      // send request
          axios({
            method: "PUT",
            url: "api/skladiste",
            data:{
                BMdatumBranja, 
                BMkolicina, 
                StanjeKolicina,
                BMidMikrolokacije, 
                StanjeId, 
                StanjeCijena,
                PutovnicaProizvodjac,
                PutovnicaDrzava
            }
          })
            .then((data) => {
                
              console.log("updateBiljka:", data);
              //console.log("biljkaUpotreba", biljkaUpotreba);
              dispatch(biljkeSkladisteUpdate())
              onCloseModal()
        })
        .catch((e) => {
            console.log(e);
            dispatch(biljkeSkladisteUpdateFail())
        });
    };
  };



