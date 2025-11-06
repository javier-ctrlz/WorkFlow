"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_1 = __importDefault(require("../db/connection"));
const cors_1 = __importDefault(require("cors"));
const rutas_1 = __importDefault(require("../routes/rutas"));
class Server {
    app;
    port;
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3001';
        this.middlewares();
        this.listen();
        this.routes();
        this.dbconnect();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Aplicación corriendo en el puerto ${this.port}`);
        });
    }
    routes() {
        this.app.get('/', (req, res) => {
            res.send('It works!');
        });
        this.app.use('/api', rutas_1.default);
    }
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
    }
    async dbconnect() {
        try {
            await connection_1.default.authenticate().then();
            console.log('Base de datos conectada');
        }
        catch {
            console.log('Error al conectarse a la base de datos');
        }
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map