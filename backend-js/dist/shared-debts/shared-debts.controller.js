"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedDebtsController = void 0;
const common_1 = require("@nestjs/common");
const shared_debts_service_1 = require("./shared-debts.service");
const passport_1 = require("@nestjs/passport");
let SharedDebtsController = class SharedDebtsController {
    sharedDebtsService;
    constructor(sharedDebtsService) {
        this.sharedDebtsService = sharedDebtsService;
    }
    create(req, groupId, data) {
        return this.sharedDebtsService.create(groupId, req.user.id, data);
    }
    pay(req, debtId) {
        return this.sharedDebtsService.pay(debtId, req.user.id);
    }
};
exports.SharedDebtsController = SharedDebtsController;
__decorate([
    (0, common_1.Post)('groups/:groupId/debts'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('groupId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], SharedDebtsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('debts/:debtId/pay'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('debtId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], SharedDebtsController.prototype, "pay", null);
exports.SharedDebtsController = SharedDebtsController = __decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [shared_debts_service_1.SharedDebtsService])
], SharedDebtsController);
//# sourceMappingURL=shared-debts.controller.js.map