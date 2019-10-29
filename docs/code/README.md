---
type: post
---
# Code

:fire: :computer: :fire:

[This site's code](https://github.com/rcoder/blog-mirror) is [MIT](https://opensource.org/licenses/MIT), words and images are [CC BY 4.0](http://creativecommons.org/licenses/by/4.0/). Enjoy!

You can't have a distributed web without lots of little satellite sites hosting their own infrastructure, right?

So that's what I'm doing. It's taking a minute, though. Bear with me.

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