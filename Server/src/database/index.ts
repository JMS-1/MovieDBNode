import { ContainerSchema } from './entities/container'
import { addSchema } from './validation'

export async function initializeDatabase(): Promise<void> {
    addSchema(ContainerSchema)
}
