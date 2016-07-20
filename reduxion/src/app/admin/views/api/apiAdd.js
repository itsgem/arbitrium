import React from 'react';
import DocTitle from 'common/components/docTitle';
import ApiAdd from 'admin/components/api/apiAdd';
import {createError} from 'utils/error';
import { Link } from 'react-router';
import tr from 'i18next';

export default React.createClass( {
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentWillMount(){
    this.props.getApiPermission().catch(createError);
  },
  componentWillReceiveProps(nextProps) {
    if (nextProps.registerApiSuccess && !nextProps.loading) {
      $('.msg').html('API Key Successfully Added').addClass('bg-green');
      $('.msg').fadeIn(1000, function() {
        $(this).fadeOut(2000);
      });
      this.context.router.push('/coffee/api/');
    }
  },
  render() {
    return (
      <div id="client_add" className="auth-view">
        <DocTitle
          title={tr.t('API.DOC_TITLE_ADD')}
        />
      <div className="client-tab">
        <Link
          className="mdl-layout__tab"
          to="/coffee/api/">{tr.t('API.PAGE_TITLE.LIST')}</Link>
        <a className="mdl-layout__tab is-active">{tr.t('API.PAGE_TITLE.ADD')}<i className="material-icons add">add</i></a>
      </div>
        <ApiAdd
          registerApi={this.props.registerApi}
          clientList={this.props.clientList}
          apiPermissions={this.props.apiPermissions}
          adminClientList={this.props.adminClientList}/>
      </div>
    );
  }
} );