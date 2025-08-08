import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { CountryService } from '../../services/country.service';

import { NotFoundComponent } from "../../../shared/components/not-found/not-found.component";
import { LoadingComponent } from "../../../shared/components/loading/loading.component";
import { CountryInformationPageComponent } from "./country-information-page/country-information-page.component";

@Component({
  selector: 'app-code-country-page',
  imports: [NotFoundComponent, LoadingComponent, CountryInformationPageComponent],
  templateUrl: './code-country-page.component.html',
})
export class CodeCountryPageComponent {

  public countryService = inject(CountryService);
  public countryCode = inject(ActivatedRoute).snapshot.params['countryCode'];

  public countryResource = rxResource({
    request: () => ({ countryCode: this.countryCode }),
    loader: ({ request }) => this.countryService.searchCountryByAlphaCode(request.countryCode),
  });

}
