import React from "react";

export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      html: {},
    };

    this.createMarkup();
  }

  componentDidUpdate() {
    $("#app").find("pre").each(function() {
      Prism.highlightElement( $(this)[0] );
    });
  }

  createMarkup() {
    $.ajax({
      method: "GET",
      url: "./pages/index/main.html",
    })
    .done(( html ) => {
      this.setState( { html } );
    })
    .fail(() => {
      console.log( "" );
    });
  }

  returnMarkup() {
    return { __html: this.state.html };
  }

  render() {
    return (
      <div dangerouslySetInnerHTML={this.returnMarkup()} />
    );
  }
}
