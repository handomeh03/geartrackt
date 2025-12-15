import { Component } from '@angular/core';
import { Header } from './Header';
import { PhotoShot } from './Photoshotreversation';

@Component({
  selector: 'Guest-comp',
  standalone: true,
  template: `
    
   

    <div class="  p-3">
      <PhotoShot-comp />
    </div>
  `,
  imports: [PhotoShot],
})
export class Guest {}
