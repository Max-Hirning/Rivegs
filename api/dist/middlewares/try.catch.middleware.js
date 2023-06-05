"use strict";
/* eslint-disable no-console */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryCatchMiddlewareNotAPI = void 0;
function tryCatchMiddlewareNotAPI(calback, successMsg) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield calback;
            console.log(successMsg);
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.tryCatchMiddlewareNotAPI = tryCatchMiddlewareNotAPI;
function tryCatchMiddlewareAPI(req, res, calback) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield calback;
            res.status(200).send(response);
        }
        catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    });
}
exports.default = tryCatchMiddlewareAPI;
//# sourceMappingURL=try.catch.middleware.js.map