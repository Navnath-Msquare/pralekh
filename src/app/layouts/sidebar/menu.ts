import { MenuItem } from './menu.model';

export const adminMENU: MenuItem[] = [
  {
    id: 1,
    label: 'Dashboard',
    icon: 'ri-dashboard-2-line',
    link: '/admin/dashboard',
  },
  {
    id: 2,
    label: 'Users',
    icon: 'ri-user-line',
    link: '/admin/users',
  },
  {
    id:6,
    label: 'Services',
    icon: 'ri-file-copy-line',
    subItems: [
      {
        id: 7,
        label: 'Licensing, Support & Consulting',
        link: '/admin/service/private',
        parentId: 6
      },
      {
        id: 8,
        label: 'Individual and B2B Document',
        link: '/admin/service/government',
        parentId: 6
      },
    ]
  },
  {
    id:9,
    label: 'Special Packages',
    icon: 'ri-red-packet-line',
    link: '/admin/special-packages',
  },
  {
    id:9,
    label: 'Subscriptions Plans',
    icon: 'ri-file-list-3-line',
    link: '/admin/plans',
  },
  {
    id:10,
    label: 'Distributors',
    icon: 'ri-store-3-line',
    link: '/admin/distributors',
  },
  {
    id:18,
    label: 'Delivery',
    icon: 'ri-store-3-line',
    link: '/admin/delivery',
  },
  
  {
    id:11,
    label: 'Settings',
    icon: 'ri-settings-5-line',
    subItems: [
      {
        id: 12,
        label: 'Company',
        link: '/admin/settings/company',
        parentId: 11
      },
      {
        id: 12,
        label: 'Banner',
        link: '/admin/settings/banner',
        parentId: 11
      }
    ]
  },
  {
    id:13,
    label: 'Leads',
    icon: 'ri-user-search-line',
    link: '/admin/leads',
  },
  {
    id:14,
    label: 'Service Request',
    icon: 'ri-user-settings-line',
    link: '/admin/enquiry',
  },
  // {
  //   id: 15,
  //   label: 'License',
  //   icon: 'ri-article-line',
  //   link: '/admin/license',
  // },
  {
    id: 16,
    label: 'Members',
    icon: 'ri-group-line',
    link: '/admin/customer',
  },
  {
    id: 17,
    label: 'Area Master',
    icon: 'ri-building-line',
    link: '/admin/area',
  },
  {
    id: 17,
    label: 'Support',
    icon: 'ri-user-voice-line',
    link: '/admin/support',
  },
  {
    id:11,
    label: 'Reports',
    icon: 'ri-settings-5-line',
    subItems: [
      {
        id:19,
        label: 'Delivery Report',
        icon: 'ri-store-2-line',
        link: '/admin/delivery-partner',
      },
    ]
  },
  // {
  //   id:13,
  //   label: 'Engage',
  //   icon: 'ri-money-dollar-box-line',
  //   subItems: [
  //     {
  //       id: 14,
  //       label: 'Push Notifications',
  //       link: '/admin/engage/notifications',
  //       parentId: 13
  //     },
  //     {
  //       id: 15,
  //       label: 'Email',
  //       link: '/admin/engage/notifications',
  //       parentId: 13
  //     },
  //     {
  //       id: 16,
  //       label: 'SMS',
  //       link: '/admin/engage/notifications',
  //       parentId: 13
  //     }
  //   ]
  // }
];

export const companyMENU: MenuItem[] = [
  
];

export const distributorMENU: MenuItem[] = [
  {
    id: 1,
    label: 'Dashboard',
    icon: 'ri-dashboard-2-line',
    link: '/distributor/dashboard',
  },
  {
    id: 3,
    label: 'Own Information',
    icon: 'ri-user-line',
    link: '/distributor/details',
  },
  {
    id: 3,
    label: 'Service Request',
    icon: 'ri-user-settings-line',
    link: '/distributor/enquiry',
  },
  {
    id:6,
    label: 'Services',
    icon: 'ri-file-copy-line',
    subItems: [
      {
        id: 7,
        label: 'Licensing, Support & Consulting',
        link: '/distributor/service/private',
        parentId: 6
      },
      {
        id: 8,
        label: 'Individual and B2B Document',
        link: '/distributor/service/government',
        parentId: 6
      },
    ]
  },
];
