---
title: Arbitrage Bot (Elixir)
epitaph: "Markets are efficient. Your edge probably isn't."
draft: true
date: 2025-09-01
order: 4
---

## What It Was

A crypto arbitrage bot written in Elixir. The idea was to exploit price discrepancies across exchanges — buy low on one, sell high on another, pocket the spread.

## What Went Wrong

The bot worked technically. Elixir's concurrency model was actually great for monitoring multiple exchange feeds simultaneously. But the arbitrage opportunities that existed were either too small to cover fees or too fast to capture — institutional players with co-located servers were already eating every spread worth taking.

## The Lesson

**If your edge depends on being faster than the market, you don't have an edge.** You're competing against firms with million-dollar infrastructure. The arbitrage bot was intellectually interesting (Elixir was fun to learn) but economically doomed from the start.

Also: choosing a project because the tech stack is interesting is a great way to learn a language and a terrible way to make money.
