// Subscriber interface
import {IEvent} from "../event/event.interface";

export interface ISubscriber {
    handleEvent(event: IEvent): void;
}