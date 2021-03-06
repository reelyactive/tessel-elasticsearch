tessel-elasticsearch
====================

Collect and store radio decodings from the reelyActive Owl-in-One based on Tessel 2 in a remote Elasticsearch database.


Installation
------------

Clone this repository, browse to its root, then run:

    npm install


Programming
-----------

Programming the Tessel 2 requires the [t2-cli](https://www.npmjs.com/package/t2-cli) package which can be installed by following [these instructions](http://tessel.github.io/t2-start/).

With the Tessel 2 connected to the programming station via USB, from the root of this repository run:

    t2 push index.js

The code will be pushed to flash memory on the Tessel and will run every time it boots.


Prerequisites
-------------

The __tessel-elasticsearch__ software expects the following:
- a reel or reelceiver module connected via UART on Port A
- maximum baud rate of Port A set to at least 230400
- tcpdump installed


Developer Notes
---------------

The API code modules of the elasticsearch package are not included by default in the bundle pushed to the Tessel.  Any API calls must therefore have their corresponding code explicitly included in the .tesselinclude file.  For example, to use the _create_ call, the following line would be added to .tesselinclude:

    node_modules/@elastic/elasticsearch/api/api/create.js


License
-------

MIT License

Copyright (c) 2019 [reelyActive](https://www.reelyactive.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN 
THE SOFTWARE.
