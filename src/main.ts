import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { Listing } from './app/pages/listing/listing';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
