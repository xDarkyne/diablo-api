import Express, { Application, json, urlencoded } from 'express';
import { Server as HttpServer } from 'http';
import compression from 'compression';
import Routes from './routes/master.routes';

export class Server {
    public port: number;
    public app: Application;
    private server: HttpServer;

    constructor(port: number = 3000) {
        this.app = Express();
        this.app.settings = {
            'x-powered-by': false
        };
        this.port = port;
        this.server = new HttpServer();

        this.app.use(json());
        this.app.use(urlencoded({ extended: true }));
        this.app.use(compression({ threshold: 0 }));

        this.app.use(Routes);
    }

    public startServer(callback?: Function) {
        let port = this.port;
        callback = callback || function() {
            console.log(`App running on port ${port}`);
        }

        this.server = this.app.listen(port, callback());
    }

    public stopServer(): boolean {
        if (this.server.listening) {
            this.server.close();
            return true;
        } else {
            return false;
        }
    }

    public isListening(): boolean {
        return this.server.listening;
    }
}
