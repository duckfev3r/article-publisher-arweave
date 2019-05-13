import Arweave from 'arweave/web'

const arweave = Arweave.init(
	{ host: 'arweave.net', port: 443, protocol: 'https' });

export default class ApiService {

	private getTime(): number {
		return Math.round((new Date()).getTime() / 1000)
	}

	/**
	 * Not sure if addTags needs to return the tx or if properties will be
	 * updated on original object.
	 */

	private addTags(tx: any, tags: any) {
		tags.forEach((tag: any) => {
			tx.addTag(tag.key, tag.value)
		})
		tx.addTag('App-Name', 'scribe')
		tx.addTag('App-Version', '0.0.0')
		tx.addTag('Unix-Time', this.getTime())
		return tx
	}

	public async postArticle(content: any, wallet: any, awv: any = arweave) {
		let tx = await awv.createTransaction({
			data: content
		}, wallet)

		tx = this.addTags(tx, content.tags)

		await awv.transactions.sign(tx, wallet)
		console.log(tx)
		await awv.transactions.post(tx)
		console.log('article published !')
	}

	public async testTxn(wallet: any, awv: any = arweave) {
		const content = 'this is a test'
		const tx = await awv.createTransaction({
			data: content
		}, wallet)

		tx.addTag('App-Name', 'scribe')
		tx.addTag('App-Version', '0.0.0')
		tx.addTag('Unix-Time', this.getTime())
		await awv.transactions.sign(tx, wallet)
		console.log(tx)
		await awv.transactions.post(tx)
		console.log('Mail dispatched!')
	}

	public checkStatus(awv: any = arweave) {
		awv.network.getInfo().then(console.log)
	}

	public async searchTestTxn(awv: any = arweave) {
		let query =
		{
			op: 'equals',
			expr1: 'App-Name',
			expr2: 'scribe'
		}

		const res = await awv.api.post(`arql`, query)
		let tx_rows = []
		if (res.data == '') {
			tx_rows = []
		} else {
			tx_rows = await Promise.all(res.data.map(async (id: string, i: number) => {
				console.log(res)
				let tx_row: any = {}
				var tx = await awv.transactions.get(id)
				tx_row['unixTime'] = '0'
				const tags = tx.get('tags')

				tags.forEach((tag: any) => {
					let key = tag.get('name', { decode: true, string: true })
					let value = tag.get('value', { decode: true, string: true })
					if (key === 'Unix-Time') tx_row['unixTime'] = value
				})

				tx_row['id'] = id
				tx_row['tx_status'] = await awv.transactions.getStatus(id)
				tx_row['from'] = await awv.wallets.ownerToAddress(tx.owner)
				tx_row['data'] = await tx.get('data', {decode: true, string: true});
				tx_row['td_fee'] = awv.ar.winstonToAr(tx.reward)
				tx_row['td_qty'] = awv.ar.winstonToAr(tx.quantity)

				return tx_row
			}))

			console.log(tx_rows);
		}
	}
}