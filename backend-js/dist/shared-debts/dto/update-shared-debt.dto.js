"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSharedDebtDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_shared_debt_dto_1 = require("./create-shared-debt.dto");
class UpdateSharedDebtDto extends (0, mapped_types_1.PartialType)(create_shared_debt_dto_1.CreateSharedDebtDto) {
}
exports.UpdateSharedDebtDto = UpdateSharedDebtDto;
//# sourceMappingURL=update-shared-debt.dto.js.map