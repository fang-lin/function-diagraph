import {render} from 'react-dom';
import React from 'react';
import {Redirect, Route, Router, Switch} from 'react-router';
import {createHashHistory} from 'history';
import {Plotter} from './pages/Plotter';
import {combinePathToURL, defaultParams, Page, routerPath} from './helpers';
import {Home} from './pages/Home';

const dom = document.getElementById('root');

if (dom) {
    const history = createHashHistory();
    render(<Router {...{history}}>
        <Switch>
            <Route path={routerPath()} component={Plotter} exact/>
            <Route path={Page.home} component={Home} exact/>
            <Redirect from={Page.plotter} to={combinePathToURL(defaultParams)}/>
            <Redirect to={Page.home}/>
        </Switch>
    </Router>, dom);
}
