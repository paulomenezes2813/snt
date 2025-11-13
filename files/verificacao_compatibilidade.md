# Verificação de Compatibilidade - Solução SNT vs Edital ARCE

## Análise Comparativa

### 1. DURAÇÃO DO PILOTO

| Item | Edital ARCE | Solução SNT | Status |
|------|-------------|-------------|--------|
| **Duração** | Até 3 meses (prorrogável) | 3 meses | ✅ COMPATÍVEL |
| **Fases** | 4 fases: PoC, Ajustes, Piloto, Avaliação | 4 fases idênticas | ✅ COMPATÍVEL |

---

### 2. QUANTIDADE DE VEÍCULOS

| Item | Edital ARCE | Solução SNT | Status |
|------|-------------|-------------|--------|
| **Piloto** | Não especifica mínimo exato | 15 veículos | ⚠️ AJUSTAR |
| **Tipos** | Ônibus + Vans | Ônibus + Vans | ✅ COMPATÍVEL |

**⚠️ PROBLEMA IDENTIFICADO:**
- Edital não especifica quantidade exata para piloto
- Solução propõe 15 veículos
- **RECOMENDAÇÃO:** Reduzir para ser mais conservador

---

### 3. LINHAS E EMPRESAS

| Item | Edital ARCE | Solução SNT | Status |
|------|-------------|-------------|--------|
| **Linhas** | Mínimo 3 linhas | 3 linhas | ✅ COMPATÍVEL |
| **Empresas** | Mínimo 2 empresas | 2 empresas | ✅ COMPATÍVEL |
| **Rotas** | Fortaleza + município metropolitano | Conforme | ✅ COMPATÍVEL |

---

### 4. HORÁRIOS DE TESTE

| Item | Edital ARCE | Solução SNT | Status |
|------|-------------|-------------|--------|
| **Período** | Diurno e noturno | Diurno e noturno | ✅ COMPATÍVEL |
| **Cobertura** | Diferentes condições | 24/7 monitoramento | ✅ COMPATÍVEL |

---

### 5. DADOS A MONITORAR

| Dado | Edital ARCE | Solução SNT | Status |
|------|-------------|-------------|--------|
| **Demanda transportada** | ✅ Exigido | ✅ Implementado | ✅ COMPATÍVEL |
| **Embarque/desembarque por trecho** | ✅ Exigido | ✅ Sensor fusion | ✅ COMPATÍVEL |
| **Viagens realizadas** | ✅ Exigido | ✅ GPS tracking | ✅ COMPATÍVEL |
| **Cumprimento horários** | ✅ Exigido | ✅ Timestamp analysis | ✅ COMPATÍVEL |
| **Rotas percorridas** | ✅ Exigido | ✅ GPS + IMU | ✅ COMPATÍVEL |
| **Quilometragem** | ✅ Exigido | ✅ GPS odometer | ✅ COMPATÍVEL |
| **Condução veicular** | ✅ Exigido | ✅ OBD-II + IMU | ✅ COMPATÍVEL |
| **Infraestrutura viária** | ✅ Exigido | ✅ Dashcam + IA | ✅ COMPATÍVEL |
| **Segurança pública** | ✅ Desejável | ✅ Botão pânico + câmeras | ✅ COMPATÍVEL |

---

### 6. REQUISITOS TÉCNICOS

| Requisito | Edital ARCE | Solução SNT | Status |
|-----------|-------------|-------------|--------|
| **Coleta automática** | ✅ Obrigatório | ✅ Sim | ✅ COMPATÍVEL |
| **Tempo real** | ✅ Preferencial | ✅ < 5s latência | ✅ COMPATÍVEL |
| **Integração sistemas ARCE** | ✅ Necessário | ✅ API REST/GraphQL | ✅ COMPATÍVEL |
| **Interoperabilidade** | ✅ Necessário | ✅ Sim | ✅ COMPATÍVEL |
| **Rastreabilidade** | ✅ Obrigatório | ✅ Blockchain | ✅ COMPATÍVEL |
| **Segurança informação** | ✅ Obrigatório | ✅ TLS 1.3 + AES-256 | ✅ COMPATÍVEL |
| **LGPD** | ✅ Obrigatório | ✅ Compliance by design | ✅ COMPATÍVEL |
| **IA** | ✅ Desejável | ✅ Múltiplos modelos | ✅ COMPATÍVEL |

