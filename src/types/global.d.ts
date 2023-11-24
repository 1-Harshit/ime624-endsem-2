declare global {
  var prisma: PrismaClient;
}

declare module globalThis {
  var prisma: PrismaClient;
}
