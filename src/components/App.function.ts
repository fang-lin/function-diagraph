import {Dispatch, DOMAttributes, SetStateAction, SyntheticEvent} from 'react';
import {History} from 'history';
import range from 'lodash/range';
import moment from 'moment';
import {useParams} from "react-router";

export type Coordinate = [number, number];
export type Size = [number, number];

export interface Equation {
    fx: string;
    color: string;
    displayed: boolean;
}

export const deviceRatio: number = (() => window.devicePixelRatio || 1)();
export const ZoomUnit: number = 2 ** .5;
export const ZoomRange: number[] = range(deviceRatio * 2, deviceRatio * 2 + 16);

export function parseZoom(zoomIndex: number): number {
    return Math.pow(ZoomUnit, ZoomRange[zoomIndex]);
}

export function clone<T = any>(a: any): T {
    return JSON.parse(JSON.stringify(a));
}

function isTouchEvent(event: DragEvent): event is TouchEvent {
    return window.TouchEvent && event instanceof TouchEvent;
}

export function getClient(event: DragEvent): Coordinate {
    const {clientX, clientY} = isTouchEvent(event) ? event.changedTouches[0] : event;
    return [clientX, clientY];
}

export const isMobile: boolean = (() => {
    try {
        document.createEvent('TouchEvent');
        return true;
    } catch (e) {
        return false;
    }
})();

export function getDeviceRatio() {
    return window.devicePixelRatio || 1;
}

export enum DragState {
    start,
    moving,
    end
}

export type DragEvent = MouseEvent | TouchEvent;

export const DragEvents: Record<DragState, keyof WindowEventMap> = isMobile ? {
    [DragState.start]: 'touchstart',
    [DragState.moving]: 'touchmove',
    [DragState.end]: 'touchend',
} : {
    [DragState.start]: 'mousedown',
    [DragState.moving]: 'mousemove',
    [DragState.end]: 'mouseup',
};

export const JSXDragEvents: Record<DragState, keyof DOMAttributes<any>> = isMobile ? {
    [DragState.start]: 'onTouchStart',
    [DragState.moving]: 'onTouchMove',
    [DragState.end]: 'onTouchEnd',
} : {
    [DragState.start]: 'onMouseDown',
    [DragState.moving]: 'onMouseMove',
    [DragState.end]: 'onMouseUp',
};


export const getStageSize = (content: Element | null): Size => {
    if (content) {
        const {width, height} = content.getBoundingClientRect();
        return [width, height];
    }
    return [0, 0];
};

export const getCenteredOrigin = (size: Size): Coordinate => {
    return [size[0] / 2, size[1] / 2]
};

export const onDragStartHOF = (
    {setClient, setDragState, onDragging}: {
        setClient: Dispatch<SetStateAction<Coordinate>>,
        setDragState: Dispatch<SetStateAction<DragState>>,
        onDragging: (event: DragEvent) => void
    }
) => (event: DragEvent): void => {
    setDragState(DragState.start);
    setClient(getClient(event));
    window.addEventListener(DragEvents[DragState.moving], onDragging);
};

export const onDraggingHOF = (
    {setTransform, setDragState, setClient}: {
        setTransform: Dispatch<SetStateAction<Coordinate>>,
        setDragState: Dispatch<SetStateAction<DragState>>,
        setClient: Dispatch<SetStateAction<Coordinate>>
    }
) => (event: DragEvent): void => {
    const _client = getClient(event);
    setClient((client: Coordinate) => {
        setTransform([_client[0] - client[0], _client[1] - client[1]]);
        return client;
    });
    setDragState(DragState.moving);
};

export const onDragEndHOF = (
    {setTransform, ORIGIN, toPath, history, setDragState, setClient, onDragging}: {
        setTransform: Dispatch<SetStateAction<Coordinate>>,
        // setOrigin: Dispatch<SetStateAction<Coordinate>>,
        ORIGIN: Coordinate,
        toPath: (param: Partial<ConvertedParams>) => string,
        history: History,
        setDragState: Dispatch<SetStateAction<DragState>>,
        setClient: Dispatch<SetStateAction<Coordinate>>,
        onDragging: (event: DragEvent) => void
    }
) => (event: DragEvent): void => {
    window.removeEventListener(DragEvents[DragState.moving], onDragging);
    const _client = getClient(event);
    setTransform([0, 0]);
    setDragState(DragState.end);

    // console.log('ORIGIN', ORIGIN);

    setClient((client: Coordinate) => {
        history.push(toPath({
            ORIGIN: [
                ORIGIN[0] + _client[0] - client[0],
                ORIGIN[1] + _client[1] - client[1]
            ]
        }));
        return [NaN, NaN];
    });


    // setClient((client: Coordinate) => {
    //     if (!isNaN(client[0]) && !isNaN(client[1])) {
    //         // ORIGIN =  as Coordinate;
    //         // history.push(toPath({
    //         //     ORIGIN: [
    //         //         ORIGIN[0] + (_client[0] - client[0]),
    //         //         ORIGIN[1] + (_client[1] - client[1])
    //         //     ]
    //         // }));
    //
    //         // console.log('--------------');
    //         // return [NaN, NaN];
    //         // return ORIGIN;
    //
    //         // let ORIGIN;
    //         // setOrigin((origin: Coordinate) => {
    //         //     ORIGIN = [
    //         //         origin[0] + (_client[0] - client[0]),
    //         //         origin[1] + (_client[1] - client[1])
    //         //     ] as Coordinate;
    //         //     // history.push(toPath({ORIGIN}));
    //         //     // console.log('--------------');
    //         //     // return [NaN, NaN];
    //         //     return ORIGIN;
    //         // });
    //     }
    //     return [NaN, NaN];
    // });
};

