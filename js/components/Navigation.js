import React from "react";
import PagesStore from "../stores/PagesStore";

import LiHeader from "../components/Navigation/LiHeader";

export default class Navigation extends React.Component {
  constructor() {
    super();
    this.refreshPage = this.refreshPage.bind(this);
    this.state = PagesStore.getChapters();
  }

  componentWillMount() {
    PagesStore.on("change", this.refreshPage);

    PagesStore.loadPages();
  }

  componentWillUnmount() {
    PagesStore.removeListener("change", this.refreshPage);
  }

  refreshPage() {
    this.setState(PagesStore.getChapters());
  }

  render() {
    const lis = [];

    if ( typeof this.state.pages !== "undefined" ) {
      this.state.pages.forEach((page) => {
        page.chapters.forEach((chapter) => {
          lis.push(<LiHeader title={chapter.title} link={chapter.link} key={chapter.id} subchapters={chapter.subchapters} />);
        });
      });
    }

    return (
      <ul className="mdl-navigation__ul">
        { lis }
      </ul>
    );
  }
}
