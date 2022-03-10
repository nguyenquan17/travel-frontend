import {Button, Col, Container, Row} from "reactstrap";
import React from "react";

export const Footer = () => (
    <section className="landing-footer pb-6 footer" >
        <svg className="landing-footer-shape" xmlns="http://www.w3.org/2000/svg" viewBox="0 100 1440 220">
            <path fill="#F7F9FC" fillOpacity="1" d="M0,128L1440,256L1440,0L0,0Z"></path>
        </svg>
        <Container className="text-center landing-footer-container">
            <Row>
                <Col md="9" lg="8" xl="6" className="mx-auto">
                    <h2 className="h1 text-white mb-3">
                        Nhóm 4 Travel
                    </h2>
                    <Button
                        color="light"
                        size="lg"
                        href="https://themes.getbootstrap.com/product/appstack-react-admin-dashboard-template/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-n1"
                    >
                        Purchase Now
                    </Button>
                </Col>
            </Row>
        </Container>
    </section>
);

