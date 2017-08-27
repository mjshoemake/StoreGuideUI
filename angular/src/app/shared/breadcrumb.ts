export class Breadcrumb {
	href: string = '';
  displayText: string = '';

	constructor(values: Object = {}) {
		Object.assign(this, values);
	}
}

