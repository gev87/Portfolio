---
title: High-traffic delivery platform
summary: Sole frontend developer on a consumer food-delivery product — and a 30% PageSpeed Insights gain.
track: react
client: Menu Group UK LTD
role: Sole frontend developer
year: 2024
stack: [Next.js, React, TypeScript, Redux Toolkit]
featured: true
order: 10
---

## One developer, one platform

For eighteen months I was the only frontend developer on a food-delivery
platform with real traffic. That meant owning the Next.js application
outright: architecture, state, API integration, analytics, and the
environments it shipped through. There was nobody to hand a frontend problem
to, which is a good way to learn which problems are worth solving.

## Making it fast

PageSpeed Insights was the number the business could see, so it was the number
I worked on. Rather than scattering memoization and hoping, I profiled the app
with React Profiler to find which components were re-rendering, how often, and
what was triggering them — then fixed the causes.

The score went up by thirty percent.

<!-- TODO Gevorg: worth adding — which pages you measured, the before/after
     scores, and the two or three fixes that moved the needle most. A reader
     who has done this work will want the specifics; one who hasn’t will trust
     the number more for seeing them. -->

## Deep linking and analytics

I implemented deep linking for app-to-web navigation, so a link followed in
the mobile app resolved to the matching place on the web. I also integrated
Google Analytics, which gave the team engagement data it had not had before.

<!-- TODO Gevorg: if deep linking fixed a measurable drop-off, say so here. -->

## The workflow around the code

Shipping is part of the frontend. I established dedicated development and
testing environments and streamlined the CI/CD around them, so the team had a
route from branch to production that did not depend on anyone’s local machine.
