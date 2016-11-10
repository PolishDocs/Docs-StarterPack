import React from "react";
import PagesStore from "../stores/PagesStore";

import LiHeader from "../components/Navigation/LiHeader";

export default class Navigation extends React.Component {
  render() {
    const subchapters = [
      {
        text: "each",
        href: "each",
      },
      {
        text: "map",
        href: "map",
      },
    ];

    const lis = [
      (<LiHeader text="Introduction" href="introduction" key="introduction" />),
      (<LiHeader text="Collections" href="collections" key="collections" subchapters={subchapters} />),
    ];

    return (
      <ul className="mdl-navigation__ul">
        { lis }
      </ul>
    );
  }
}
