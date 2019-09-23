import React, {Dispatch, SetStateAction} from 'react';
import {ZoomInButton, ZoomLevelButton, ZoomOutButton, ZoomPanelWrapper} from './ZoomPanel.style';
import clamp from 'lodash/clamp';
import {stopPropagation} from "./App.function";

interface ZoomPanelProps {
    zoom: number;
    setZoom: Dispatch<SetStateAction<number>>
}

export const ZoomPanel = (props: ZoomPanelProps) => {
    const {zoom, setZoom} = props;
    return (
        <ZoomPanelWrapper>
            <ZoomInButton
                title="Zoom In"
                {...{stopPropagation}}
                onClick={() => setZoom(zoom => clamp(zoom + 1, 1, 16))}>Zoom In</ZoomInButton>
            <ZoomOutButton
                title="Zoom Out"
                {...{stopPropagation}}
                onClick={() => setZoom(zoom => clamp(zoom - 1, 1, 16))}>Zoom Out</ZoomOutButton>
            <ZoomLevelButton level={zoom - 1} title={`x${zoom}`}>{`x${zoom}`}</ZoomLevelButton>
        </ZoomPanelWrapper>
    );
};


