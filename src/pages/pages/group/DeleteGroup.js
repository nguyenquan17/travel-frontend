import React, { useState } from "react";
import { Row, Col, Button, Modal,
    ModalBody,
    ModalFooter,
    ModalHeader } from "reactstrap";

import { toastr } from "react-redux-toastr";

import {deleteMultipleGroup} from "../../../redux/actions/groupsAction";
import { connect } from 'react-redux';


const DeleteMultipleGroup = (props) => {

  // create
  const [isOpenModal, setOpenModal] = useState(false);

  const showSuccessNotification = (title, message) => {
    const options = {
      timeOut: 2500,
      showCloseButton: false,
      progressBar: false,
      position: "top-right"
    };
    
    // show notification
    toastr.success(title, message, options);
  }
  const showWrongNotification = (title, message) => {
    const options = {
      timeOut: 2500,
      showCloseButton: false,
      progressBar: false,
      position: "top-right"
    }
      // show notification
    toastr.error(title, message, options)
};
  console.log(props.selectedRows);
//   console.log(props);
  const onDeleteMultipleGroups = async () => {
      if(props.selectedRows === null || props.selectedRows === undefined || props.selectedRows.length === 0){
        setOpenModal(false);
        showWrongNotification(
            "Delete Group",
            "You have not selected group!"
          );
      }else{
        await props.deleteMultipleGroup(props.selectedRows);
        setOpenModal(false);
        // show notification
        showSuccessNotification(
            "Delete Group",
            "Delete Group Successfully!");
        // reload group page
        }
  } 
  return (
    <>
    <Button
        key="Danger"
        color="danger"
        className="btn-pill mr-1 mb-1"
        onClick={() => setOpenModal(true)}
    >
        Xóa 
    </Button>
    <Modal
        isOpen={isOpenModal}
        >
              {/* header */}
              <ModalHeader>
               Delete Group
              </ModalHeader>

              {/* body */}
              <ModalBody className="m-3">

                {/* Firstname */}
                <Row style={{ alignItems: "center", justifyContent: "space-between" ,width: "100%"}}>
                  <Col xs="auto" style={{padding: "0px", width: "100%"}}>
                    Bạn có chắc chắn muốn xóa không ?
                  </Col>
                </Row>

              </ModalBody>

              {/* footer */}
              <ModalFooter>
                {/* resend */}
                <Button
                  color="primary"
                  style={{ marginLeft: 10 }}
                //   disabled={isSubmitting}
                  type="submit"
                  onClick={onDeleteMultipleGroups}
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

      </Modal>
    </>
  );
};

const mapGlobalStateToProps = (state) =>({

})
const mapDispatchToProps = {
  deleteMultipleGroup
}
export default connect(mapGlobalStateToProps, mapDispatchToProps) (DeleteMultipleGroup);