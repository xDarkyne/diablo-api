import { Server} from "./server";
import { Config } from "./config/config";

const server = new Server(Config.PORT);
server.startServer();