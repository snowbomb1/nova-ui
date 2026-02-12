import { RouteProps } from 'react-router-dom';

import HomePage from './pages/home';
import BoxPlayground from './pages/boxPlayground';
import ButtonPlayground from './pages/buttonPlayground';
import TogglePlayground from './pages/togglePlayground';
import TooltipPlayground from './pages/tooltipPlayground';
import TopNavPlayground from './pages/topnavPlayground';
import ViewerPlayground from './pages/viewerPlayground';


export const routes: RouteProps[] = [
    { path: '/', Component: HomePage },
    { path: '/box', Component: BoxPlayground },
    { path: '/button', Component: ButtonPlayground },
    { path: '/toggle', Component: TogglePlayground },
    { path: '/tooltip', Component: TooltipPlayground },
    { path: '/topnav', Component: TopNavPlayground },
    { path: '/viewer', Component: ViewerPlayground }
]