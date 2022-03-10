import React, {useState} from 'react';
import {Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import {showSuccessNotification, showWrongNotification} from "../../notifications/Notifications";
import {connect} from "react-redux";
import {deleteMultipleTour} from "../../../redux/actions/tourAction";



const DeleteTour = (props) => {
    const [isOpenModal, setOpenModal] = useState(false);
    const onDeleteMultipleTour = async () => {
        if(props.selectedRows === null || props.selectedRows === undefined || props.selectedRows.length === 0){
            setOpenModal(false);
            showWrongNotification(
                "Delete Group",
                "You have not selected group!"
            );
        }else{
            await props.deleteMultipleTour(props.selectedRows);
            setOpenModal(false);
            // show notification
            showSuccessNotification(
                "Delete Group",
                "Delete Group Successfully!");
            // reload page
        }
    }

    return (
        <>
            <Button
                key="Danger"
                color="danger"
                className="mr-1 mb-1"
                onClick={() => setOpenModal(true)}
            >
                Delete
            </Button>
            <Modal
                isOpen={isOpenModal}
            >
                <ModalHeader>
                    Delete Tour
                </ModalHeader>
                <ModalBody className="m-3">
                    <Row style={{ alignItems: "center", justifyContent: "space-between" ,width: "100%"}}>
                        <Col xs="auto" style={{padding: "0px", width: "100%"}}>
                            Are you sure you want to delete this item?
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        style={{ marginLeft: 10 }}
                        //   disabled={isSubmitting}
                        type="submit"
                        onClick={onDeleteMultipleTour}
                    >
                        Save
                    </Button>
                    <Button
                        color="primary"
                        onClick={() => setOpenModal(false)}
                    >
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}
const mapGlobalStateToProps = (state) => ({
})
const mapDispatchToProps = {
    deleteMultipleTour
}

export default connect(mapGlobalStateToProps, mapDispatchToProps) (DeleteTour);