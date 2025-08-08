import type { Country } from '../interfaces/country.interface';
import type { RestCountry } from '../interfaces/rest-countries/rest-countries.interface';

export class CountryMapper {

  static mapRestCountryToCountry(restCountry: RestCountry): Country {
    return {
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      name: restCountry.translations['spa'].common ?? 'No spanish name',
      capital: restCountry.capital.join(','),
      population: restCountry.population,
      region: restCountry.region,
      subregion: restCountry.subregion,
    }
  }

  static mapRestCountryArrayToCountryArray(restCountry: RestCountry[]): Country[] {
    return restCountry.map(country => this.mapRestCountryToCountry(country));
  }

}
