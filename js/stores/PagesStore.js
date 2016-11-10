import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class PagesStore extends EventEmitter {
  constructor() {
    super();
    this.pages = {
      pages: [],
    };
  }

  loadPages() {
    $.ajax({
      dataType: "json",
      method: "GET",
      url: "../../options/config.json",
    })
    .done(( json ) => {
      this.pages = json;
      this.emit("change");
    })
    .fail((xhr, ajaxOptions, thrownError) => {
      this.pages = {};
      console.log( xhr.status );
      console.log( thrownError );
    });
  }

  downloadPages(page) {
    if ( typeof page !== "undefined" ) {
      const chapters = page.chapters;
      for (let i = 0; i < chapters.length; i++) {
        const chapter = chapters[i];
        if ( chapter.isDownloaded !== true ) {
          $.ajax({
            dataType: "html",
            method: "GET",
            url: chapter.urlToDownload,
          })
          .done(( html ) => {
            chapter.isDownloaded = true;
            chapter.downloadedHTML = html;
            this.emit("change");
          })
          .fail((xhr, ajaxOptions, thrownError) => {
            this.pages = {};
            console.log( xhr.status );
            console.log( thrownError );
          });

          if ( chapter.subchapters.length > 0 ) {
            for (let j = 0; j < chapter.subchapters.length; j++ ) {
              const subchapter = chapter.subchapters[j];
              $.ajax({
                dataType: "html",
                method: "GET",
                url: subchapter.urlToDownload,
              })
              .done(( html ) => {
                subchapter.isDownloaded = true;
                subchapter.downloadedHTML = html;
                this.emit("change");
              })
              .fail((xhr, ajaxOptions, thrownError) => {
                this.pages = {};
                console.log( xhr.status );
                console.log( thrownError );
              });
            }
          }
        }
      }
    }
  }

  getPage() {
    const page = this.pages.pages[0];
    this.downloadPages(page);
    return page;
  }

  handleActions() {

  }
}

const pagesStore = new PagesStore();
dispatcher.register(pagesStore.handleActions.bind(pagesStore));

export default pagesStore;
