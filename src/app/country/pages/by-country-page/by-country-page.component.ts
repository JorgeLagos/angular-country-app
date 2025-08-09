import { Component, inject, linkedSignal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { SearchComponent } from '../../components/search/search.component';
import { ListComponent } from '../../components/list/list.component';

import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchComponent, ListComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {

  public countryService = inject(CountryService);

  public activatedRoute = inject(ActivatedRoute);
  public router = inject(Router);
  public queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';
  public query = linkedSignal(() => this.queryParam);

  public countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      if (!request.query) return of([]);

      this.router.navigate(['/country/by-country'], {
        queryParams: { query: request.query }
      });

      return this.countryService.searchByCountry(request.query);
    },
  });

  // Ejemplo 1: con promesas
  // public countryResource = resource({
  //   request: () => ({ query: this.query() }),
  //   loader: async({ request }) => {
  //     console.log({ request });
  //     if (!request.query) return [];

  //     return await firstValueFrom(
  //       this.countryService.searchByCountry(request.query)
  //     )
  //   },
  // });

}
