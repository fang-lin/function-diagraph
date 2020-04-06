import {FunctionEquation, isFunctionEquation} from './FunctionEquation';
import {ParametricEquation} from './ParametricEquation';
import {WorkerInput} from './workerPool';
import {calculateFunctionEquation} from './calculateFunctionEquation';

addEventListener('message', (event: MessageEvent) => {
    const {equation, range, origin, scale, isSmooth} = event.data as WorkerInput<FunctionEquation | ParametricEquation>;
    if (isFunctionEquation(equation)) {
        postMessage(calculateFunctionEquation(equation, {range, origin, scale, isSmooth}));
    }
});
