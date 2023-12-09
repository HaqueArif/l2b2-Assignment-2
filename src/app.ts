import express, { Application, Request, Response } from 'express'
const app: Application = express()
import cors from 'cors'
import { UserRoutes } from './app/modules/user/user.route'

//parsers
app.use(express.json())
app.use(cors())
app.use('/api/users', UserRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running!')
})

export default app
