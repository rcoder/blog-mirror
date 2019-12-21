# Linux on the Pinebook Pro

I managed to get my hands on the oh-so-trendy $200, 64-bit ARM-hexacore-equipped [Pinebook Pro](https://www.pine64.org/pinebook-pro/) a few months ago. I spent several weeks basically ignoring it after being really disappointed in the stock Debian-based OS install that shipped on it, but after a few false starts I got a Manjaro-ARM preview build installed.

This is a device that rewards scaling _down_ your applications, services, and workflows on a mobile development box the same way I've long tried to do on my managed servers. Running a full GNOME or KDE desktop on the PBP is frustrating: big UIs are laggy to the point of distraction, network and power management widgets work poorly if at all, and I at least end up restarting several times a day simply because it's the only reliable way to pause work and lock the machine down when I need to close it up and move it around.

Thankfully, the Linux community has long been obsessed with finding ways to squeeze every bit of functionality possible out of slow, obsolete, and obscure hardware. If you're willing to accept some compromises, even a fairly "gutless" machine like this one can offer a pretty good working environment for a developer using modern, in-demand languages and frameworks.

## Things That Work Well

* Wayland, Sway, and the Panfrost OSS graphics driver all "click" nicely together for a fast, responsive, text-friendly desktop environment.
* WiFi is fast and stable under the Manjaro-ARM kernel, and all the normal USB device support, software-defined network tricks, and security software I want on a development box is there.
* ARM is rapidly becoming a first-class platform for Linux, due to the dual squeeze of high-density server designs and ubiquitous embedded and mobile ARM SoC designs basically owning the non-x86 CPU market right now, especially for highly-connected devices. That means that compiler and library maintainers, distro packagers, and even commercial vendors are increasingly making ARM builds part of their routine artifact publishing[^1].
* There are fewer proprietary blobs needed for a running system than, say, a Raspberry Pi, which means that the only thing blocking support for other free operating systems is time and energy turning product datasheets into drivers.
* The keyboard feels surprisingly good for extended typing sessions, even if the ISO layout makes some keys I depend on (like `\`) fiddly to hit when I'm switching between this and a desktop keyboard.

## Things That Are Rough

* It's a slow system at its core. None of the CPU, GPU, or storage subsystem are really competitive with a modern Intel-based laptop, or even a current-gen iPhone or high-end Android device. My smartphone literally has more RAM and storage, even if they're locked down so it's hard to get at them to do anything meaty.
* Some "kinda-open-source" applications like VS Code and Chrome are limited and buggy.[^2] I wouldn't even try to run Skype, and Steam is obviously a non-starter.
* Power management is, as mentioned above, basically non-existent. I get CPU speed scaling and manual backlight control and that's about it. That being said, I get 10+ hours on a charge and restarts are fast, so it's not the issue it would be on OS X or Windows.
* Charging the internal battery is painfully slow. It also works over USB-C or the bog-standard 9V barrel connector, so there's no excuse for not finding a spare USB port somewhere to slowly top it back up overnight.

## Verdict

I'm surprised by just how productive I feel working on this laptop. Because I'm not dependent on a proprietary office suite or heavyweight groupware to work on my personal projects, I can put just the tools I need close at hand and work on- and offline just like I would on a "big boy" computer, without the temptation to load ever more bloatware (*ahem* Dropbox) just because "I might need it some day."

For the money, the only other real game in town is finding a lucky break on a well-maintained Thinkpad and hoping you can squeeze half the battery life out of it, not to mention losing the ability to charge over USB-C.

[^1]: This is especially good because the CPU in the Pine64 systems is _not_ about to win any compiler speed benchmarks. Building everything from (patched) source, like I had to do in my early days on Linux or OS X, would be just as frustrating as it was on those 300MHz-1GHz single-threaded CPUs.

[^2]: TBH I miss Code more than I expected to, being a 20+-year Vim user, but I'm not sure that living in an Electron shell all day every day would be satisfying on a system this slow anyway.
