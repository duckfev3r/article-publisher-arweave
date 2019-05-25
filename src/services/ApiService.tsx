import Arweave from 'arweave/web'
import { IArticle } from '../types/types';
<<<<<<< HEAD
import sanitize from '../utils/sanitizeHtml';
=======
>>>>>>> parent of b6793e3... renaming things..

const arweave = Arweave.init(
	{ host: 'arweave.net', port: 443, protocol: 'https' });

const envDevPrefix = 'scribe-alpha-dev-00'
const envProdPrefix = 'scribe-alpha-00'

const prefix = envProdPrefix

export default class ApiService {

<<<<<<< HEAD
	public createSynopsis(body: string) {
		let position = body.indexOf('.', 100)
		let str = `${body.slice(0, position)}...`
		return str
	}

=======
>>>>>>> parent of b6793e3... renaming things..
	public async postArticle(article: IArticle, wallet: any, awv: any = arweave) {
		let tx = await awv.createTransaction({
			data: encodeURI(JSON.stringify(article.content))
		}, wallet)
		this.addAppMetaTags(tx, article)
<<<<<<< HEAD
		this.addContentTags(tx, article.meta.tags)
=======
>>>>>>> parent of b6793e3... renaming things..
		try {
			await awv.transactions.sign(tx, wallet)
			const post = await awv.transactions.post(tx)
			if (post && post.status !== 200) {
				throw (post.status)
			}
		} catch (err) {
			return { err }
		}
	}

	public async getAllArticles(awv: any = arweave) {
		let query =
		{
			op: 'equals',
			expr1: 'App-Name',
			expr2: `${prefix}`
		}
		try {
			const res = await awv.api.post(`arql`, query)
			return this.createRows(res)
		}
		catch (err) {
			return { err }
		}
	}

	public async getArticleData(id: string, awv: any = arweave) {
		try {
			const tx = await awv.transactions.get(id)
			const data = JSON.parse(
				decodeURI(
					tx.get('data', { decode: true, string: true })
				)
			)
			console.log(data)
<<<<<<< HEAD
			data.body = sanitize(data.body)
=======
>>>>>>> parent of b6793e3... renaming things..
			return data
		}
		catch (err) {
			return { err }
		}
	}

	private async createRows(
		res: any,
		getData: boolean = false,
		awv: any = arweave,
	) {
		let tx_rows: any[] = []
		if (res.data == '') {
			tx_rows = []
		} else {
			tx_rows = await Promise.all(
				res.data.map(async (id: string) => {

					let tx_row: any = {}
					let tx = await awv.transactions.get(id)
					tx_row['unixTime'] = '0'
					const tags = tx.get('tags')
					if (tags.length) {
						tx_row.tags = []
						tx_row.scribe_data = []
						tx_row.scribe_tags = []
						tags.forEach((tag: any) => {
							let key = tag.get('name', { decode: true, string: true })
							let value: string = tag.get('value', { decode: true, string: true })
							if (
								key === `${prefix}-synopsis` ||
								key === `${prefix}-title` ||
								key === `${prefix}-tagline` ||
								key === `${prefix}-id`) {
								value = decodeURI(value)
								tx_row.scribe_data.push({ key, value })
								return
							} else if (key.indexOf(prefix) > -1) {
								tx_row.scribe_tags.push({ key, value })
							} else {
								tx_row[key] = { key, value }
							}
							if (key === 'Unix-Time') tx_row['unixTime'] = value
						})
					}

					tx_row['id'] = id
					tx_row['tx_status'] = await awv.transactions.getStatus(id)
					tx_row['from'] = await awv.wallets.ownerToAddress(tx.owner)
					tx_row['td_fee'] = awv.ar.winstonToAr(tx.reward)
					tx_row['td_qty'] = awv.ar.winstonToAr(tx.quantity)

					if (getData) {
						tx_row['data'] = await tx.get('data', { decode: true, string: true })
					}

					return tx_row
				}))
		}
		return tx_rows
	}

	private addAppMetaTags(tx: any, article: IArticle) {
<<<<<<< HEAD
		tx.addTag(`${prefix}-synopsis`, encodeURI(this.createSynopsis(article.content.stringBody)))
=======
>>>>>>> parent of b6793e3... renaming things..
		tx.addTag('App-Name', `${prefix}`)
		tx.addTag(`${prefix}-id`, this.randomString())
		tx.addTag(`${prefix}-title`, encodeURI(article.content.title))
		tx.addTag(`${prefix}-tagline`, encodeURI(article.content.tagline))
		tx.addTag('App-Version', '0.0.1')
		tx.addTag('Unix-Time', this.getTime())
		return tx
	}

	private addContentTags(tx: any, tags: string[]) {
		tags.forEach((tag: string, index: number) => {
			tx.addTag(`${prefix}-tag-${index}`, tag)
		})
		return tx
	}

	public checkStatus(awv: any = arweave) {
		awv.network.getInfo().then(console.log)
	}

	private getTime(): number {
		return Math.round((new Date()).getTime() / 1000)
	}

	private randomString() {
		const chars = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		var result = '';
		for (var i = 32; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
		return result;
	}
}

export { prefix }