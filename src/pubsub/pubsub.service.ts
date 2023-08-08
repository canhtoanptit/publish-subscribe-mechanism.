import {IPublishSubscribeService} from "./pubsub.service.interface";
import {IEvent} from "../event/event.interface";
import {ISubscriber} from "../subscribers/subscribe.interface";

export class PublishSubscribeService implements IPublishSubscribeService {
    private subscribers: Map<IEvent, Set<ISubscriber>> = new Map<IEvent, Set<ISubscriber>>();

    subscribe(eventType: string, subscriber: ISubscriber): void {

    }

    unsubscribe(eventType: string, subscriber: ISubscriber): void {

    }

    publish(event: IEvent): void {

    }
}