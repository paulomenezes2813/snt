// Seed em JavaScript para ambientes de produção (Railway)
// Executa via: `npm run seed:prod` (usa @prisma/client já gerado)
const { PrismaClient, VehicleType, InfraType } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const [bus1, bus2, van1] = await Promise.all([
    prisma.vehicle.upsert({ where: { plate: 'BUS-001' }, update: {}, create: { plate: 'BUS-001', type: VehicleType.BUS, capacity: 80 } }),
    prisma.vehicle.upsert({ where: { plate: 'BUS-002' }, update: {}, create: { plate: 'BUS-002', type: VehicleType.BUS, capacity: 80 } }),
    prisma.vehicle.upsert({ where: { plate: 'VAN-101' }, update: {}, create: { plate: 'VAN-101', type: VehicleType.VAN, capacity: 18 } }),
  ]);

  const [route] = await Promise.all([
    prisma.route.upsert({ where: { name: 'Linha Central' }, update: {}, create: { name: 'Linha Central' } }),
  ]);

  const [stopA, stopB] = await Promise.all([
    prisma.stop.upsert({ where: { name: 'Terminal A' }, update: {}, create: { name: 'Terminal A', latitude: -3.7327, longitude: -38.5270 } }),
    prisma.stop.upsert({ where: { name: 'Ponto B' }, update: {}, create: { name: 'Ponto B', latitude: -3.75, longitude: -38.54 } }),
  ]);

  const start = new Date();
  start.setHours(8, 0, 0, 0);

  const trip1 = await prisma.trip.create({
    data: {
      vehicleId: bus1.id,
      routeId: route.id,
      startTime: start,
      endTime: new Date(start.getTime() + 45 * 60000),
      kilometersPlanned: 20,
      kilometersExecuted: 19.2,
      scheduleCompliance: 0.96,
      routeDeviations: 1,
      occupancyAverage: 0.62,
    },
  });

  const trip2 = await prisma.trip.create({
    data: {
      vehicleId: van1.id,
      routeId: route.id,
      startTime: new Date(start.getTime() + 60 * 60000),
      endTime: new Date(start.getTime() + 100 * 60000),
      kilometersPlanned: 20,
      kilometersExecuted: 20.5,
      scheduleCompliance: 0.88,
      routeDeviations: 0,
      occupancyAverage: 0.41,
    },
  });

  await prisma.demandMetric.createMany({
    data: [
      { tripId: trip1.id, stopId: stopA.id, passengersBoarded: 25, passengersAlighted: 5, occupancySegment: 0.5 },
      { tripId: trip1.id, stopId: stopB.id, passengersBoarded: 10, passengersAlighted: 12, occupancySegment: 0.65 },
      { tripId: trip2.id, stopId: stopA.id, passengersBoarded: 8, passengersAlighted: 2, occupancySegment: 0.35 },
    ],
  });

  await prisma.drivingMetric.createMany({
    data: [
      { tripId: trip1.id, harshBraking: 2, harshAcceleration: 1, sharpTurns: 1 },
      { tripId: trip2.id, harshBraking: 0, harshAcceleration: 1, sharpTurns: 0 },
    ],
  });

  await prisma.infrastructureEvent.create({
    data: {
      time: new Date(),
      latitude: -3.74,
      longitude: -38.53,
      type: InfraType.PAVEMENT_ISSUE,
      description: 'Buraco na via próximo ao Ponto B',
    },
  });

  console.log('Seed (JS) executado com sucesso.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const [bus1, bus2, van1] = await Promise.all([
        prisma.vehicle.upsert({ where: { plate: 'BUS-001' }, update: {}, create: { plate: 'BUS-001', type: client_1.VehicleType.BUS, capacity: 80 } }),
        prisma.vehicle.upsert({ where: { plate: 'BUS-002' }, update: {}, create: { plate: 'BUS-002', type: client_1.VehicleType.BUS, capacity: 80 } }),
        prisma.vehicle.upsert({ where: { plate: 'VAN-101' }, update: {}, create: { plate: 'VAN-101', type: client_1.VehicleType.VAN, capacity: 18 } }),
    ]);
    const [route] = await Promise.all([
        prisma.route.upsert({ where: { name: 'Linha Central' }, update: {}, create: { name: 'Linha Central' } }),
    ]);
    const [stopA, stopB] = await Promise.all([
        prisma.stop.upsert({ where: { name: 'Terminal A' }, update: {}, create: { name: 'Terminal A', latitude: -3.7327, longitude: -38.5270 } }),
        prisma.stop.upsert({ where: { name: 'Ponto B' }, update: {}, create: { name: 'Ponto B', latitude: -3.75, longitude: -38.54 } }),
    ]);
    const start = new Date();
    start.setHours(8, 0, 0, 0);
    const trip1 = await prisma.trip.create({
        data: {
            vehicleId: bus1.id,
            routeId: route.id,
            startTime: start,
            endTime: new Date(start.getTime() + 45 * 60000),
            kilometersPlanned: 20,
            kilometersExecuted: 19.2,
            scheduleCompliance: 0.96,
            routeDeviations: 1,
            occupancyAverage: 0.62,
        },
    });
    const trip2 = await prisma.trip.create({
        data: {
            vehicleId: van1.id,
            routeId: route.id,
            startTime: new Date(start.getTime() + 60 * 60000),
            endTime: new Date(start.getTime() + 100 * 60000),
            kilometersPlanned: 20,
            kilometersExecuted: 20.5,
            scheduleCompliance: 0.88,
            routeDeviations: 0,
            occupancyAverage: 0.41,
        },
    });
    await prisma.demandMetric.createMany({
        data: [
            { tripId: trip1.id, stopId: stopA.id, passengersBoarded: 25, passengersAlighted: 5, occupancySegment: 0.5 },
            { tripId: trip1.id, stopId: stopB.id, passengersBoarded: 10, passengersAlighted: 12, occupancySegment: 0.65 },
            { tripId: trip2.id, stopId: stopA.id, passengersBoarded: 8, passengersAlighted: 2, occupancySegment: 0.35 },
        ],
    });
    await prisma.drivingMetric.createMany({
        data: [
            { tripId: trip1.id, harshBraking: 2, harshAcceleration: 1, sharpTurns: 1 },
            { tripId: trip2.id, harshBraking: 0, harshAcceleration: 1, sharpTurns: 0 },
        ],
    });
    await prisma.infrastructureEvent.create({
        data: {
            time: new Date(),
            latitude: -3.74,
            longitude: -38.53,
            type: client_1.InfraType.PAVEMENT_ISSUE,
            description: 'Buraco na via próximo ao Ponto B',
        },
    });
    console.log('Base de dados populada com exemplos.');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
