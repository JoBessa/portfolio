---
title: "Mythic Pulse"
description: "Plateforme d'analyse avancée pour les guildes World of Warcraft — Simulation DPS Monte Carlo, agrégation de données en temps réel via Raider.IO & WarcraftLogs, et tableaux de bord interactifs."
tags: ["Go", "Nuxt 4", "PostgreSQL", "Redis", "Docker", "OAuth2", "JWT"]
image: "/projects/mythic-pulse/cover.png"
github: "https://github.com/hawsk/mythic-pulse"
demo: "https://github.com/hawsk/mythic-pulse"
featured: true
slug: "mythic-pulse"
order: 1
role: "Ingénieur Fullstack & Architecte"
duration: "2026 — Présent"
client: "Projet Personnel"
highlights:
  - value: "10K+"
    label: "Itérations Monte Carlo par simulation"
  - value: "< 200ms"
    label: "Temps de réponse API avec cache Redis"
  - value: "3"
    label: "APIs externes agrégées en temps réel"
  - value: "99.9%"
    label: "Disponibilité avec infra multi-services Docker"
sections:
  - title: "Authentification OAuth2 & Gestion de Session"
    description: "Flux d'authentification sécurisé supportant Battle.net et Google. La gestion des sessions via JWT avec rafraîchissement automatique garantit une connexion persistante et fluide."
    image: "/projects/mythic-pulse/p1.png"
    reverse: false
    features:
      - "Intégration OAuth2 Battle.net & Google"
      - "Gestion des tokens JWT avec rafraîchissement sécurisé"
      - "Sessions persistantes multi-appareils"
      - "Contrôle d'accès basé sur les rôles (RBAC)"
  - title: "Moteur de Simulation DPS Monte Carlo"
    description: "Moteur haute performance écrit en Go, exécutant des milliers d'itérations probabilistes pour modéliser la production réelle de dégâts. Prend en compte le crit, les procs et la variance de rotation."
    image: "/projects/mythic-pulse/p2.png"
    reverse: true
    features:
      - "Plus de 10 000 itérations par simulation"
      - "Modélisation RNG : crit, procs, variance de hâte"
      - "Simulations basées sur l'équipement et la rotation"
      - "Sortie de distribution statistique avec centiles"
---

## Vue d'ensemble

**Mythic Pulse** est une plateforme axée sur les données conçue pour aider les guildes World of Warcraft à prendre de meilleures décisions grâce à la modélisation statistique.

Au lieu de se baser uniquement sur les logs passés, la plateforme introduit l'analyse prédictive par simulation, permettant des comparaisons plus fiables entre les joueurs et les stratégies.

---

## Problématique

Les chefs de guilde s'appuient généralement sur des sources de données fragmentées, ce qui limite l'analyse :
* **Aucune vision prédictive** sur les performances futures.
* **Difficulté de comparaison** entre joueurs sur différents combats.
* **Forte dépendance** aux