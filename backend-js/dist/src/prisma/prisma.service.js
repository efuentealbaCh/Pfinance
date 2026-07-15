"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PrismaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let PrismaService = PrismaService_1 = class PrismaService extends client_1.PrismaClient {
    logger = new common_1.Logger(PrismaService_1.name);
    async onModuleInit() {
        await this.$connect();
        this.$use(async (params, next) => {
            const result = await next(params);
            const isMutation = ['create', 'update', 'delete', 'upsert', 'createMany', 'updateMany', 'deleteMany'].includes(params.action);
            if (isMutation && process.env.SYNC_TO_REMOTE === 'true') {
                this.sendWebhook(params).catch(err => {
                    this.logger.error(`Error de sincronización webhook: ${err.message}`);
                });
            }
            return result;
        });
    }
    async sendWebhook(params) {
        const url = process.env.PROD_API_URL + '/webhook/sync';
        const secret = process.env.WEBHOOK_SECRET;
        if (!process.env.PROD_API_URL || !secret) {
            this.logger.warn('Faltan variables PROD_API_URL o WEBHOOK_SECRET para sincronizar');
            return;
        }
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-webhook-secret': secret
                },
                body: JSON.stringify({
                    model: params.model,
                    action: params.action,
                    args: params.args
                })
            });
            if (!response.ok) {
                this.logger.error(`Webhook falló con estado ${response.status}: ${await response.text()}`);
            }
            else {
                this.logger.log(`🔄 Webhook de sincronización enviado exitosamente para ${params.model}.${params.action}`);
            }
        }
        catch (e) {
            this.logger.error(`Error enviando webhook: ${e.message}`);
        }
    }
    async onModuleDestroy() {
        await this.$disconnect();
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = PrismaService_1 = __decorate([
    (0, common_1.Injectable)()
], PrismaService);
//# sourceMappingURL=prisma.service.js.map