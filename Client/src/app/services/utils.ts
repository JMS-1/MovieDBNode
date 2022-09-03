import { Observable, Observer } from 'rxjs'

export interface IMulticastObservable<T> extends Observable<T> {
    destroy(): void
    next(value: T): void
}

export function createMulticastObservable<T>(initialResult: T): IMulticastObservable<T> {
    const observers: Observer<T>[] = []

    const observable = new Observable<T>((observer) => {
        observers.push(observer)

        if (initialResult) {
            observer.next(initialResult)
        }

        return {
            unsubscribe: () => {
                const index = observers.findIndex((o) => o === observer)

                if (index >= 0) {
                    observers.splice(index, 1)
                }
            },
        }
    }) as IMulticastObservable<T>

    observable.next = (value) => {
        initialResult = value

        for (const observer of observers.slice(0)) {
            observer.next(value)
        }
    }

    observable.destroy = () => {
        for (const observer of observers.splice(0)) {
            observer.complete()
        }
    }

    return observable
}
