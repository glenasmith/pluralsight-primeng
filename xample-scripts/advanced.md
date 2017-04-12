
# Advanced Topics


## Non-visual Components: Drag and Drop

First import the module:

    import {DragDropModule} from 'primeng/primeng';
    
Make the panel droppable by adding a pDroppable label (eg `pic` in my place - I'll tag the pDraggable to match). Also add an event handler:
    
    <p-panel header="My Profile Pic" styleClass="profilePic" class="ui-g-12 ui-md-8" pDroppable="pic" (onDrop)="onPicDrop()">
    
Conditionally display the dropped image (if we have one):

      <img *ngIf="profileImage; else showDropDiv" [src]="profileImage" class="ui-g-12 ui-md-6"/>
      
          <ng-template #showDropDiv>
            <span id="drop-message" class="ui-g-12 ui-md-6">Drop Your Image Here</span>
          </ng-template>

But how to select the image?

## Using the Galleria

Let's create a galleria with some backing images.

      <p-galleria  #galleria [images]="images" panelWidth="300" panelHeight="298" class="ui-g-12 ui-md-4" [showCaption]="true"
              (onDragStart)="onDragStart(galleria)"
              pDraggable="pic" dragHandle=".ui-panel-images" ></p-galleria>

It will need some backing image. Let's mock some up. We'll need a src, a title, and an alt.

       private images = [
          {source: "http://i.pravatar.cc/300?u=Anne", title: "Anne"},
          {source: "http://i.pravatar.cc/300?u=Kerri", alt: "Profile Pic 2", title: "Kerri"},
          {source: "http://i.pravatar.cc/300?u=Mary", alt: "Profile Pic 3", title: "Mary"},
          {source: "http://i.pravatar.cc/300?u=Nancy", alt: "Profile Pic 4", title: "Nancy"},
          {source: "http://i.pravatar.cc/300?u=Peta", alt: "Profile Pic 5", title: "Peta"},
        ]


We'll mark the galleria draggable:

    pDraggable="pic"
    
But now the whole thing is draggable. We just want the current image draggable:
    
    dragHandle=".ui-panel-images"
    
That looks great. But we need be able to find the image the user clicks on. That's available in an event called:

      (onImageClicked)="onImageSelected($event)"

But it fires too late for our drag and drop!

We'll listen in on onDragStart, but pass it a handle to the galleria component. There must be some way to find out the active image to display from there.

      <p-galleria  #galleria ... (onDragStart)="onDragStart(galleria)"
                    pDraggable="pic" dragHandle=".ui-panel-images" ></p-galleria>

## Inside the Black Box: Diving into PrimeNG SRC

Let's side track into the [source](https://github.com/primefaces/primeng).

First. Don't be intimidated! Just find the Git label for the release you're using, and you're underway. 

Now, look the @Input properties.

And the @Output event emitters.

And the template names can be handy too. 

These guys tell you everything that's public for setting and listening.

activeIndex looks promising! But it never gets checked after startup - and it's then an interval that's firing.

But I notice below that a stopSlideshow() method. That's just what I need!

But how to call it?

Just use a local variable to the galleria (or a @ViewChild if you prefer).


      <p-galleria  #galleria ... (onDragStart)="onDragStart(galleria)"
              pDraggable="pic" dragHandle=".ui-panel-images" ></p-galleria>

Then we can implement our onDragStart() to stop the slideshow on dragging:

      onDragStart(galleria) {
        console.log(galleria);
        this.selectedProfile = this.images[galleria.activeIndex];
        galleria.stopSlideshow();
      }

Which means that we now have the selected photo, so we can implement the drop!

    onPicDrop() {
        this.profileImage = this.selectedProfile.source;
        this.messages.push({ severity: "info", summary: "New Profile", detail: `Changed pic to ${this.selectedProfile.title }` });
      }

And we have drag and drop!

## Debugging?

Show how to set breakpoints 


Now on to Unit Testing!

## Unit Testing PrimeNG Components




## Where to from here?

There's still plenty of components to play with. Start a plunker and get going!

And chime in on the discussion below to let me know what you're building! I love seeing hobby projects!
