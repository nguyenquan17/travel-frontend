import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import './Landing.scss';
import { connect, useDispatch } from "react-redux";
import { enableCorporateTheme } from "../../../redux/actions/themeActions";
import NavBar from "./NavBar";
import {Footer} from "./Footer";



import {
  Container,
  Row,
} from "reactstrap";


const Features = () => (
  <section className="py-6">
    <Container>
      <Row>

      </Row>
    </Container>
  </section>
);

const Testimonials = () => (
  <section className="py-6 bg-white">
    <Container>
      

      <Row>
        
      </Row>
    </Container>
  </section>
);




const Landing = (props) => {
  

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(enableCorporateTheme());
  }, [dispatch]);

  return (
    <React.Fragment>
        <div className="main">
            <NavBar />
            {props.children}
            <Footer />
        </div>


    </React.Fragment>
  )
}
const mapStateToProps = (state) => ({
  userInfo: state.userLoginInfo
});

const mapDispatchToProps = {};
export default connect(mapStateToProps,mapDispatchToProps)(Landing);
