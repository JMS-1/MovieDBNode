import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { GraphQLModule } from './graphql.module'
import { ConfigService } from './services/config/config.service'
import { RecordingsService } from './services/recordings/recordings.service'

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, GraphQLModule, HttpClientModule],
    providers: [ConfigService, RecordingsService],
    bootstrap: [AppComponent],
})
export class AppModule {}
