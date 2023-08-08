import Maybe from "../utils/maybe.util";
import { Machine } from "../machine/machine";

export class MachineRepository {
    private machines: Machine[] = [];

    add(machine: Machine): void {
        this.machines.push(machine);
    }

    getById(id: string): Maybe<Machine> {
        const machine = this.machines.find((m) => m.id === id);
        return machine ? Maybe.Some(machine) : Maybe.None();
    }

    getAll(): Machine[] {
        return [...this.machines];
    }
}