import Arweave from 'arweave/web'
import { IArticle } from '../types/types';

const arweave = Arweave.init(
	{ host: 'arweave.net', port: 443, protocol: 'https' });

const envDevPrefix = 'scribe-alpha-dev-00'
const envProdPrefix = 'scribe'

const prefix = envDevPrefix

export default class ApiService {

	private addAppMetaTags(tx: any, article: IArticle) {
		tx.addTag(`${prefix}-synopsis`, this.createSynopsis(article.content.stringBody))
		tx.addTag('App-Name', `${prefix}`)
		tx.addTag(`${prefix}-id`, this.randomString())
		tx.addTag(`${prefix}-title`, encodeURI(article.content.title))
		tx.addTag('App-Version', '0.0.0')
		tx.addTag('Unix-Time', this.getTime())
		return tx
	}

	private addContentTags(tx: any, tags: string[]) {
		tags.forEach((tag: string) => {
			tx.addTag(`${prefix}-tag`, tag)
		})
		return tx
	}

	private createSynopsis(body: string) {
		return `${body.slice(0, 200)} ...`
	}

	public async postArticle(article: IArticle, wallet: any, awv: any = arweave) {
		let tx = await awv.createTransaction({
			data: JSON.stringify(article.content)
		}, wallet)
		this.addAppMetaTags(tx, article)
		this.addContentTags(tx, article.meta.tags)
		try {
			const sign = await awv.transactions.sign(tx, wallet)
			const post = await awv.transactions.post(tx)
			if (post && post.status !== 200) {
				throw (post.status)
			}
		} catch (err) {
			return {err}
		}
	}

	public async getAllArticles(awv: any = arweave) {
		let query =
		{
			op: 'equals',
			expr1: 'App-Name',
			expr2: `${prefix}`
		}
		const res = await awv.api.post(`arql`, query)
		return this.createRows(res)
	}

	private async createRows(
		res: any,
		awv: any = arweave,
		getData: boolean = false
	) {
		let tx_rows: any[] = []
		if (res.data == '') {
			tx_rows = []
		} else {
			tx_rows = await Promise.all(res.data.map(async (id: string) => {
				let tx_row: any = {}
				var tx = await awv.transactions.get(id)
				tx_row['unixTime'] = '0'
				const tags = tx.get('tags')

				tags.forEach((tag: any) => {
					let key = tag.get('name', { decode: true, string: true })
					let value = tag.get('value', { decode: true, string: true })
					tx_row[key] = value
					if (key === 'Unix-Time') tx_row['unixTime'] = value
				})

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
			console.log(tx_rows);
		}
		return tx_rows
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