import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { VehicleType } from '@prisma/client';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { type } = req.query;
    const where =
      type && typeof type === 'string'
        ? { type: (String(type).toUpperCase() as keyof typeof VehicleType) in VehicleType ? (String(type).toUpperCase() as VehicleType) : undefined }
        : {};
    const vehicles = await prisma.vehicle.findMany({ where, orderBy: { plate: 'asc' } });
    res.json({ data: vehicles });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao listar veículos' });
  }
});

export default router;


