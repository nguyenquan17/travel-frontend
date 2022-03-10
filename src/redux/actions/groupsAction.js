import * as types from "../constants";
import GroupsApi from "../../api/groupsApi";
import { openLoadingAction, closeLoadingAction  } from "./loaderAction";


export const groupListAction = (groupList, page, size, totalElements, sortField, sortType, search) => ({
    type: types.GROUP_LIST,
    payload: {
        groupList,
        search,
        page,
        size,
        totalElements,
        sortField,
        sortType
    }
})

export const updateSelectedRowsAction = (selectedRows) => ({
    type: types.GET_LIST_GROUP_SELECTED_ROWS,
    selectedRows

})


export const getAllGroup = (page, size, sortField, sortType,search) => async dispatch => {
    try{
        dispatch(openLoadingAction())
        const res = await GroupsApi.getAllGroups(page, size, sortField, sortType,search);
        console.log(res);
            //loading
            let data = {
                dataGroup: [],
                search: search,
                page: page,
                size: size,
                totalElements: 0,
                sortField: sortField,
                sortType: sortType
            }
            data.dataGroup = res.content;
            data.totalElements = res.totalElements;
            console.log(data.dataGroup);
            console.log(data.totalElements);

            dispatch(closeLoadingAction())
            dispatch(groupListAction(data.dataGroup, data.page, data.size, data.totalElements, data.sortField, data.sortType,  data.search))
    }catch(e){
        //close loading
        dispatch(closeLoadingAction())
        console.log(e);
    }
}
export const createGroup = (name, totalMember) => async dispatch =>{
    try{
        //open loading
        dispatch(openLoadingAction())
        const res = await GroupsApi.create(name, totalMember)
        console.log(res);
        //open loading
        const reloadData = await GroupsApi.getAllGroups();
        dispatch(closeLoadingAction())
        dispatch(groupListAction(reloadData.content,reloadData.number+ 1, reloadData.size))
        //close loading
    }catch(e){
        //close loading
        dispatch(closeLoadingAction())
        console.log(e);
    }

}
export const updateGroup = (id, name, totalMember) => async dispatch =>{
    try{
        //open loading
        dispatch(openLoadingAction())
        const res = await GroupsApi.update(id, name, totalMember)
        //open loading
        const reloadData = await GroupsApi.getAllGroups();
        // console.log(reloadData.number+ 1, reloadData.size);
        dispatch(closeLoadingAction())
        dispatch(groupListAction(reloadData.content,reloadData.number+ 1, reloadData.size))
        //close loading
    }catch(e){
        //close loading
        dispatch(closeLoadingAction())
        console.log(e);
    }
}

export const deleteMultipleGroup = (ids) => async dispatch =>{
    try{
        //open loading
        dispatch(openLoadingAction())
        const res = await GroupsApi.deleteMultiple(ids)
        console.log(res);
        //open loading
        const reloadData = await GroupsApi.getAllGroups();
        dispatch(closeLoadingAction())
        dispatch(groupListAction(reloadData.content))
        //close loading
    }catch(e){
        //close loading
        dispatch(closeLoadingAction())
        console.log(e);
    }
}