"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const uuid_1 = require("uuid");
const prisma = new client_1.PrismaClient();
async function main() {
    const banks = [
        { id: (0, uuid_1.v4)(), name: 'Banco de Chile', logo: 'https://logo.clearbit.com/bancochile.cl' },
        { id: (0, uuid_1.v4)(), name: 'Banco de Crédito e Inversiones (BCI)', logo: 'https://logo.clearbit.com/bci.cl' },
        { id: (0, uuid_1.v4)(), name: 'BancoEstado', logo: 'https://logo.clearbit.com/bancoestado.cl' },
        { id: (0, uuid_1.v4)(), name: 'Banco Santander', logo: 'https://logo.clearbit.com/santander.cl' },
        { id: (0, uuid_1.v4)(), name: 'Scotiabank Chile', logo: 'https://logo.clearbit.com/scotiabankchile.cl' },
        { id: (0, uuid_1.v4)(), name: 'Itaú Chile', logo: 'https://logo.clearbit.com/itau.cl' },
        { id: (0, uuid_1.v4)(), name: 'Banco BICE', logo: 'https://logo.clearbit.com/bice.cl' },
        { id: (0, uuid_1.v4)(), name: 'Banco Security', logo: 'https://logo.clearbit.com/bancosecurity.cl' },
        { id: (0, uuid_1.v4)(), name: 'Banco Falabella', logo: 'https://logo.clearbit.com/bancofalabella.cl' },
        { id: (0, uuid_1.v4)(), name: 'Banco Ripley', logo: 'https://logo.clearbit.com/bancoripley.cl' },
        { id: (0, uuid_1.v4)(), name: 'Banco Consorcio', logo: 'https://logo.clearbit.com/consorcio.cl' },
        { id: (0, uuid_1.v4)(), name: 'Tenpo (Prepago/Digital)', logo: 'https://logo.clearbit.com/tenpo.cl' },
        { id: (0, uuid_1.v4)(), name: 'Mercado Pago (Prepago/Digital)', logo: 'https://logo.clearbit.com/mercadopago.cl' },
        { id: (0, uuid_1.v4)(), name: 'Tanner Banco Digital', logo: 'https://logo.clearbit.com/tanner.cl' },
    ];
    for (const bank of banks) {
        await prisma.banks.upsert({
            where: { name: bank.name },
            update: { logo: bank.logo },
            create: { ...bank, created_at: new Date(), updated_at: new Date() },
        });
    }
    const accountTypes = [
        { id: (0, uuid_1.v4)(), name: 'Cuenta Corriente' },
        { id: (0, uuid_1.v4)(), name: 'Cuenta Vista' },
        { id: (0, uuid_1.v4)(), name: 'Cuenta RUT' },
        { id: (0, uuid_1.v4)(), name: 'Cuenta de Ahorro' },
        { id: (0, uuid_1.v4)(), name: 'Tarjeta de Crédito' },
        { id: (0, uuid_1.v4)(), name: 'Línea de Crédito' },
        { id: (0, uuid_1.v4)(), name: 'Cuenta Prepago' },
    ];
    for (const type of accountTypes) {
        await prisma.account_types.upsert({
            where: { name: type.name },
            update: {},
            create: { ...type, created_at: new Date(), updated_at: new Date() },
        });
    }
    const bankAccountLinks = {
        'BancoEstado': ['Cuenta RUT', 'Cuenta Vista', 'Cuenta Corriente', 'Cuenta de Ahorro'],
        'Banco Santander': ['Cuenta Corriente', 'Cuenta Vista', 'Cuenta de Ahorro', 'Tarjeta de Crédito'],
        'Banco de Chile': ['Cuenta Corriente', 'Cuenta Vista', 'Cuenta de Ahorro', 'Tarjeta de Crédito', 'Línea de Crédito'],
        'Banco de Crédito e Inversiones (BCI)': ['Cuenta Corriente', 'Cuenta Vista', 'Tarjeta de Crédito', 'Cuenta de Ahorro'],
        'Tenpo (Prepago/Digital)': ['Cuenta Prepago'],
        'Mercado Pago (Prepago/Digital)': ['Cuenta Prepago'],
        'Banco Falabella': ['Cuenta Corriente', 'Cuenta Vista', 'Tarjeta de Crédito', 'Cuenta de Ahorro'],
    };
    const dbBanks = await prisma.banks.findMany();
    const dbAccountTypes = await prisma.account_types.findMany();
    for (const b of dbBanks) {
        const supportedTypes = bankAccountLinks[b.name] || ['Cuenta Corriente', 'Cuenta Vista', 'Cuenta de Ahorro', 'Tarjeta de Crédito', 'Línea de Crédito'];
        for (const st of supportedTypes) {
            const type = dbAccountTypes.find(t => t.name === st);
            if (type) {
                const exists = await prisma.bank_account_types.findUnique({
                    where: { bank_id_account_type_id: { bank_id: b.id, account_type_id: type.id } }
                });
                if (!exists) {
                    await prisma.bank_account_types.create({
                        data: { bank_id: b.id, account_type_id: type.id }
                    });
                }
            }
        }
    }
    const categories = [
        { name: 'Alimentación', icon: '🛒', color: '#FF6B6B' },
        { name: 'Transporte', icon: '🚗', color: '#4ECDC4' },
        { name: 'Vivienda', icon: '🏠', color: '#45B7D1' },
        { name: 'Servicios básicos', icon: '💡', color: '#F9CA24' },
        { name: 'Salud', icon: '🏥', color: '#FF4757' },
        { name: 'Educación', icon: '📚', color: '#7C4DFF' },
        { name: 'Entretenimiento', icon: '🎮', color: '#FF9FF3' },
        { name: 'Restaurantes', icon: '🍽️', color: '#F39C12' },
        { name: 'Ropa y calzado', icon: '👕', color: '#E056A0' },
        { name: 'Tecnología', icon: '💻', color: '#00D2D3' },
        { name: 'Mascotas', icon: '🐾', color: '#A29BFE' },
        { name: 'Suscripciones', icon: '📱', color: '#6C5CE7' },
        { name: 'Seguros', icon: '🛡️', color: '#636E72' },
        { name: 'Deudas y préstamos', icon: '💳', color: '#D63031' },
        { name: 'Regalos', icon: '🎁', color: '#E17055' },
        { name: 'Ahorros', icon: '🏦', color: '#2ED573' },
        { name: 'Sueldo', icon: '💼', color: '#00B894' },
        { name: 'Ventas y negocios', icon: '📈', color: '#10AC84' },
        { name: 'Inversiones', icon: '🪙', color: '#F1C40F' },
        { name: 'Otros ingresos', icon: '💰', color: '#2ECC71' },
        { name: 'Otros gastos', icon: '📦', color: '#95A5A6' }
    ];
    for (const cat of categories) {
        const existing = await prisma.categories.findFirst({
            where: { name: cat.name },
        });
        if (existing) {
            await prisma.categories.update({
                where: { id: existing.id },
                data: { icon: cat.icon, color: cat.color, updated_at: new Date() },
            });
        }
        else {
            await prisma.categories.create({
                data: { id: (0, uuid_1.v4)(), name: cat.name, icon: cat.icon, color: cat.color, created_at: new Date(), updated_at: new Date() },
            });
        }
    }
    console.log('Seeding completed successfully!');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map