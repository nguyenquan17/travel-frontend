import * as types from "../constants";

const initialState = {
    groups: [],
    selectedRows: [],
    search: null,
      // paging
    page: 1,
    size: 5,
    totalElements: 0,

    // sorting
    sortField: null,
    sortType: null,
}
const groupReducer = (state = initialState, actions)=>{
    switch(actions.type) {
        case types.GROUP_LIST:
            // state.groups = [...actions.groupList]
            // state.search = actions.search
            return {...state,
                groups: actions.payload.groupList,
                search: actions.payload.search,
                page: actions.payload.page,
                size: actions.payload.size,
                totalElements: actions.payload.totalElements,
                sortField: actions.payload.sortField,
                sortType: actions.payload.sortType,
            }

        case types.GET_LIST_GROUP_SELECTED_ROWS:
            return {
                ...state,
                selectedRows: actions.selectedRows
            }
        default:
            return state;
    }
}
export default groupReducer;