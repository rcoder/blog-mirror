---
type: post
---
# Ideas: Identity

We conflate identity and credentials all the time. Mostly in the _wrong_ direction: one set of credentials can gain you access to multiple identities, especially when those credentials point at an email account. Once you're locked out of those credentials, however, the identity may as well be dead. There's often no way to re-spawn a closed account, and worse yet: your choice of alias or handle is quite likely to get snapped up as idle.

What if instead everyone had a local "identity" that was easy to create, easy to send to someone and use to authenticate future communications, and easy to "witness" from any other account to assert claims or verifications of ownership?

What if you could recognize people across different websites by a small visual token which was accessible, embeddable, and convertible 1:1 with their public key?

I assert this would be a better scenario than what we have today.

Lots of folks are playing in this space. Blockchain, IndieWeb, ActivityPub, and Secure Scuttlebutt all get to at least part of it. On the other hand, they still tend to make for heavyweight, all-or-nothing integrations. No one does "a little bit" of dWeb coding on the blockchain or adds a thin ActivityPub layer to their existing bespoke web application.

I want a component called `<whoami />` that tracks my identity on the current site, and gives me tools to stash my secret keys at a trusted host while carrying my public key everywhere, with a nice visual treatment that includes words and patterns to make a highly-recognizable symbolic avatar.

Embedding that component should require importing one JS library. Using the identity when making requests to the hosting API should add one authentication blob in a standard HTTP auth header.