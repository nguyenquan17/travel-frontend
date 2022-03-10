import React, {useState} from 'react';
import {toastr} from "react-redux-toastr";
import {Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row, Input} from "reactstrap";
import {FastField, Form, Formik} from "formik";
import * as Yup from "yup";
import {ReactstrapInput} from "reactstrap-formik";
import {connect} from "react-redux";
import {createTour, uploadMultipleImg} from "../../../redux/actions/tourAction";
import TourApi from "../../../api/TourDetailListApi"
import Loading from "../../../components/loading/Loading";
import {dataTourType, dataRegion, dataTourPlace} from "../data";
import {showSuccessNotification} from "../../notifications/Notifications";

const AddTour = (props) => {


    const [isOpenModal, setOpenModal] = useState(false);
    const [images, setImages] = useState([]);
    const [urls, setUrls] = useState([]);
    const [loading, setLoading] = useState(false);
    const [tourType, setTourType] = useState(null);
    const [tourRegion, setTourRegion] = useState(null);
    const [tourPlace, setTourPlace] = useState(null);


    const uploadImage =async (e) =>{
        e.persist();

        const formData = new FormData();
        for (let i = 0; i < e.target.files.length; i++) {
            let fileImage = e.target.files[i];
            setImages((prev) => [...prev, fileImage])

            if(fileImage.type === 'image/png' || fileImage.type === 'image/jpeg'){
                setLoading(true);

                formData.append("file", fileImage);
                formData.append("upload_preset", "u3vef5jg" );

                try {
                    // props.uploadMultipleImg(formData);
                    await TourApi.uploadMultipleImage(formData).then((response) => {
                        console.log("Data tra ve", response)
                        if (response.status === 200) {
                            // let dataObj = {}
                            setUrls((prev) => [...prev,response.data.url])
                            setLoading(false)
                        }
                    })
                }catch(error){
                    console.log('error', error);
                }
            }else {
                setLoading(false);
            }
        }

    }
    // console.log(images)
    console.log('Array chua cac anh',urls)

    const newArr = [];
    for (let i = 0; i < urls.length; i++) {
        newArr[i] = ({imageUrl: urls[i]})
    }
    console.log(newArr);

    return (
        <>
            <Button
                key="Success"
                color="success"
                className="mr-1 mb-1"
                onClick={() => setOpenModal(true)}
            >
                Add Tour
            </Button>
            <Modal
                isOpen={isOpenModal}
            >
                <Formik
                    initialValues={
                        {
                            tourType: 1,
                            regional: 1,
                            tour: 1,
                            title: '',
                            description: '',
                            schedule: '',
                            dayStart: '',
                            vehicle: '',
                            departureFrom: '',
                            price: 0,
                            quantity: 0,
                            notes: '',
                            creator: {
                                id: props.userInfo.id,
                                fullName: props.userInfo.fullName
                            }
                        }
                    }
                    validationSchema={
                        Yup.object({
                            tourType: Yup.number()
                                .min(1, "The minimum is 1")
                                .integer("Must be a positive integer"),
                            regional: Yup.number()
                                .min(1, "The minimum is 1")
                                .integer("Must be a positive integer"),
                            tour: Yup.number()
                                .min(1, "The minimum is 1")
                                .integer("Must be a positive integer"),
                            title: Yup.string()
                                .required('Required')
                                .max(300, 'Maximum 100 characters')
                                .min(10, 'Minimum 10 characters'),
                            description: Yup.string()
                                .required('Required')
                                .min(10, 'Minimum 10 characters'),
                            schedule: Yup.string()
                                .required('Required')
                                .min(6, 'Minimum 6 characters'),
                            dayStart: Yup.date()
                                .required('Required'),
                            vehicle: Yup.string()
                                .required('Required'),
                            departureFrom: Yup.string()
                                .required('Required')
                                .min(5, 'Minimum 5 characters'),
                            price: Yup.number()
                                .min(0, "Must be a positive integer")
                                .integer("Must be a positive integer"),
                            quantity: Yup.number()
                                .min(0, "Must be a positive integer")
                                .integer("Must be a positive integer"),
                            notes: Yup.string()
                                .required('Required')
                                .min(10, 'Minimum 10 characters'),
                        })
                    }
                    onSubmit={
                        async (values, {resetForm}) => {
                            try {
                                // call api

                                await props.createTour({...values,imageList: [...newArr]});

                                setOpenModal(false);
                                // show notification
                                showSuccessNotification(
                                    "Create Tour",
                                    "Create Group Successfully!");
                                // reload group page
                                resetForm({
                                    tourType: 0,
                                    regional: 0,
                                    tour: 0,
                                    title: '',
                                    description: '',
                                    schedule: '',
                                    dayStart: '',
                                    vehicle: '',
                                    departureFrom: '',
                                    price: 0,
                                    quantity: 0,
                                    notes: ''
                                });

                            } catch (error) {
                                console.log(error);
                                setOpenModal(false);
                            }
                        }
                    }

                    validateOnChange={false}
                    validateOnBlur={false}
                >
                    {({ isSubmitting,
                      handleChange,values}) => (

                        <Form className="tour-form">
                            {/* header */}
                            <ModalHeader>
                                Create Tour
                            </ModalHeader>

                            {/* body */}
                            <ModalBody className="m-3">
                                {/*----------------------Tour type, region, tour place--------------------*/}
                                <div className="tour-row-1">
                                    <Row className="tour-row">
                                        <Col xs="auto" className="tour-col">
                                            Tour Type
                                        </Col>
                                        <Col className="tour-col">
                                            <Input name="tourType"
                                                    onChange={(e) =>{
                                                        handleChange(e);
                                                        setTourType(e.target.value)
                                                    }}
                                                    value={values.tourType}
                                                    type={"select"}
                                            >
                                                <option value="">
                                                    Select Category
                                                </option>
                                                {dataTourType.map((item, index) => (
                                                    <option key={index} value={item.id}>
                                                        {item.tourType}
                                                    </option>
                                                ))}
                                            </Input>

                                            {/*<FastField*/}
                                            {/*    //label="Group Name"*/}
                                            {/*    bsSize="lg"*/}
                                            {/*    type="select"*/}
                                            {/*    name="tourType"*/}
                                            {/*    component={ReactstrapSelect}*/}
                                            {/*    inputprops = {{*/}
                                            {/*        name: "tourType",*/}
                                            {/*        id: "tourType",*/}
                                            {/*        options: dataTourType.map((item,index) => (*/}
                                            {/*            item.tourType*/}
                                            {/*        )),*/}
                                            {/*        // defaultOption: "Country"*/}
                                            {/*        defaultOption: "Select",*/}
                                            {/*    }}*/}
                                            {/*/>*/}
                                        </Col>
                                    </Row>
                                    <Row className="tour-row">
                                        <Col xs="auto" className="tour-col">
                                            Region
                                        </Col>
                                        <Col className="tour-col">
                                            <Input name="regional"
                                                    onChange={(e) =>{
                                                        handleChange(e);
                                                        setTourRegion(e.target.value)
                                                    }}
                                                    value={values.regional}
                                                    type={"select"}
                                            >
                                                <option value="">
                                                    Select Category
                                                </option>
                                                {dataRegion.map((item, index) => (
                                                    <option key={index} value={item.id}>
                                                        {item.regional}
                                                    </option>
                                                ))}
                                            </Input>
                                        </Col>
                                    </Row>
                                    <Row className="tour-row">
                                        <Col xs="auto" className="tour-col">
                                            Tour Place
                                        </Col>
                                        <Col className="tour-col">
                                            <Input name="tour"
                                                    onChange={(e) =>{
                                                        handleChange(e);
                                                        setTourPlace(e.target.value)
                                                    }}
                                                    value={values.tour}
                                                    type={"select"}
                                            >
                                                <option value="">
                                                    Select Category
                                                </option>
                                                {dataTourPlace.map((item, index) => (
                                                    <option key={index} value={item.id}>
                                                        {item.tour}
                                                    </option>
                                                ))}
                                            </Input>

                                        </Col>
                                    </Row>
                                </div>

                                {/*------------------------------Title---------------------------------*/}
                                <Row className="tour-row">
                                    <Col xs="auto" className="tour-col">
                                        Title
                                    </Col>
                                    <Col className="tour-col">
                                        <FastField
                                            //label="Group Name"
                                            bsSize="lg"
                                            type="text"
                                            name="title"
                                            placeholder="Enter tour title "
                                            component={ReactstrapInput}
                                        />
                                    </Col>
                                </Row>

                                {/*------------------Schedule, departure, vehicle-----------------*/}
                                <div className="tour-row-3">
                                    <Row className="tour-row">
                                        <Col xs="auto" className="tour-col">
                                            Schedule
                                        </Col>
                                        <Col className="tour-col">
                                            <FastField
                                                //label="Group Name"
                                                bsSize="lg"
                                                type="text"
                                                name="schedule"
                                                component={ReactstrapInput}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="tour-row">
                                        <Col xs="auto" className="tour-col">
                                            Departure Form
                                        </Col>
                                        <Col className="tour-col">
                                            <FastField
                                                //label="Group Name"
                                                bsSize="lg"
                                                type="text"
                                                name="departureFrom"
                                                component={ReactstrapInput}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="tour-row">
                                        <Col xs="auto" className="tour-col">
                                            Vehicle
                                        </Col>
                                        <Col className="tour-col">
                                            <FastField
                                                //label="Group Name"
                                                bsSize="lg"
                                                type="text"
                                                name="vehicle"
                                                component={ReactstrapInput}
                                            />
                                        </Col>
                                    </Row>
                                </div>

                                {/*----------------------StartDate,Price,Amount----------------------------*/}
                                <div className="tour-row-4">
                                    <Row className="tour-row">
                                        <Col xs="auto" className="tour-col">
                                            Start Date
                                        </Col>
                                        <Col className="tour-col">
                                            <FastField
                                                bsSize="lg"
                                                type="date"
                                                name="dayStart"
                                                component={ReactstrapInput}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="tour-row">
                                        <Col xs="auto" className="tour-col">
                                            Price
                                        </Col>
                                        <Col className="tour-col">
                                            <FastField
                                                bsSize="lg"
                                                type="number"
                                                name="price"
                                                component={ReactstrapInput}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="tour-row">
                                        <Col xs="auto" className="tour-col">
                                            Remaining Amount
                                        </Col>
                                        <Col className="tour-col">
                                            <FastField
                                                bsSize="lg"
                                                type="number"
                                                name="quantity"
                                                component={ReactstrapInput}
                                            />
                                        </Col>
                                    </Row>
                                </div>

                                {/*-----------------------------Description--------------------------*/}
                                <Row className="tour-row">
                                    <Col xs="auto" className="tour-col">
                                        Description
                                    </Col>
                                    <Col className="tour-col">
                                        <FastField
                                            bsSize="lg"
                                            type="textarea"
                                            name="description"
                                            component={ReactstrapInput}
                                        />
                                    </Col>
                                </Row>
                                <Row className="tour-row">
                                    <Col xs="auto" className="tour-col">
                                        Note
                                    </Col>
                                    <Col className="tour-col">
                                        <FastField
                                            bsSize="lg"
                                            type="textarea"
                                            name="notes"
                                            component={ReactstrapInput}
                                        />
                                    </Col>
                                </Row>

                                <input
                                    type="file"
                                    multiple
                                    name="upload-img"
                                    onChange={uploadImage}
                                />

                            </ModalBody>

                            {/* footer */}
                            <ModalFooter>
                                {/* resend */}
                                <Button
                                    color="primary"
                                    style={{ marginLeft: 10 }}
                                    disabled={isSubmitting}
                                    type="submit"
                                >
                                    Save
                                </Button>

                                {/* close button */}
                                <Button
                                    color="primary"
                                    onClick={() => setOpenModal(false)}
                                >
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </Form>
                    )}
                </Formik>
            </Modal>
        </>
    );
}

const mapGlobalStateToProps = (state) => ({
    tourImageData: state.tourReducer.tourImg,
    userInfo: state.userLoginInfo.userInfo
})
const mapDispatchToProps = {
    createTour,
    uploadMultipleImg

}

export default connect(mapGlobalStateToProps, mapDispatchToProps) (AddTour);