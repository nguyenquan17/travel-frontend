import {Button, Col, Container, InputGroupAddon} from "reactstrap";
import {FastField, Form, Formik} from "formik";
import {ReactstrapInput, ReactstrapSelect} from "reactstrap-formik";
import React from "react";

const SearchBar = (props) => {

    return (
        <section id="demos" className="pt-3 pb-6">
            <Container className="position-relative z-3">
                <div className="search-section">
                    <Formik
                        key={Date.parse(new Date())}    // fix bug: not-re-render when initialValues changing
                        enableReinitialize
                        initialValues={
                            {
                                search: props.search ? props.search : ''
                            }
                        }
                        onSubmit={
                            values => {
                                props.onSearch(values.search);
                            }
                        }
                    >

                        <Form>
                            <div className="search-bar">
                                <div style={{ alignItems: "left", display:"flex",flexDirection:"column" }}>
                                    <Col xs="auto">
                                        Destination
                                    </Col>
                                    <Col >
                                        <FastField
                                            type="text"
                                            bsSize="lg"
                                            name="search"
                                            placeholder="Where are you going?"
                                            component={ReactstrapInput}
                                        />
                                    </Col>
                                </div>
                                <div style={{ alignItems: "left", display:"flex",flexDirection:"column" }}>
                                    <Col xs="auto">
                                        Departing
                                    </Col>
                                    <Col >
                                        <FastField
                                            type="date"
                                            bsSize="lg"
                                            name="date"
                                            placeholder="Departing"
                                            component={ReactstrapInput}
                                        />
                                    </Col>
                                </div>
                                <div style={{ alignItems: "left", display:"flex",flexDirection:"column" }}>
                                    <Col xs="auto">
                                        Price
                                    </Col>
                                    <Col >
                                        <FastField
                                            type="select"
                                            bsSize="lg"
                                            name="price"
                                            component={ReactstrapSelect}
                                            inputprops = {{
                                                name: "price",
                                                id: "price",
                                                options: ["1000$", "2000$", "3000$", "4000$"],
                                                // defaultOption: "Country"
                                                defaultOption: "Select"
                                            }}
                                        />
                                    </Col>
                                </div>
                                <div style={{  }}>
                                    <Col xs="auto">
                                        <InputGroupAddon addonType="append" color="primary" >
                                            <Button type='submit'>Tìm kiếm</Button>
                                        </InputGroupAddon>
                                    </Col>
                                </div>
                            </div>
                        </Form>
                    </Formik >
                </div>
            </Container>
        </section>
    );
}
export default SearchBar;