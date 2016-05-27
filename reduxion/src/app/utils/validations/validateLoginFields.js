import Checkit from 'checkit';

export default class {

  constructor( payload ) {
    this.payload = payload;
  }

  execute() {
    let rules = new Checkit( {
      email: [
        { rule: 'required', label: 'email/username' },
        { rule: 'minLength:3', label: 'email/username' },
        { rule: 'maxLength:64', label: 'email/username' }
      ],
      password: [ 'required', 'minLength:6', 'maxLength:64' ]
    } );

    return rules.run( this.payload );
  }
}
