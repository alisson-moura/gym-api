import express from 'express'
//import 'express-async-errors'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'

import router from './router'

function startWebServer() {
    const app = express()
    app.use(cors())
    app.use(helmet({
        contentSecurityPolicy: false,
        crossOriginEmbedderPolicy: false,
    }))
    app.use(express.json())

    /*TODO AJUSTAR LOG */
    app.use(morgan('tiny'))


    app.use(router)
    app.listen(process.env.PORT, () => console.log('\x1b[33m%s\x1b[0m', `Server :: Running @ 'http://localhost:${process.env.PORT}'`))
    app.on('error', (error) => console.log('Error: ', error))
}

export default startWebServer