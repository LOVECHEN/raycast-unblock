# Raycast Unblock

[![Version][package-version-src]][package-version-href]
[![License][license-src]][license-href]

Unblock all features in Raycast Pro Plan.

> Thanks to [zhuozhiyongde/Unblocking-Raycast-With-Surge](https://github.com/zhuozhiyongde/Unlocking-Raycast-With-Surge)

> [!WARNING]
> This project is for educational purposes only.
> Please do not use it for commercial purposes.

## Implementation Principle

We only borrowed the **operation interface** of Raycast, and **did not modify the backend server** of Raycast.

We just coded a proxy server to forward Raycast's requests to our proxy server, and **implemented similar functions** in Raycast Pro Plan **in other ways**.

You can see all the code in the `src` directory. If you have any questions, please feel free to ask.

See [Unblock Features](#unblock-features) and [Unblock Routes](#unblock-routes) for more details.

## Unblock Features

- [x] Pro Plan Logo
- [x] AI Chat
  - [x] OpenAI `I don't have the OpenAI API usage quota, so I can't test it.`
  - [x] Gemini
- [ ] Translation
  - [ ] Shortcut (only for macOS)
  - [ ] AI
  - [ ] 3rd Party
- [x] Cloud Sync
  - [x] iCloud Drive (only for macOS)
  - [x] Local Storage
- [x] Other Local Features

## Unblock Routes

- [x] `/me`
- [x] `/me/trial_status`
- [x] `/me/sync`
- [x] `/ai/models`
- [x] `/ai/chat_completions`
- [ ] `/translations`

## Requirements

- Node.js 18.x
- macOS / Linux (Windows is not maintained)
- Surge (or other proxy tools)
- Raycast

## Usage

### Download dist from actions

You can download the latest dist from [GitHub Actions](https://github.com/wibus-wee/raycast-unblock/actions/workflows/ci.yml).

The naming format is `raycast-unblock-<platform>`, but in fact they are just built on different platforms, so theoretically you can use any of them on any platform.

### Set environment variables

Copy / Download the `.env.example` file and rename it to `.env`, then fill in the environment variables.

After that, you should put the `.env` file in the same directory as the executable file.

### Run

```bash
# Your .env file should be in this directory
node index.mjs

# ℹ Raycast Unblock
# ℹ Version: 0.0.0
```

If you want to run it in the background, you can use `pm2` or `nohup`.

### Use it with Surge

1. Go to [wibus-wee/activation-script](https://github.com/wibus-wee/activation-script) and follow the instructions to get the activation script.
2. Get your Surge config file and modify it like this: (Normally, `wibus-wee/activation-script` will help you modify this config file)

```conf
[MITM]
skip-server-cert-verify = true
h2 = true
hostname = *.raycast.com, <Your Original Proxy Hostname...>
ca-passphrase = <Your Original CA Passphrase>
ca-p12 = <Your Original CA P12 Setting>

[Script]
raycast-activate-backend.raycast.com = type=http-request,pattern=^https://backend.raycast.com,max-size=0,debug=1,script-path=activator.js
<Your Original Scripts...>
```

3. Run Surge with the modified config file.
4. Set your system proxy to Surge.
5. Run Raycast Unblock.
6. Enjoy!

> [!WARNING]
> In some cases, if you find that Raycast Unblock is not working properly, please go to the settings of Surge, and uncheck the last line `*` in `Surge -> HTTP -> Capture(捕获) -> Capture MITM Overrides(捕获 MITM 覆写)`, which is `Modify MITM Hostname`.

### If you don't have Surge

You need to throw all Raycast requests to the backend built by this project, but make sure that the backend can request Raycast Backend normally, because some functions need to request Raycast Backend once and then do it.

> [!NOTE]
> If you are building the backend locally, please do not let your proxy tool proxy both Raycast's requests and the backend service's requests, as this will cause it to not work properly.
>
> Raycast Unblock adds an `x-raycast-unblock` header to requests to Raycast Backend. You can determine whether this is a request from Raycast or Raycast Unblock by the presence of this header, and make the backend service work properly through conditional judgment. ( Raycast Unblock has turned off SSL check by default )
>
> Or you can deploy the backend to a remote server, and this will not be a problem.

[Related Code](https://github.com/wibus-wee/activation-script/blob/main/src/modules/index.ts#L70-L89)

### More

#### Deploy to remote server

Raycast Unblock can be deployed to a remote server, and then you can use it as a proxy server. But you need to modify the code in `activator.js` to make it work properly.

You should replace `http://127.0.0.1:3000` with your remote server address.

[Related Source Code](https://github.com/wibus-wee/activation-script/blob/main/src/modules/index.ts#L83C14-L83C35)

#### Use `pm2`

You can use `pm2` to manage the process. You can run `npm install -g pm2` to install it.

For example:

```bash
# Your .env file should be in this directory
pm2 start index.mjs --name raycast-unblock
```

## Credits

- [Raycast](https://raycast.com/)
- [zhuozhiyongde/Unlocking-Raycast-With-Surge](https://github.com/zhuozhiyongde/Unlocking-Raycast-With-Surge)
- [yufeikang/raycast_api_proxy](https://github.com/yufeikang/raycast_api_proxy)

## Author

raycast-unblock © Wibus, Released under AGPLv3. Created on Feb 2, 2024

> [Personal Website](http://wibus.ren/) · [Blog](https://blog.wibus.ren/) · GitHub [@wibus-wee](https://github.com/wibus-wee/) · Telegram [@wibus✪](https://t.me/wibus_wee)

<!-- Badges -->

[package-version-src]: https://img.shields.io/github/package-json/v/wibus-wee/raycast-unblock?style=flat&colorA=080f12&colorB=1fa669
[package-version-href]: https://github.com/wibus-wee/raycast-unblock
[license-src]: https://img.shields.io/github/license/wibus-wee/raycast-unblock.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/wibus-wee/raycast-unblock/blob/main/LICENSE
