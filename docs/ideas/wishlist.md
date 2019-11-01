---
type: post
---
# My Hardware/Embedded Wishlist

1. Slightly better/cheaper/more open Android e-book readers. The current ones are like really early Android phones: kind of chunky and full of quirks but equally full of promise and tinker-ability.

2. Thumbdrives that combine a YubiKey and a thin client for your VPN/jumphost/web proxy/etc. for remote access from mostly-untrusted client machines. You can run a relatively beefy ARM or ESP32 core inside a USB port these days, so the thing could just be running a smart sidecar proxy in micropython exposed over Bluetooth or Wifi.

3. Satellite pagers with open, sane APIs and keyboards anywhere close to as good as an old-school Blackberry. Like the e-book readers these show a ton of promise as a "never be totally outside of reach of help, on or off the grid" device but are so painful to use right now I for one leave mine at home awaiting the day I _plan_ to have an emergency, I guess?

4. Bazel taking over builds for the giant mess of tools that is Emscripen, ESP-IDF, rustc/cargo, etc. that I want to build other stuff with these days. Rust projects seem to mostly just compile + install (unlike golang, which seems shockingly fiddly about that) but the days of `./configure; make; make install` are over for me and the number of build methods I have to juggle in my head these days is about five too many.

> I'm stuck with npm/node-stuff if I want to put things on the web, and I have at least two operating systems' internal automation paged in to keep servers and dev boxes humming. That leaves very few open slots in my aging head.