---

### 7. MÉTRICAS DE DESEMPENHO

| Métrica | Edital ARCE | Solução SNT | Status |
|---------|-------------|-------------|--------|
| **Acurácia contagem** | Não fixado previamente | ≥ 95% | ✅ COMPATÍVEL |
| **Confiabilidade transmissão** | Não fixado previamente | ≥ 98% | ✅ COMPATÍVEL |
| **Latência** | Não fixado previamente | ≤ 5s | ✅ COMPATÍVEL |
| **Cobertura operacional** | Não fixado previamente | ≥ 95% | ✅ COMPATÍVEL |

**✅ CONFORME:** Edital diz que métricas serão reveladas durante testes

---

### 8. CUSTOS

| Item | Edital ARCE | Solução SNT | Status |
|------|-------------|-------------|--------|
| **Fase piloto** | **SEM CUSTOS para ARCE** | R$ 1.112.655 | ❌ INCOMPATÍVEL |
| **Quem paga** | Proponente | Proponente | ✅ COMPATÍVEL |

**❌ PROBLEMA CRÍTICO:**
- Edital: "fase experimental **sem custos diretos** para a Administração Pública"
- Solução: Apresentou orçamento de R$ 1.112.655
- **ERRO:** Orçamento não deveria existir pois é CPSI sem custos!

---

### 9. FASES DO TESTE

| Fase | Edital ARCE | Solução SNT | Status |
|------|-------------|-------------|--------|
| **1. PoC** | ✅ Demonstração inicial | ✅ Semanas 1-4 | ✅ COMPATÍVEL |
| **2. Ajustes** | ✅ Calibração | ✅ Semanas 3-4 | ✅ COMPATÍVEL |
| **3. Piloto Real** | ✅ Ambiente real | ✅ Semanas 5-12 | ✅ COMPATÍVEL |
| **4. Avaliação** | ✅ Análise resultados | ✅ Semanas 13-16 | ✅ COMPATÍVEL |

---

### 10. CRONOGRAMA

| Aspecto | Edital ARCE | Solução SNT | Status |
|---------|-------------|-------------|--------|
| **Duração total** | Até 3 meses (prorrogável) | 3 meses fixos + 1 mês decisão | ⚠️ AJUSTAR |
| **Iterativo** | ✅ Sim, com repetições | ✅ Sim | ✅ COMPATÍVEL |
| **Flexível** | ✅ Ajustes conforme necessário | ✅ Previsto | ✅ COMPATÍVEL |

---

## PROBLEMAS IDENTIFICADOS

### 🔴 CRÍTICOS (Impedem participação)

1. **ORÇAMENTO APRESENTADO**
   - **Problema:** Documento apresenta orçamento de R$ 1.112.655
   - **Edital:** "sem custos diretos para a Administração Pública"
   - **Impacto:** CPSI = proponente arca com todos os custos do piloto
   - **Correção:** REMOVER todas referências a custos do piloto pois isso é responsabilidade da empresa proponente

### 🟡 IMPORTANTES (Precisam ajuste)

2. **QUANTIDADE DE VEÍCULOS**
   - **Problema:** Propõe 15 veículos mas edital não especifica
   - **Edital:** "pelo menos três linhas distintas, com possibilidade de ampliação"
   - **Sugestão:** Ser mais flexível na proposta inicial (começar menor)

3. **CRONOGRAMA RÍGIDO**
   - **Problema:** Propõe 3 meses fixos + 1 mês
   - **Edital:** "até três meses, prorrogáveis"
   - **Sugestão:** Deixar mais flexível

---

## AJUSTES NECESSÁRIOS

