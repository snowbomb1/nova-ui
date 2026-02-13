import { RouteProps } from 'react-router-dom';

import HomePage from './pages/home';

// Playgrounds
// import ApplayoutPlayground from './pages/applayoutPlayground';
import BoxPlayground from './pages/boxPlayground';
import ButtonPlayground from './pages/buttonPlayground';
import FormFieldPlayground from './pages/formFieldPlayground';
import HeaderPlayground from './pages/headerPlayground';
import InputPlayground from './pages/inputPlayground';
import ModalPlayground from './pages/modalPlayground';
import SelectPlayground from './pages/selectPlayground';
import SideNavPlayground from './pages/sidenavPlayground';
import StepperPlayground from './pages/stepperPlayground';
import ToastPlayground from './pages/toastPlayground';
import TogglePlayground from './pages/togglePlayground';
import TooltipPlayground from './pages/tooltipPlayground';
import TopNavPlayground from './pages/topnavPlayground';
import ViewerPlayground from './pages/viewerPlayground';


export const routes: RouteProps[] = [
    { path: '/', Component: HomePage },
    // { path: '/appLayout', Component: ApplayoutPlayground },
    { path: '/box', Component: BoxPlayground },
    { path: '/button', Component: ButtonPlayground },
    { path: '/formField', Component: FormFieldPlayground },
    { path: '/header', Component: HeaderPlayground },
    { path: '/input', Component: InputPlayground },
    { path: '/modal', Component: ModalPlayground },
    { path: '/select', Component: SelectPlayground },
    { path: '/sideNav', Component: SideNavPlayground },
    { path: '/stepper', Component: StepperPlayground },
    { path: '/toast', Component: ToastPlayground },
    { path: '/toggle', Component: TogglePlayground },
    { path: '/tooltip', Component: TooltipPlayground },
    { path: '/topNav', Component: TopNavPlayground },
    { path: '/viewer', Component: ViewerPlayground }
]