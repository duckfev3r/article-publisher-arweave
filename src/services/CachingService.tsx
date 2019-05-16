const _docPrefix = 'scribe_'


export default class CachingService {

	public listAllDocuments() {
		let values = [],
			keys = Object.keys(localStorage),
			i = keys.length;

		while (i--) {
			values.push(sessionStorage.getItem(keys[i]));
		}

		return values.filter(value => {
			return value.includes(_docPrefix)
		});
	}

	public getDocument(key: string) {
		const componentKey = this._constructKey(key)
		const document = sessionStorage.getItem(componentKey)
		// console.log(document)
		return JSON.parse(decodeURI(document))
	}

	public setDocument(key: string, value: string) {
		const componentKey = this._constructKey(key)
		sessionStorage.setItem(componentKey, JSON.stringify(value))
	}

	private _constructKey(key: string) {
		return `${_docPrefix}${key}`
	}
}