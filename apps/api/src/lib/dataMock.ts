// Mock de dados em memória para operar sem Prisma/DB
type Vehicle = { id: string; plate: string; type: 'BUS' | 'VAN'; capacity: number; active: boolean };
type Route = { id: string; name: string };
type Trip = {
  id: string;
  vehicleId: string;
  routeId: string;
  startTime: Date;
  endTime?: Date;
  kilometersPlanned: number;
  kilometersExecuted: number;
  scheduleCompliance: number; // 0..1
  routeDeviations: number;
  occupancyAverage?: number;
};
type DemandMetric = {
  id: string;
  tripId: string;
  stopName: string;
  passengersBoarded: number;
  passengersAlighted: number;
  createdAt: Date;
};
type DrivingMetric = {
  id: string;
  tripId: string;
  harshBraking: number;
  harshAcceleration: number;
  sharpTurns: number;
  createdAt: Date;
};
type InfraEvent = {
  id: string;
  time: Date;
  latitude: number;
  longitude: number;
  type: 'FLOOD' | 'WORKS' | 'PAVEMENT_ISSUE' | 'OTHER';
  description?: string;
};

// Dados base
export const vehicles: Vehicle[] = [
  { id: 'v1', plate: 'BUS-001', type: 'BUS', capacity: 80, active: true },
  { id: 'v2', plate: 'BUS-002', type: 'BUS', capacity: 80, active: true },
  { id: 'v3', plate: 'VAN-101', type: 'VAN', capacity: 18, active: true },
];

export const routes: Route[] = [{ id: 'r1', name: 'Linha Central' }];

const start = new Date();
start.setHours(8, 0, 0, 0);

export const trips: Trip[] = [
  {
    id: 't1',
    vehicleId: 'v1',
    routeId: 'r1',
    startTime: start,
    endTime: new Date(start.getTime() + 45 * 60000),
    kilometersPlanned: 20,
    kilometersExecuted: 19.2,
    scheduleCompliance: 0.96,
    routeDeviations: 1,
    occupancyAverage: 0.62,
  },
  {
    id: 't2',
    vehicleId: 'v3',
    routeId: 'r1',
    startTime: new Date(start.getTime() + 60 * 60000),
    endTime: new Date(start.getTime() + 100 * 60000),
    kilometersPlanned: 20,
    kilometersExecuted: 20.5,
    scheduleCompliance: 0.88,
    routeDeviations: 0,
    occupancyAverage: 0.41,
  },
];

export const demandMetrics: DemandMetric[] = [
  { id: 'd1', tripId: 't1', stopName: 'Terminal A', passengersBoarded: 25, passengersAlighted: 5, createdAt: new Date() },
  { id: 'd2', tripId: 't1', stopName: 'Ponto B', passengersBoarded: 10, passengersAlighted: 12, createdAt: new Date() },
  { id: 'd3', tripId: 't2', stopName: 'Terminal A', passengersBoarded: 8, passengersAlighted: 2, createdAt: new Date() },
];

export const drivingMetrics: DrivingMetric[] = [
  { id: 'c1', tripId: 't1', harshBraking: 2, harshAcceleration: 1, sharpTurns: 1, createdAt: new Date() },
  { id: 'c2', tripId: 't2', harshBraking: 0, harshAcceleration: 1, sharpTurns: 0, createdAt: new Date() },
];

export const infraEvents: InfraEvent[] = [
  { id: 'i1', time: new Date(), latitude: -3.74, longitude: -38.53, type: 'PAVEMENT_ISSUE', description: 'Buraco na via próximo ao Ponto B' },
];

export function getSummary() {
  // Demanda
  const boarded = demandMetrics.reduce((s, m) => s + m.passengersBoarded, 0);
  const alighted = demandMetrics.reduce((s, m) => s + m.passengersAlighted, 0);
  const demandaTotal = boarded + alighted;
  const ocupacaoMedia =
    trips.length > 0 ? (trips.reduce((s, t) => s + (t.occupancyAverage || 0), 0) / trips.length).toFixed(2) : '0.00';

  // Oferta
  const kmExecutados = trips.reduce((s, t) => s + (t.kilometersExecuted || 0), 0).toFixed(1);
  const cumprimento = trips.length > 0 ? ((trips.reduce((s, t) => s + (t.scheduleCompliance || 0), 0) / trips.length) * 100).toFixed(1) : '0.0';
  const desvios = trips.reduce((s, t) => s + (t.routeDeviations || 0), 0);

  // Condução
  const conducoes = drivingMetrics.reduce((s, d) => s + d.harshBraking + d.harshAcceleration + d.sharpTurns, 0);

  // Infra
  const eventos = infraEvents.length;

  return {
    demanda: { passageirosMovimentados: demandaTotal, ocupacaoMedia },
    oferta: { kmExecutados, cumprimentoHorario: cumprimento, desviosRota: desvios },
    conducao: { eventosBruscos: conducoes },
    infraestrutura: { eventos },
  };
}

