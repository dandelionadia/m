function getTimeList(list) {
  var result = list.reduce(function (acc, obj) {
    const itemSum = obj.items ? getTimeList(obj.items) : 0
    return acc.concat(obj.timeHappyPath).concat(itemSum)
  }, [])
  return result;
}

function getTotalTime(arr) {
  var numb = arr.reduce(function (acc, b) {
    return acc + b
  })
  return numb;
}


fetch('https://private-anon-ce29f4d7f4-urbansim753.apiary-mock.com/priceList', { method: 'GET' })
  .then(function (res) {
    return res.json()
  }).then(function (data) {
    const timeList = getTimeList(data)
    const totalTime = getTotalTime(timeList)
    console.log(totalTime)

    document.getElementById('totalTime').innerText = totalTime;
  })