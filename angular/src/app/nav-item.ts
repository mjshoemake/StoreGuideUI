export class NavItem {
  id: string = '';
	href: string = '';
  glyphicon: string = '';
  displayText: string = '';

	constructor(values: Object = {}) {
		Object.assign(this, values);
	}
}

