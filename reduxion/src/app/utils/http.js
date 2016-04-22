import Axios from 'axios';
import Debug from 'debug';
import Qs from 'qs';
import baseUrl from './baseUrl';

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
    debug("ajax url: %s, method: %s, options %s, params: ", url, method, JSON.stringify(options), params);
    let data = options ? JSON.stringify( options.params ) : undefined;
    return Axios({
        method: method,
        url: baseUrl(url),
        params: params,
        data: data,
<<<<<<< HEAD
        headers: {
            'Content-Type': 'application/json',
            'X-Token':`${localStorage.getItem('token')}`
        },
=======
        //withCredentials: true,
        headers: {'Content-Type': 'application/json', 'X-Token': '0d0dbedbbba13f02598357e1a62f083f7032566769d8ddf23acdf9858638938d'},
>>>>>>> fix-conflict
        paramsSerializer: function(params) {
            return Qs.stringify(params, {arrayFormat: 'brackets'});
        }
    }).then(res => {
        return res.data;
    });

}
