import { Component } from '@angular/core';

declare var jQuery: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'jQuery works!';

  items = [
    {label: 'Toggle', icon: 'fa-refresh', command: () => {
      this.onToggle();
    }},
    {label: 'Toggle Again', icon: 'fa-close', command: () => {
      this.onToggle();
    }},
    {label: 'Angular.io', icon: 'fa-link', url: 'http://angular.io'},
    /*
    {label: 'Theming', icon: 'fa-paint-brush', routerLink: ['/theming']}
    */
    ]

  onToggle() {
    jQuery('.ui.sidebar').sidebar('setting', 'transition', 'push').sidebar('toggle');
  }

}
