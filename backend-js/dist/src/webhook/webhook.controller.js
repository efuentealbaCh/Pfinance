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
var WebhookController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let WebhookController = WebhookController_1 = class WebhookController {
    prisma;
    logger = new common_1.Logger(WebhookController_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async handleSync(secret, payload) {
        if (secret !== process.env.WEBHOOK_SECRET) {
            throw new common_1.UnauthorizedException('Invalid webhook secret');
        }
        try {
            const { model, action, args } = payload;
            if (!this.prisma[model] || typeof this.prisma[model][action] !== 'function') {
                this.logger.warn(`Modelo o acción no soportada recibida: ${model}.${action}`);
                return { success: false, message: 'Modelo o acción inválida' };
            }
            const result = await this.prisma[model][action](args);
            this.logger.log(`✅ Sync ejecutado en servidor: ${model}.${action}`);
            return { success: true, result };
        }
        catch (e) {
            this.logger.error(`Error procesando webhook de sincronización: ${e.message}`);
            return { success: false, error: e.message };
        }
    }
};
exports.WebhookController = WebhookController;
__decorate([
    (0, common_1.Post)('sync'),
    __param(0, (0, common_1.Headers)('x-webhook-secret')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], WebhookController.prototype, "handleSync", null);
exports.WebhookController = WebhookController = WebhookController_1 = __decorate([
    (0, common_1.Controller)('webhook'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WebhookController);
//# sourceMappingURL=webhook.controller.js.map