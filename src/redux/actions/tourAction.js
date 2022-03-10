import {TOUR_LIST, GET_LIST_TOUR_SELECTED_ROWS, TOUR_DETAIL, IMAGE_LIST} from "../constants";
import { openLoadingAction, closeLoadingAction  } from "./loaderAction";
import TourApi from "../../api/TourDetailListApi";
import * as types from "../constants";


export const getAllTourAction = (tourListData) => ({
    type: TOUR_LIST,
    payload: tourListData
})

export const getTourDetailAction = (tourDetailData)  => ({
    type: TOUR_DETAIL,
    payload: tourDetailData
})

export const updateSelectedRowsAction = (selectedRows) => ({
    type: GET_LIST_TOUR_SELECTED_ROWS,
    payload: selectedRows

})

export const uploadMultipleImgAction = (tourImg) => ({
    type: IMAGE_LIST,
    payload: tourImg
})

//============================================CALL API => REDUCER=====================================================

export const getAllTourList = () => async dispatch =>{
    try {
        dispatch(openLoadingAction());
        const response = await TourApi.getAllTours();
        dispatch(closeLoadingAction());
        dispatch(getAllTourAction(response))
    }catch (e){
        dispatch(closeLoadingAction());
        console.log(e)
    }
}

export const getTourDetail = (id) => async dispatch => {
    try {
        dispatch(openLoadingAction());
        const response = await TourApi.getTourDetailById(id)
        dispatch(closeLoadingAction());
        dispatch(getTourDetailAction(response))
    }catch (e){
        dispatch(closeLoadingAction());
        console.log(e)
    }
}

export const uploadMultipleImg = (formData) => async dispatch => {
    try {
        dispatch(openLoadingAction());
        try {

            await TourApi.uploadMultipleImage(formData).then((response) => {
                console.log(response)
                const dataArr = [];
                if(response.status === 200) {

                    let reload = [...dataArr,response.data.url]
                    // dataArr.push(response.data.url)
                    console.log([...reload])
                    // dispatch(uploadMultipleImgAction( reload))
                    dispatch(closeLoadingAction())
                }
            });
        }catch (error){
            dispatch(closeLoadingAction());
            console.log("Error",error);
        }
    }catch (e){
        dispatch(closeLoadingAction());
        console.log(e)
    }
}

export const createTour = (createForm) => async dispatch => {
    try {
        dispatch(openLoadingAction());
        const req = await TourApi.createTour({
            "tourType": createForm.tourType,
            "regional": createForm.regional,
            "tour": createForm.tour,
            "title": createForm.title,
            "description": createForm.description,
            "schedule": createForm.schedule,
            "dayStart": createForm.dayStart,
            "vehicle": createForm.vehicle,
            "departureFrom": createForm.departureFrom,
            "price": createForm.price,
            "quantity": createForm.quantity,
            "notes": createForm.notes,
            "imageList": createForm.imageList,
            "creator": createForm.creator
        })

            dispatch(openLoadingAction());
            const response = await TourApi.getAllTours();
            dispatch(getAllTourAction(response))
            dispatch(closeLoadingAction());

    }catch (e){
        dispatch(closeLoadingAction());
        console.log(e)
    }

}
//await props.createTour({...values},);
export const updateTour = (id, updateForm) => async dispatch => {
    try {
        dispatch(openLoadingAction());
        const req = await TourApi.updateTour(id,{
            "id": updateForm.id,
            "tourType": updateForm.tourType,
            "regional": updateForm.regional,
            "tour": updateForm.tour,
            "title": updateForm.title,
            "description": updateForm.description,
            "schedule": updateForm.schedule,
            "dayStart": updateForm.dayStart,
            "vehicle": updateForm.vehicle,
            "departureFrom": updateForm.departureFrom,
            "price": updateForm.price,
            "quantity": updateForm.quantity,
            "notes": updateForm.notes,
            "imageList": updateForm.imageList,
            "creator": updateForm.creator
        })
        dispatch(openLoadingAction())
            const response = await TourApi.getAllTours();
            dispatch(getAllTourAction(response))
            dispatch(closeLoadingAction());

    }catch (e){
        dispatch(closeLoadingAction());
        console.log(e)
    }

}
export const deleteMultipleTour = (ids) => async dispatch =>{
    try{
        dispatch(openLoadingAction())
        const req = await TourApi.deleteMultipleTours(ids)
        console.log(req);
        //open loading
        dispatch(openLoadingAction())
        const response = await TourApi.getAllTours();
        dispatch(getAllTourAction(response))
        dispatch(closeLoadingAction());

        //close loading
    }catch(e){
        //close loading
        dispatch(closeLoadingAction())
        console.log(e);
    }
}