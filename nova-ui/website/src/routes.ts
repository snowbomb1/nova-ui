import { RouteProps } from 'react-router-dom';

import HomePage from './pages/home';
import BoxPlayground from './pages/boxPlayground';
import TooltipPlayground from './pages/tooltipPlayground';
import ViewerPlayground from './pages/viewerPlayground';


export const routes: RouteProps[] = [
    { path: '/', Component: HomePage },
    { path: '/Box', Component: BoxPlayground },
    { path: '/Tooltip', Component: TooltipPlayground },
    { path: '/Viewer', Component: ViewerPlayground }
]