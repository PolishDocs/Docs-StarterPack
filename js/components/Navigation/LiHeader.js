import React from "react";

import Subchapter from "./Subchapter";

export default class LiHeader extends React.Component {
  render() {
    let subchapters = "";
    if ( (typeof this.props.subchapters) !== "undefined" ) {
      subchapters = <Subchapter subchapters={this.props.subchapters} />;
    }
    return (
      <li>
        <a className="mdl-navigation__link mdl-navigation__header" href={`#${this.props.href}`}>
          {this.props.text}
        </a>
        { subchapters }
      </li>
    );
  }
}

LiHeader.propTypes = {
  text: React.PropTypes.string.isRequired,
  href: React.PropTypes.string.isRequired,
  subchapters: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      text: React.PropTypes.string,
      href: React.PropTypes.string,
    })
  ),
};
