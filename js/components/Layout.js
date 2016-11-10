/* eslint-disable react/no-danger */
import React from "react";
import PagesStore from "../stores/PagesStore";

export default class Layout extends React.Component {
  constructor() {
    super();
    this.refreshPage = this.refreshPage.bind(this);
    this.state = {
      page: PagesStore.getPage(),
    };
  }

  componentWillMount() {
    PagesStore.on("change", this.refreshPage);

    PagesStore.loadPages();
  }

  componentDidUpdate() {
    $("#app").find("pre").each(function() {
      Prism.highlightElement( $(this)[0] );
    });
  }

  componentWillUnmount() {
    PagesStore.removeListener("change", this.refreshPage);
  }

  refreshPage() {
    this.setState({
      page: PagesStore.getPage(),
    });
  }

  createMarkup() {
    const html = [];
    const page = this.state.page;
    if ( typeof page.chapters !== "undefined" ) {
      for (let i = 0; i < page.chapters.length; i++) {
        const chapter = page.chapters[i];
        if ( chapter.isDownloaded === true ) {
          html.push( <div className="section" id={chapter.id} key={chapter.id} dangerouslySetInnerHTML={{ __html: chapter.downloadedHTML }} /> );
          if ( chapter.subchapters.length > 0 ) {
            for (let j = 0; j < chapter.subchapters.length; j++) {
              const subchapter = chapter.subchapters[j];
              if ( subchapter.isDownloaded === true ) {
                html.push( <div className="section-subchapter" id={subchapter.id} key={subchapter.id} dangerouslySetInnerHTML={{ __html: subchapter.downloadedHTML }} /> );
              }
            }
          }
        }
      }
    }

    return html;
  }

  returnMarkup() {
    return this.createMarkup();
  }

  render() {
    return (
      <div>
        { this.returnMarkup() }
      </div>
    );
  }
}
