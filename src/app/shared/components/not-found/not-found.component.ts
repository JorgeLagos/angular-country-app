import { Component, input } from '@angular/core';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent {

  public errorMessage = input.required<string|unknown|null>();

}
