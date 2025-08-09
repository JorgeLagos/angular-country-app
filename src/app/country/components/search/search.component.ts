import { Component, effect, input, linkedSignal, output } from '@angular/core';

@Component({
  selector: 'country-search',
  imports: [],
  templateUrl: './search.component.html',
})
export class SearchComponent {

  public placeholder = input<string>('Buscar');
  public initialValue = input<string>();
  public value = output<string>();

  public inputValue = linkedSignal<string>(() => this.initialValue() ?? '');

  public dibounceEffect = effect((onCleanup) => {
    const value = this.inputValue();
    const timeout = setTimeout(() => { this.value.emit(value) }, 300);

    onCleanup(() => clearTimeout(timeout));
  });

}
