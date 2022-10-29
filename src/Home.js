import React, { Component } from "react";
import MyModal from "./MyModal";
class Home extends Component {
    render() {
        return (
            <div className="min-vh-100 container-fluid">
                <MyModal/>                   
            </div>
        );
    }
}

export default Home;