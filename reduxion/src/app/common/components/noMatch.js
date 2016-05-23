import React from 'react';
import 'assets/sass/base';

export default React.createClass({
  render() {
    let link = window.location.href.split("/");
    let baseUrl = "";
    if (link[3] == "coffee") {
      baseUrl = window.location.origin+"/coffee";
    } else {
      baseUrl = window.location.origin+"/i";
    }

    return (
      <section className="mdl-grid section-error">
        <div className='mdl-cell mdl-cell--6-col mdl-cell--3-offset error-content'>
          <h1 className="mdl-typography--display-1 section-title md-display-1">
            404
          </h1>
          <p className="sub-title">Page not Found</p>
          <p>The page might have been removed, or is temporarily unavailable.<br />Go back <a href={baseUrl}>Home</a>.</p>
          <p>&copy; 2016 Arbitrium. All rights reserved.</p>
        </div>
      </section>
    );
  }
});


