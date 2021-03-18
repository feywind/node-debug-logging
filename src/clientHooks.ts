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

import debugLog from './gcp-debuglog';
import {test} from './pubsub';

// For the moment, this only hooks the _exact_ namespace.
// It might be nice if we adopt this to make it do child namespaces too.
debugLog('gcp:pubsub:foo').on('log', (args: any[]) => {
  console.log('oh hey i am a custom log sink and i got this:', args);
});

console.log('Random client code!');
test();
console.log('Random client code done!');
