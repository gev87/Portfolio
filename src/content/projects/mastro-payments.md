---
title: Payments for a pre-launch startup
summary: Joined a food-delivery startup before release and shipped the integration that let it take money.
track: react
client: Mastro LLC
role: Sole frontend developer
year: 2025
stack: [React, Zustand, SCSS]
images:
  - src: /images/mastro.jpg
    alt: "Mastro homepage: “Mastro is a weekly meal kit delivery” hero with a subscribe button, a customer quote, and a cooking video."
  - src: /images/mastro-2.jpg
    alt: "A Mastro meal kit: the orange “the hunger” box with pre-portioned ingredients, fresh vegetables and a recipe card."
featured: true
order: 30
---

## Joining before launch

I came onto Mastro as the sole frontend developer while the product was still
pre-release — an Armenian food-delivery startup with a launch date and a
platform that could not yet take money.

## The integration that mattered

I implemented payment integration end to end. That was the piece standing
between a working demo and a business: until it landed, the platform could
show you food and take your order, but could not complete the transaction.
After it landed, the platform was commercially operational.

<!-- TODO Gevorg: which payment provider, and what made the integration
     non-trivial — 3-D Secure, retries, webhook reconciliation, currency? This
     is the strongest single item on the React side of your portfolio and it
     currently reads thinner than it was. -->

## Clearing the way for release

Alongside the integration I rebuilt the weaker areas of the interface and
worked through the outstanding defects ahead of production. Built in React
with Zustand for state and SCSS for styling — a deliberately small stack for a
small team on a deadline.
