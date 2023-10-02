"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_js_1 = __importDefault(require("./app.js"));
const database_js_1 = __importDefault(require("./db/database.js"));
const PORT = process.env.PORT || 3000; // Choose a port number
const app = (0, app_js_1.default)(database_js_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
