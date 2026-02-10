---
title: MoltHome
status: active
oneliner: Crowdsourced compute for AI agents
description: "Everyone's buying $600 Mac Minis to run OpenClaw agents 24/7. Meanwhile, millions of machines sit idle 20 hours a day. MoltHome connects people who want to run agent workloads with people who have spare compute. Think Airbnb for your CPU — except your guest is an autonomous AI that never sleeps and never complains about the towels."
draft: true
date: 2026-02-05
week: 2
order: 1
milestones:
  - date: "2026-02-05"
    text: "Project started. Identified the compute mismatch problem."
  - date: "2026-02-07"
    text: "Validated demand — 3/4 interviewees would pay $20/mo."
  - date: "2026-02-09"
    text: "Started workload isolation layer. gVisor > Docker for trust model."
---

## The Problem

The agentic economy has a hardware problem. OpenClaw hit 15k stars and suddenly everyone wants their own fleet of AI agents running 24/7. The default answer is "buy a Mac Mini for $600 and leave it on." That's insane.

Most personal computers sit idle 80% of the time. There's an ocean of unused compute in every home and office. The mismatch is obvious.

## What MoltHome Does

MoltHome is a two-sided marketplace:

- **Compute sellers** install a lightweight daemon on their machine. When idle, it accepts sandboxed workloads from the network.
- **Compute buyers** deploy their agent workloads (OpenClaw, custom agents, cron-based automation) through MoltHome instead of buying dedicated hardware.

The buyer gets always-on compute at a fraction of the cost. The seller earns passive income from a machine they already own.

## The Hard Part

Running arbitrary workloads on untrusted machines is fundamentally a trust problem. This is where the moat lives — not in the marketplace UI, but in the isolation layer.

The current approach uses gVisor-based sandboxing with:
- Resource isolation (CPU, memory, disk quotas)
- Network policy enforcement
- Workload attestation and verification
- Encrypted state that the host machine cannot inspect

## Current Status

Building the workload isolation layer. Once sandboxing is solid, the marketplace is straightforward.
