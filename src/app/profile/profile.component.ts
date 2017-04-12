import { Component, OnInit } from '@angular/core';
import {Message} from "primeng/primeng";

@Component({
  selector: 'at-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private images = [
    {source: "http://i.pravatar.cc/300?u=Anne", title: "Anne"},
    {source: "http://i.pravatar.cc/300?u=Kerri", title: "Kerri"},
    {source: "http://i.pravatar.cc/300?u=Mary", title: "Mary"},
    {source: "http://i.pravatar.cc/300?u=Nancy", title: "Nancy"},
    {source: "http://i.pravatar.cc/300?u=Peta", title: "Peta"},
  ]

  profileImage : string;

  private selectedProfile : any;

  private messages: Message[] = [];

  constructor() { }

  ngOnInit() {
  }

  onPicDrop() {
    this.profileImage = this.selectedProfile.source;
    this.messages.push({ severity: "info", summary: "New Profile", detail: `Changed pic to ${this.selectedProfile.title }` });
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
