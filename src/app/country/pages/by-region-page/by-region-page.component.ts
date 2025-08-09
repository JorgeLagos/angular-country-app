import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

import { ListComponent } from '../../components/list/list.component';

import { CountryService } from '../../services/country.service';

import type { Region } from '../../types/region.type';

@Component({
  selector: 'app-by-region-page',
  imports: [ListComponent],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  public countryService = inject(CountryService);
  public selectedRegion = signal<Region | null>(null);

  // public selectRegion(region: Region) {
  //   this.selectedRegion.set(region);
  // }

  public countryResource = rxResource({
    request: () => ({ region: this.selectedRegion() }),
    loader: ({ request }) => {
      if (!request.region) return of([]);
      return this.countryService.searchByRegion(request.region);
    },
  });

}
