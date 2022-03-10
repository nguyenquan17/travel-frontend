import React from 'react'
import Travel_HaLong3 from "../../../assets/img/photos/halong2.jpg";
import {Calendar, Clock, Star} from "react-feather";

import {useHistory} from "react-router-dom";

function TourCard({tour}) {
  let history = useHistory();
  const {id} = tour;
  console.log(id);
  return (
    <div>
        <div className="single-destination">
            <div className="thumb-destination">
                <img src={Travel_HaLong3} alt="destination" />
            </div>
            <div className="details-destination">
                <div className="item-list">
                    <div className="day-start">
                        <Calendar size={16} color={"#dc834e"} style={{marginRight: 3}}/>
                        22Feb
                    </div>
                    <div className="schedule">
                        <Clock size={16} color={"#dc834e"} style={{marginRight: 3}}/>
                        8 days</div>
                    <div className="star">
                        <Star size={16} color={"#dc834e"} style={{marginRight: 3}}/>
                        5</div>
                </div>
                <h2 className="title">{tour.title}</h2>
                <p className="location">Quang Ninh City, Viet Nam</p>
                <div className="book-price">
                    <div className="price">{tour.price}</div>
                    <button className="book" onClick={() => history.push(`/tour-detail/${id}`)}>Book now</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TourCard