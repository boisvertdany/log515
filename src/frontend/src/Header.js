import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
    render() {
        return (
            <div className="header-container">
                <MenuItem title="ALLO"/>
                <MenuItem title="ALLO"/>
                <MenuItem title="ALLO"/>
            </div>
        );
    }
}

function MenuItem(props) {
    return <div className="header-menu-item-container"> {props.title}
    </div>;
}

export default Header;
