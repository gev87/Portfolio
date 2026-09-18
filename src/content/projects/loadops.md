---
title: LoadOps — logistics TMS
summary: Cloud-based Transportation Management System, and the component library that standardized its UI.
track: react
client: Optym Armenia LLC
role: Frontend engineer
year: 2023
stack: [React, TypeScript, MobX, Material-UI, Storybook]
featured: true
order: 20
images:
  - src: /images/loadops.jpg
    alt: "LoadOps homepage: “Simplify dispatch” hero above a laptop showing the TMS dashboard, with finance performance, load summary, driver availability and a route map."
---

## The product

LoadOps is a cloud-based Transportation Management System — the software a
logistics operation runs its loads, drivers and dispatch through. I worked on
it for roughly eighteen months in React and TypeScript, with MobX and the
Context API holding state.

It is a dense, data-heavy product. The interesting problems were less about
any single screen and more about keeping dozens of them coherent.

## The component library

New screens were taking longer than they should have, and they were drifting
apart visually as they went. I designed and built a reusable component library
on Material-UI, documented in Storybook, so that a new screen started from
components that already existed and already agreed with each other.

Two things came out of it: screens got faster to build, and the visual
inconsistency stopped compounding.

<!-- TODO Gevorg: how many components ended up in the library, and roughly how
     much faster a new screen became? Even a rough figure is worth more than
     "faster". -->

## Keeping the data straight

The platform pulled from several sources over REST. I integrated them and kept
the data flowing reliably across the product — which in a TMS is most of the
job, because a dispatcher acting on a stale load is worse than one acting on
no load at all.
