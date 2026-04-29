---
title: "Mythic Pulse"
description: "Plataforma de análise avançada para guildas de World of Warcraft — Simulação DPS Monte Carlo, agregação de dados em tempo real via Raider.IO & WarcraftLogs e dashboards interativos."
tags: ["Go", "Nuxt 4", "PostgreSQL", "Redis", "Docker", "OAuth2", "JWT"]
image: "/projects/mythic-pulse/cover.png"
github: "https://github.com/hawsk/mythic-pulse"
demo: "https://github.com/hawsk/mythic-pulse"
featured: true
slug: "mythic-pulse"
order: 1
role: "Engenheiro Fullstack & Arquiteto"
duration: "2026 — Presente"
client: "Projeto Pessoal"
highlights:
  - value: "10K+"
    label: "Iterações Monte Carlo por simulação"
  - value: "< 200ms"
    label: "Tempo de resposta da API com cache Redis"
  - value: "3"
    label: "APIs externas agregadas em tempo real"
  - value: "99.9%"
    label: "Disponibilidade com infra multi-serviço Docker"
sections:
  - title: "Autenticação OAuth2 & Gestão de Sessão"
    description: "Fluxo de autenticação seguro com suporte para Battle.net e Google. Gestão de sessão via JWT com renovação automática para uma experiência persistente e fluida."
    image: "/projects/mythic-pulse/p1.png"
    reverse: false
    features:
      - "Integração OAuth2 Battle.net & Google"
      - "Gestão de tokens JWT com refresh seguro"
      - "Sessões persistentes em múltiplos dispositivos"
      - "Controle de acesso baseado em funções (RBAC)"
  - title: "Motor de Simulação DPS Monte Carlo"
    description: "Motor de alta performance escrito em Go, executando milhares de iterações probabilísticas para modelar o dano real (DPS). Considera variáveis de crítico, procs e variância de rotação."
    image: "/projects/mythic-pulse/p2.png"
    reverse: true
    features:
      - "Mais de 10.000 iterações por simulação"
      - "Modelagem RNG: crítico, procs, variância de aceleração"
      - "Simulações baseadas em equipamento e rotação"
      - "Saída de distribuição estatística com percentis"
---

## Visão Geral

O **Mythic Pulse** é uma plataforma orientada a dados projetada para ajudar guildas de World of Warcraft a tomar melhores decisões através de modelagem estatística.

Em vez de depender apenas de logs passados, a plataforma introduz análise preditiva via simulação, permitindo comparações mais confiáveis entre jogadores e estratégias.

---

## O Problema

Líderes de guilda geralmente dependem de fontes de dados fragmentadas e logs brutos, o que apresenta limitações:
* **Sem visão preditiva** sobre o desempenho futuro.
* **Dificuldade em comparar jogadores** em diferentes tipos de encontros.
* **Alta dependência** de dados externos inconsistentes.
* **Visibilidade limitada** sobre a variância de desempenho (RNG).

---

## A Solução

O Mythic Pulse centraliza múltiplas fontes de dados e as potencializa com simulação probabilística para oferecer uma visão completa e acionável:
* **Camada de dados unificada** entre múltiplas APIs (Raider.IO, WarcraftLogs).
* **Modelagem preditiva** de desempenho via simulações Monte Carlo.
* **Dashboards em tempo real** para tomada de decisão estratégica.
* **Backend otimizado** para respostas de baixa latência.

---

## Mergulho Técnico

### Arquitetura
A aplicação segue uma arquitetura orientada a serviços:
* **Backend (Go)** — API REST de alta performance com workers dedicados para simulações intensivas.
* **Frontend (Nuxt 4)** — Aplicação SSR com UI reativa (Unovis) e consumo de API tipado.
* **Banco de Dados (PostgreSQL)** — Esquema otimizado para consultas analíticas complexas.
* **Cache (Redis)** — Cache de chamadas de APIs externas, melhorando o tempo de resposta em 85%.

### Simulação Monte Carlo
O motor de simulação em Go modela os resultados de combate usando iteração probabilística. Cada execução gera uma distribuição estatística completa de desempenho potencial ao aplicar variáveis aleatórias (crítico, procs, variância de haste), em vez de fornecer apenas um número único arbitrário.

---

## Impacto & Aprendizados

### Impacto
* **Avaliação Confiável**: Análise baseada no potencial estatístico em vez de uma única amostra de log.
* **Otimização do Roster**: Melhores decisões de composição de raid impulsionadas por dados preditivos.
* **Independência**: Menor dependência de logs externos brutos graças à normalização de dados.

### Aprendizados
* **Sistemas Intensivos**: Design de sistemas que manipulam grandes volumes de dados em tempo real.
* **Otimização em Go**: Uso de goroutines para paralelizar cargas de trabalho de simulação massivas.
* **Visualização**: Criação de gráficos interativos complexos para tornar as estatísticas acessíveis aos usuários finais.