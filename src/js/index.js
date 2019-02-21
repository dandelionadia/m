function renderTree() { }

fetch('https://private-anon-ce29f4d7f4-urbansim753.apiary-mock.com/priceList', { method: 'GET' })
  .then(function (res) {
    return res.json()
  }).then(function (data) {
    console.log(data)
    // ...
    // ...
  })
