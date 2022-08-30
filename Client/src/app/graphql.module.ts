import { NgModule } from '@angular/core'
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core'
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular'
import { HttpLink } from 'apollo-angular/http'

import { ConfigService } from './services/config/config.service'

export function createApollo(httpLink: HttpLink, config: ConfigService): ApolloClientOptions<unknown> {
    return {
        cache: new InMemoryCache(),
        defaultOptions: { query: { fetchPolicy: 'no-cache' } },
        link: httpLink.create({ uri: `${config.server}/graphql` }),
    }
}

@NgModule({
    exports: [ApolloModule],
    providers: [{ deps: [HttpLink, ConfigService], provide: APOLLO_OPTIONS, useFactory: createApollo }],
})
export class GraphQLModule {}
