import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));

fetch('/assets/config.json')
  .then(response => response.json())
  .then(config => {
    (window as any)['runtimeConfig'] = config;
    return bootstrapApplication(AppComponent, appConfig);
  })
  .catch(err => {
    console.error('Failed to load runtime config:', err);
    return bootstrapApplication(AppComponent, appConfig);
  });
