import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const DashboardDefault = React.lazy(() => import('./Demo/Dashboard/Default'));


const FormsElements = React.lazy(() => import('./Demo/Forms/FormsElements'));

const BootstrapTable = React.lazy(() => import('./Demo/Tables/BootstrapTable'));

const OtherSamplePage = React.lazy(() => import('./Demo/Other/SamplePage'));

const ProfilePage = React.lazy(() => import('./Demo/Profilepage/ProfilePage'));

const AdminPage = React.lazy(() => import('./Demo/AdminPage/AdminPage'));

const routes = [
    { path: '/dashboard/default', exact: true, name: 'Default', component: DashboardDefault },
    { path: '/forms/form-basic', exact: true, name: 'Forms Elements', component: FormsElements },
    { path: '/tables/bootstrap', exact: true, name: 'Bootstrap Table', component: BootstrapTable },
    { path: '/sample-page', exact: true, name: 'Sample Page', component: OtherSamplePage },
    { path: '/profile', exact: true, name: 'Profile', component: ProfilePage },
    { path: '/admin', exact: true, name: 'Admin', component: AdminPage },
    
];

export default routes;