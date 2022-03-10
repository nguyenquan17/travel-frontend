import React, {useEffect, useState} from "react";
import {Container, Row} from "reactstrap";

import TourDetailListApi from "../../../api/TourDetailListApi";
import TourCard from "./TourCard";

const ViewList = () => {


    const [dataTourList, setDataTourList] = useState();
    useEffect(() => {
        const fetchTourList = async () => {
            const res = await TourDetailListApi.getAllTours();
            setDataTourList(res);
        }
        fetchTourList().then(r => console.log(r));
    }, []);

    console.log(dataTourList)

    return (
        <section className="py-6 bg-white">
            <h1 className="section-title">Popular Tours</h1>
            <Container>
                <Row>
                    {dataTourList?.map((tour) => <TourCard key={tour.id} tour={tour}/>)}
                </Row>
            </Container>
        </section>
    );
}
export default ViewList;