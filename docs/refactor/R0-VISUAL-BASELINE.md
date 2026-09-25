# R0 visual baseline

## Status

```text
visual_capture_status: blocked
```

The deployed V1 was reachable at `https://thanhtan0501.vercel.app` and was inspected in the available native Arc window. HTTP probes returned 200 for `/`, `/about`, `/projects`, and `/contact`; `/404` returned the expected 404 response. The live page showed a closed Google billing-account error in the banner and did not populate the feed. No screenshot files could be persisted: browser-tab automation was unavailable, Arc headless capture produced no image, and macOS `screencapture` failed with a display-capture error. No screenshots are claimed to exist.

Capture timestamp: `2026-09-25`, Asia/Ho_Chi_Minh. Local reproduction was not attempted because dependencies are absent and R0 does not install the V1 runtime/toolchain.

## Required baseline matrix

Routes:

```text
/
/about
/projects
/projects/<representative-project-id>
/contact
/404
```

Viewports:

```text
375x812
768x1024
1440x1000
```

Required interaction states:

```text
active tab
project card hover
gallery interaction
slider
image modal
contact validation error
contact submitting
404 animation initial state
```

## Naming convention

When browser capture is available:

```text
<route-name>__<viewport-width>x<viewport-height>__<state>.png
```

Examples:

```text
home__375x812__default.png
projects__1440x1000__card-hover.png
project-detail__768x1024__modal.png
contact__375x812__validation-error.png
404__1440x1000__initial.png
```

Preferred storage: `docs/refactor/baseline/screenshots/`. The directory remains unpopulated because no capture was possible.

## Visual contract to compare later

- dark charcoal/gray surfaces and text hierarchy;
- 824px feature width / 86% reading width behavior;
- panda logo and fixed watermark;
- fluid Inter typography;
- profile/header overlap and tab rhythm;
- feed/project post-card composition;
- collage, slider, gallery, modal behavior;
- contact stars/moon/astronaut-bear scene;
- playful animated 404.

## Capture blocker

Exact visual capture remains blocked by the lack of a screenshot-capable browser surface with persistence and viewport control. Do not infer screenshot parity from source inspection alone.
