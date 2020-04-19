import { getMessage } from '@jms-1/isxs-tools'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getGraphQlError(error: any): string {
    const gql: Error[] = error.graphQLErrors

    if (Array.isArray(gql) && gql.length > 0) {
        return gql.map((e) => e.message).join('; ')
    }

    return getMessage(error)
}
