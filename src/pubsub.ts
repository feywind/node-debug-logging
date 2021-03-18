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

// This is what the proposed logging would look like on the library side.

import debugLog from './gcp-debuglog';

// This usage is directly modeled after Node's util.debugLog and the
// debug package that are in common use.
const pubsubLog = debugLog('gcp:pubsub');
const fooLog = debugLog('gcp:pubsub:foo');
const barLog = debugLog('gcp:pubsub:bar');

export function test() {
  pubsubLog('A thing specific to gcp pubsub');
  fooLog('A thing specific to gcp pubsub foo');
  barLog('A thing specific to gcp pubsub bar');
}
