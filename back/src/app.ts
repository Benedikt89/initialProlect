import bodyParser from 'body-parser';
import compression from 'compression';
import path from 'path';
import express, { Request, Response, NextFunction } from 'express';
import ApplicationError from './errors/application-error';
import users from "./routes/users-router";
import contacts from "./routes/contacts-router";
import session from "express-session";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import {imagesPath, staticPath} from "./config";


const app = express();

// ========== APP SETUP =========
const corsOptions = {
    origin: true,
    credentials: true,
};


app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(bodyParser.json());

//Configure
app.disable("x-powered-by");
app.set('port', process.env.PORT || 3000);


//adding session cookies
app.use(session({
    secret: 'ssshhhhh',
    name: 'SESSION_TOKEN',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: false
    }
}));

app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

// ========== ROUTES SETUP =========
app.use('/api/users', users);
app.use('/api/contacts', contacts);


// ========== local Static Files SETUP =========
app.use('/public', express.static(staticPath));
app.use('/static/images/', express.static(imagesPath));

//sendStatic
app.get('/', (req: Request, res: Response) => {
    res.sendFile(staticPath + '/index.html');
});

// ========== ERRORS SETUP =========
app.use((err: ApplicationError, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
        return next(err);
    }

    return res.status(err.status || 500).json({
        error: process.env.NODE_ENV === 'development' ? err : undefined,
        message: err.message
    });
});

export default app;