// Mock de dados em memória para operar sem Prisma/DB
type Vehicle = { id: string; plate: string; type: 'BUS' | 'VAN'; capacity: number; active: boolean };
type Route = { id: string; name: string };
type Trip = {
  id: string;
  vehicleId: string;
  routeId: string;
  startTime: Date;
  endTime?: Date;
  kilometersPlanned: number;
  kilometersExecuted: number;
  scheduleCompliance: number; // 0..1
  routeDeviations: number;
  occupancyAverage?: number;
};
type DemandMetric = {
  id: string;
  tripId: string;
  stopName: string;
  passengersBoarded: number;
  passengersAlighted: number;
  createdAt: Date;
};
type DrivingMetric = {
  id: string;
  tripId: string;
  harshBraking: number;
  harshAcceleration: number;
  sharpTurns: number;
  createdAt: Date;
};
type InfraEvent = {
  id: string;
  time: Date;
  latitude: number;
  longitude: number;
  type: 'FLOOD' | 'WORKS' | 'PAVEMENT_ISSUE' | 'OTHER';
  description?: string;
};

// Dados base
export const vehicles: Vehicle[] = [
  { id: 'v1', plate: 'BUS-001', type: 'BUS', capacity: 80, active: true },
  { id: 'v2', plate: 'BUS-002', type: 'BUS', capacity: 80, active: true },
  { id: 'v3', plate: 'VAN-101', type: 'VAN', capacity: 18, active: true },
];

export const routes: Route[] = [{ id: 'r1', name: 'Linha Central' }];

const start = new Date();
start.setHours(8, 0, 0, 0);

export const trips: Trip[] = [
  {
    id: 't1',
    vehicleId: 'v1',
    routeId: 'r1',
    startTime: start,
    endTime: new Date(start.getTime() + 45 * 60000),
    kilometersPlanned: 20,
    kilometersExecuted: 19.2,
    scheduleCompliance: 0.96,
    routeDeviations: 1,
    occupancyAverage: 0.62,
  },
  {
    id: 't2',
    vehicleId: 'v3',
    routeId: 'r1',
    startTime: new Date(start.getTime() + 60 * 60000),
    endTime: new Date(start.getTime() + 100 * 60000),
    kilometersPlanned: 20,
    kilometersExecuted: 20.5,
    scheduleCompliance: 0.88,
    routeDeviations: 0,
    occupancyAverage: 0.41,
  },
];

export const demandMetrics: DemandMetric[] = [
  { id: 'd1', tripId: 't1', stopName: 'Terminal A', passengersBoarded: 25, passengersAlighted: 5, createdAt: new Date() },
  { id: 'd2', tripId: 't1', stopName: 'Ponto B', passengersBoarded: 10, passengersAlighted: 12, createdAt: new Date() },
  { id: 'd3', tripId: 't2', stopName: 'Terminal A', passengersBoarded: 8, passengersAlighted: 2, createdAt: new Date() },
];

export const drivingMetrics: DrivingMetric[] = [
  { id: 'c1', tripId: 't1', harshBraking: 2, harshAcceleration: 1, sharpTurns: 1, createdAt: new Date() },
  { id: 'c2', tripId: 't2', harshBraking: 0, harshAcceleration: 1, sharpTurns: 0, createdAt: new Date() },
];

export const infraEvents: InfraEvent[] = [
  { id: 'i1', time: new Date(), latitude: -3.74, longitude: -38.53, type: 'PAVEMENT_ISSUE', description: 'Buraco na via próximo ao Ponto B' },
];

export function getSummary() {
  // Demanda
  const boarded = demandMetrics.reduce((s, m) => s + m.passengersBoarded, 0);
  const alighted = demandMetrics.reduce((s, m) => s + m.passengersAlighted, 0);
  const demandaTotal = boarded + alighted;
  const ocupacaoMedia =
    trips.length > 0 ? (trips.reduce((s, t) => s + (t.occupancyAverage || 0), 0) / trips.length).toFixed(2) : '0.00';

  // Oferta
  const kmExecutados = trips.reduce((s, t) => s + (t.kilometersExecuted || 0), 0).toFixed(1);
  const cumprimento = trips.length > 0 ? ((trips.reduce((s, t) => s + (t.scheduleCompliance || 0), 0) / trips.length) * 100).toFixed(1) : '0.0';
  const desvios = trips.reduce((s, t) => s + (t.routeDeviations || 0), 0);

  // Condução
  const conducoes = drivingMetrics.reduce((s, d) => s + d.harshBraking + d.harshAcceleration + d.sharpTurns, 0);

  // Infra
  const eventos = infraEvents.length;

  return {
    demanda: { passageirosMovimentados: demandaTotal, ocupacaoMedia },
    oferta: { kmExecutados, cumprimentoHorario: cumprimento, desviosRota: desvios },
    conducao: { eventosBruscos: conducoes },
    infraestrutura: { eventos },
  };
}


