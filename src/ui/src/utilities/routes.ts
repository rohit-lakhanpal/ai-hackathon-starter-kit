import Home from "../pages/Home";
import Transcribe from "../pages/Transcribe";
import Analyse from "../pages/Analyse";
import Speak from "../pages/Speak";
import About from "../pages/About";
import Complete from "../pages/Complete";
import Chat from "../pages/Chat";
import Error from "../pages/Error";

// other
import {FC} from "react";

// interface
interface Route {
    key: string,
    title: string,
    path: string,
    enabled: boolean,
    component: FC<any>,
    exact?: boolean
}

export const routes: Array<Route> = [
    {
        key: 'home-route',
        title: 'Home',
        path: '/',
        enabled: true,
        component: Home,
        exact: true         
    },        
    {
        key: 'transcribe-route',
        title: 'Transcribe',
        path: '/transcribe',
        enabled: true,
        component: Transcribe,
        exact: true
    },
    {
        key: 'speak-route',
        title: 'Speak',
        path: '/speak',
        enabled: true,
        component: Speak,
        exact: true
    },
    {
        key: 'analyse-route',
        title: 'Analyse',
        path: '/analyse',
        enabled: true,
        component: Analyse,
        exact: true
    },
    {
        key: 'chat-route',
        title: 'Chat',
        path: '/chat',
        enabled: true,
        component: Chat        
    },
    {
        key: 'complete-route',
        title: 'Complete',
        path: '/complete',
        enabled: true,
        component: Complete
    },
    {
        key: 'about-route',
        title: 'About',
        path: '/about',
        enabled: true,
        component: About
    },
    {
        key: 'error-route',
        title: 'Error',
        path: '*',    
        enabled: false,    
        component: Error
    }
];

