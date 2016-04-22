import Checkit from 'checkit';

export default class {

    constructor( email ) {
        this.email = email;
    }

    execute() {
        let rules = new Checkit( {
            email: [ 'required', 'email' ]
        } );

        return rules.run( this.email );
    }
}