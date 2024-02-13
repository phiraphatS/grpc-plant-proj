"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventLog = void 0;
const typeorm_1 = require("typeorm");
let EventLog = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _id_decorators;
    let _id_initializers = [];
    let _eventName_decorators;
    let _eventName_initializers = [];
    let _actionId_decorators;
    let _actionId_initializers = [];
    let _actionAt_decorators;
    let _actionAt_initializers = [];
    let _isActive_decorators;
    let _isActive_initializers = [];
    let _isDeleted_decorators;
    let _isDeleted_initializers = [];
    let _createdDate_decorators;
    let _createdDate_initializers = [];
    let _modifiedDate_decorators;
    let _modifiedDate_initializers = [];
    let _createdBy_decorators;
    let _createdBy_initializers = [];
    let _modifiedBy_decorators;
    let _modifiedBy_initializers = [];
    var EventLog = _classThis = class {
        constructor() {
            this.id = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _id_initializers, void 0));
            this.eventName = __runInitializers(this, _eventName_initializers, void 0);
            this.actionId = __runInitializers(this, _actionId_initializers, void 0);
            this.actionAt = __runInitializers(this, _actionAt_initializers, void 0);
            this.isActive = __runInitializers(this, _isActive_initializers, void 0);
            this.isDeleted = __runInitializers(this, _isDeleted_initializers, void 0);
            this.createdDate = __runInitializers(this, _createdDate_initializers, void 0);
            this.modifiedDate = __runInitializers(this, _modifiedDate_initializers, void 0);
            this.createdBy = __runInitializers(this, _createdBy_initializers, void 0);
            this.modifiedBy = __runInitializers(this, _modifiedBy_initializers, void 0);
        }
    };
    __setFunctionName(_classThis, "EventLog");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)({ name: "ID" })];
        _eventName_decorators = [(0, typeorm_1.Column)("varchar", { name: "EVENT_NAME", length: 255 })];
        _actionId_decorators = [(0, typeorm_1.Column)("integer", { name: "ACTION_ID" })];
        _actionAt_decorators = [(0, typeorm_1.Column)({ type: 'datetime', name: 'ACTION_AT' })];
        _isActive_decorators = [(0, typeorm_1.Column)("integer", { name: "IS_ACTIVE" })];
        _isDeleted_decorators = [(0, typeorm_1.Column)("integer", { name: "IS_DELETED" })];
        _createdDate_decorators = [(0, typeorm_1.Column)({ type: 'datetime', name: 'CREATED_DATE' })];
        _modifiedDate_decorators = [(0, typeorm_1.Column)({ type: 'datetime', name: 'MODIFIED_DATE' })];
        _createdBy_decorators = [(0, typeorm_1.Column)("integer", { name: "CREATED_BY" })];
        _modifiedBy_decorators = [(0, typeorm_1.Column)("integer", { name: "MODIFIED_BY" })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _eventName_decorators, { kind: "field", name: "eventName", static: false, private: false, access: { has: obj => "eventName" in obj, get: obj => obj.eventName, set: (obj, value) => { obj.eventName = value; } }, metadata: _metadata }, _eventName_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _actionId_decorators, { kind: "field", name: "actionId", static: false, private: false, access: { has: obj => "actionId" in obj, get: obj => obj.actionId, set: (obj, value) => { obj.actionId = value; } }, metadata: _metadata }, _actionId_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _actionAt_decorators, { kind: "field", name: "actionAt", static: false, private: false, access: { has: obj => "actionAt" in obj, get: obj => obj.actionAt, set: (obj, value) => { obj.actionAt = value; } }, metadata: _metadata }, _actionAt_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: obj => "isActive" in obj, get: obj => obj.isActive, set: (obj, value) => { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _isDeleted_decorators, { kind: "field", name: "isDeleted", static: false, private: false, access: { has: obj => "isDeleted" in obj, get: obj => obj.isDeleted, set: (obj, value) => { obj.isDeleted = value; } }, metadata: _metadata }, _isDeleted_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _createdDate_decorators, { kind: "field", name: "createdDate", static: false, private: false, access: { has: obj => "createdDate" in obj, get: obj => obj.createdDate, set: (obj, value) => { obj.createdDate = value; } }, metadata: _metadata }, _createdDate_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _modifiedDate_decorators, { kind: "field", name: "modifiedDate", static: false, private: false, access: { has: obj => "modifiedDate" in obj, get: obj => obj.modifiedDate, set: (obj, value) => { obj.modifiedDate = value; } }, metadata: _metadata }, _modifiedDate_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _createdBy_decorators, { kind: "field", name: "createdBy", static: false, private: false, access: { has: obj => "createdBy" in obj, get: obj => obj.createdBy, set: (obj, value) => { obj.createdBy = value; } }, metadata: _metadata }, _createdBy_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _modifiedBy_decorators, { kind: "field", name: "modifiedBy", static: false, private: false, access: { has: obj => "modifiedBy" in obj, get: obj => obj.modifiedBy, set: (obj, value) => { obj.modifiedBy = value; } }, metadata: _metadata }, _modifiedBy_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        EventLog = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return EventLog = _classThis;
})();
exports.EventLog = EventLog;
