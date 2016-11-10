import React from "react";

import Subchapter from "./Subchapter";

export default class LiHeader extends React.Component {
  constructor() {
    super();
    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.state = {
      isVisible: false,
    };
  }

  toggleVisibility(e) {
    e.preventDefault();
    this.setState({ isVisible: !this.state.isVisible });
  }

  hideDrawer() {
    const layout = document.querySelector(".mdl-layout");
    layout.MaterialLayout.toggleDrawer();
  }

  render() {
    let subchapters = null;
    let onClickEvent = this.hideDrawer;
    if ( (typeof this.props.subchapters) !== "undefined" && this.props.subchapters.length > 0 ) {
      subchapters = <Subchapter isVisible={this.state.isVisible} subchapters={this.props.subchapters} />;
      onClickEvent = this.toggleVisibility;
    }

    return (
      <li>
        <a onClick={onClickEvent} className="mdl-navigation__link mdl-navigation__header" href={this.props.link}>
          {this.props.title}
        </a>
        { subchapters }
      </li>
    );
  }
}

LiHeader.propTypes = {
  title: React.PropTypes.string.isRequired,
  link: React.PropTypes.string.isRequired,
  subchapters: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.string, // eslint-disable-line
      title: React.PropTypes.string,
      link: React.PropTypes.string,
    })
  ),
};

/*
$(".mdl-navigation__header, .mdl-navigation__link").one(function(e) {
  const sub = $(this).parent().find(".mdl-navigation__ul-sub");
  if ( sub.length ) {
    e.preventDefault();
    sub.slideToggle();
  } else {
    const layout = document.querySelector(".mdl-layout");
    layout.MaterialLayout.toggleDrawer();
  }
});
*/
