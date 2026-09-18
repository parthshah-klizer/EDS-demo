# mps-demo
Personal Edge Delivery Services + Document Authoring (da.live) sandbox for MPS.

## Environments
- Document Authoring: https://da.live/#/parthshah-klizer/mps-demo/
- Preview: https://main--mps-demo--parthshah-klizer.aem.page/
- Live: https://main--mps-demo--parthshah-klizer.aem.live/

## Default content pages (da.live)
- [Browse all](https://da.live/#/parthshah-klizer/mps-demo/)
- [Index](https://da.live/edit#/parthshah-klizer/mps-demo/index)
- [Nav](https://da.live/edit#/parthshah-klizer/mps-demo/nav)
- [Footer](https://da.live/edit#/parthshah-klizer/mps-demo/footer)
- [404](https://da.live/edit#/parthshah-klizer/mps-demo/404)
- [Demo draft](https://da.live/edit#/parthshah-klizer/mps-demo/drafts/demo)

## Seed pages into da.live
If the site is empty, upload starter pages:

1. Open https://da.live/#/parthshah-klizer/mps-demo/ and sign in
2. DevTools → Network → click any `admin.da.live` request → copy `Authorization: Bearer …`
3. Run:

```sh
IMS_TOKEN='paste-token-here' node tools/da-seed/upload.mjs
```

## Setup checklist
1. Install [AEM Code Sync](https://github.com/apps/aem-code-sync) on this repo
2. Confirm site at [da.live/start](https://da.live/start) with `https://github.com/parthshah-klizer/mps-demo`
3. Seed pages (command above) or use “Make something wonderful” sample content

## Local development

```sh
npm i
npx @adobe/aem-cli up
```
