import React from 'react';
import DocTitle from 'common/components/docTitle';
import ClientAdd from 'admin/components/client/clientAdd';
import { Link } from 'react-router';
import tr from 'i18next';

export default React.createClass( {
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentWillMount(){
    this.props.country();
  },
  componentWillReceiveProps(nextProps) {
    if (nextProps.registerCompleted && !nextProps.loading) {
      $('.msg').html('Client Successfully Added').addClass('bg-green');
      $('.msg').fadeIn(1000, function() {
        $(this).fadeOut(2000);
      });
      this.context.router.push('/coffee/client/');
    }
  },
  render() {
    //this.renderSuccess();
    return (
      <div id="client_add" className="auth-view">
        <DocTitle
          title={tr.t('CLIENT.DOC_TITLE_ADD')}
        />
      <div className="client-tab">
        <Link
          className="mdl-layout__tab"
          to="/coffee/client/">{tr.t('CLIENT.PAGE_TITLE.LIST')}</Link>
        <a className="mdl-layout__tab is-active">{tr.t('CLIENT.PAGE_TITLE.ADD')}<i className="material-icons add">add</i></a>
      </div>
        <ClientAdd
          clientRegister={this.props.clientRegister}
          validateUsername={this.props.validateUsername}
          registerCompleted={this.props.registerCompleted}
          validateCompleted={this.props.validateCompleted}
          country={this.props.country}
          countryList={this.props.countryList}/>
      </div>
    );
  }
} );