import React from "react";

export default class LiSubchapter extends React.Component {
  hideDrawer() {
    const layout = document.querySelector(".mdl-layout");
    layout.MaterialLayout.toggleDrawer();
  }

  render() {
    return (
      <li>
        <a onClick={this.hideDrawer} className="mdl-navigation__link" href={this.props.link}>
          {this.props.title}
        </a>
      </li>
    );
  }
}

LiSubchapter.propTypes = {
  title: React.PropTypes.string.isRequired,
  link: React.PropTypes.string.isRequired,
};
