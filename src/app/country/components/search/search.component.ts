import { Component, effect, input, output, signal } from '@angular/core';
import { timeout } from 'rxjs';

@Component({
  selector: 'country-search',
  imports: [],
  templateUrl: './search.component.html',
})
export class SearchComponent {

  public placeholder = input<string>('Buscar');
  public value = output<string>();

  public inputValue = signal<string>('');

  public dibounceEffect = effect((onCleanup) => {
    const value = this.inputValue();
    const timeout = setTimeout(() => { this.value.emit(value) }, 500);

    onCleanup(() => clearTimeout(timeout));
  });

}
