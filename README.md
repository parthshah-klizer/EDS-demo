# mps-demo

Personal Adobe Commerce storefront (EDS + da.live), based on
[hlxsites/aem-boilerplate-commerce](https://github.com/hlxsites/aem-boilerplate-commerce).

Starter pages copied from Adobe’s public demo (`aemshop.net` /
`main--aem-boilerplate-commerce--hlxsites.aem.page`) — **not** klizerteam.

## Environments
- DA: https://da.live/#/parthshah-klizer/mps-demo/
- Preview: https://main--mps-demo--parthshah-klizer.aem.page/
- Live: https://main--mps-demo--parthshah-klizer.aem.live/

## Seed / re-upload content
```sh
IMS_TOKEN='paste-from-da.live-network-tab' node tools/da-seed/upload.mjs
```

## Local
```sh
npm i
cp demo-config.json config.json
npx @adobe/aem-cli up
```
