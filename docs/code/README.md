---
type: post
---
# Code

:fire: :computer: :fire:

[This site's code](https://github.com/rcoder/blog-mirror) is [MIT](https://opensource.org/licenses/MIT), words and images are [CC BY 4.0](http://creativecommons.org/licenses/by/4.0/). Enjoy!

You can't have a distributed web without lots of little satellite sites hosting their own infrastructure, right?

So that's what I'm doing. It's taking a minute, though. Bear with me.

## Linux (and other open source OSes) on weird machines

I like having a UNIX-ey command line on any computing device I interact with on a regular basis. That means there are a lot of single-board computers, old/weird mobile hardware, and virtual machines with somewhat odd configurations floating around my house. I've collected notes on some of the installs, what it's like to work with the system in question, etc.

* [Linux on the Pinebook Pro](pbp.md)
* [ThinkPad P1](tp-p1.md) (okay, not a weird machine to run Linux on at all, but I don't know many other folks with one of these, so what the heck)

## :sparkles: [qmirror](qmirror.md)

MQTT + Dat == crazy delicious?

## :cloud: [My "Private Cloud"](private-cloud.md)

I like running servers so much I have a bunch of 'em on computers at home. Here's how they're wired up.

## :clipboard: Snippets

These are command-line hacks, reusable chunks of code not quite worth packaging up as a library, and cool bits of syntax lurking out there in PLT-land.

### Take Your Dev Docs With You

```sh
$ yarn global install nativefier
# ...lots of package install chunder...
$ nativefier https://devdocs.io/
# build chunder, then you get a directory like `
# `DevDocs API Documentation-$plat-$arch`
# with a native app inside for your machine!
```

Et voila! Offline-capable, self-updating, searchable searchable HOWTO + API docs for a whole bunch of useful web, game, database, and server coding tools and frameworks.

## :zap: Experiments

### clicv

![clicv screenshot](/images/clicv.png)

Is it a resume? Is it a command-line demo? No, in the end it's just yet another fancy wrapper around `sendmail`.

[live](http://cv.bc8.org/) | [code](https://github.com/rcoder/clicv)
