"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fastify_1 = __importDefault(require("fastify"));
var fastify_cors_1 = __importDefault(require("fastify-cors"));
var nedb_promises_1 = __importDefault(require("nedb-promises"));
var fluent_schema_1 = __importDefault(require("fluent-schema"));
var path_1 = __importDefault(require("path"));
var server = fastify_1.default({
    logger: { level: 'debug' }
});
server.register(fastify_cors_1.default, { origin: '*' });
var PRESENCE_TTL = 600;
var PAGE_ACTIVITY_TTL = 3600 * 72;
function openDb(name) {
    return nedb_promises_1.default.create({
        filename: path_1.default.join(__dirname, 'data', name + ".db"),
        autoload: true,
        timestampData: true
    });
}
function cleanPath(path) {
    return decodeURIComponent(path).replace(/^\/+|\/+$/g, '');
}
var $comments = openDb('comments');
var $presence = openDb('presence');
var $activity = openDb('activity');
$presence.ensureIndex({
    fieldName: 'updatedAt',
    expireAfterSeconds: PRESENCE_TTL
});
$activity.ensureIndex({
    fieldName: 'updatedAt',
    expireAfterSeconds: PAGE_ACTIVITY_TTL
});
server.get('/comments/:path', function (req, reply) { return __awaiter(void 0, void 0, void 0, function () {
    var path, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                path = cleanPath(req.params.path);
                return [4 /*yield*/, $comments
                        .find({ path: path })
                        .sort({ createdAt: -1 })
                        .limit(50)
                        .exec()];
            case 1:
                results = _a.sent();
                reply.send(results);
                return [2 /*return*/];
        }
    });
}); });
server.post('/comments/:path', {
    schema: {
        body: fluent_schema_1.default.object()
            .prop('path', fluent_schema_1.default.string().required().maxLength(150))
            .prop('from', fluent_schema_1.default.string().maxLength(150))
            .prop('key', fluent_schema_1.default.string().maxLength(50))
            .prop('message', fluent_schema_1.default.string().required().maxLength(500))
    },
}, function (req, reply) { return __awaiter(void 0, void 0, void 0, function () {
    var path, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                path = cleanPath(req.params.path);
                return [4 /*yield*/, $activity.update({ path: path }, { lastCommentAt: new Date() }, { upsert: true })];
            case 1:
                _c.sent();
                return [4 /*yield*/, $comments.insert(__assign({ path: path }, req.body))];
            case 2:
                _c.sent();
                _b = (_a = reply).send;
                return [4 /*yield*/, $comments.find({ path: path })];
            case 3:
                _b.apply(_a, [_c.sent()]);
                return [2 /*return*/];
        }
    });
}); });
server.get('/presence', function (req, reply) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _b = (_a = reply).send;
                return [4 /*yield*/, $presence.find({})];
            case 1:
                _b.apply(_a, [_c.sent()]);
                return [2 /*return*/];
        }
    });
}); });
server.post('/presence', {
    schema: {
        body: fluent_schema_1.default.object()
            .prop('alias', fluent_schema_1.default.string().required().maxLength(150))
            .prop('key', fluent_schema_1.default.string().maxLength(150))
    }
}, function (req, reply) { return __awaiter(void 0, void 0, void 0, function () {
    var updated;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, $presence.update(req.body, req.body, { upsert: true })];
            case 1:
                updated = _a.sent();
                reply.send(updated);
                return [2 /*return*/];
        }
    });
}); });
server.listen(process.env.PORT ? parseInt(process.env.PORT) : 8081);
