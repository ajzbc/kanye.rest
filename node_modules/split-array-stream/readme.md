# split-array-stream
> Safely push each item of an array to a stream.

```sh
$ npm install --save split-array-stream
```
```js
const split = require('split-array-stream');
const through = require('through2');

const array = [
  { id: 1, user: 'Dave' },
  { id: 2, user: 'Stephen' }
];

const stream = through.obj();

stream.on('data', (item) => {
  // { id: 1, user: 'Dave' }
  // ...later...
  // { id: 2, user: 'Stephen' }
});

split(array, stream).then((streamEnded) => {
  if (!streamEnded) {
    stream.push(null);
    stream.end();
  }
}).catch(console.error);
```

Before pushing an item to the stream, `split-array-stream` checks that the stream hasn't been ended. This avoids those "push() after EOF" errors.

### Use case

Say you're getting many items from an upstream API. Multiple requests might be required to page through all of the results. You want to push the results to the stream as they come in, and only get more results if the user hasn't ended the stream.

```js
function getAllUsers() {
  var stream = through.obj();

  var requestOptions = {
    method: 'get',
    url: 'http://api/users',
  };

  request(requestOptions, onResponse);

  function onResponse(err, response) {
    split(response.users, stream).then((streamEnded) => {
      if (streamEnded) {
        return;
      }

      if (response.nextPageToken) {
        requestOptions.pageToken = response.nextPageToken;
        request(requestOptions, onResponse);
        return;
      }

      stream.push(null);
      stream.end();
    });

  });

  return stream;
}

getAllUsers()
  .on('data', function (user) {
    // An item from the `response.users` API response
  })
  .on('end', function () {
    // All users received
  });
```


### split(array, stream, callback)

#### array

- Type: `Array`
- Required

The source array. Each item will be pushed to the provided stream.

#### stream

- Type: `Stream`
- Required

The destination stream to receive the items of the array.

#### callback(streamEnded)

- Type: `Function`
- Required

Callback function executed after all items of the array have been iterated.

##### callback.streamEnded

- Type: `Boolean`

Lets you know if the stream has been ended while items were being pushed.
