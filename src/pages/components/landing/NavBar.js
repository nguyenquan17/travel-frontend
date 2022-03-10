import React, {useState, useEffect} from "react";
import {
    Button,
    Container, DropdownItem, DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    NavItem,
    NavLink,
    UncontrolledDropdown
} from "reactstrap";
import Logo from "../../../assets/img/brands/logo.png";
import {Send, User} from "react-feather";
import {useHistory} from "react-router-dom";
import Dropdown from "reactstrap/lib/Dropdown";
import Avatar from "../../../assets/img/avatars/man1.png";
import {connect} from "react-redux";

const NavBar = (props) => {
    const [navbar, setNavbar] = useState(false);

    useEffect(() => {
        const changeBackGround = () => {
            if(window.scrollY >= 80) {
                setNavbar(true);
            }else {
                setNavbar(false)
            }
        }
        window.addEventListener('scroll',changeBackGround)
    }, [navbar]);

    //dropdown
    const [showDropdown, setShowDropdown] = useState(false);

    //get data user from redux
    const {userInfo} = props.userInfo;
    console.log(userInfo);
    const router = useHistory();
    const onClickSignIn = async () => {
        await router.push("/auth/sign-in");
    }
    const onClickLogOut = async () => {
        localStorage.clear();
        await router.push("/auth/sign-in");
    }

    //check Obj
    const checkEmptyObj = (obj) => {
        return Object.values(obj).every(value => {
            return value === null;


        });
    }

    const showDropDownMenu = () => {
        return (
            <UncontrolledDropdown inNavbar
                                  isOpen={showDropdown}
                                  onFocus={() => setShowDropdown(true)}
                                  onMouseEnter={() => setShowDropdown(true)}
                                  onMouseLeave={() => setShowDropdown(false)}
                                  toggle={() => setShowDropdown(!showDropdown)}>
                <Dropdown
                >
                    <span className="d-none d-sm-inline-block">
                      <DropdownToggle nav caret>
                        <img
                            src={Avatar}
                            className="avatar img-fluid rounded-circle mr-1"
                            alt="Chris Wood"
                        />
                        <span className="text-white">Hi, {userInfo.lastname + ' ' + userInfo.firstname}</span>
                      </DropdownToggle>
                    </span>
                    <DropdownMenu right>
                        <DropdownItem>
                            <User size={18} className="align-middle mr-2" />
                            Profile
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>Settings & Privacy</DropdownItem>
                        <DropdownItem>Help</DropdownItem>
                        <DropdownItem onClick={onClickLogOut}>Sign out</DropdownItem>
                    </DropdownMenu>

                </Dropdown>
            </UncontrolledDropdown>
        )
    }

    const showMenu = () => {
        if(checkEmptyObj(userInfo)){
            return (
                <Button onClick={onClickSignIn} color="primary"
                        className="ml-6"
                        size="lg">Sign in</Button>)
        }else {
            return (
                <div>
                    <div className="management">
                        {showDropDownMenu()}
                    </div>
                </div>
            )
        }
    }

    return(
        <Navbar dark expand="md" className={navbar ? "navbar-landing active" : "navbar-landing active"}>
            <Container>
                <NavbarBrand href="/" className="navbar-brand">
                    <img src={Logo} alt="logo" height={40}/>
                    Travel
                </NavbarBrand>
                <Nav className="ml-auto" navbar>
                    <NavItem className="d-none d-md-inline-block">
                        <NavLink href="/" active className="navbar-link">
                            Travel
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/" active className="navbar-link">
                            Services
                        </NavLink>
                    </NavItem>
                    <NavItem className="d-none d-md-inline-block">
                        <NavLink href="" active className="navbar-link">
                            About Us
                        </NavLink>
                    </NavItem>
                    <NavItem className="d-none d-md-inline-block">
                        <NavLink href="" active className="navbar-link">
                            Contact
                        </NavLink>
                    </NavItem>
                </Nav>
                <Button
                    href="https://themes.getbootstrap.com/product/appstack-react-admin-dashboard-template/"
                    target="_blank"
                    rel="noopener noreferrer"
                    color="warning"
                    className="ml-2"
                    size="lg"
                >

                    Book Now
                    <Send size={16} style={{marginLeft: 4}}/>
                </Button>

                <div>
                    {showMenu()}
                </div>
            </Container>
        </Navbar>
    );
}
const mapStateToProps = (state) => ({
    userInfo: state.userLoginInfo
});

const mapDispatchToProps = {};
export default connect(mapStateToProps,mapDispatchToProps)(NavBar);