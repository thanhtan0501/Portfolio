# R0 visual baseline

## Status

```text
visual_capture_status: blocked
```

The available computer-use browser surface reported no available browser, and the repository has no installed screenshot/test dependency. R0 did not install Playwright or modify dependencies. No screenshots are claimed to exist.

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

Preferred storage: `docs/refactor/baseline/screenshots/`. The directory is intentionally not populated in R0 because no capture was possible.

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

Exact visual capture requires either a browser surface with screenshot persistence and viewport control or an explicitly authorized local/production browser workflow. Do not infer screenshot parity from source inspection alone.
