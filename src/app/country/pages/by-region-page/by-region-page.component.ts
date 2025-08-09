import { Component, inject, linkedSignal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { ListComponent } from '../../components/list/list.component';

import { CountryService } from '../../services/country.service';

import type { Region } from '../../types/region.type';

const validQueryParam = (queryParam: string): Region => {
  queryParam = queryParam.toLowerCase();

  const validRegions: Record<string, Region> = {
    africa: 'Africa',
    americas: 'Americas',
    asia: 'Asia',
    europe: 'Europe',
    oceania: 'Oceania',
    antarctic: 'Antarctic',
  }

  return validRegions[queryParam] ?? 'Africa';
}

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

  public activatedRoute = inject(ActivatedRoute);
  public router = inject(Router);
  public queryParam = this.activatedRoute.snapshot.queryParamMap.get('region') ?? '';
  public selectedRegion = linkedSignal<Region>(() => validQueryParam(this.queryParam));

  public countryResource = rxResource({
    request: () => ({ region: this.selectedRegion() }),
    loader: ({ request }) => {
      if (!request.region) return of([]);

      this.router.navigate(['/country/by-region'], {
        queryParams: { region: request.region }
      });

      return this.countryService.searchByRegion(request.region);
    },
  });

}
