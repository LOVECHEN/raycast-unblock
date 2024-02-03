# Raycast Unblock

[![Version][package-version-src]][package-version-href]
[![License][license-src]][license-href]

Unblock all features in Raycast Pro Plan.

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
  - [ ] OpenAI
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
