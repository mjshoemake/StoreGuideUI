export class User {
	user_pk: number = -1;
  username: string = '';
  image_url: string = '';
  first_name: string = '';
  last_name: string = '';

	constructor(values: Object = {}) {
		Object.assign(this, values);
	}
}

