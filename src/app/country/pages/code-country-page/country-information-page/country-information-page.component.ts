import { Component, computed, input } from '@angular/core';
import type { Country } from '../../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-country-information-page',
  imports: [DecimalPipe],
  templateUrl: './country-information-page.component.html',
})
export class CountryInformationPageComponent {

  public country = input.required<Country>();
  public currentYear = computed(() => new Date().getFullYear())

}
