// import './loader.module.scss'
import CSSLoader from './Loading.module.scss'
import {connect} from "react-redux";
import { Roller } from "react-awesome-spinners";
import React from 'react'

function Loading(props) {
    const {isLoading} = props.isLoading
    return (
        isLoading ? (<>
            <div className={CSSLoader.upperLoaderImage}>
                <div className={CSSLoader.customLogo}>
                    <Roller />
                </div>
            </div>
            <div className={CSSLoader.upperLoader}>
                <div className="lds-roller">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </>) : <> </>
    )
}


const mapStateToProps = (state) => ({
    isLoading: state.loaderReducer
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Loading);