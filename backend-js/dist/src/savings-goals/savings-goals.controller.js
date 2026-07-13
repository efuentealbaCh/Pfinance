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
exports.SavingsGoalsController = void 0;
const common_1 = require("@nestjs/common");
const savings_goals_service_1 = require("./savings-goals.service");
const passport_1 = require("@nestjs/passport");
let SavingsGoalsController = class SavingsGoalsController {
    savingsGoalsService;
    constructor(savingsGoalsService) {
        this.savingsGoalsService = savingsGoalsService;
    }
    create(req, data) {
        return this.savingsGoalsService.create(req.user.id, data);
    }
    findAll(req) {
        return this.savingsGoalsService.findAll(req.user.id);
    }
    findOne(req, id) {
        return this.savingsGoalsService.findOne(id, req.user.id);
    }
    update(req, id, data) {
        return this.savingsGoalsService.update(id, req.user.id, data);
    }
    remove(req, id) {
        return this.savingsGoalsService.remove(id, req.user.id);
    }
    deposit(req, id, amount) {
        return this.savingsGoalsService.deposit(id, req.user.id, amount);
    }
    withdraw(req, id, amount) {
        return this.savingsGoalsService.withdraw(id, req.user.id, amount);
    }
};
exports.SavingsGoalsController = SavingsGoalsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], SavingsGoalsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SavingsGoalsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], SavingsGoalsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], SavingsGoalsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], SavingsGoalsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/deposit'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)('amount')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Number]),
    __metadata("design:returntype", void 0)
], SavingsGoalsController.prototype, "deposit", null);
__decorate([
    (0, common_1.Post)(':id/withdraw'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)('amount')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Number]),
    __metadata("design:returntype", void 0)
], SavingsGoalsController.prototype, "withdraw", null);
exports.SavingsGoalsController = SavingsGoalsController = __decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)('savings-goals'),
    __metadata("design:paramtypes", [savings_goals_service_1.SavingsGoalsService])
], SavingsGoalsController);
//# sourceMappingURL=savings-goals.controller.js.map