import {parseToggle, stringifyToggle} from '../components/App.function';

export interface EquationInterface {
    fx: string;
    color: string;
    displayed: boolean;
}

export type EquationSerial = [string, string, string]

export class Equation implements EquationInterface {
    public color: string;
    public fx: string;
    public func: string;
    public displayed: boolean;

    constructor({fx, color, displayed}: EquationInterface) {
        this.fx = fx;
        this.color = color;
        this.displayed = displayed;
        this.func = fx;
    }

    serialization(): EquationSerial {
        return [this.fx, this.color, stringifyToggle(this.displayed)];
    }

    static parse(serial: EquationSerial): Equation {
        return new Equation({
            fx: serial[0],
            color: serial[1],
            displayed: parseToggle(serial[2])
        });
    }
}
