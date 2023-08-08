import {Machine} from "../machine/machine";

export interface IEvent {
    eventType: string;
}

export class MachineSaleEvent implements IEvent {
    eventType = 'MachineSaleEvent';

    constructor(public machine: Machine, public saleQuantity: number) { }
}

export class MachineRefillEvent implements IEvent {
    eventType = 'MachineRefillEvent';

    constructor(public machine: Machine, public refillQuantity: number) { }
}

export class LowStockWarningEvent implements IEvent {
    eventType = 'LowStockWarningEvent';

    constructor(public machine: Machine) { }
}

export class StockLevelOkEvent implements IEvent {
    eventType = 'StockLevelOkEvent';

    constructor(public machine: Machine) { }
}