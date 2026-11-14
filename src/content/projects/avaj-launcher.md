---
title: Avaj Launcher
summary: A small aircraft and weather simulation in Java, designed from a UML class diagram around the Observer, Singleton and Factory patterns.
stack: [Java, OOP, UML]
date: 2026-04-06
---

## What it is

A 42 school project, and an exercise in design more than in code. The subject hands you a UML class diagram, and the job is to implement it faithfully in Java. The program reads a scenario file listing aircraft and a number of weather changes, runs the simulation and writes every event to `simulation.txt`.

## Design

A `WeatherTower` is the subject of an Observer pattern. Each aircraft registers with it and is told when the weather changes. A balloon, a jet and a helicopter react differently to sun, rain, fog and snow, and an aircraft that reaches height 0 lands and unregisters itself.

Aircraft are never built directly. An `AircraftFactory` creates them from the type name in the scenario file. The factory, the weather provider and the logger are singletons.

## Input checking

The parser rejects bad scenarios before the simulation starts. The repo has test scenarios for the valid and invalid cases, including heights at the edge of the allowed range.
