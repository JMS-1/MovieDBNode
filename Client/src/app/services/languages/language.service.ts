import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { ILanguage, ILanguageFindResult } from 'api'
import { Apollo, gql } from 'apollo-angular'
import { EmptyObject } from 'apollo-angular/types'
import { BehaviorSubject, Observable } from 'rxjs'

import { ErrorService } from '../error/error.service'
import { ValidationService } from '../validation/validation.service'
import { EditableService } from '../workingCopy'

const props = '_id name'

const queryLanguages = gql<{ languages: { find: ILanguageFindResult } }, EmptyObject>(`
  query {
    languages {
      find(page: 1, pageSize: 1000) {
        items {
          ${props}
        }
      }
    }
  }
`)

const addLanguage = gql<{ languages: { add: ILanguage } }, EmptyObject>(`
  mutation ($data: LanguageInput!) {
    languages {
      add(data: $data) {
        ${props}
      }
    }
  }
`)

const updLanguage = gql<{ languages: { update: ILanguage } }, EmptyObject>(`
  mutation ($id: ID!, $data: LanguageUpdate!) {
    languages {
      update(_id: $id, data: $data) {
        ${props}
      }
    }
  }
`)

const delLanguage = gql<{ languages: { delete: ILanguage } }, EmptyObject>(`
  mutation ($id: ID!){
    languages {
      delete(_id: $id) {
        ${props}
      }
    }
  }
`)

@Injectable()
export class LanguageService extends EditableService<ILanguage> {
    protected readonly validationName = 'Language'

    private readonly _query = new BehaviorSubject<Record<string, ILanguage>>({})

    get map(): Observable<Record<string, ILanguage>> {
        return this._query
    }

    protected getCurrentMap(): Record<string, ILanguage> {
        return this._query.value
    }

    constructor(
        private readonly _gql: Apollo,
        validation: ValidationService,
        private readonly _router: Router,
        private readonly _errors: ErrorService
    ) {
        super(validation)

        this.load()
    }

    private load(): void {
        this._errors.serverCall(this._gql.query({ query: queryLanguages }), (data) => {
            this._query.next(
                data.languages.find.items.reduce((m, l) => ((m[l._id] = l), m), {} as Record<string, ILanguage>)
            )

            super.refresh()
        })
    }

    override ngOnDestroy(): void {
        super.ngOnDestroy()

        this._query.complete()
    }

    addOrUpdate(id: string, data: Omit<ILanguage, '_id'>): void {
        if (id) {
            this._errors.serverCall(this._gql.query({ query: updLanguage, variables: { data, id } }), (l) =>
                this.load()
            )
        } else {
            this._errors.serverCall(this._gql.query({ query: addLanguage, variables: { data, id } }), (l) => {
                this._router.navigate(['language', l.languages.add._id], { replaceUrl: true })

                this.load()
            })
        }
    }

    remove(id: string): void {
        this._errors.serverCall(this._gql.query({ query: delLanguage, variables: { id } }), () => this.load())
    }
}
