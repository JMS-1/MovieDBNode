import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { GraphQLModule } from './graphql.module'
import { ConfigService } from './services/config/config.service'
import { ErrorService } from './services/error/error.service'
import { LanguageService } from './services/languages/language.service'
import { RecordingService } from './services/recordings/recording.service'

@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, GraphQLModule, HttpClientModule],
    providers: [ConfigService, RecordingService, ErrorService, LanguageService],
})
export class AppModule {}
