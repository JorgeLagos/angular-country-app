import { Component } from '@angular/core';

import { SearchComponent } from '../../components/search/search.component';
import { ListComponent } from '../../components/list/list.component';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchComponent, ListComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {

}