### Ajuste 1: REMOVER ORÇAMENTO DO PILOTO

**ANTES:**
```
Investimento Fase Piloto (3 meses): R$ 1.112.655
- Hardware: R$ 79.500
- Software: R$ 310.000
- Infraestrutura: R$ 33.600
- RH: R$ 612.000
- Outros: R$ 77.555
```

**DEPOIS:**
```
FASE PILOTO (CPSI)
- Duração: Até 3 meses (prorrogável)
- Sem custos para ARCE (conforme LC 182/2021)
- Todos os custos são de responsabilidade da proponente
- Investimento estimado da proponente: R$ 1.112.655
  (não repassado à ARCE durante fase experimental)
```

### Ajuste 2: FLEXIBILIZAR QUANTIDADE

**ANTES:**
```
15 veículos fixos
3 linhas
2 empresas
```

**DEPOIS:**
```
Abordagem Progressiva:
- Fase 1 (PoC): 3-5 veículos, 1-2 linhas
- Fase 2 (Piloto): 10-15 veículos, 3 linhas
- Mínimo 2 empresas operadoras
- Expansão conforme necessidade e resultados
```

### Ajuste 3: CRONOGRAMA FLEXÍVEL

**ANTES:**
```
Mês 1: PoC
Mês 2: Piloto
Mês 3: Avaliação
Mês 4: Decisão
```

**DEPOIS:**
```
Cronograma Referencial (ajustável):
- Até 4 semanas: PoC
- 6-8 semanas: Piloto em ambiente real
- 2-4 semanas: Avaliação
- Duração total: até 3 meses (prorrogável conforme necessidade)
```

---

## COMPATIBILIDADES POSITIVAS

### ✅ PONTOS FORTES DA SOLUÇÃO

1. **Tecnologia Robusta**
   - Redundância tripla de sensores (excelente)
   - Blockchain para rastreabilidade (destaque)
   - IA avançada (diferencial competitivo)

2. **Conformidade Total**
   - LGPD by design
   - Todos os dados exigidos são capturados
   - Integração com sistemas ARCE prevista

3. **Abordagem Profissional**
   - Fases bem definidas
   - Métricas claras
   - Metodologia sólida

4. **Escalabilidade**
   - Pronta para expansão pós-piloto
   - Arquitetura cloud escalável
   - Modular e flexível

---

## RECOMENDAÇÕES FINAIS

### Para adequar ao edital ARCE:

1. ✅ **MANTER:**
   - Arquitetura técnica
   - Especificações do STB
   - Abordagem de IA
   - Metodologia de testes
   - Métricas de sucesso

2. ⚠️ **AJUSTAR:**
   - Remover orçamento do piloto (é CPSI!)
   - Flexibilizar quantidade de veículos
   - Tornar cronograma mais adaptável
   - Enfatizar que custos são da proponente

3. ➕ **ADICIONAR:**
   - Seção explicando investimento da empresa (não da ARCE)
   - Clarificar que piloto é sem custos para ARCE
   - Evidenciar conformidade com LC 182/2021
   - Destacar que contratação definitiva (se aprovada) será posterior

4. ❌ **REMOVER:**
   - Análise de ROI para ARCE no piloto
   - Custos detalhados do piloto (manter só estimativa geral)
   - Qualquer sugestão de pagamento durante fase experimental

---

## CONCLUSÃO

### Status Geral: ⚠️ PARCIALMENTE COMPATÍVEL

**Compatibilidade Técnica:** ✅ 95% (Excelente!)
**Compatibilidade Financeira:** ❌ 40% (Precisa ajuste crítico)
**Compatibilidade Operacional:** ✅ 90% (Muito boa)

### Ação Imediata Necessária:

🔴 **CRÍTICO:** Reformular seção de custos para refletir que é CPSI sem custos para ARCE

O documento técnico está **excelente**, mas precisa ser **reformulado financeiramente** para refletir corretamente que é uma **CPSI** onde a **proponente arca com todos os custos da fase experimental**.

