import React from 'react';
import Landing from "./landing/Landing";
import ViewList from "./landing/ViewList";

function TourDetail() {
    return (
        <Landing>
            {/*Code trang chi tiet tour o day*/}
            <ViewList/>
        </Landing>
    );
}

export default TourDetail;