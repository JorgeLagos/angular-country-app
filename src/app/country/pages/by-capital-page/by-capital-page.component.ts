import { Component, inject, resource, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { SearchComponent } from '../../components/search/search.component';
import { ListComponent } from "../../components/list/list.component";

import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchComponent, ListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {

  public countryService = inject(CountryService);
  public query = signal('');

  public countryResource = resource({
    request: () => ({ query: this.query() }),
    loader: async({ request }) => {
      if (!request.query) return [];

      return await firstValueFrom(
        this.countryService.searchByCapital(request.query)
      )
    },
  });

  // public isLoading = signal<boolean>(false);
  // public isError = signal<string | null>(null);
  // public countries = signal<Country[]>([]);

  // public onSearch(query: string) {
  //   if (this.isLoading()) return;

  //   this.isLoading.set(true);
  //   this.isError.set(null);

  //   this.countryService.searchByCapital(query).subscribe({
  //     next: (countries) => {
  //       this.isLoading.set(false);
  //       this.countries.set(countries);
  //     },
  //     error: (error) => {
  //       this.isLoading.set(false);
  //       this.countries.set([]);
  //       this.isError.set(error);
  //     }
  //   });
  // }

}
