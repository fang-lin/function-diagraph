import {Equation, EquationSerial} from './Equation';

export class FunctionEquation implements Equation {
    public color: string;
    public expression: string;
    public fn: string;
    public displayed: boolean;
    readonly type = 'FunctionEquation';

    constructor([expression, color, displayed]: EquationSerial) {
        this.expression = expression;
        this.fn = expression;
        this.color = color;
        this.displayed = displayed;
    }

    serialization(): EquationSerial {
        return [this.expression, this.color, this.displayed];
    }
}

export function isFunctionEquation(equation: Equation): equation is FunctionEquation {
    return equation.type === 'FunctionEquation';
}
