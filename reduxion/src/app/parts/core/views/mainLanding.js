import React from 'react';
import DocMeta from 'react-doc-meta';
import NavBar from '../components/navbar';
import Drawer from '../components/drawer';
import DocTitle from 'components/docTitle';
import config from 'config';
import Debug from 'debug';
let debug = new Debug("views:main");

class Landing extends React.Component{
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        debug("render ");

        return (
            <div id="main-landing" className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
                <NavBar />
                <Drawer />

                <div className="mdl-layout__content">
                    <DocTitle
                        title="Home"
                    />
                    <DocMeta tags={ this.tags() } />

                    <section id="start">
                        <div className="row">
                          <div className="col-md-12 text-center">
                            <h2>
                                <strong>Features</strong>
                            </h2>
                          </div>
                        </div>
                    </section>
                </div>
            </div>
        );
    }


    tags() {
        let description = config.description;

        return [
            {name: 'description', content: description},
            {name: 'twitter:card', content: description},
            {name: 'twitter:title', content: description},
            {property: 'og:title', content: description}
        ];
    }
}


export default Landing;