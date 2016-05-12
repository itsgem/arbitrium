import React from 'react';
import ClientHeader from 'client/components/header';
import ClientSidebar from 'client/components/sidebar';

export default class Application extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    // add vw-children_name as className
    let css = this.props.children.props.route.path
        ? `vw-${this.props.children.props.route.path}`
        : `vw-home`;
    return (
      <div id="application-view" className={css}>
        <div className="theme-arbitrium mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
          <ClientHeader />
          <ClientSidebar />
            <main className="mdl-layout__content">
              <div aria-live="assertive" aria-atomic="true" aria-relevant="text" className="mdl-snackbar mdl-js-snackbar error-snack">
                <div className="mdl-snackbar__text"></div>
                <button type="button" className="mdl-snackbar__action"></button>
              </div>
              <section className="section-api-keys">
                {this.props.children}
              </section>
          </main>
        </div>
      </div>
    );
  }
};
