import { useEffect, useMemo, useRef, useState } from 'react';

export type DemandPoint = {
  stopName: string;
  boarded: number;
  alighted: number;
};

export type OfferStatus = 'EM_ANDAMENTO' | 'SUPRIMIDA' | 'PARCIAL';

export type RealtimeState = {
  // Demanda
  currentOccupancy: number; // 0..1
  capacity: number;
  accuracy: number; // 0..100
  totalPassengersTrip: number;
  lastPoints: DemandPoint[];

  // Oferta
  lat: number;
  lng: number;
  kilometers: number;
  tripStatus: OfferStatus;
  scheduleDeltaMin: number; // atraso(+) / adiantamento(-)
  routeDeviationMin: number;

  // Condução
  harshBraking: number;
  harshAcceleration: number;
  sharpTurns: number;
  idlingMinutes: number;

  // Infraestrutura
  pavementQuality: number; // 1..5
  unusualEvents: Array<{ time: string; type: string; description: string }>;
  // Séries históricas para gráficos
  occupancySeries: Array<{ t: number; value: number }>;
  scheduleDeltaSeries: Array<{ t: number; value: number }>;
  kilometersSeries: Array<{ t: number; value: number }>;
};

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function jitter(value: number, spread: number, min: number, max: number) {
  return clamp(value + (Math.random() * 2 - 1) * spread, min, max);
}

export function useRealtimeMonitor(updateMs = 1500) {
  const capacity = 80; // mock padrão
  const [state, setState] = useState<RealtimeState>(() => ({
    // Demanda
    currentOccupancy: 0.42,
    capacity,
    accuracy: 96.2,
    totalPassengersTrip: 0,
    lastPoints: [
      { stopName: 'Terminal A', boarded: 12, alighted: 0 },
      { stopName: 'Ponto B', boarded: 6, alighted: 2 },
    ],
    // Oferta
    lat: -3.7327,
    lng: -38.527,
    kilometers: 2.4,
    tripStatus: 'EM_ANDAMENTO',
    scheduleDeltaMin: 1,
    routeDeviationMin: 0,
    // Condução
    harshBraking: 0,
    harshAcceleration: 0,
    sharpTurns: 0,
    idlingMinutes: 0,
    // Infraestrutura
    pavementQuality: 4,
    unusualEvents: [],
    occupancySeries: [{ t: Date.now(), value: 42 }],
    scheduleDeltaSeries: [{ t: Date.now(), value: 1 }],
    kilometersSeries: [{ t: Date.now(), value: 2.4 }],
  }));

  const tickRef = useRef<number>(0);

  useEffect(() => {
    const id = setInterval(() => {
      tickRef.current++;
      const boarded = Math.random() < 0.45 ? randInt(0, 6) : 0;
      const alighted = Math.random() < 0.35 ? randInt(0, 4) : 0;

      const nextOccupancy = clamp(
        (state.currentOccupancy * state.capacity + boarded - alighted) / state.capacity,
        0,
        1
      );

      const movedMeters = randInt(80, 220);
      const kmDelta = movedMeters / 1000;

      // rota simples: variar levemente lat/long
      const lat = state.lat + (Math.random() * 2 - 1) * 0.0004;
      const lng = state.lng + (Math.random() * 2 - 1) * 0.0004;

      const scheduleDeltaMin = clamp(jitter(state.scheduleDeltaMin, 0.7, -5, 12), -10, 20);
      const routeDeviationMin =
        Math.random() < 0.05 ? clamp(state.routeDeviationMin + randInt(1, 3), 0, 30) : Math.max(0, state.routeDeviationMin - 1);

      // condução
      const harshBraking = state.harshBraking + (Math.random() < 0.08 ? 1 : 0);
      const harshAcceleration = state.harshAcceleration + (Math.random() < 0.1 ? 1 : 0);
      const sharpTurns = state.sharpTurns + (Math.random() < 0.06 ? 1 : 0);
      const idlingMinutes = Math.random() < 0.2 ? state.idlingMinutes + 1 : Math.max(0, state.idlingMinutes - 1);

      // pavimento e eventos
      const pavementQuality = clamp(jitter(state.pavementQuality, 0.15, 1, 5), 1, 5);
      const unusualEvents = [...state.unusualEvents];
      if (Math.random() < 0.04) {
        const catalog = ['Alagamento', 'Obra', 'Acidente', 'Interdição parcial'];
        const type = catalog[randInt(0, catalog.length - 1)];
        unusualEvents.unshift({
          time: new Date().toLocaleTimeString(),
          type,
          description:
            type === 'Obra' ? 'Obra não sinalizada' : type === 'Alagamento' ? 'Pista molhada / poças' : type === 'Acidente' ? 'Ocorrência leve' : 'Redução de faixa',
        });
        if (unusualEvents.length > 5) unusualEvents.pop();
      }

      const lastPoints = [...state.lastPoints];
      if (boarded || alighted) {
        const names = ['Ponto C', 'Ponto D', 'Ponto E', 'Ponto F'];
        lastPoints.unshift({
          stopName: names[randInt(0, names.length - 1)],
          boarded,
          alighted,
        });
        if (lastPoints.length > 5) lastPoints.pop();
      }

      const accuracy = clamp(jitter(state.accuracy, 0.4, 92, 99.5), 90, 100);

      setState((prev) => {
        const now = Date.now();
        const occPoint = { t: now, value: Math.round(nextOccupancy * 100) };
        const schPoint = { t: now, value: Number(scheduleDeltaMin.toFixed(1)) };
        const kmValue = Number((prev.kilometers + kmDelta).toFixed(3));
        const kmPoint = { t: now, value: kmValue };
        const cap = 60; // manter últimas ~60 amostras
        const occSeries = [...prev.occupancySeries, occPoint].slice(-cap);
        const schSeries = [...prev.scheduleDeltaSeries, schPoint].slice(-cap);
        const kmSeries = [...prev.kilometersSeries, kmPoint].slice(-cap);
        return {
          ...prev,
          currentOccupancy: nextOccupancy,
          accuracy,
          totalPassengersTrip: prev.totalPassengersTrip + boarded,
          lastPoints,
          lat,
          lng,
          kilometers: kmValue,
          scheduleDeltaMin,
          routeDeviationMin,
          harshBraking,
          harshAcceleration,
          sharpTurns,
          idlingMinutes,
          pavementQuality,
          unusualEvents,
          occupancySeries: occSeries,
          scheduleDeltaSeries: schSeries,
          kilometersSeries: kmSeries,
        };
      });
    }, updateMs);
    return () => clearInterval(id);
  }, [state, updateMs]);

  const computed = useMemo(() => {
    return {
      occupancyPercent: Math.round(state.currentOccupancy * 100),
      accuracyPercent: Math.round(state.accuracy),
      scheduleLabel:
        state.scheduleDeltaMin > 1
          ? `Atraso ${state.scheduleDeltaMin.toFixed(0)} min`
          : state.scheduleDeltaMin < -1
          ? `Adiantado ${Math.abs(state.scheduleDeltaMin).toFixed(0)} min`
          : 'No horário',
    };
  }, [state]);

  return { state, computed };
}


