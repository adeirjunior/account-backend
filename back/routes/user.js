"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../db/User"));
const joiSchemas_1 = require("../schema/joiSchemas");
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = express_1.default.Router();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const salt = bcrypt_1.default.genSaltSync(10);
    const hash = bcrypt_1.default.hashSync(password, salt);
    const joiCheck = joiSchemas_1.userSchema.validate({
        username,
        email,
        password
    });
    const user = new User_1.default({
        username: (_a = joiCheck.value) === null || _a === void 0 ? void 0 : _a.username,
        email: (_b = joiCheck.value) === null || _b === void 0 ? void 0 : _b.email,
        password: hash
    });
    try {
        const alredyExist = yield User_1.default.find({ email });
        if (!joiCheck.error) {
            if (alredyExist[0].email === user.email) {
                console.log("This account alredy exist");
            }
            else {
                yield user.save();
                console.log("User Saved");
            }
        }
        else {
            const message = joiCheck.error.details[0].message.replace(/"/g, "");
            console.error(message);
        }
    }
    catch (err) {
        console.error(err);
    }
}));
router.get('/', (req, res) => {
    res.send("Working");
});
exports.default = router;
