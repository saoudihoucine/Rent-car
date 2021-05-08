import { Component, OnInit } from '@angular/core';
import jwt_decode from "jwt-decode";

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
  //{ path: '/user-profile', title: 'User Profile', icon: 'person', class: '' },
  //{ path: '/table-list', title: 'Table List', icon: 'content_paste', class: '' },
  // { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
  //{ path: '/icons', title: 'Icons', icon: 'bubble_chart', class: '' },
  // { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
  //{ path: '/notifications', title: 'Notifications', icon: 'notifications', class: '' },
  { path: '/vehicules', title: 'Gestion des véhicules', icon: 'directions_car', class: '' },
  { path: '/contrats', title: 'Gestion des contarts', icon: 'sticky_note_2', class: '' },
  { path: '/employes', title: 'Gestion des employes', icon: 'group', class: 'invisible' },
  // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    var role = jwt_decode(localStorage.getItem("token"))["login"].role;
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    if (role === 'Admin') {
      this.menuItems[3].class = '';
    }else{
      this.menuItems[3].class = 'invisible';
    }
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };
}
