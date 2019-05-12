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

	public async postArticle(content: any, wallet: any, connection: any = arweave) {
		let tx = await connection.createTransaction({
			data: content
		}, wallet)

		tx = this.addTags(tx, content.tags)

		await connection.transactions.sign(tx, wallet)
		console.log(tx)
		await connection.transactions.post(tx)
		console.log('article published !')

	}

	public async testTxn(wallet: any, connection: any = arweave) {
		const content = 'this is a test'
		const tx = await connection.createTransaction({
			data: content
		}, wallet)

		tx.addTag('App-Name', 'scribe')
		tx.addTag('App-Version', '0.0.0')
		tx.addTag('Unix-Time', this.getTime())
		await connection.transactions.sign(tx, wallet)
		console.log(tx)
		await connection.transactions.post(tx)
		console.log('Mail dispatched!')
	}

	public checkStatus(connection: any = arweave) {
		connection.network.getInfo().then(console.log)
	}

	public async searchTestTxn(connection: any = arweave) {
		const result = await connection.transactions.search('App-name', 'permamail')
		console.log('result', result)
		let query =
		{
			op: 'equals',
			expr1: 'App-Name',
			expr2: 'scribe'
		}

		const res = await connection.api.post(`arql`, query)
		var tx_rows = []
		if (res.data == '') {
			tx_rows = []
		} else {
			tx_rows = await Promise.all(res.data.map(async function (id: string, i: number) {
				console.log(res)
				let tx_row: any = {}
				var tx = await connection.transactions.get(id)
				tx_row['unixTime'] = '0'
				const tags = tx.get('tags')
				tags.forEach((tag: any) => {
					let key = tag.get('name', { decode: true, string: true })
					let value = tag.get('value', { decode: true, string: true })
					if (key === 'Unix-Time') tx_row['unixTime'] = value
				})

				tx_row['id'] = id
				tx_row['tx_status'] = await connection.transactions.getStatus(id)
				tx_row['from'] = await connection.wallets.ownerToAddress(tx.owner)
				tx_row['td_fee'] = connection.ar.winstonToAr(tx.reward)
				tx_row['td_qty'] = connection.ar.winstonToAr(tx.quantity)

				return tx_row
			}))
		}
	}
}