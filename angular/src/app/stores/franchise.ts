export class Franchise {
	franchise_pk: number = -1;
  name: string = '';
  website: string = '';
  company_email: string = '';

	constructor(values: Object = {}) {
		Object.assign(this, values);
	}
}

