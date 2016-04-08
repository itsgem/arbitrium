import _ from 'lodash';
import React from 'react';
import Checkit from 'checkit';
import LaddaButton from 'react-ladda';
//import SelectLangage from 'components/selectLanguage';
import ValidateProfileForm from 'services/validateProfileForm';
import Spinner from 'components/spinner';
import tr from 'i18next';
import Debug from 'debug';
let debug = new Debug("components:profileForm");

export default React.createClass({
    propTypes: {
        loading: React.PropTypes.bool,
        profile: React.PropTypes.object,
        updateProfile: React.PropTypes.func.isRequired
    },
    getDefaultProps(){
        return {
            loading: false,
            profile: {}
        }
    },
    componentWillReceiveProps(nextProps){
        debug("componentWillReceiveProps", nextProps);
        this.setState(nextProps.profile || {});
    },
    getInitialState() {
        debug("getInitialState: props: ", this.props);
        return _.defaults(this.props.profile,
            {
                language: 'US',
                updating: false,
                errors: {}
            });
    },
    render() {
        debug("render props: ", this.props);
        debug("state: ", this.state);
        let {state, props} = this;
        let {errors} = state;
        if(props.loading){
            return <Spinner/>
        }
        return (
            <form
                className="form-horizontal col-sm-6"
                onSubmit={ (e) => e.preventDefault() }>
                <div className="form-group">
                    <label htmlFor="username" className="col-sm-3 control-label">Username</label>
                    <div className="col-sm-9">
                        <input type="text"
                            id='username'
                            placeholder={tr.t('username')}
                            value={state.username}
                            onChange={_.partial(this.onChange, 'username')} />
                        <small>{errors.username && errors.username[0]}</small>
                    </div>
                </div>
                <br/>
                <div className="form-group">
                    <label htmlFor="email" className="col-sm-3 control-label">Mail</label>
                    <div className="col-sm-9">
                        <input type="text"
                            id='email'
                            disabled={true}
                            placeholder={tr.t('email')}
                            value={state.email} />
                        <small>{errors.email && errors.email[0]}</small>
                    </div>
                </div>
                {/*
                    <div className="form-group">
                        <label htmlFor="select-language" className="col-sm-3 control-label">Language</label>
                        <div className="col-sm-9">
                            <SelectLangage
                                id='select-language'
                                language={state.language}
                                onLanguage={this.onLanguage}/>
                        </div>
                    </div>
                    */}
                <div>
                    <div className="form-group">
                        <legend>About Me</legend>
                        <textarea
                            rows={4}
                            floatingLabelText={tr.t('email')}
                            onChange={_.partial(this.onChange, 'about')}></textarea>
                    </div>
                </div>
                <LaddaButton
                    className='btn btn-lg btn-primary btn-signup'
                    id='btn-update-profile'
                    buttonColor='green'
                    loading={this.state.updating}
                    progress={.5}
                    buttonStyle="slide-up"
                    onClick={this.onUpdateProfile}>Update Profile</LaddaButton>
            </form>
        );
    },
    onLanguage(language){

        debug("onLanguage: ", language);
        this.setState({language:language});
    },

    onChange(id, e) {
        debug(`onChange: ${id}: ${e.target.value}`);
        this.setState({[id]: e.target.value});
    },
    onUpdateProfile() {
        debug('updateProfile ', this.state);
        this.setState( {
            errors: {},
            updating: true
        } );

        validateForm.call( this )
            .with( this )
            .then( save )
            .then( successNotification )
            .catch(Checkit.Error, (error) => this.setState( {
                errors: error.toJSON()
            } ))
            .catch( setErrors )
            .then( () => {
                this.setState( {
                    updating: false
                } );
            } );

        function validateForm() {
            return new ValidateProfileForm( {
                username: this.state.username,
            } )
            .execute();
        }

        function save() {
            return this.props.updateProfile(this.state);
        }

        function successNotification() {
        }

        function setErrors( e ) {
            debug('setErrors: ', e);
        }
    }
} );
