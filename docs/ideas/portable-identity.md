# Messaging With Portable Identity

## Credential Creation

Clients are responsible for creating their own keypair, using some robust key-derivation algorithm. (See e.g. `session-keys-js` npm package for a good browser-based option.)

They can simply present the public key and any signed message (usually status text) to announce themselves on this drop.

<mermaid>
sequenceDiagram
  participant client
  participant drop
  client->>client: createKey(alias, passphrase)
  client->>drop: POST /keys/present {key, signedMessage}
  drop->>client: 200 Ok {publicKey, ttl}
</mermaid>

## Credential Storage and Retrieval

<mermaid>
sequenceDiagram
  participant client
  participant drop
  client->>drop: POST /settings {encryptedDoc, key}
  drop->>client: {id: $id}
  client->>drop: GET /settings {key, signedMessage}
</mermaid>

Since clients may want to back up their secrets (keys, draft messages, trust chains) we provide a simple endpoint that accepts a single signed document as its payload, and offers it back on demand to someone holding the same key and able to authenticate their request accordingly.

Drops _should_ do basic sanity checking on the posted content (i.e., check for potential secrets by key name/regexp) but clients should also undertake to not persist sensitive data by accident. Pushing all server interaction into a service worker may help prevent accidental leaks (and conveniently force all server communication to happen off the UI thread, which is nice) but the extra complexity may or may not be warranted depending on the application.

## Message Posting

<mermaid>
sequenceDiagram
  participant client
  participant drop
  client->>drop: POST /send {signedDoc, key}
  drop->>client: 200 OK {signedDoc, extraSignatures, ttl}
</mermaid>

Messages can be posted to any drop, but based on its configuration it may offer only a short-term cache, reject a message outright, or re-sign/retain the message and persist it indefinitely (assuming the sender's key is trusted).

Posted messages are have their signatures validated, and retention and signing policy is applied on submission and the result included in the response.

## Message Retrieval

<mermaid>
sequenceDiagram
  participant client
  participant drop
  client->>drop: GET /search {query, key}
  drop->>client: 200 OK {results, info}
</mermaid>

Messages can be fetched in bulk by search filter. This is a normal paginated content API, and does not require authentication so it can be used to build public aggregators/archives of message content.

For that reason, drops can and should heavily cache search results, rate/size limit requests, etc. as needed to maintain their QoS needs. A "dark drop" that serves only whitelisted users and/or has restricted access at the network level (perhaps via basic auth, or only being reachable via proxy/VPN) can provide more robust service when public access isn't needed.

## Message Subscriptions

<mermaid>
sequenceDiagram
  participant client
  participant drop
  loop watch
    client->>drop: POST /subscribe {{$name: filter}, key}
    drop->>client: SSE event {$name, message}
  end
</mermaid>

Once a client has connected to a drop and announced their presence, they may also want to subscribe to new messages the drop sees that match some criteria. Subscriptions are submitted as a batch, and returned via SSE "events" to the client. Sent events include the specified filter name so clients can map to the appropriate handler (e.g., dispatch to redux or vuex, update local storage, etc.).

Note that unlike e.g. MQTT, filters are not simply on a topic name; they're effectively streaming queries over the set of all messages the drop sees from the time the SSE stream is established.
