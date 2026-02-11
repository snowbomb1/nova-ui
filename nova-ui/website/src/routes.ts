import { RouteProps } from 'react-router-dom';

import HomePage from './pages/home';
import ViewerPlayground from './pages/viewerPlayground';


export const routes: RouteProps[] = [
    { path: '/', Component: HomePage },
    { path: '/Viewer', Component: ViewerPlayground }
]