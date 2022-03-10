import React, {useState } from "react";
import { Row, Col, Button, Modal,
    ModalBody,
    ModalFooter,
    ModalHeader } from "reactstrap";

import { Formik, FastField, Form } from 'formik';
import * as Yup from 'yup';
import { ReactstrapInput } from "reactstrap-formik";
import { toastr } from "react-redux-toastr";

import {updateGroup} from "../../../redux/actions/groupsAction";
import { connect } from 'react-redux';
import GroupApi from '../../../api/groupsApi'

const UpdateGroup = (props) => {

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
  // console.log(props);
  return (
    <>
    <Button
        key="Info"
        color="info"
        className="btn-pill mr-1 mb-1"
        onClick={() => setOpenModal(true)}
    >
        Chỉnh sửa
    </Button>
    <Modal
        isOpen={isOpenModal}
      >
        <Formik
          initialValues={
            {
              name: props.name,
              totalMember: props.totalMember
            }
          }
          validationSchema={
            Yup.object({
              name: Yup.string()
                .required('Required')
                .max(50, 'Must be between 6 to 50 characters')
                .min(6, 'Must be between 6 to 50 characters')
                .test('checkUniqueName', 'This name is already exists.', 
                async name => {
                  if(name === props.name) {
                      return true;
                  }
                  // call api
                  const isExists = await GroupApi.existsByName(name);
                  return !isExists;
                }),
              totalMember: Yup.number()
                .min(0, "Must be a positive integer")
                .integer("Must be a positive integer"),
            })
          }
          onSubmit={
            async (values) => {
              try {
                // call api
                await props.updateGroup(props.id, values.name, values.totalMember);
                setOpenModal(false);
                if(props.name === values.name && props.totalMember === values.totalMember) return true;
                // show notification
                else{
                  showSuccessNotification(
                    "Updated Group",
                    "Update Group Successfully!");
                }
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
          {({ isSubmitting }) => (
            <Form>
              {/* header */}
              <ModalHeader>
                Create Group
              </ModalHeader>

              {/* body */}
              <ModalBody className="m-3">

                {/* Firstname */}
                <Row style={{ alignItems: "center", justifyContent: "space-between" ,width: "100%"}}>
                  <Col xs="auto" style={{padding: "0px", width: "20%"}}>
                    Group Name:
                    </Col>
                  <Col>
                    <FastField
                      //label="Group Name"
                      bsSize="lg"
                      type="text"
                      name="name"
                      placeholder="Enter Group Name"
                      component={ReactstrapInput}
                    />
                  </Col>
                </Row>
                {/* Total Number */}
                <Row style={{alignItems: "center", justifyContent: "space-between" ,width: "100%" }}>
                  <Col xs="auto" style={{padding: "0px", width: "20%"}}>
                    Total Member:
                    </Col>
                  <Col>
                    <FastField
                      //label="Group Name"
                      bsSize="lg"
                      type="number"
                      name="totalMember"
                      component={ReactstrapInput}
                    />
                  </Col>
                </Row>
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
};

const mapGlobalStateToProps = (state) =>({})
const mapDispatchToProps = {
  updateGroup
}
export default connect(mapGlobalStateToProps, mapDispatchToProps) (UpdateGroup);