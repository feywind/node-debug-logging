# GCP Debug Logger Proposal

A very simple proposal of how we might add some flexible debug logging to our libraries with very little overhead (and also plug into existing popular libraries). This proposal is in Node specifically, but could be expanded to browsers and other languages.

This one file library would export a function that creates a debug logger. It takes in a namespace designation and returns a function you can call to log to that namespace. This is a very simple surface based on the built-in Node `util.debugLog` function, and the `debug` npm library.

It gives us several advantages over just using one of those:

* Non-dogmatic: Use whatever underlying library you like for the actual output / log gathering / etc
* Very small footprint: Requires no dependencies and is one small JS module
* Auto plugs into whatever the user is using: just `npm i debug` and it'll find it and adjust; may add others later
* Unified variables: This uses the standard namespace syntax like `NODE_DEBUG` or `DEBUG`, but it can pull values from a unified `GCP_DEBUG` used across many languages into those other packages' variables
* Following on from that: GCP gets to be in control of the ultimate surface presented to users, so we can make it work across many languages and libraries (e.g. Python could also look for `GCP_DEBUG` in the same format)
* Allows programmatic log sinks: Any other module or library may create a namespaced logger and call EventEmitter methods on it. These instances are shared, so you'll get the same logger as the library calling it to produce logs

```
😺 % node build/client.js
Random client code!
Random client code done!
```

```
😺 % NODE_DEBUG=gcp.* node build/client.js
Random client code!
GCP.PUBSUB 7536: A thing specific to gcp pubsub
GCP.PUBSUB.FOO 7536: A thing specific to gcp pubsub foo
GCP.PUBSUB.BAR 7536: A thing specific to gcp pubsub bar
Random client code done!
```

```
😺 % NODE_DEBUG=gcp.pubsub.* node build/client.js
Random client code!
GCP.PUBSUB.FOO 7542: A thing specific to gcp pubsub foo
GCP.PUBSUB.BAR 7542: A thing specific to gcp pubsub bar
Random client code done!
```

```
😺 % NODE_DEBUG=gcp.pubsub.foo node build/client.js
Random client code!
GCP.PUBSUB.FOO 7544: A thing specific to gcp pubsub foo
Random client code done!
```

```
😺 % NODE_DEBUG=gcp.pubsub,gcp.pubsub.foo node build/client.js
Random client code!
GCP.PUBSUB 7552: A thing specific to gcp pubsub
GCP.PUBSUB.FOO 7552: A thing specific to gcp pubsub foo
Random client code done!
```

```
😺 % GCP_DEBUG=gcp:pubsub,gcp:pubsub:foo node build/clientHooks.js
Random client code!
  gcp:pubsub A thing specific to gcp pubsub +0ms
  gcp:pubsub:foo A thing specific to gcp pubsub foo +0ms
oh hey i am a custom log sink and i got this: [ 'A thing specific to gcp pubsub foo' ]
Random client code done!
```

```
// Copyright 2021 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
```
