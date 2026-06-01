<p align="center">
    <i>🏠 <a href="https://keycloakify.dev">Keycloakify</a> v11 — Homelab Theme 🏠</i>
    <br/>
    <br/>
</p>

# keycloakify-homelab

Personal homelab Keycloak theme, forked from [`keycloakify-starter`](https://github.com/keycloakify/keycloakify-starter).

The main addition over the upstream starter is a **Strategy Pattern** that controls theme rendering based on `client_id` — each Keycloak client can have its own distinct UI.

---

## Quick start

```bash
git clone https://github.com/tiendatbinhan/keycloakify-homelab
cd keycloakify-homelab
yarn install
```

---

## Strategy Pattern

Instead of a single theme for all clients, this repo maps each `client_id` to a dedicated theme strategy.

When a login page is rendered, the system reads the `client_id` from the Keycloak context and looks it up in `strategyMap`. If a match is found, the corresponding strategy is used; otherwise it falls back to the default theme.

### Directory structure

```text
src/
└── strategies/
    ├── index.ts              # strategyMap: maps client_id → strategy
    └── themes/
        ├── default/          # Default strategy (fallback)
        │   ├── index.ts
        │   └── strategy.tsx
        ├── comfy/            # Strategy for the "comfy" client
        │   ├── index.ts
        │   ├── strategy.tsx
        │   └── styles.css
        └── ...
```

---

## Adding a new strategy

### Step 1 — Create the theme directory

```bash
mkdir ./src/strategies/themes/{theme-name}
```

### Step 2 — Create `index.ts` and export the strategy

In `./src/strategies/themes/{theme-name}/index.ts`, export a default constant of type `ThemeStrategy`. This is where you implement the render function for that theme.

```typescript
// src/strategies/themes/{theme-name}/index.ts
import type { ThemeStrategy } from "../../types";
import "./styles.css";

const myThemeStrategy: ThemeStrategy = {
  render: ctx => {
    // Implement your theme render logic here
  }
};

export default myThemeStrategy;
```

> It is recommended to create a `styles.css` in the same directory to manage styles specific to that strategy.

### Step 3 — Register the strategy in `strategyMap`

In `./src/strategies/index.ts`, add a key-value pair to `strategyMap` where the key is the `client_id` of the corresponding Keycloak client:

```typescript
// src/strategies/index.ts
import comfyStrategy from "./themes/comfy";
import myNewTheme from "./themes/{theme-name}";

export const strategyMap: Record<string, ThemeStrategy> = {
  comfyui: comfyStrategy,
  "{client-id}": myNewTheme // 👈 add your entry here
};
```

---

## Testing the theme locally

[Documentation](https://docs.keycloakify.dev/testing-your-theme)

---

## Building the theme

### Bare Metal

Requires [Maven](https://maven.apache.org/) (>= 3.1.1) and Java (>= 7). The `mvn` command must be in your `$PATH`.

- macOS: `brew install maven`
- Debian/Ubuntu: `sudo apt-get install maven`
- Windows: `choco install openjdk` and `choco install maven` (or download from [here](https://maven.apache.org/download.cgi))

```bash
npm run build-keycloak-theme
```

By default Keycloakify generates multiple `.jar` files targeting different Keycloak versions. See the [documentation](https://docs.keycloakify.dev/features/compiler-options/keycloakversiontargets) to customize this behavior.

### Docker

Run `docker compose up`.

---

## Initializing the account theme

```bash
npx keycloakify initialize-account-theme
```

## Initializing the email theme

```bash
npx keycloakify initialize-email-theme
```

---

## GitHub Actions

The repo includes a GitHub Actions workflow that builds the theme and publishes the `.jar` files as [GitHub release artifacts](https://github.com/keycloakify/keycloakify-starter/releases/tag/v10.0.0).

To release a new version, simply **update the `version` field in `package.json` and push**.

To enable the workflow, go to your repository on GitHub and navigate to:
`Settings` > `Actions` > `Workflow permissions`, then select `Read and write permissions`.
