function getTimeList(list) {
  var result = list.reduce(function (acc, obj) {
    const items = obj.items ? getTimeList(obj.items) : 0
    return acc.concat(obj.timeHappyPath).concat(items)
  }, [])
  return result;
}

function getTotalTime(arr) {
  const numb = arr.reduce(function (acc, b) {
    return acc + b
  })
  return numb;
}

function createTable(arr, level = 1) {
  const ul = document.createElement('ul')
  ul.classList.add('myTable')

  arr.forEach(function (obj) {
    const paddingLeft = 15 * level;
    const li = document.createElement('li')
    li.classList.add('myTable__row')
    li.insertAdjacentHTML('beforeend', `
    <span class="column column__main" style="padding-left:${paddingLeft}px">${obj.activity}</span>
    <span class="column column__secondary">${obj.timeHappyPath}</span>
    <span class="column column__secondary">${obj.timeExpertEstimation}</span>
    <span class="column column__secondary">${obj.timeWorstCase}</span>
    `)

    if (obj.items) {
      const attachment = createTable(obj.items, level + 1)
      li.appendChild(attachment)
    }

    ul.appendChild(li)
  })

  return ul
}

function createList(arr) {
  const ul = document.createElement('ul')

  arr.forEach(function (obj) {
    const li = document.createElement('li')
    li.insertAdjacentHTML('beforeend', `
    <span>${obj.activity}</span>
    <span>${obj.timeHappyPath}</span>
    <span>${obj.timeExpertEstimation}</span>
    <span>${obj.timeWorstCase}</span>
    `)

    if (obj.items) {
      const attachment = createList(obj.items)
      li.appendChild(attachment)
    }

    ul.appendChild(li)
  })

  return ul
}

fetch('https://private-anon-ce29f4d7f4-urbansim753.apiary-mock.com/priceList', { method: 'GET' })
  .then(function (res) {
    return res.json()
  }).then(function (data) {
    const timeList = getTimeList(data)
    const totalTime = getTotalTime(timeList)
    console.log(totalTime)

    document.getElementById('totalTime').innerText = totalTime;

    const html = createTable(data)
    const htmlList = createList(data)
    document.getElementById('table-container').appendChild(html)
    document.getElementById('list-container').appendChild(htmlList)
  })