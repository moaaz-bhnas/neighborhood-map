import React, { Component } from 'react';
import icon from '../hamburger-icon.svg';

class HamburgerIcon extends Component {
  toggleSidebar = () => {
    const sidebar = document.querySelector('#sidebar');
    if (sidebar.offsetWidth === 0) {
      sidebar.style.cssText = "flex: 0 22rem; padding: 1rem;";
    } else {
      sidebar.style.cssText = "flex: 0 0.01rem; padding: 0;";
    }
  }

  componentDidMount() {
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    hamburgerIcon.addEventListener('keypress', event => {
      if (event.keyCode === 32 || event.keyCode === 13) {
        this.toggleSidebar();
      }
    })
  }

  render() {
    return (
      <div className="hamburger-icon" role="button">
        <img 
          src={icon} 
          alt="Hamburger Icon" 
          onClick={this.toggleSidebar}
          tabIndex="0"
        />
      </div>
    );
  }
}

export default HamburgerIcon;