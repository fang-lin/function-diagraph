import React, {FunctionComponent} from 'react';
import {version} from '../../../package.json';
import {Info, InfoDialogBackground} from './styles';
import {ParsedParams} from '../../helpers';
import {Close, DialogInner, Title, TitleBar} from '../Dialog/styles';
import {Dialog} from '../Dialog';
import {stopPropagation} from '../../pages/Plotter';

export interface InfoDialogProps {
    pushToHistory: (params: Partial<ParsedParams>) => void;
    params: ParsedParams;
}

export const InfoDialog: FunctionComponent<InfoDialogProps> = (props) => {
    const {pushToHistory, params:{displayInfoDialog}} = props;

    const close = (): void => pushToHistory({displayInfoDialog: false});

    return <Dialog {...{isShow: displayInfoDialog, Background: InfoDialogBackground}}>
        <TitleBar>
            <Title>About Function Plotter {version}</Title>
            <Close onClick={close}/>
        </TitleBar>
        <DialogInner {...stopPropagation}>
            <Info>
                <p>This is a mathematical function plotter</p>
                <h3>Symbol</h3>
                <table>
                    <tbody>
                        <tr>
                            <td>Plus:</td>
                            <td>+</td>
                        </tr>
                        <tr>
                            <td>Minus:</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>Product:</td>
                            <td>*</td>
                        </tr>
                        <tr>
                            <td>Division:</td>
                            <td>/</td>
                        </tr>
                    </tbody>
                </table>
                <h3>Function</h3>
                <table>
                    <tbody>
                        <tr>
                            <td>Power:</td>
                            <td>pow(x, n)</td>
                        </tr>
                        <tr>
                            <td>Natural Logarithm:</td>
                            <td>log(x)</td>
                        </tr>
                        <tr>
                            <td>Trigonometric:</td>
                            <td>sin(x), cos(x), tan(x), arcsin(x), arccos(x), arctan(x)</td>
                        </tr>
                        <tr>
                            <td>Absolute:</td>
                            <td>abs(x)</td>
                        </tr>
                        <tr>
                            <td>Floor:</td>
                            <td>floor(x)</td>
                        </tr>
                        <tr>
                            <td>Ceil:</td>
                            <td>ceil(x)</td>
                        </tr>
                        <tr>
                            <td>Round:</td>
                            <td>round(x)</td>
                        </tr>
                    </tbody>
                </table>
                <h3>Constant</h3>
                <table>
                    <tbody>
                        <tr>
                            <td>PI</td>
                        </tr>
                        <tr>
                            <td>E</td>
                        </tr>
                    </tbody>
                </table>
                <h3>Example</h3>
                <table>
                    <tbody>
                        <tr>
                            <td>y = log(x)</td>
                        </tr>
                        <tr>
                            <td>y = arctan(x)</td>
                        </tr>
                        <tr>
                            <td>y = 1/(1-pow(E, x/(1-x)))</td>
                        </tr>
                    </tbody>
                </table>
            </Info>
        </DialogInner>
    </Dialog>;
};
