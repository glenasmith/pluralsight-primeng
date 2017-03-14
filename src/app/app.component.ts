import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {MenuItem} from "primeng/primeng";
import {Menu} from "primeng/components/menu/menu";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private menuItems: MenuItem[];
  private miniMenuItems: MenuItem[];

  @ViewChild('bigMenu') bigMenu : Menu;
  @ViewChild('smallMenu') smallMenu : Menu;

  constructor(private router : Router) {

  }

  ngOnInit() {

    let handleSelected = function(event) {
      let allMenus = event.originalEvent.target.closest('ul');
      let allLinks = allMenus.getElementsByClassName('menu-selected');

      for (var i = 0; i < allLinks.length; i++) {
        allLinks[i].classList.remove('menu-selected')
      }

      let selected = event.originalEvent.target.closest('a');
      selected.classList.add('menu-selected');

    }

    this.menuItems = [
      {label: 'Dashboard', icon: 'fa-home', routerLink: ['/dashboard'], command: (event) => handleSelected(event)},
      {label: 'My Timesheets', icon: 'fa-calendar', routerLink: ['/timesheets'], command: (event) => handleSelected(event)},
      {label: 'My Projects', icon: 'fa-tasks', routerLink: ['/projects'], command: (event) => handleSelected(event)},
      {label: 'My Team', icon: 'fa-users', routerLink: ['/dashboard']},
      {label: 'Settings', icon: 'fa-sliders', routerLink: ['/dashboard']},
    ]

    this.miniMenuItems = [];
    this.menuItems.forEach( (item : MenuItem) => {
      let miniItem = { icon: item.icon, routerLink: item.routerLink }
      this.miniMenuItems.push(miniItem);
    })

  }

  selectInitialMenuItemBasedOnUrl() {
    let path = document.location.pathname;
    let menuItem = this.menuItems.find( (item) => { return item.routerLink[0] == path });
    if (menuItem) {
      let selectedIcon = this.bigMenu.container.querySelector(`.${menuItem.icon}`);
      selectedIcon.closest('li').classList.add('menu-selected');
    }
  }

  ngAfterViewInit() {
    this.selectInitialMenuItemBasedOnUrl();
  }



}
