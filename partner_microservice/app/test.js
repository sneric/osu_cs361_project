const localHost = 'http://127.0.0.1:8000'

let getLastAppActivityDate = async () => {
  let response = await fetch(`${localHost}/api/home/last_app_activity_date/`, {
    method: "GET",
    headers: {
        'Content-Type': 'application/json'
    },
  })
  
  if (response.ok) {
      let json = await response.json();
      console.log('getLastAppActivityDate result: ', json)
  } else {
      console.log("HTTP-Error: " + response.status);
  }
}

let updateAppActivityDate = async () => {
  let response = await fetch(`${localHost}/api/home/update/update_app_activity_date/`, {
    method: "PUT",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify('test')
  })
  
  if (response.ok) {
      let json = await response.json();
      console.log('updateAppActivityDate result: ', json)
  } else {
      console.log("HTTP-Error: " + response.status);
  }
}

getLastAppActivityDate()
updateAppActivityDate()