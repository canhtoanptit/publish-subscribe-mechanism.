import {IPublishSubscribeService} from "./pubsub.service.interface";
import {IEvent} from "../event/event.interface";
import {ISubscriber} from "../subscribers/subscribe.interface";

export class PublishSubscribeService implements IPublishSubscribeService {
    private subscribers: Map<string, Set<ISubscriber>> = new Map<string, Set<ISubscriber>>();

    subscribe(eventType: string, subscriber: ISubscriber): void {
        if (this.subscribers.has(eventType)) {
            this.subscribers.get(eventType).add(subscriber);
        } else {
            this.subscribers.set(eventType, new Set<ISubscriber>([subscriber]));
        }
    }

    unsubscribe(eventType: string, subscriber: ISubscriber): void {
        if (this.subscribers.has(eventType)) {
            this.subscribers.get(eventType).delete(subscriber);
        }
    }

    publish(event: IEvent): void {
        if (this.subscribers.has(event.eventType)) {
            this.subscribers.get(event.eventType).forEach(s => {
                s.handleEvent(event)
            })
        }
    }
}