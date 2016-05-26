/* global require */
/* eslint global-require: 0*/
//load CSS assets first

require('assets/sass/base.scss');

import {Promise} from 'es6-promise';
import React from 'react';
import ReactDOM from 'react-dom';
import {IntlProvider} from 'react-intl';
import Intl from 'intl';

import Debug from 'debug';

import i18n from 'utils/i18n';
import rootView from './rootView';

Debug.enable("*,-engine*,-sockjs-client*,-socket*");

let debug = new Debug("app");

debug("begins");


function App() {
  //debug("App");
  return {
    start () {
      debug("start");
      return i18n.load()
      .then(initIntl)
      .then(render);
    }
  };
  function initIntl(){
    debug("initIntl");
    return new Promise((resolve) => {
      if (!window.Intl) {
        // Safari only
        debug("fetch intl");
        require.ensure([
          'intl', 'intl/locale-data/jsonp/en.js'
        ], function(require) {
          require('intl');
          require('intl/locale-data/jsonp/en.js');
          resolve();
        });
      } else {
        resolve();
      }
    });
  };
  function render() {
    let link = window.location.href.split("/");
    if (!link[3]) {
      window.location = window.location.origin + '/i';
    }
    debug("render");
    let mountEl = document.getElementById('application');
    ReactDOM.render(
        <IntlProvider locale='en'>
          {rootView()}
        </IntlProvider>
        , mountEl);

  }
}

let app = App();
app.start();
