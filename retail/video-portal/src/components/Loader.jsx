import React from 'react';
import preLoader from "../assets/images/loader.svg";
import Img from "react-image";

function Loader() {
    return (
        <div className="loader-con">
            <Img className="loader" src={preLoader} alt="" />
        </div>
    )
}

export default Loader