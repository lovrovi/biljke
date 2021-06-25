import * as actionsTypes from './actionsTypes';
import axios from '../axios'

// get narudzbe

export const narudzbeGetLoading = () => ({ 
    type: actionsTypes.NARUDZBE_GET_LOADING,
});

export const narudzbeGet = (narudzbe) => ({ 
    type: actionsTypes.NARUDZBE_GET,
    narudzbe
});

export const narudzbeGetFail = () => ({ 
    type: actionsTypes.NARUDZBE_GET_FAIL,
});


export const getNarudzbe = () => {
    return (dispatch) => {
        dispatch(narudzbeGetLoading())
        axios({
            method: "GET",
            url: "api/narudzbe"
        })
        .then(data => {
            console.log(data)
            dispatch(narudzbeGet(data.data))

        })
        .catch((e) => {
            console.log(e);
            dispatch(narudzbeGetFail())
        });
    };
};

// create narudzbe

export const narudzbeCreateLoading = () => ({ 
    type: actionsTypes.NARUDZBE_CREATE_LOADING,
});
export const narudzbeCreate = () => ({ 
    type: actionsTypes.NARUDZBE_CREATE,
    
});
export const narudzbeCreateFail = () => ({ 
    type: actionsTypes.NARUDZBE_CREATE_FAIL,
});


export const createNarudzbe = (Vrsta, NazivKupca, Oznaka, DatumPocetka, DatumKraja, NarudzbaIznos, ListaBiljkaStanje, onCloseModal) => {
     return (dispatch) => {

        dispatch(narudzbeCreateLoading())
        axios({
            method: "POST",
            url: "api/narudzbe",
            data: {
                Vrsta, 
                NazivKupca, 
                Oznaka, 
                DatumPocetka, 
                DatumKraja, 
                NarudzbaIznos, 
                ListaBiljkaStanje,
                
            }
        })
        .then(data => {
            console.log(data)
            dispatch(narudzbeCreate())
            onCloseModal()
        

        })
        .catch((e) => {
            console.log(e);
            dispatch(narudzbeCreateFail())
        });
    };
   
};

// delete narudzbe

export const narudzbeDeleteLoading = () => ({ 
    type: actionsTypes.NARUDZBE_DELETE_LOADING,
});
export const narudzbeDelete = (id) => ({ 
    type: actionsTypes.NARUDZBE_DELETE,
    id
});
export const narudzbeDeleteFail = () => ({ 
    type: actionsTypes.NARUDZBE_DELETE_FAIL,
});


export const deleteNarudzba = (NarudzbaId, getAllNarudzbe) => {
    return (dispatch) => {
        dispatch(narudzbeDeleteLoading())
      // send request
          axios({
            method: "DELETE",
            url: "api/narudzbe",
            data:{
                NarudzbaId
            }
          })
            .then((data) => {
              console.log("deleteNarudzba:", data);
              dispatch(narudzbeDelete(NarudzbaId))
              getAllNarudzbe()
        })
        .catch((e) => {
            console.log(e);
            dispatch(narudzbeDeleteFail())
        });
    };
  };

  export const narudzbeUpdateLoading = () => ({ 
    type: actionsTypes.NARUDZBE_UPDATE_LOADING,
});
export const narudzbeUpdate = () => ({ 
    type: actionsTypes.NARUDZBE_UPDATE,
    
});
export const narudzbeUpdateFail = () => ({ 
    type: actionsTypes.NARUDZBE_UPDATE_FAIL,
});


export const updateBiljka = () => {
    return (dispatch) => {
        dispatch(narudzbeUpdateLoading())
      // send request
          axios({
            method: "PUT",
            url: "api/narudzbe",
            data:{
             
            }
          })
            .then((data) => {
                
              console.log("updateBiljka:", data);
              //console.log("narudzbeUpotreba", narudzbeUpotreba);
              dispatch(narudzbeUpdate())
              getAllNarudzbe()
        })
        .catch((e) => {
            console.log(e);
            dispatch(narudzbeUpdateFail())
        });
    };
  };

  export const resetStateModalForm = () => {
    return {
      type: actionsTypes.NARUDZBE_RESET_MODAL_FORM,
    };
  };
  
  export const loadModal = () => {
    return (dispatch) => {
      dispatch(resetStateModalForm());
    };
  };


  // get biljka stanje
  export const searchBiljkaStanjeLoad = () => ({ 
    type: actionsTypes.SEARCH_BILJKA_STANJE_LOADING,
});

export const searchBiljkaStanjeSuccess = (listaBiljkaStanje) => ({ 
    type: actionsTypes.SEARCH_BILJKA_STANJE_SUCCESS,
    listaBiljkaStanje
    
});

export const searchBiljkaStanjeFail = () => ({ 
    type: actionsTypes.SEARCH_BILJKA_STANJE_FAIL,
});


export const searchBiljkaStanje = (search) => {
    return (dispatch) => {
        dispatch(searchBiljkaStanjeLoad())
        axios({
            method: "GET",
            url: `api/narudzbe/${search}`
        })
        .then(data => {
            console.log(data)
            dispatch(searchBiljkaStanjeSuccess(data.data))

        })
        .catch((e) => {
            console.log(e);
            dispatch(searchBiljkaStanjeFail())
        });
    };
};

// update success

export const updateStatusSuccess = () => ({ 
    type: actionsTypes.NARUDZBE_STATUS_UPDATE,
});


export const updateStatus = (NarudzbaId,NarudzbaStatus, getAllNarudzbe) => {
    return (dispatch) => {
      // send request
          axios({
            method: "PUT",
            url: "api/narudzbe",
            data: {
                NarudzbaId,
                NarudzbaStatus
            }
          })
            .then((data) => {
                
              console.log("updateStatus:", data);
              //console.log("narudzbeUpotreba", narudzbeUpotreba);
              dispatch(updateStatusSuccess())
              getAllNarudzbe()
        })
        .catch((e) => {
            console.log(e);
            //dispatch(narudzbeUpdateFail())
        });
    };
  };

  export const getListaProizvodaLoading = () => ({ 
    type: actionsTypes.GET_LISTA_PROIZVODA_LOADING,
    
});

  export const getListaProizvodaSuccess = (listaProizvoda) => ({ 
    type: actionsTypes.GET_LISTA_PROIZVODA,
    listaProizvoda
});


export const getListaProizvoda = (NarudzbaId) => {
    return async (dispatch) => {
        dispatch(getListaProizvodaLoading())
      // send request
          axios({
            method: "POST",
            url: `api/narudzbe/${NarudzbaId}`,
          })
            .then((data) => {
                
              console.log("getListaProizvoda:", data);
              //console.log("narudzbeUpotreba", narudzbeUpotreba);
              dispatch(getListaProizvodaSuccess(data.data))
        })
        .catch((e) => {
            console.log(e);
            //dispatch(narudzbeUpdateFail())
        });
    };
  };