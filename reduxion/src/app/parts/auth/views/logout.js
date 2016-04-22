import React from 'react';
import DocTitle from 'components/docTitle';

export default React.createClass( {

    componentDidMount () {
        this.props.logout();
    },
    componentWillReceiveProps(nextProps) {
        console.log('rrrr',nextProps);
        if(!nextProps.authenticated){
            localStorage.clear();
        }
    },


    render() {
        return (
            <div id="logout">
                <DocTitle
                    title="Logout"
                />
                <div className="text-center">
                    <h1>Logged Out</h1>
                </div>

            </div>
        );
    }

} );
