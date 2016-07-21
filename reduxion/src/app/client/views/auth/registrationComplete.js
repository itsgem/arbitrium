import React from 'react';
import DocTitle from 'common/components/docTitle';
import tr from 'i18next';

export default React.createClass( {
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  propTypes:{
    emailCodeVerified: React.PropTypes.bool.isRequired,
    verifyEmailCode: React.PropTypes.func.isRequired,
    error: React.PropTypes.object
  },

  componentDidMount(){
    let code = window.location.search.split('?token=')[1];
    this.props.verifyEmailCodeToken(code);
  },

  componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.clientInfo).length) {
      let clientInfo = nextProps.clientInfo.data;
      let payload = {
        token: clientInfo.token,
        user_id: clientInfo.client_id
      }
      this.props.verifyEmailCode(payload);
    }

    if (nextProps.emailCodeVerified) {

      let path = '/i/login';
      this.context.router.push(path);
    }
  },

  render() {
    return (
      <div id="registration-complete">
        <DocTitle
          title={tr.t('CLIENT_VERIFY_EMAIL.DOC_TITLE')}
        />
        {this.renderError()}
        {this.renderRegistering()}
      </div>
    );
  },
  renderError(){
    let {error} = this.props;
    if (!error) return;
    if ( error.data.message || error.data.errors.token) {
      return (
        <div className="alert alert-warning text-center animate bounceIn" role="alert">
          {tr.t('CLIENT_VERIFY_EMAIL.NOTE.NO_LONGER_VALID')}
        </div>
      );
    } else {
      //TODO
      return (
        <div className="alert alert-danger text-center animate bounceIn" role="alert">
          {tr.t('CLIENT_VERIFY_EMAIL.NOTE.AN_ERROR_OCCURED')}
        </div>
      );
    }
  },
  renderRegistering(){
    if(!this.props.error){
      return (
        <div className="alert alert-info text-center animate bounceIn" role="info">
          {tr.t('CLIENT_VERIFY_EMAIL.NOTE.REGISTERING_YOUR_ACCOUNT')}
        </div>
      );
    }
  }
} );
