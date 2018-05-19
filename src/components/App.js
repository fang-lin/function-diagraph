import React, { Component } from 'react';
import { observer } from 'mobx-react';
import debounce from 'lodash/debounce';
import { app, drag_start, dragging } from './App.css';
import PreloadImages from './PreloadImages';
import Stage from './Stage';
import StateBar from './StateBar';
import CrossLine from './CrossLine';
import ViewPanel from './ViewPanel';
import ZoomPanel from './ZoomPanel';
import { DRAG_EVENTS, getClientXY } from '../utilities';

export default observer(class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cursor: null,
      isDragging: false,
    };
  }

  updateStageRect = () => {
    this.props.stage.updateStageRect(this.refs.app.getBoundingClientRect());
  };

  onDragStart = event => {
    this.setState({
      cursor: getClientXY(event)
    });
    window.addEventListener(DRAG_EVENTS.MOVE, this.onDragging);
  };

  onDragging = event => {
    const { clientX, clientY } = getClientXY(event);
    this.props.stage.updateTransform(clientX - this.state.cursor.clientX, clientY - this.state.cursor.clientY);
    this.setState({ isDragging: true });
  };

  onDragEnd = event => {
    window.removeEventListener(DRAG_EVENTS.MOVE, this.onDragging);
    const { stage, equations } = this.props;
    const { originX, originY } = stage;
    const { clientX, clientY } = getClientXY(event);
    stage.updateOrigin(
      originX + (clientX - this.state.cursor.clientX),
      originY + (clientY - this.state.cursor.clientY)
    );
    stage.updateTransform(0, 0);
    equations.redraw();
    this.setState({ cursor: null, isDragging: false });
  };

  componentDidMount() {
    this.updateStageRect();

    const { originX, originY, updateOriginInCenter } = this.props.stage;
    const { updateCursor } = this.props.states;
    isNaN(originX) && isNaN(originY) && updateOriginInCenter();

    window.addEventListener('resize', debounce(this.updateStageRect, 200));
    window.addEventListener(DRAG_EVENTS.START, this.onDragStart);
    window.addEventListener(DRAG_EVENTS.END, this.onDragEnd);

    window.addEventListener('mousemove', event => {
      const { clientX, clientY } = getClientXY(event);
      updateCursor(clientX, clientY);
    });
  }

  render() {
    const { states, stage, equations } = this.props;
    const { cursor, isDragging } = this.state;
    const { showCoord } = states;
    return <div className={ `${app} ${cursor ? (isDragging ? dragging : drag_start) : ''}` } ref="app">
      <PreloadImages/>
      <Stage { ...{ states, stage, equations } }/>
      { showCoord && <CrossLine { ...{ states, stage } }/> }
      <StateBar/>
      <ViewPanel { ...{ states, stage } }/>
      <ZoomPanel { ...{ stage } }/>
    </div>
  }
});

