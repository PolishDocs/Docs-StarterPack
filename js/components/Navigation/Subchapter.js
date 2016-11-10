import React from "react";

import LiSubchapter from "./LiSubchapter";

export default class Subchapter extends React.Component {
  render() {
    const liSubchapters = [];

    this.props.subchapters.forEach((value) => {
      liSubchapters.push(<LiSubchapter text={value.text} href={value.href} key={value.href} />);
    });

    return (
      <ul className="mdl-navigation__ul-sub">
        {liSubchapters}
      </ul>
    );
  }
}

// li: a.mdl-navigation__link.mdl-navigation__header(href='#introduction') Introduction

Subchapter.propTypes = {
  subchapters: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      text: React.PropTypes.string, // eslint-disable-line react/no-unused-prop-types
      href: React.PropTypes.string, // eslint-disable-line react/no-unused-prop-types
    })
  ).isRequired,
};
