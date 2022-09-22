import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { AppModule } from './app/app.module'
import { ConfigService } from './app/services/config/config.service'
import { environment } from './environments/environment'

const { search, origin } = window.location

ConfigService.gqlServer = search.startsWith('?gql=') ? decodeURIComponent(search.substring(5)) : origin

if (environment.production) {
    enableProdMode()
}

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err))
