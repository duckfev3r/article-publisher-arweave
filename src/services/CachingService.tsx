export default class CachingService {

    private _docPrefix = 'scribe_'

    public listAllDocuments() {
        let values = [],
            keys = Object.keys(localStorage),
            i = keys.length;

        while (i--) {
            values.push(localStorage.getItem(keys[i]));
        }

        return values.filter(value => {
            return value.includes(this._docPrefix)
        });
    }

    public getDocument(key: string) {
        return localStorage.getItem(key)
    }

    public saveDocument(key: string, value: string) {
        return localStorage.setItem(this._constructKey(key), value)
    }

    private _constructKey(key: string) {
        return `${this._docPrefix}${key}`
    }

}