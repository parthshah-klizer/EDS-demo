# EDS-demo
Personal Edge Delivery Services + Document Authoring (da.live) sandbox.

## Environments
- Document Authoring: https://da.live/#/parthshah-klizer/EDS-demo/
- Preview: https://main--EDS-demo--parthshah-klizer.aem.page/
- Live: https://main--EDS-demo--parthshah-klizer.aem.live/

## Default content pages (da.live)
- [Browse all](https://da.live/#/parthshah-klizer/EDS-demo/)
- [Index](https://da.live/edit#/parthshah-klizer/EDS-demo/index)
- [Nav](https://da.live/edit#/parthshah-klizer/EDS-demo/nav)
- [Footer](https://da.live/edit#/parthshah-klizer/EDS-demo/footer)
- [404](https://da.live/edit#/parthshah-klizer/EDS-demo/404)
- [Placeholders](https://da.live/#/parthshah-klizer/EDS-demo/placeholders)

## Documentation

Before using the aem-boilerplate, we recommand you to go through the documentation on https://www.aem.live/docs/ and more specifically:
1. [Developer Tutorial](https://www.aem.live/developer/tutorial)
2. [The Anatomy of a Project](https://www.aem.live/developer/anatomy-of-a-project)
3. [Web Performance](https://www.aem.live/developer/keeping-it-100)
4. [Markup, Sections, Blocks, and Auto Blocking](https://www.aem.live/developer/markup-sections-blocks)
5. [Document Authoring](https://docs.da.live/)

## Installation

```sh
npm i
```

## Linting

```sh
npm run lint
```

## Local development

1. Create a new repository based on the `aem-boilerplate` template
1. Add the [AEM Code Sync GitHub App](https://github.com/apps/aem-code-sync) to the repository
1. Connect content at [https://da.live/start](https://da.live/start) with `https://github.com/parthshah-klizer/EDS-demo`
1. Install the [AEM CLI](https://github.com/adobe/helix-cli): `npm install -g @adobe/aem-cli`
1. Start AEM Proxy: `aem up` (opens your browser at `http://localhost:3000`)
1. Open the `EDS-demo` directory in your favorite IDE and start coding :)
