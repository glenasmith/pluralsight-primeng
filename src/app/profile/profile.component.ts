import { Component, OnInit } from '@angular/core';
import {Message} from "primeng/primeng";

@Component({
  selector: 'at-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private images = [
    {source: "http://i.pravatar.cc/300?u=Anne", alt: "Profile Pic 1"},
    {source: "http://i.pravatar.cc/300?u=Tina", alt: "Profile Pic 2"},
    {source: "http://i.pravatar.cc/300?u=Mary", alt: "Profile Pic 3"},
    {source: "http://i.pravatar.cc/300?u=Sue", alt: "Profile Pic 4"},
    {source: "http://i.pravatar.cc/300?u=Nina", alt: "Profile Pic 5"},
  ]

  private profileImage : string;
  private selectedProfile : any;

  private messages: Message[] = [];

  constructor() { }

  ngOnInit() {
  }

  onPicDrop(evt) {
    console.log(JSON.stringify(evt));
    this.profileImage = this.selectedProfile.source;
    this.messages.push({ severity: "info", summary: "New Profile", detail: `Changed pic to ${this.selectedProfile.alt }` });
  }

  onDragStart(galleria) {
    console.log(galleria);
    this.selectedProfile = this.images[galleria.activeIndex];
    galleria.stopSlideshow();
  }


  onImageSelected(evt) {
    console.log(JSON.stringify(evt));
    console.log(evt.image);
  }

}
