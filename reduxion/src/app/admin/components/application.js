import React from 'react';

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
    let link = window.location.href.split("/");
    return (
      <div className={ link[3] == 'coffee'? 'coffee': 'client' }>
        <div id="application-view" className={css}>
          <main id='main-container'>
            {this.props.children}
          </main>
        </div>
      </div>
    );
  }
};