export const onMoving = (
    setCursor: Dispatch<SetStateAction<Coordinate>>
) => (event: MouseEvent) => {
    setCursor(getClient(event));
};

export const addEventListeners = (
    {onDragStart, onDragEnd}: {
        onDragStart: (event: DragEvent) => void,
        onDragEnd: (event: DragEvent) => void,
    }
): void => {
    window.addEventListener(DragEvents[DragState.start], onDragStart);
    window.addEventListener(DragEvents[DragState.end], onDragEnd);
};

export const removeEventListeners = (
    {onDragStart, onDragEnd}: {
        onDragStart: (event: DragEvent) => void,
        onDragEnd: (event: DragEvent) => void,
    }
): void => {
    window.removeEventListener(DragEvents[DragState.start], onDragStart);
    window.removeEventListener(DragEvents[DragState.end], onDragEnd);

};

export const stopPropagation = {
    [JSXDragEvents[DragState.start]]: (event: Event) => event.stopPropagation(),
    // [JSXDragEvents[DragState.moving]]: (event: Event) => event.stopPropagation(),
    [JSXDragEvents[DragState.end]]: (event: Event) => event.stopPropagation(),
    onClick: (event: SyntheticEvent) => event.stopPropagation()
};


export interface Params {
    ZOOM_INDEX: string;
    ORIGIN: string;
    SHOW_COORDINATE: string;
    SMOOTH: string;
    IS_BOLD: string;
    EQUATIONS: string;
}

export interface ConvertedParams {
    ZOOM_INDEX: number;
    ORIGIN: Coordinate;
    SHOW_COORDINATE: boolean;
    SMOOTH: boolean;
    IS_BOLD: boolean;
    EQUATIONS: Equation[];
}

export function decodeParams(params: Params): ConvertedParams {
    console.log(moment().format(), 'decodeParams', params);
    const ZOOM_INDEX = normalizeZoomIndex(parseInt(params.ZOOM_INDEX));
    const ORIGIN = params.ORIGIN.split('+').map<number>(parseFloat) as Coordinate;

    const SHOW_COORDINATE = params.SHOW_COORDINATE === 'on';
    const SMOOTH = params.SMOOTH === 'on';
    const IS_BOLD = params.IS_BOLD === 'on';
    return {
        ZOOM_INDEX,
        ORIGIN,
        SHOW_COORDINATE,
        SMOOTH,
        IS_BOLD,
        EQUATIONS: []
    };
}

export function encodeParams(params: ConvertedParams): Params {
    const ZOOM_INDEX = params.ZOOM_INDEX.toString();
    const ORIGIN = params.ORIGIN.join('+');
    console.log('ZOOM_INDEX', ZOOM_INDEX);
    const SHOW_COORDINATE = params.SHOW_COORDINATE ? 'on' : 'off';
    const SMOOTH = params.SMOOTH ? 'on' : 'off';
    const IS_BOLD = params.IS_BOLD ? 'on' : 'off';
    return {
        ZOOM_INDEX,
        ORIGIN,
        SHOW_COORDINATE,
        SMOOTH,
        IS_BOLD,
        EQUATIONS: '---'
    };
}

export const paramsToPath = (params: Params, param: Partial<ConvertedParams>): string => {
    const {
        ZOOM_INDEX,
        ORIGIN,
        SHOW_COORDINATE,
        SMOOTH,
        IS_BOLD,
        EQUATIONS
    } = encodeParams({...decodeParams(params), ...param});
    return `/${ZOOM_INDEX}/${ORIGIN}/${SHOW_COORDINATE}/${SMOOTH}/${IS_BOLD}/${EQUATIONS}`;
};

export function normalizeZoomIndex(zoomIndex: number, offset?: -1 | 1): number {
    if (typeof offset === 'undefined') {
        return ZoomRange[zoomIndex] ? zoomIndex : 7;
    }
    return ZoomRange[zoomIndex + offset] ? zoomIndex + offset : zoomIndex;
}
