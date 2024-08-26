import express from 'express'
import { dbConnect } from './DB/db.connection.js'
import userRouter from './src/moduels/user/user.router.js'
import messageRouter from './src/moduels/message/message.router.js'
import { AppError } from './src/utils/appError.js'
const app = express()
const port = 3000
app.use(express.json())

app.use('/auth', userRouter)
app.use('/message', messageRouter)


// handele unhanele route
app.use('*', (req, res, next) => {
    next(new AppError(`Route not found ${req.originalUrl}`, 404))

})

// global handelling error
app.use((err, req, res, next) => {
    //console.error(err.stack)
    //res.status(err.statusCode).json({ error: "error", message: err.message, code: err.statusCode,errors: err.errors })
  
        if (err instanceof AppError) {
            const response = {
                error: "error",
                message: err.message,
                code: err.statusCode
            };
    
            if (err.errors.length > 0) {
                response.errors = err.errors;
            }
    
            res.status(err.statusCode).json(response);
        } else {
            res.status(500).json({
                error: "error",
                message: "Internal Server Error"
            });
        }
    });



app.listen(port, () => console.log(`Example app listening on port ${port}!`))  