import React from 'react';
import tr from 'i18next';

class Country extends React.Component {
  render() {
    let countries = Object.keys(this.props.country).length ? this.props.country : null;
    let selected = (this.props.selected) ? this.props.selected : "";
    return (
      <div>
        <select className="mdl-textfield__input" id="country_id" name="country_id" ref="country_id" defaultValue={selected}>
          <option value=""></option>
          {countries && countries.map(item =>
            {return <option key={item.id} value={item.id}>{item.name}</option>}
          )}
        </select>
        <label className="mdl-textfield__label" htmlFor="country_id">{tr.t('SIGNUP.FORM.LABEL.COUNTRY')}</label>
      </div>
    );
  }
}
export default Country;
