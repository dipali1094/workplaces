"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_util_1 = require("node:util");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log("Seeding database...");
    const { values: { environment }, } = (0, node_util_1.parseArgs)({ options: {
            environment: { type: 'string' },
        } });
    const envName = environment === 'test' ? 'test' : 'default';
    console.log(`Using '${envName}' environment`);
    const { shifts } = await Promise.resolve(`${`./seed/${envName === 'test' ? 'test-' : ''}shifts`}`).then(s => require(s));
    const { workers } = await Promise.resolve().then(() => require('./seed/workers'));
    const { workplaces } = await Promise.resolve().then(() => require('./seed/workplaces'));
    for (const data of workers) {
        await prisma.worker.create({ data });
    }
    for (const data of workplaces) {
        await prisma.workplace.create({ data });
    }
    for (const data of shifts) {
        await prisma.shift.create({ data });
    }
    console.log("Seeding complete.");
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
});
//# sourceMappingURL=seed.js.map