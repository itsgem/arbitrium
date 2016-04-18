import React from 'react';
import DocTitle from 'components/docTitle';
import Client from '../components/client';
import Header from './header';

export default React.createClass( {
    propTypes:{
        countryList: React.PropTypes.object,
    },
    componentDidMount(){
        this.props.country();
        
    },
    render() {
        let countryList = this.props.countryList;
        console.log('test', countryList);
        return (
            <div className="content box_admin">
                <Header />
                <Client clientProfile = { this.props.clientProfile } contry={ this.props.countryList } />
            </div>
        );
    }
} );
