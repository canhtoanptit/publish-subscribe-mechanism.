import {IEvent} from "../event/event.interface";
import {ISubscriber} from "../subscribers/subscribe.interface";

export interface IPublishSubscribeService {
    subscribe(eventType: string, subscriber: ISubscriber): void;
    publish(event: IEvent): void;
    unsubscribe(eventType: string, subscriber: ISubscriber): void;
}
