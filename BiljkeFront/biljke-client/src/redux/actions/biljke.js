import * as actionsTypes from './actionsTypes';
import axios from '../axios'

// get biljke

export const biljkeGetLoading = () => ({ 
    type: actionsTypes.BILJKE_GET_LOADING,
});

export const biljkeGet = (biljke) => ({ 
    type: actionsTypes.BILJKE_GET,
    biljke
});

export const biljkeGetFail = () => ({ 
    type: actionsTypes.BILJKE_GET_FAIL,
});


export const getBiljke = () => {
    return (dispatch) => {
        dispatch(biljkeGetLoading())
        axios({
            method: "GET",
            url: "api/biljka"
        })
        .then(data => {
            console.log(data)
            dispatch(biljkeGet(data))

        })
        .catch((e) => {
            console.log(e);
            dispatch(biljkeGetFail())
        });
    };
};

// create biljke

export const biljkeCreateLoading = () => ({ 
    type: actionsTypes.BILJKE_CREATE_LOADING,
});
export const biljkeCreate = (naziv, vrsta) => ({ 
    type: actionsTypes.BILJKE_CREATE,
    naziv,
    vrsta
});
export const biljkeCreateFail = () => ({ 
    type: actionsTypes.BILJKE_CREATE_FAIL,
});


export const createBiljke = (BiljkaNaziv,BiljkaVrsta, VrijemeSadnje, VrijemeBranja, UputeOpis, SlikaUrl, ListaUpotreba, onCloseModal) => {
     return (dispatch) => {

        dispatch(biljkeCreateLoading())
        axios({
            method: "POST",
            url: "api/biljka",
            data: {
                BiljkaNaziv,
                BiljkaVrsta,
                VrijemeSadnje, 
                VrijemeBranja, 
                UputeOpis, 
                SlikaUrl,
                ListaUpotreba 
                
            }
        })
        .then(data => {
            console.log(data)
            dispatch(biljkeCreate(BiljkaNaziv, BiljkaVrsta))
            onCloseModal()

        })
        .catch((e) => {
            console.log(e);
            dispatch(biljkeCreateFail())
        });
    };
   
};

// delete biljke

export const biljkeDeleteLoading = () => ({ 
    type: actionsTypes.BILJKE_DELETE_LOADING,
});
export const biljkeDelete = (id) => ({ 
    type: actionsTypes.BILJKE_DELETE,
    id
});
export const biljkeDeleteFail = () => ({ 
    type: actionsTypes.BILJKE_DELETE_FAIL,
});


export const deleteBiljka = (BiljkaId ,UputeId,getAllBiljke) => {
    return (dispatch) => {
        dispatch(biljkeDeleteLoading())
      // send request
          axios({
            method: "DELETE",
            url: "api/biljka",
            data:{
              BiljkaId,
              UputeId
            }
          })
            .then((data) => {
              console.log("deleteAdv:", data);
              dispatch(biljkeDelete(BiljkaId))
              getAllBiljke()
        })
        .catch((e) => {
            console.log(e);
            dispatch(biljkeDeleteFail())
        });
    };
  };

  export const biljkeUpdateLoading = () => ({ 
    type: actionsTypes.BILJKE_UPDATE_LOADING,
});
export const biljkeUpdate = () => ({ 
    type: actionsTypes.BILJKE_UPDATE,
    
});
export const biljkeUpdateFail = () => ({ 
    type: actionsTypes.BILJKE_UPDATE_FAIL,
});


export const updateBiljka = (BiljkaNaziv, BiljkaVrsta, VrijemeBranja, VrijemeSadnje, UputeOpis, SlikaUrl, ListaUpotreba, BiljkaId,getAllBiljke) => {
    return (dispatch) => {
        dispatch(biljkeUpdateLoading())
      // send request
          axios({
            method: "PUT",
            url: "api/biljka",
            data:{
              BiljkaNaziv,
              BiljkaVrsta,
              VrijemeBranja, 
              VrijemeSadnje, 
              UputeOpis, 
              SlikaUrl,
              ListaUpotreba,
              BiljkaId
            }
          })
            .then((data) => {
                
              console.log("updateBiljka:", data);
              //console.log("biljkaUpotreba", biljkaUpotreba);
              dispatch(biljkeUpdate())
              getAllBiljke()
        })
        .catch((e) => {
            console.log(e);
            dispatch(biljkeUpdateFail())
        });
    };
  };

  /*export const resetStateModalForm = () => {
    return {
      type: actionsTypes.BILJKE_RESET_MODAL_FORM,
    };
  };
  
  export const loadModal = () => {
    return (dispatch) => {
      dispatch(resetStateModalForm());
    };
  };*/


  // get biljka details

  export const biljkaDetailsGetLoading = () => ({ 
    type: actionsTypes.BILJKA_DETAILS_GET_LOADING,
});

export const biljkaDetailsGet = (biljkaDetailsArr) => ({ 
    type: actionsTypes.BILJKA_DETAILS_GET,
    biljkaDetailsArr,
    
});

export const biljkaDetailsGetFail = () => ({ 
    type: actionsTypes.BILJKA_DETAILS_GET_FAIL,
});


export const getBiljkaDetails = (idBiljka) => {
    return (dispatch) => {
        dispatch(biljkaDetailsGetLoading())
        axios({
            method: "GET",
            url: `api/biljka/${idBiljka}`,
           
        })
        .then(data => {
            
            console.log(data)
            
            dispatch(biljkaDetailsGet(data.data))

        })
        .catch((e) => {
            console.log(e);
            dispatch(biljkaDetailsGetFail())
        });
    };
};

// filter biljke

export const filterBiljkeSuccess = (filterArr) => {
    return {
      type: actionsTypes.FILTER_BILJKE,
      filterArr
    };
  };
  
  export const filterBiljke = (filterArr) => {
    return (dispatch) => {
      dispatch(filterBiljkeSuccess(filterArr));
    };
  };