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
      url: "/options/config.json",
      beforeSend: (xhr, settings) => {
        xhr.url = settings.url; // eslint-disable-line no-param-reassign
      },
    })
    .done(( json ) => {
      this.pages = json;
      this.emit("change");
    })
    .fail((xhr, ajaxOptions, thrownError) => {
      this.pages = {
        pages: [],
      };
      if ( xhr.status !== 404 ) {
        const url = `${window.location.origin}${xhr.url.replace(/^\.\//, "")}`;
        console.error( `GET ${url} ${xhr.status} (${thrownError})` );
      }
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
            beforeSend: (xhr, settings) => {
              xhr.url = settings.url; // eslint-disable-line no-param-reassign
            },
          })
          .done(( html ) => {
            chapter.isDownloaded = true;
            chapter.downloadedHTML = html;
            this.emit("change");
          })
          .fail((xhr, ajaxOptions, thrownError) => {
            chapter.isDownloaded = false;
            if ( xhr.status !== 404 ) {
              const url = `${window.location.origin}${xhr.url.replace(/^\.\//, "")}`;
              console.error( `GET ${url} ${xhr.status} (${thrownError})` );
            }
          });

          if ( chapter.subchapters.length > 0 ) {
            for (let j = 0; j < chapter.subchapters.length; j++ ) {
              const subchapter = chapter.subchapters[j];
              $.ajax({
                dataType: "html",
                method: "GET",
                url: subchapter.urlToDownload,
                beforeSend: (xhr, settings) => {
                  xhr.url = settings.url; // eslint-disable-line no-param-reassign
                },
              })
              .done(( html ) => {
                subchapter.isDownloaded = true;
                subchapter.downloadedHTML = html;
                this.emit("change");
              })
              .fail((xhr, ajaxOptions, thrownError) => {
                subchapter.isDownloaded = false;
                if ( xhr.status !== 404 ) {
                  const url = `${window.location.origin}${xhr.url.replace(/^\.\//, "")}`;
                  console.error( `GET ${url} ${xhr.status} (${thrownError})` );
                }
              });
            }
          }
        }
      }
    }
  }

  getPage() {
    if ( this.pages.pages.length > 0 ) {
      const page = this.pages.pages[0];
      this.downloadPages(page);
      return page;
    }
    return {};
  }

  handleActions() {

  }
}

const pagesStore = new PagesStore();
dispatcher.register(pagesStore.handleActions.bind(pagesStore));

export default pagesStore;
