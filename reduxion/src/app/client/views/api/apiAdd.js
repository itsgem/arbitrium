import React from 'react';
import { Link } from 'react-router';
import ApiAdd from 'client/components/api/apiAdd';
import {createError} from 'utils/error';

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentWillMount () {
    this.props.getApiPermission().catch(createError);
  },
  componentWillReceiveProps(nextProps) {
    if (nextProps.registerApiSuccess && !nextProps.loading) {
      let notification = document.querySelector('.mdl-snackbar');
      notification.MaterialSnackbar.showSnackbar( {
        message: "API Key Successfully Added",
        timeout: 5000
      });
      this.context.router.push('/i/api/');
    }
  },
  render () {
    return (
      <main className="mdl-layout__content mdl-layout__content_my_profile my-profile">
        <div className="page-content">
          <ApiAdd
            clientRegisterApi={this.props.clientRegisterApi}
            apiPermissions={this.props.apiPermissions}
          />
        </div>
      </main>
    );
  }
});
