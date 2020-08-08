"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todos_1 = __importDefault(require("./routes/todos"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const body_parser_1 = require("body-parser");
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = express_1.default();
const uri = process.env.AZURE_STRING;
app.use(body_parser_1.json());
app.use(cors_1.default({
    origin: "http://localhost:4000",
    credentials: true,
}));
app.use(body_parser_1.urlencoded({ extended: true }));
mongoose_1.default
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
    console.log("Azure connected");
})
    .catch((err) => {
    console.log("Error connect " + err);
});
app.use("/todos", todos_1.default);
app.use("/api/user", user_route_1.default);
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
exports.default = app;
