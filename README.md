# toDoApp

This is the toDoApp Frontend that works with backend from golang using framework called [chi](https://github.com/go-chi/chi).

In this project we will be using [Vue.js](https://vuejs.org/) as our frontend framework and [TypeScript](https://www.typescriptlang.org/) as our programming language.

For more information about the backend, please visit [here](https://github.com/yogisyo16/mongo-todo-app).

# Root Aura

> **Root** your tasks. Find your **Aura**.

Root Aura is a modern frontend application built with [Vue.js](https://vuejs.org/) and [TypeScript](https://www.typescriptlang.org/). It serves as the interface for a robust Golang backend powered by [chi](https://github.com/go-chi/chi).

For more information about the backend architecture, please visit the [repository here](https://github.com/yogisyo16/mongo-todo-app).

---

## Vision & Project Description

**Current Status:** Minimalist To-Do Manager
**Future Vision:** Comprehensive Productivity Workspace

### The "Why"
Tools like Notion, Trello, and Asana are powerful standard-bearers for productivity, but they often come with complexity, feature bloat, and pricing barriers that can hinder simple workflows.

### The Concept
**Root Aura** is designed to bridge the gap between simplicity and power:

* **Root:** The application starts as a grounded, reliable tool for managing daily tasks—the "root" of your productivity. We prioritize speed, security, and a user-friendly interface.
* **Aura:** As the project evolves, it will expand into a flexible workspace allowing for documentation, collaboration, and data management. The goal is to provide a clean "aura" where your ideas can flow without the clutter of traditional enterprise tools.

We are building a workspace that offers the structural flexibility of Notion, but remains accessible and fast for individual users and small teams.

---

## Getting started

1. Clone the repository
2. Install dependencies
3. Run the application
(`npm run dev`)

This website soon will be deployed to [Vercel](https://vercel.com/).

## Feature

> Completed feature
- User can create a new task
- User can delete a task
- User can set task date

> Incoming feature
- User can edit a task
- User can mark a task as completed
- User can add a detail task (example: status, priority, description, collaborators(This also with the user authentication system))
- User can set a reminder to be send into email the user setup
- Todo can be converted to sheets/markdown
- We gonna have a user authentication system
- We gonna have a user profile system 

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) 
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
