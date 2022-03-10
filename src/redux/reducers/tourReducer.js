import * as type from "../constants";

const initialState = {
    tourListData: [],
    selectedRows: [],
    tourDetail: null,
    tourImg: []
}

const tourReducer = (state = initialState, action) =>{
    switch (action.type){
        case type.TOUR_LIST:
            state.tourListData = [...action.payload]
            return {...state}
        case type.GET_LIST_TOUR_SELECTED_ROWS:
            state.selectedRows = [...action.payload]
            return {...state}
        case type.TOUR_DETAIL:
            state.tourDetail = {...action.payload}
            return {...state}
        case type.IMAGE_LIST:
            state.tourImg = [...action.payload]
            return {...state}
        default:
            return {...state}
    }
}

export default tourReducer;