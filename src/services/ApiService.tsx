import Arweave from 'arweave/web'

export default class ApiService {
    private arweave: any

    constructor() {
        this.arweave = Arweave.init({
            host: 'arweave.net',
            port: 80
        });
    }

    public deploy() {

    }

    public async testTxn(wallet: any) {
        const content = 'this is a test'
        const mailTagUnixTime = Math.round((new Date()).getTime() / 1000)
        const tx = await this.arweave.createTransaction({
            data: content
        }, wallet)

        tx.addTag('App-Name', 'scribe')
        tx.addTag('App-Version', '0.0.0')
        tx.addTag('Unix-Time', mailTagUnixTime)
        await this.arweave.transactions.sign(tx, wallet)
        console.log(tx)
        await this.arweave.transactions.post(tx)
        console.log('Mail dispatched!')
    }

    public checkStatus() {
        this.arweave.network.getInfo().then(console.log)
    }
}