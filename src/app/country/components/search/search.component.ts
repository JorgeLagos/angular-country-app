import { Component, input, output } from '@angular/core';

@Component({
  selector: 'country-search',
  imports: [],
  templateUrl: './search.component.html',
})
export class SearchComponent {

  public placeholder = input<string>('Buscar');
  public value = output<string>();

}
