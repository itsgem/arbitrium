/* @flow */
import Immutable from 'immutable'
import { createReducer } from 'redux-act';
import { createActionAsync} from 'redux-act-async';
import auth from 'resources/auths';
import Checkit from 'checkit';

// console.log('aaaa',  auth.listCountries.call(function (){
//  let rules = new Checkit( {
//             email: []
//         } );
// rules.run()

// }));


export const country = createActionAsync('COUNTRY', auth.listCountries);


const initialState = Immutable.fromJS({
  country: false
});

export default createReducer({
  [country.ok]: (state) => state.merge({country: true})
}, initialState);
