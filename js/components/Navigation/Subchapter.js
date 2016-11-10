import React from "react";

import LiSubchapter from "./LiSubchapter";

export default class Subchapter extends React.Component {
  componentDidUpdate() {
    if ( this.props.isVisible ) {
      $(this.ul).slideDown();
    } else {
      $(this.ul).slideUp();
    }
  }

  render() {
    const liSubchapters = [];

    this.props.subchapters.forEach((value) => {
      liSubchapters.push(<LiSubchapter title={value.title} link={value.link} key={value.id} />);
    });

    return (
      <ul ref={(ul) => { this.ul = ul; }} className="mdl-navigation__ul-sub">
        {liSubchapters}
      </ul>
    );
  }
}

Subchapter.propTypes = {
  isVisible: React.PropTypes.bool,
  subchapters: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      title: React.PropTypes.string, // eslint-disable-line react/no-unused-prop-types
      link: React.PropTypes.string, // eslint-disable-line react/no-unused-prop-types
    })
  ).isRequired,
};
