# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.0.7](https://github.com/aircarbon/ac-monorepo2/compare/v0.0.9...v0.0.7) (2020-08-27)

### Features

- **notify:** support mailgun host name from env ([ebdb42c](https://github.com/aircarbon/ac-monorepo2/commit/ebdb42cab062893675872e17778cc4e540ab9de1))
- **wa-web:** add todo for mint form ([e43a677](https://github.com/aircarbon/ac-monorepo2/commit/e43a6772093651a4f64fb5b69268f31652366347))
- **wa-web:** move parse serial block to on blur event ([24476a0](https://github.com/aircarbon/ac-monorepo2/commit/24476a0555480eb802601ace490c008f3d73cbb4))
- **wa-web:** parse VCS and GCS serial block format ([383a3b4](https://github.com/aircarbon/ac-monorepo2/commit/383a3b4ba9df0dc13101ad362cf0a09e1a909ad8))
- **wa-web:** populate project document from sample projects ([4b10d88](https://github.com/aircarbon/ac-monorepo2/commit/4b10d881abaae80147c302931eb0093a148e6c51))
- **wa-web:** select sample projects ([fda7c3f](https://github.com/aircarbon/ac-monorepo2/commit/fda7c3f96cda93e64cd850fe18d521cc8f734cd5))
- **wa-web:** show serial block validation format on UI ([26c03fb](https://github.com/aircarbon/ac-monorepo2/commit/26c03fb271392d6bc9fb5f3c41dc42d54b359e55))
- **web:** add amount validation on withdraw form ([d079813](https://github.com/aircarbon/ac-monorepo2/commit/d07981368ea83f63fb42ce49c14433a3c0ec2291))
- **web:** add validation for fiat withdraw ([a5ebaf6](https://github.com/aircarbon/ac-monorepo2/commit/a5ebaf629112b327455cac79162e4100b51e8825))
- **web:** allow to change port for web server ([1d823d5](https://github.com/aircarbon/ac-monorepo2/commit/1d823d5d2af2a0a444a5962e4fa0d4956a1f05dc))
- **web:** debugging api environment ([303e8eb](https://github.com/aircarbon/ac-monorepo2/commit/303e8eba591d17e3817ebb5b390a0f41d6329c30))
- **web:** missing cognito env on web api ([e62a6fc](https://github.com/aircarbon/ac-monorepo2/commit/e62a6fc906ba69022541805bfef323a405c2fb8f))
- **web:** move project label to utils-common ([a8d33fd](https://github.com/aircarbon/ac-monorepo2/commit/a8d33fd82d410e1e029eed769d976115d391ff81))
- **web:** remove physical delivery link from UI ([227e0e0](https://github.com/aircarbon/ac-monorepo2/commit/227e0e0f595457e902a09cef3c85c9b229ba867c))

### Bug Fixes

- **api:** change userId param to number ([f10dd92](https://github.com/aircarbon/ac-monorepo2/commit/f10dd929408aea7a4b8fbed7665feb6dcaa63e61))
- **aws:** increase memory/cpu units for web on DEV ([793a275](https://github.com/aircarbon/ac-monorepo2/commit/793a2756ebaa377ac76232d28414b924861217d1))
- **db:** remove hx uid on user creation ([92b5386](https://github.com/aircarbon/ac-monorepo2/commit/92b53868f522ce026498c1d54907d1344f4c888b))
- **deps:** use fixed version for storybook ([cfe8bb2](https://github.com/aircarbon/ac-monorepo2/commit/cfe8bb2dfb8f667f613b3b0a4576d9d2f1a4af6f))
- **docker:** attemp to fix the build on github ([9ec1450](https://github.com/aircarbon/ac-monorepo2/commit/9ec145052624761a5ffc760c0788001cc76cf999))
- **docker:** create pupeteer cache folder ([d640685](https://github.com/aircarbon/ac-monorepo2/commit/d64068518e0ed11c16584c964a403e6e277ff12d))
- **docker:** fix permission on create build folder on aws ([91cf2f1](https://github.com/aircarbon/ac-monorepo2/commit/91cf2f1e0a57b18b411399450c5e9bf71c5bfe7e))
- **docker:** move download pupetter to top ([0d4ce5d](https://github.com/aircarbon/ac-monorepo2/commit/0d4ce5d1a32ada5b05acd2267659ebd58c4a1913))
- **docker:** move puppeteer to last action ([5710cf9](https://github.com/aircarbon/ac-monorepo2/commit/5710cf9540aa636f68a1c869ba51d9ee15a58057))
- **docker:** permission on install package on docker ([2a6c76e](https://github.com/aircarbon/ac-monorepo2/commit/2a6c76eb2b730c449a48793d8a9275cfcd9d7ead))
- **docker:** remove install on web package for github action ([9d7bb66](https://github.com/aircarbon/ac-monorepo2/commit/9d7bb66495498f7fed73b23e9de448ebf6eb6bca))
- **docker:** remove lock file ([0e65464](https://github.com/aircarbon/ac-monorepo2/commit/0e654641d3a7b74e717884ae65ab52de546b98b8))
- **docker:** use lock file for reduce install time ([9aacce2](https://github.com/aircarbon/ac-monorepo2/commit/9aacce2531f790ab1b2c84928ddda626d9a930ae))
- **docker:** use same structure between local build and github ([753b4af](https://github.com/aircarbon/ac-monorepo2/commit/753b4af8b67cebe7561c83d12f32d840e1049d62))
- **docker:** wrong path for wa-web ([23e1377](https://github.com/aircarbon/ac-monorepo2/commit/23e1377b3fc718139afeb7570f98ca0086ab2dc3))
- **github:** remove the condition for build DEV ([8be6247](https://github.com/aircarbon/ac-monorepo2/commit/8be624750a6642c77147ad713813e355de63f7d1))
- **github:** typo on linter action ([85538b8](https://github.com/aircarbon/ac-monorepo2/commit/85538b8528da20e89498e1dd190da0ddb4d4da36))
- **github:** use v1 to checkout code ([0f88cdc](https://github.com/aircarbon/ac-monorepo2/commit/0f88cdc285c745c140d1652e7cde8795e31f7c9e))
- **wa-web:** handle the case the hubspot is not exist ([63047f9](https://github.com/aircarbon/ac-monorepo2/commit/63047f9cbeb7c0eb40bfcf7f691d55227de8c0df))
- **wa-web:** remove company and status from cognito ([993f3a9](https://github.com/aircarbon/ac-monorepo2/commit/993f3a987489ef0aec7bb184a896824433ee95f7))
- **wa-web:** wa-web ([3d6a378](https://github.com/aircarbon/ac-monorepo2/commit/3d6a37886f2a338db41b11a13ece76a0367ddfe6))
- **web:** json report mode for 1st render ([84bb899](https://github.com/aircarbon/ac-monorepo2/commit/84bb89989a5c830045e6f25e92a61b15380e055f))
- **web:** linter issue and add todo ([f77230a](https://github.com/aircarbon/ac-monorepo2/commit/f77230a1bfe03e0bfe0017f6e92b947ccac32ba6))
- **web:** linter issue and fallback message on explorer ([bd881d0](https://github.com/aircarbon/ac-monorepo2/commit/bd881d0890877ae06df2990acd47e637062d7622))
- **web:** react hooks warning, move constants ([ac9c6f3](https://github.com/aircarbon/ac-monorepo2/commit/ac9c6f3a35152f882f957eeb209bc60b0e98ea56))
- **web:** remove fullstory on production ([9516d5e](https://github.com/aircarbon/ac-monorepo2/commit/9516d5e9c34a3551786146024973b82c1dd31edc))

### 0.0.1 (2020-08-07)
