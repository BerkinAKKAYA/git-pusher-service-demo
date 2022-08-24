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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var simple_git_1 = require("simple-git");
var fs = require("fs");
var yaml = require('js-yaml');
var git = (0, simple_git_1.simpleGit)();
var repositoryURL = "git@github.com:BerkinAKKAYA/repo-to-push-demo.git";
var directoryName = "repo-to-push";
var fileToEdit = "values.yml";
var key = "replicaCount";
var value = 2;
var commitMessage = "set ".concat(key, " to ").concat(value);
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var filePath, fileContentString, fileContentJSON, keys, lastKey, currentJson, _i, keys_1, _key, newFileContent, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 11, , 12]);
                return [4, fs.promises.rmdir(directoryName, { recursive: true })];
            case 1:
                _a.sent();
                return [4, git.clone(repositoryURL, directoryName)];
            case 2:
                _a.sent();
                return [4, git.cwd({ path: directoryName, root: true })];
            case 3:
                _a.sent();
                return [4, git.pull('origin', 'main', { '--rebase': 'false' })];
            case 4:
                _a.sent();
                filePath = "./".concat(directoryName, "/").concat(fileToEdit);
                return [4, fs.promises.readFile(filePath, { encoding: "utf8" })];
            case 5:
                fileContentString = _a.sent();
                fileContentJSON = yaml.load(fileContentString);
                if (key.includes(".")) {
                    keys = key.split(".");
                    lastKey = keys.pop();
                    currentJson = fileContentJSON;
                    for (_i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                        _key = keys_1[_i];
                        if (!currentJson.hasOwnProperty(_key)) {
                            throw new Error("Unknown Key / Path");
                        }
                        currentJson = currentJson[_key];
                    }
                    currentJson[lastKey] = value;
                }
                else {
                    fileContentJSON[key] = value;
                }
                newFileContent = yaml.dump(fileContentJSON);
                return [4, fs.promises.writeFile(filePath, newFileContent)];
            case 6:
                _a.sent();
                return [4, git.add(".")
                        .then(function (x) { return console.log("successfull: add"); })["catch"](function (x) { return console.log("error: add", x); })];
            case 7:
                _a.sent();
                return [4, git.commit(commitMessage, "*")
                        .then(function (x) { return console.log("successfull: commit"); })["catch"](function (x) { return console.log("error: commit", x); })];
            case 8:
                _a.sent();
                return [4, git.push("origin", "main")
                        .then(function (x) { return console.log("successfull: push"); })["catch"](function (x) { return console.log("couldn't push", x); })];
            case 9:
                _a.sent();
                return [4, fs.promises.rmdir(directoryName, { recursive: true })];
            case 10:
                _a.sent();
                return [3, 12];
            case 11:
                error_1 = _a.sent();
                console.log("error:", error_1);
                return [3, 12];
            case 12: return [2];
        }
    });
}); })();
//# sourceMappingURL=index.js.map