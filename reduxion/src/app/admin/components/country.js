import React from 'react';

class Country extends React.Component {
  render() {
    let countries = this.props.country.toArray();
    let selected = (this.props.selected) ? this.props.selected : "";

    return (
      <div className="mdl-selectfield">
        <select className="mdl-textfield__input" id="country_id" name="country_id" ref="country_id" defaultValue={selected}>
          <option value=""></option>
          {countries.map(item =>
            {return <option key={item.get('id')} value={item.get('id')}>{item.get('name')}</option>}
          )}
        </select>
        <label className="mdl-textfield__label" htmlFor="country_id">Country *</label>
      </div>
    );
  }
}
export default Country;
