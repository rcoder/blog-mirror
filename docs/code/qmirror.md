---
type: post
---
# qmirror: Hypercore Archives of Lightweight Messaging Channels

I've posted a little proof-of-concept experiment to GitHub: [qmirror](https://github.com/rcoder/qmirror). It's not even close to a usable library yet, more just a sketch of the idea. But the idea is more or less this: modern applications tend to need both an ephemeral, lightweight signaling channel for asynchronous coordination between processes at runtime _and_ a durable log of messages to allow decoupled action on critical business events (signups, payments, application metrics, etc.). This is one means to provide just that, without needing a complex clustered broker using distributed consensus and several GBs of JVM heap to give you a basic message fabric.

To that end, I've wired up an [MQTT client](https://github.com/mqttjs/MQTT.js) and the [Hypercore](https://github.com/mafintosh/hypercore) library as used in the [Dat project](https://datproject.org/). Post an MQTT topic name to a special `qmirror/announce` topic and this script will stream all messages sent there to a local hypercore feed, which can then be archived, plumbed in to your choice of Dat replication methods, and verified for integrity at any point in the future.

Hypercores are cool because, like Git repos, they basically guarantee that any downstream replica is sufficient to further clone and copy the underlying data, and that attempts to rewrite history will be noticed by anyone with even a partial copy of the feed.

There are much more complete projects in this space, but none seemed designed to easily plumb this kind of durable log into normal "Internet of Things" protocols and messaging patterns. Using MQTT as a "frontend" makes that pretty trivial, while having the logs end in local hypercore storage means that adding a replication server, doing incremental backups (and partial restores/replay logs from them) is also just a matter of applying the right bits of Javascript or command-line plumbing using tools like [hyperpipe](https://github.com/mafintosh/hyperpipe).

## But Why?

There are a bunch of integration patterns for distributed applications that I've internalized that assume ready access to a durable messaging fabric and the ability to archive, replay, and generally re-purpose the message logs without putting additional load on producers, message brokers, or any database or other service sitting in the critical path for normal user API calls and frontend interactions.

Eventual consistency is the name of the game here, and some generally open-ended way to plumb a network of stream consumers and producers is a pretty nice means of removing hard dependencies between services, improving resilience during outages and migrations, and enabling offline analysis of important historical data.

When I've worked on teams that did this reasonably well, it usually required some pretty heavy-weight infrastructure like Kafka, Zookeeper, Spark, and a distributed data store using a format like Parquet.

This little demo suggests to me that it might be feasible to scale _down_ the concept using a small, effectively leaderless cluster of trusted machines and lightweight protocols in place of sidecar proxies and/or heavyweight REST, GRPC, or GraphQL layers. You could easily stream messages into replication-ready durable logs from microcontroller-based IoT nodes, wrap MQTT in websockets (also widely implemented in MQTT client libs, including those intended for use in a browser) to expose the fabric to clients, and use anything from static IP/service mappings to swarm or DHT-based discovery to shuttle data around for further processing once it's been acknowledged and stored.

## What's Next?

I've been stewing on the ideas behind this for a while and might just hunker down and try to wire this basic set of building blocks into some sort of groupware/messaging widget. At the very least, it's already proving to be an interesting way to capture structured local logs on my home network, and I suspect it could be a fun way to start bringing data from the various Raspberry Pi and ESP32 gadgets I've been banging on into one place without tying myself to a single database schema for everything, or having to write a bunch of custom socket-level code to handle multiplexing notification streams over a single network pipe.
