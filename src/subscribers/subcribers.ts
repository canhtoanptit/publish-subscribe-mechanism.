import {
    IEvent,
    LowStockWarningEvent,
    MachineRefillEvent,
    MachineSaleEvent,
    StockLevelOkEvent
} from "../event/event.interface";
import {MachineRepository} from "../event/repository";
import {PublishSubscribeService} from "../pubsub/pubsub.service";
import {ISubscriber} from "./subscribe.interface";

export class MachineSaleSubscriber implements ISubscriber {
    constructor(private machineRepository: MachineRepository) { }

    handleEvent(event: IEvent): void {
        if (event instanceof MachineSaleEvent) {
            const machine = event.machine;
            const saleQuantity = event.saleQuantity;
            machine.decreaseStock(saleQuantity);
        }
    }
}


export class MachineRefillSubscriber implements ISubscriber {
    constructor(private machineRepository: MachineRepository) {
    }

    handleEvent(event: IEvent): void {
        if (event instanceof MachineRefillEvent) {
            const machine = event.machine;
            const refillQuantity = event.refillQuantity;
            machine.increaseStock(refillQuantity);
        }
    }
}

// Concrete subscriber for stock warnings
export class StockWarningSubscriber implements ISubscriber {
    private lowStockNotifiedMachines: Set<string> = new Set();

    constructor(private machineRepository: MachineRepository, private publishSubscribeService: PublishSubscribeService) {
    }

    handleEvent(event: IEvent): void {
        if (event instanceof MachineSaleEvent || event instanceof MachineRefillEvent) {
            const machine = event.machine;
            const currentStock = machine.stock;

            if (currentStock < 3 && !this.lowStockNotifiedMachines.has(machine.id)) {
                this.publishSubscribeService.publish(new LowStockWarningEvent(machine));
                this.lowStockNotifiedMachines.add(machine.id);
            } else if (currentStock >= 3 && this.lowStockNotifiedMachines.has(machine.id)) {
                this.publishSubscribeService.publish(new StockLevelOkEvent(machine));
                this.lowStockNotifiedMachines.delete(machine.id);
            }
        }
    }
}