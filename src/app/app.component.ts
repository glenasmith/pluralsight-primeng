import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {MenuItem} from "primeng/primeng";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private menuItems: MenuItem[];
  private miniMenuItems: MenuItem[];

  constructor() {
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
      {label: 'My Projects', icon: 'fa-tasks', routerLink: ['/dashboard']},
      {label: 'My Team', icon: 'fa-users', routerLink: ['/dashboard']},
      {label: 'Settings', icon: 'fa-sliders', routerLink: ['/dashboard']},
    ]

    this.miniMenuItems = [];
    this.menuItems.forEach( (item : MenuItem) => {
      let miniItem = { icon: item.icon, routerLink: item.routerLink }
      this.miniMenuItems.push(miniItem);
    })

  }


}
