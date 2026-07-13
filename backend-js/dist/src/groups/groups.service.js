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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let GroupsService = class GroupsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    mapGroup(group) {
        if (!group)
            return group;
        let users = undefined;
        if (group.group_user) {
            users = group.group_user.map((gu) => ({
                ...gu.users,
                pivot: {
                    role: gu.role,
                    status: gu.status,
                    created_at: gu.created_at,
                }
            }));
        }
        let shared_debts = undefined;
        if (group.shared_debts) {
            shared_debts = group.shared_debts.map((debt) => ({
                ...debt,
                splits: debt.shared_debt_splits ? debt.shared_debt_splits.map((s) => ({
                    ...s,
                    user: s.users
                })) : [],
                creator: debt.users
            }));
        }
        const { group_user, shared_debts: sd, ...rest } = group;
        return {
            ...rest,
            users: users || [],
            shared_debts: shared_debts || [],
        };
    }
    async findAll(userId) {
        const groups = await this.prisma.groups.findMany({
            where: {
                group_user: { some: { user_id: userId } },
            },
            include: {
                _count: { select: { group_user: true } },
                group_user: { include: { users: { select: { id: true, name: true, email: true } } } },
            }
        });
        return groups.map(g => this.mapGroup(g));
    }
    async findOne(id, userId) {
        const groupId = BigInt(id);
        const group = await this.prisma.groups.findFirst({
            where: {
                id: groupId,
                group_user: { some: { user_id: userId } },
            },
            include: {
                group_user: { include: { users: { select: { id: true, name: true, email: true } } } },
                shared_debts: {
                    include: {
                        shared_debt_splits: { include: { users: { select: { id: true, name: true } } } },
                        users: { select: { id: true, name: true } },
                    }
                }
            }
        });
        if (!group)
            throw new common_1.NotFoundException('Group not found');
        return this.mapGroup(group);
    }
    async create(userId, data) {
        const group = await this.prisma.groups.create({
            data: {
                name: data.name,
                description: data.description,
                created_by: userId,
                created_at: new Date(),
                updated_at: new Date(),
                group_user: {
                    create: {
                        user_id: userId,
                        role: 'admin',
                        status: 'accepted',
                    }
                }
            }
        });
        return group;
    }
    async removeMember(groupId, targetUserId, requesterId) {
        const gId = BigInt(groupId);
        const requesterMembership = await this.prisma.group_user.findFirst({
            where: { group_id: gId, user_id: requesterId, role: 'admin' },
        });
        if (!requesterMembership)
            throw new common_1.ForbiddenException('No tienes permisos de administrador en este grupo.');
        const group = await this.prisma.groups.findUnique({ where: { id: gId } });
        if (group && group.created_by === targetUserId) {
            throw new common_1.ForbiddenException('No puedes eliminar al creador del grupo.');
        }
        await this.prisma.group_user.deleteMany({
            where: { group_id: gId, user_id: targetUserId }
        });
        return { message: 'Miembro eliminado correctamente.' };
    }
};
exports.GroupsService = GroupsService;
exports.GroupsService = GroupsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GroupsService);
//# sourceMappingURL=groups.service.js.map