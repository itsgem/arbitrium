'use strict';

import config from 'config';
import Debug from 'debug';

let debug = new Debug("baseUrl");

if (!window.location.origin) {
  window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
}

export default function( url ) {
  var fullUrl = config.apiUrl +  url;
	debug('Request sent to', config.apiUrl);
  return fullUrl;
}
