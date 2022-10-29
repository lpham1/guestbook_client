import React, { Component } from "react";

class Header extends Component {
    render() {
        return (
            <div className="container-fluid p-3">
                <div className="text-dark d-flex justify-content-center align-self-center">
                <h3 className="">My Notes</h3>
                </div>             
            </div>
        );
    }
}

export default Header;