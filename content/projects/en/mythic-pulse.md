---
title: "Mythic Pulse"
description: "Advanced analytics platform for World of Warcraft guilds — Monte Carlo DPS simulation, real-time data aggregation from Raider.IO & WarcraftLogs, and interactive performance dashboards."
tags: ["Go", "Nuxt 4", "PostgreSQL", "Redis", "Docker", "OAuth2", "JWT"]
image: "/projects/mythic-pulse/cover.png"
github: "https://github.com/hawsk/mythic-pulse"
demo: "https://github.com/hawsk/mythic-pulse"
featured: true
slug: "mythic-pulse"
order: 1
role: "Fullstack Engineer & Architect"
duration: "2026 — Present"
client: "Personal Project"
highlights:
  - value: "10K+"
    label: "Monte Carlo iterations per simulation"
  - value: "< 200ms"
    label: "API response time with Redis cache"
  - value: "3"
    label: "External APIs aggregated in real-time"
  - value: "99.9%"
    label: "Uptime with Docker multi-service infra"
sections:
  - title: "OAuth2 Authentication & Session Management"
    description: "Secure authentication flow supporting Battle.net and Google. JWT-based session management with automatic token refresh ensures persistent, frictionless login across devices."
    image: "/projects/mythic-pulse/p1.png"
    reverse: false
    features:
      - "Battle.net & Google OAuth2 integration"
      - "JWT token management with secure refresh"
      - "Persistent sessions across devices"
      - "Role-based access control (RBAC)"
  - title: "Monte Carlo DPS Simulation Engine"
    description: "High-performance simulation engine written in Go, running thousands of probabilistic iterations to model real DPS output. Accounts for crit, procs, and rotation variance."
    image: "/projects/mythic-pulse/p2.png"
    reverse: true
    features:
      - "10,000+ iterations per simulation run"
      - "RNG modeling: crit, procs, haste variance"
      - "Rotation and gear-based simulations"
      - "Statistical distribution output with percentiles"
---

## Overview

**Mythic Pulse** is a data-driven platform designed to help World of Warcraft guilds make better decisions using statistical modeling.

Instead of relying only on past logs, the platform introduces predictive analysis through simulation, enabling more reliable comparisons between players and strategies.

---

## Problem

Guild leaders typically rely on fragmented data sources and raw logs, which limits analysis:
* **No predictive insight** into future performance.
* **Difficulty comparing players** across different encounter types.
* **High dependency** on inconsistent external data.
* **Limited visibility** into performance variance (RNG).

---

## Solution

Mythic Pulse centralizes multiple data sources and augments them with probabilistic simulation to provide a complete and actionable view:
* **Unified data layer** across multiple APIs (Raider.IO, WarcraftLogs).
* **Predictive performance modeling** via Monte Carlo simulations.
* **Real-time dashboards** for strategic decision-making.
* **Optimized backend** for low-latency responses.

---

## Technical Deep Dive

### Architecture
The application follows a service-oriented architecture:
* **Backend (Go)** — High-performance REST API with dedicated workers for compute-intensive simulations.
* **Frontend (Nuxt 4)** — SSR application with reactive UI (Unovis) and typed API consumption.
* **Database (PostgreSQL)** — Performance-oriented schema for complex analytical queries.
* **Cache (Redis)** — Request-level caching for external APIs, improving response times by 85%.

### Monte Carlo Simulation
The Go-based simulation engine models combat outcomes through probabilistic iteration. Each run generates a complete statistical distribution of potential performance by applying random combat variables (crit, procs, haste variance), rather than providing an arbitrary single number.

---

## Impact & Learnings

### Impact
* **Reliable Evaluation**: Analysis based on statistical potential rather than a single log sample.
* **Roster Optimization**: Better raid composition decisions driven by predictive data.
* **Independence**: Reduced reliance on raw external logs through data normalization.

### Learnings
* **Data-Intensive Systems**: Designing systems that handle high volumes of real-time data.
* **Go Optimization**: Using goroutines to parallelize massive simulation workloads.
* **Visualization**: Building complex interactive charts to make statistics accessible to end-users.