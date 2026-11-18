# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security vulnerability within OpenCut, please send an email to security@opencut.app. All security vulnerabilities will be promptly addressed.

Please do not report security vulnerabilities through public GitHub issues.

### What to include in your report

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Any suggested fixes

### Response timeline

- We will acknowledge receipt within 48 hours
- We will provide a detailed response within 5 business days
- We will keep you updated on our progress

Thank you for helping keep OpenCut secure!

## Documented residual risks (no fixed release reachable)

### RustSec / Dependabot alert: `grid` 0.18.0 (GHSA-38c5-483c-4qqp) — integer overflow in `Grid::expand_rows`

- **Status:** open Dependabot alert, documented residual risk. No dismiss/mute.
- **Chain:** `gpui 0.2.2` (workspace dep, `apps/desktop`) → `taffy =0.9.0` (exact pin in
  gpui's manifest) → `grid 0.18.0` (vulnerable range `>= 0.17.0, <= 1.0.0`).
- **Why it cannot be fixed today (verified 2026-11-18 via crates.io):**
  - The fix is `grid 1.0.1`, a semver-incompatible major over the `grid 0.18`
    requirement of `taffy 0.9.0`; cargo cannot resolve it.
  - `taffy` dropped `grid` entirely in later releases (0.10+ line, current 0.15.1),
    but `gpui 0.2.2` — the latest published gpui — pins `taffy =0.9.0` exactly.
  - There is no newer `gpui`, no `taffy 0.9.x` patch with a bumped `grid`, and no
    patched `grid 0.18.x`. A `[patch]` override to `grid 1.0.1` breaks taffy 0.9.0's
    API usage at compile time.
- **Exposure:** `grid` is used only inside taffy's CSS-grid layout math, on
  locally-computed layout dimensions; `expand_rows` with attacker-controlled
  `usize::MAX`-scale row counts is not reachable from OpenCut's usage.
- **Resolution path:** when gpui publishes a release using taffy >= 0.10 (or taffy
  0.9 gains a grid bump), Dependabot re-flags it and the fleet rule applies —
  upgrade immediately and delete this entry.
