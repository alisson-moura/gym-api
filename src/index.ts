import * as dotEnv from 'dotenv'
import startWebServer from './api/web'

dotEnv.config()
startWebServer()