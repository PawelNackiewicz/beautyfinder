import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({ log: ['query', 'error', 'warn'] });

async function test() {
    try {
        const where = {
            AND: [
                {
                    locations: {
                        some: {
                            city: { equals: 'Warszawa', mode: 'insensitive' as const },
                        },
                    },
                },
            ],
        };

        const [salons, total] = await Promise.all([
            prisma.salon.findMany({
                where,
                skip: 0,
                take: 20,
                include: {
                    locations: {
                        take: 1,
                        select: {
                            id: true,
                            name: true,
                            streetAddress: true,
                            postalCode: true,
                            city: true,
                            country: true,
                            latitude: true,
                            longitude: true,
                        },
                    },
                    treatments: {
                        take: 5,
                        select: {
                            id: true,
                            name: true,
                            category: true,
                            variants: {
                                select: { priceCents: true },
                                orderBy: { priceCents: 'asc' },
                                take: 1,
                            },
                        },
                    },
                    reviews: {
                        select: { rating: true },
                    },
                    _count: { select: { reviews: true } },
                },
                orderBy: [{ reviews: { _count: 'desc' } }],
            }),
            prisma.salon.count({ where }),
        ]);

        console.log('SUCCESS! Found', salons.length, 'salons, total:', total);
        console.log(JSON.stringify(salons, null, 2));
    } catch (e: any) {
        console.error('=== FULL ERROR ===');
        console.error('Message:', e.message);
        console.error('Code:', e.code);
        console.error('Meta:', JSON.stringify(e.meta, null, 2));
    } finally {
        await prisma.$disconnect();
    }
}

test();
