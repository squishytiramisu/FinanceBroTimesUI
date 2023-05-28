export default {
    items: [
        {
            id: 'navigation',
            title: 'Navigation',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'dashboard',
                    title: 'Dashboard',
                    type: 'item',
                    url: '/dashboard/default',
                    icon: 'feather icon-home',
                },
                {
                    id: 'sample-page',
                    title: 'Blog',
                    type: 'item',
                    url: '/sample-page',
                    classes: 'nav-item',
                    icon: 'feather icon-sidebar'
                },
                // {
                //     id: 'users-page',
                //     title: 'Finance Bros',
                //     type: 'item',
                //     url: '/users',
                //     classes: 'nav-item',
                //     icon: 'feather icon-users'
                // },
            ]
        },
        {
            id: 'ui-forms',
            title: 'Stocks & Portfolio',
            type: 'group',
            icon: 'icon-group',
            children: [
                {
                    id: 'form-basic',
                    title: 'My Portfolio',
                    type: 'item',
                    url: '/forms/form-basic',
                    icon: 'feather icon-file-text'
                },
                {
                    id: 'bootstrap',
                    title: 'Buy Stocks',
                    type: 'item',
                    icon: 'feather icon-server',
                    url: '/tables/bootstrap'
                }
            ]
        },
        {
            id: 'admin',
            title: 'Admin',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'admin-page',
                    title: 'Admin',
                    type: 'item',
                    url: '/admin',
                    classes: 'nav-item',
                    icon: 'feather icon-user-check'
                }
            ]
        },
        {
            id: 'pages',
            title: 'Other',
            type: 'group',
            icon: 'icon-pages',
            children: [
                {
                    id: 'auth',
                    title: 'Authentication',
                    type: 'collapse',
                    icon: 'feather icon-lock',
                    children: [
                        {
                            id: 'signup-1',
                            title: 'Sign up',
                            type: 'item',
                            url: '/auth/signup-1',
                            target: false,
                            breadcrumbs: false
                        },
                        {
                            id: 'signin-1',
                            title: 'Sign in',
                            type: 'item',
                            url: '/auth/signin-1',
                            target: false,
                            breadcrumbs: false
                        }
                    ]
                },
            ]
        }
        
    ]
}