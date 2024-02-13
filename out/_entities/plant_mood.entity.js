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
exports.PlantMood = void 0;
const typeorm_1 = require("typeorm");
const plant_entity_1 = require("./plant.entity");
let PlantMood = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _id_decorators;
    let _id_initializers = [];
    let _mood_id_decorators;
    let _mood_id_initializers = [];
    let _moodDescription_decorators;
    let _moodDescription_initializers = [];
    let _moodLevel_decorators;
    let _moodLevel_initializers = [];
    let _nextLevel_decorators;
    let _nextLevel_initializers = [];
    let _isPositive_decorators;
    let _isPositive_initializers = [];
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
    let _plantId_decorators;
    let _plantId_initializers = [];
    let _plant_decorators;
    let _plant_initializers = [];
    var PlantMood = _classThis = class {
        constructor() {
            this.id = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _id_initializers, void 0));
            this.mood_id = __runInitializers(this, _mood_id_initializers, void 0);
            this.moodDescription = __runInitializers(this, _moodDescription_initializers, void 0);
            this.moodLevel = __runInitializers(this, _moodLevel_initializers, void 0);
            this.nextLevel = __runInitializers(this, _nextLevel_initializers, void 0);
            this.isPositive = __runInitializers(this, _isPositive_initializers, void 0);
            this.isActive = __runInitializers(this, _isActive_initializers, void 0);
            this.isDeleted = __runInitializers(this, _isDeleted_initializers, void 0);
            this.createdDate = __runInitializers(this, _createdDate_initializers, void 0);
            this.modifiedDate = __runInitializers(this, _modifiedDate_initializers, void 0);
            this.createdBy = __runInitializers(this, _createdBy_initializers, void 0);
            this.modifiedBy = __runInitializers(this, _modifiedBy_initializers, void 0);
            this.plantId = __runInitializers(this, _plantId_initializers, void 0);
            this.plant = __runInitializers(this, _plant_initializers, void 0);
        }
    };
    __setFunctionName(_classThis, "PlantMood");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)({ name: "ID" })];
        _mood_id_decorators = [(0, typeorm_1.Column)("integer", { name: "MOOD_ID" })];
        _moodDescription_decorators = [(0, typeorm_1.Column)("varchar", { name: "MOOD_DESCRIPTION", length: 255 })];
        _moodLevel_decorators = [(0, typeorm_1.Column)("integer", { name: "MOOD_LEVEL" })];
        _nextLevel_decorators = [(0, typeorm_1.Column)({ type: 'datetime', name: "NEXT_LEVEL" })];
        _isPositive_decorators = [(0, typeorm_1.Column)("integer", { name: "IS_POSITIVE" })];
        _isActive_decorators = [(0, typeorm_1.Column)("integer", { name: "IS_ACTIVE" })];
        _isDeleted_decorators = [(0, typeorm_1.Column)("integer", { name: "IS_DELETED" })];
        _createdDate_decorators = [(0, typeorm_1.Column)({ type: 'datetime', name: 'CREATED_DATE' })];
        _modifiedDate_decorators = [(0, typeorm_1.Column)({ type: 'datetime', name: 'MODIFIED_DATE' })];
        _createdBy_decorators = [(0, typeorm_1.Column)("integer", { name: "CREATED_BY" })];
        _modifiedBy_decorators = [(0, typeorm_1.Column)("integer", { name: "MODIFIED_BY" })];
        _plantId_decorators = [(0, typeorm_1.Column)("integer", { name: "PLANT_ID" })];
        _plant_decorators = [(0, typeorm_1.ManyToOne)(() => plant_entity_1.Plant, (plant) => plant.id, { onDelete: "CASCADE" }), (0, typeorm_1.JoinColumn)([{ name: "PLANT_ID", referencedColumnName: "id" }])];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _mood_id_decorators, { kind: "field", name: "mood_id", static: false, private: false, access: { has: obj => "mood_id" in obj, get: obj => obj.mood_id, set: (obj, value) => { obj.mood_id = value; } }, metadata: _metadata }, _mood_id_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _moodDescription_decorators, { kind: "field", name: "moodDescription", static: false, private: false, access: { has: obj => "moodDescription" in obj, get: obj => obj.moodDescription, set: (obj, value) => { obj.moodDescription = value; } }, metadata: _metadata }, _moodDescription_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _moodLevel_decorators, { kind: "field", name: "moodLevel", static: false, private: false, access: { has: obj => "moodLevel" in obj, get: obj => obj.moodLevel, set: (obj, value) => { obj.moodLevel = value; } }, metadata: _metadata }, _moodLevel_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _nextLevel_decorators, { kind: "field", name: "nextLevel", static: false, private: false, access: { has: obj => "nextLevel" in obj, get: obj => obj.nextLevel, set: (obj, value) => { obj.nextLevel = value; } }, metadata: _metadata }, _nextLevel_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _isPositive_decorators, { kind: "field", name: "isPositive", static: false, private: false, access: { has: obj => "isPositive" in obj, get: obj => obj.isPositive, set: (obj, value) => { obj.isPositive = value; } }, metadata: _metadata }, _isPositive_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: obj => "isActive" in obj, get: obj => obj.isActive, set: (obj, value) => { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _isDeleted_decorators, { kind: "field", name: "isDeleted", static: false, private: false, access: { has: obj => "isDeleted" in obj, get: obj => obj.isDeleted, set: (obj, value) => { obj.isDeleted = value; } }, metadata: _metadata }, _isDeleted_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _createdDate_decorators, { kind: "field", name: "createdDate", static: false, private: false, access: { has: obj => "createdDate" in obj, get: obj => obj.createdDate, set: (obj, value) => { obj.createdDate = value; } }, metadata: _metadata }, _createdDate_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _modifiedDate_decorators, { kind: "field", name: "modifiedDate", static: false, private: false, access: { has: obj => "modifiedDate" in obj, get: obj => obj.modifiedDate, set: (obj, value) => { obj.modifiedDate = value; } }, metadata: _metadata }, _modifiedDate_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _createdBy_decorators, { kind: "field", name: "createdBy", static: false, private: false, access: { has: obj => "createdBy" in obj, get: obj => obj.createdBy, set: (obj, value) => { obj.createdBy = value; } }, metadata: _metadata }, _createdBy_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _modifiedBy_decorators, { kind: "field", name: "modifiedBy", static: false, private: false, access: { has: obj => "modifiedBy" in obj, get: obj => obj.modifiedBy, set: (obj, value) => { obj.modifiedBy = value; } }, metadata: _metadata }, _modifiedBy_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _plantId_decorators, { kind: "field", name: "plantId", static: false, private: false, access: { has: obj => "plantId" in obj, get: obj => obj.plantId, set: (obj, value) => { obj.plantId = value; } }, metadata: _metadata }, _plantId_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _plant_decorators, { kind: "field", name: "plant", static: false, private: false, access: { has: obj => "plant" in obj, get: obj => obj.plant, set: (obj, value) => { obj.plant = value; } }, metadata: _metadata }, _plant_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PlantMood = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PlantMood = _classThis;
})();
exports.PlantMood = PlantMood;
