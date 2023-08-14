import {IEvent, MachineRefillEvent, MachineSaleEvent} from "../event/event.interface";
import {Machine} from "../machine/machine";

const randomMachine = (): Machine => {
    const random = Math.random() * 3;
    const machine1 = new Machine("1", 'Machine 1', 5);
    const machine2 = new Machine("2", 'Machine 2', 2);
    const machine3 = new Machine("3", 'Machine 3', 4);
    if (random < 1) {
        return machine1;
    } else if (random < 2) {
        return machine2;
    }
    return machine3;
};

export const eventGenerator = (): IEvent => {
    const random = Math.random();
    if (random < 0.5) {
        const saleQty = Math.random() < 0.5 ? 1 : 2; // 1 or 2
        return new MachineSaleEvent(randomMachine(), saleQty);
    }
    const refillQty = Math.random() < 0.5 ? 3 : 5; // 3 or 5
    return new MachineRefillEvent(randomMachine(), refillQty);
};