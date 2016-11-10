import React from "react";

export default class LiSubchapter extends React.Component {
  render() {
    return (
      <li>
        <a className="mdl-navigation__link" href={`#${this.props.href}`}>
          {this.props.text}
        </a>
      </li>
    );
  }
}

LiSubchapter.propTypes = {
  text: React.PropTypes.string.isRequired,
  href: React.PropTypes.string.isRequired,
};
