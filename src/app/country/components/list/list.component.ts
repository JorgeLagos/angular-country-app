import { Component, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import type { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'country-list',
  imports: [DecimalPipe],
  templateUrl: './list.component.html',
})
export class ListComponent {

  public countries = input.required<Country[]>();

}
