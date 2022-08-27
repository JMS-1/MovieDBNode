/** Hilfsdeklaration um mit Typescript SASS Module zu verwenden. */
declare module '*.module.scss' {
    const classes: { readonly [key: string]: string }

    export default classes
}

declare module '*.svg' {
    import { ReactElement, SVGProps } from 'react'
    const content: (props: SVGProps<SVGElement>) => ReactElement
    export default content
}
