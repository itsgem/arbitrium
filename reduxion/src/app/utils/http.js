import Axios from 'axios';
import Debug from 'debug';
import Qs from 'qs';
import baseUrl from './baseUrl';
import config from 'config';
import CryptoJS from 'crypto-js';

let debug = new Debug("http");

export function get( url, options = {} ) {
  return ajax( url, 'GET', null, options.params );
}

export function post( url, options = {} ) {
  return ajax( url, 'POST', options );
}

export function put( url, options = {} ) {
  return ajax( url, 'PUT', options );
}

export function del( url, options = {} ) {
  return ajax( url, 'DELETE', options );
}

export function patch( url, options = {} ) {
  return ajax( url, 'PATCH', options );
}

///////////
//// PRIVATE

function ajax( url, method, options, params ) {
  let link = window.location.href.split("/");
  let token = '';
  let bytes = '';
  switch (link[3]) {
    case 'coffee' :
      if (localStorage.getItem('coffee') ){
        bytes  = CryptoJS.AES.decrypt(localStorage.getItem('coffee'), config.key);
      }
      break;
    default :
      if (localStorage.getItem('token')) {
       bytes  = CryptoJS.AES.decrypt(localStorage.getItem('token'), config.key);
      }
  }

  if (bytes.sigBytes < 0 ) {
    localStorage.removeItem(link[3]);
    window.location = window.location.origin + "/" + (link[3] == 'token' ? "i" : link[3]) + "/login";
  }

  if (bytes) {
    let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    token = decryptedData.token;
  }

  debug("ajax url: %s, method: %s, options %s, params: ", url, method, JSON.stringify(options), params);
  let data = options ? JSON.stringify( options.params ) : undefined;
  return Axios({
    method: method,
    url: baseUrl(url),
    params: params,
    data: data,
    headers: {
      'Content-Type': 'application/json',
      'X-Token': `${token}`
    },
    paramsSerializer: function(params) {
      return Qs.stringify(params, {arrayFormat: 'brackets'});
    }
  }).then(res => {
    return res.data;
  });
}
