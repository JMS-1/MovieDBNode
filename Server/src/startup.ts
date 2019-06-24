import * as express from 'express'
import { join } from 'path'

import { installApi } from './api'

const app = express()

app.use(express.static(join(__dirname, '../dist')))

installApi(app)

app.listen(29099)
