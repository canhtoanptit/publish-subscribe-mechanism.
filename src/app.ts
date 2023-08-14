import {MachineRepository} from "./event/repository";
import {PublishSubscribeService} from "./pubsub/pubsub.service";
import {Machine} from "./machine/machine";
import {MachineRefillSubscriber, MachineSaleSubscriber, StockWarningSubscriber} from "./subscribers/subcribers";
import {eventGenerator} from "./utils/generator.utils";

(async () => {
    // Usage example
    const machineRepository = new MachineRepository();
    const publishSubscribeService = new PublishSubscribeService();

    // Create machines
    const machine1 = new Machine("1", 'Machine 1', 5);
    const machine2 = new Machine("2", 'Machine 2', 2);
    const machine3 = new Machine("3", 'Machine 3', 4);

    // Store machines in repository
    machineRepository.add(machine1);
    machineRepository.add(machine2);
    machineRepository.add(machine3);
    // Create subscribers
    const machineRefillSubscriber = new MachineRefillSubscriber(machineRepository);
    const machineSaleSubscriber = new MachineSaleSubscriber(machineRepository);
    const stockWarningSubscriber = new StockWarningSubscriber(machineRepository, publishSubscribeService);

    // Subscribe subscribers to the service
    publishSubscribeService.subscribe('MachineRefillEvent', machineRefillSubscriber);
    publishSubscribeService.subscribe('MachineSaleEvent', machineSaleSubscriber);
    publishSubscribeService.subscribe('LowStockWarningEvent', stockWarningSubscriber);
    publishSubscribeService.subscribe('StockLevelOkEvent', stockWarningSubscriber);

    // create 5 random events
    const events = [1, 2, 3, 4, 5].map((i) => eventGenerator());

    // publish the events
    events.forEach(publishSubscribeService.publish.bind(publishSubscribeService));
})();

