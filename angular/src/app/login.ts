export class Login {
  id: string = '';
	name: string = ''
  firstName: string = '';
	lastName: string = '';
  imageUrl: string = '';
  email: string = '';

	constructor(values: Object = {}) {
		Object.assign(this, values);
	}
}

