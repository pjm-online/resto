import { Injectable } from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  {
    id: 'navigation',
    title: 'HONE',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/dashboard',
        icon: 'feather icon-home',
        classes: 'nav-item'
      }
    ]
  },
  {
    id: 'store',
    title: 'Store Branch',
    type: 'group',
    icon: 'icon-info',
    children: [
      {
        id: 'brnach1',
        title: 'Angeles City',
        type: 'item',
        url: '/dashboard1',
        icon: 'feather icon-globe',
        classes: 'nav-item'
      },
      {
        id: 'brnach1',
        title: 'SM Pampanga',
        type: 'item',
        url: '/dashboard2',
        icon: 'feather icon-globe',
        classes: 'nav-item'
      }
    ]
  },
  {
    id: 'ui-element',
    title: 'Reports',
    type: 'group',
    icon: 'icon-ui',
    children: [
      {
        id: 'report',
        title: 'Report',
        type: 'collapse',
        icon: 'feather icon-list',
        children: [
          {
            id: 'report1',
            title: 'Daily Sales',
            type: 'item',
            url: '/report/view/1',
            hidden: true
          },
          {
            id: 'report2',
            title: 'Weekly Sales',
            type: 'item',
            url: '/report/view/2',
            hidden: true
          },
          {
            id: 'report3',
            title: 'Monthly Sales',
            type: 'item',
            url: '/report/view/3',
            hidden: true
          },
          {
            id: 'report4',
            title: 'Yearly Sales',
            type: 'item',
            url: '/report/view/4',
            hidden: true
          },
          {
            id: 'report5',
            title: 'Sales Report',
            type: 'item',
            url: '/report/sales'
          }
        ]
      }
    ]
  },
  {
    id: 'pages',
    title: 'Pages',
    type: 'group',
    icon: 'icon-pages',
    hidden: true,
    children: [
      {
        id: 'auth',
        title: 'Authentication',
        type: 'collapse',
        icon: 'feather icon-lock',
        children: [
          {
            id: 'signup',
            title: 'Sign up',
            type: 'item',
            url: '/auth/signup',
            target: true,
            breadcrumbs: false
          },
          {
            id: 'signin',
            title: 'Sign in',
            type: 'item',
            url: '/auth/signin',
            target: true,
            breadcrumbs: false
          }
        ]
      },
      {
        id: 'my-profile-page',
        title: 'My Profile',
        type: 'item',
        url: '/my-profile',
        classes: 'nav-item',
        icon: 'feather icon-sidebar'
      }
    ]
  }
];

@Injectable()
export class NavigationItem {
  get() {
    return NavigationItems;
  }
}
