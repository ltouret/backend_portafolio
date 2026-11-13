---
title: Avaj Launcher
summary: An aircraft and weather simulation in Java, built around the Observer, Singleton and Factory design patterns.
stack: [Java, OOP, UML]
date: 2026-04-06
---

## What it is

A 42 school project in Java. The simulator reads a scenario file listing aircraft and the number of weather changes, runs the simulation, and writes every event to `simulation.txt`.

## Design

- **Observer:** each aircraft registers with a `WeatherTower` and is notified when the weather changes.
- **Singleton:** `WeatherProvider`, `AircraftFactory` and `Logger` each have a single instance.
- **Factory:** `AircraftFactory` creates a `Balloon`, `JetPlane` or `Helicopter` from its type name.
- A UML class diagram documents the structure.

## Simulation

- Each aircraft type reacts to sun, rain, fog and snow in its own way, changing its coordinates and logging a message.
- An aircraft that reaches height 0 lands and unregisters from the tower.
- A parser validates the scenario file. Test scenarios cover valid and invalid input and height edge cases.
