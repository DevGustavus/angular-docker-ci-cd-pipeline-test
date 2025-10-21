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
      ambiente: environment.ambiente,
      is_production: environment.is_production,
      url_api: environment.url_api,
    });
  }
}
