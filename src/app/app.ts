import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('angular-docker-ci-cd-pipeline-test');
  protected readonly environment = environment;

  ngOnInit() {
    console.log('App initialized with title:', this.title());
    console.log('Environment:', {
      AMBIENTE: environment.AMBIENTE,
      IS_PRODUCTION: environment.IS_PRODUCTION,
      URL_API: environment.URL_API,
    });
  }
}
