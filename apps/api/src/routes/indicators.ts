import { Router } from 'express';
import { prisma } from '../lib/prisma.js';

const router = Router();

router.get('/summary', async (_req, res) => {
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const [passengers, occupancyAvg, totalKm, scheduleCompliance, routeDeviations, harshEvents, infraEvents] = await Promise.all([
      prisma.demandMetric.aggregate({ _sum: { passengersBoarded: true, passengersAlighted: true }, where: { createdAt: { gte: todayStart, lte: todayEnd } } }),
      prisma.trip.aggregate({ _avg: { occupancyAverage: true }, where: { startTime: { gte: todayStart, lte: todayEnd } } }),
      prisma.trip.aggregate({ _sum: { kilometersExecuted: true }, where: { startTime: { gte: todayStart, lte: todayEnd } } }),
      prisma.trip.aggregate({ _avg: { scheduleCompliance: true }, where: { startTime: { gte: todayStart, lte: todayEnd } } }),
      prisma.trip.aggregate({ _sum: { routeDeviations: true }, where: { startTime: { gte: todayStart, lte: todayEnd } } }),
      prisma.drivingMetric.aggregate({ _sum: { harshBraking: true, harshAcceleration: true, sharpTurns: true }, where: { createdAt: { gte: todayStart, lte: todayEnd } } }),
      prisma.infrastructureEvent.count({ where: { time: { gte: todayStart, lte: todayEnd } } }),
    ]);

    const demandaTotal = (passengers._sum.passengersBoarded ?? 0) + (passengers._sum.passengersAlighted ?? 0);
    const conducoes = (harshEvents._sum.harshBraking ?? 0) + (harshEvents._sum.harshAcceleration ?? 0) + (harshEvents._sum.sharpTurns ?? 0);

    res.json({
      data: {
        demanda: {
          passageirosMovimentados: demandaTotal,
          ocupacaoMedia: Number(occupancyAvg._avg.occupancyAverage ?? 0).toFixed(2),
        },
        oferta: {
          kmExecutados: Number(totalKm._sum.kilometersExecuted ?? 0).toFixed(1),
          cumprimentoHorario: Number((scheduleCompliance._avg.scheduleCompliance ?? 0) * 100).toFixed(1),
          desviosRota: routeDeviations._sum.routeDeviations ?? 0,
        },
        conducao: {
          eventosBruscos: conducoes,
        },
        infraestrutura: {
          eventos: infraEvents,
        },
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao calcular indicadores' });
  }
});

router.get('/demanda', async (_req, res) => {
  try {
    const metrics = await prisma.demandMetric.findMany({ take: 200, orderBy: { createdAt: 'desc' }, include: { stop: true, trip: true } });
    res.json({ data: metrics });
  } catch (e) {
    res.status(500).json({ error: 'Erro ao buscar demanda' });
  }
});

router.get('/oferta', async (_req, res) => {
  try {
    const trips = await prisma.trip.findMany({ take: 200, orderBy: { startTime: 'desc' }, include: { vehicle: true, route: true } });
    res.json({ data: trips });
  } catch {
    res.status(500).json({ error: 'Erro ao buscar oferta' });
  }
});

router.get('/conducao', async (_req, res) => {
  try {
    const metrics = await prisma.drivingMetric.findMany({ take: 200, orderBy: { createdAt: 'desc' }, include: { trip: true } });
    res.json({ data: metrics });
  } catch {
    res.status(500).json({ error: 'Erro ao buscar condução' });
  }
});

router.get('/infraestrutura', async (_req, res) => {
  try {
    const events = await prisma.infrastructureEvent.findMany({ take: 200, orderBy: { time: 'desc' } });
    res.json({ data: events });
  } catch {
    res.status(500).json({ error: 'Erro ao buscar infraestrutura' });
  }
});

export default router;


