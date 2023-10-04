"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const song_js_1 = __importDefault(require("./routes/song/song.js"));
function makeApp(database) {
    const app = (0, express_1.default)();
    // Middleware to handle CORS (Cross-Origin Resource Sharing)
    app.use((0, cors_1.default)());
    // Middleware to parse JSON requests
    app.use(express_1.default.json());
    app.use('/', (req, res, next) => {
        res.locals.database = database;
        next();
    });
    // Define a sample route
    app.get('/', (req, res) => {
        res.send('Hello, World!');
    });
    // biforcate routes
    app.use('/song', song_js_1.default);
    // Return the Express app instance
    return app;
}
exports.default = makeApp;
