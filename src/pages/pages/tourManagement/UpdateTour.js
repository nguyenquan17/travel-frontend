import React, {useState} from 'react';
import {Button, Col, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import {FastField, Form, Formik} from "formik";
import * as Yup from "yup";
import {dataRegion, dataTourPlace, dataTourType} from "../data";
import {ReactstrapInput} from "reactstrap-formik";
import {updateTour} from "../../../redux/actions/tourAction";
import {connect} from "react-redux";
import {showSuccessNotification} from "../../notifications/Notifications";

const UpdateTour = (props) => {

    const [isOpenModal, setOpenModal] = useState(false);
    const [tourType, setTourType] = useState(null);
    const [tourRegion, setTourRegion] = useState(null);
    const [tourPlace, setTourPlace] = useState(null);

    return (
        <>
            <Button
                key="Info"
                color="info"
                className="mr-1 mb-1"
                onClick={() => setOpenModal(true)}
            >
                Edit
            </Button>
            <Modal
                isOpen={isOpenModal}
            >
                <Formik
                    initialValues={
                        {
                            tourType: props.tourType,
                            regional: props.regional,
                            tour: props.tour,
                            title: props.title,
                            description: props.description,
                            schedule: props.schedule,
                            dayStart: props.dayStart,
                            vehicle: props.vehicle,
                            departureFrom: props.departureFrom,
                            price: props.price,
                            quantity: props.quantity,
                            notes: props.notes,
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
                        async (values) => {
                            try {
                                // call api

                                await props.updateTour(props.id, values);

                                setOpenModal(false);
                                // show notification
                                showSuccessNotification(
                                    "Update Tour",
                                    "Update Successfully!");
                                // reload group page


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

                                {/*<input*/}
                                {/*    type="file"*/}
                                {/*    multiple*/}
                                {/*    name="upload-img"*/}
                                {/*    onChange={uploadImage}*/}
                                {/*/>*/}

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
    userInfo: state.userLoginInfo.userInfo
})
const mapDispatchToProps = {
    updateTour

}

export default connect(mapGlobalStateToProps, mapDispatchToProps) (UpdateTour);