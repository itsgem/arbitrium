import React from 'react';
import DocTitle from 'components/docTitle';
import Client from '../components/client';
import Header from './header';

export default React.createClass( {
    componentDidMount(){
        let id = this.props.params.id;
        this.props.clientProfile(id);
    },
    render() {
        let clientInfo = this.props.clientProfileSuccess.get('data');
        return (
            <div className="content box_admin">
                <Header />
                <Client clientInfo={clientInfo}/>
            </div>
        );
    }
} );
