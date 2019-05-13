export default class PublishingService {

    public createSynopsis(body: any) {
        return `${body.slice(0,310)} ...`
    }

}

