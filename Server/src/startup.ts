import * as express from 'express'
import { join } from 'path'

const app = express()

app.use(express.static(join(__dirname, '../dist')))

app.listen(29099)
