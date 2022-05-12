

let listInputs = document.querySelectorAll('input')
let listSends = document.querySelectorAll("button")

// scan and catch Events on buttons
for (let i = 0; i < listSends.length; i++)
{
    listSends[i].onclick = function()
    {
        let listInputs = document.querySelectorAll('input')
        sendData(listInputs[i].value)
    };
}	
   
// fetch API and send data
async function sendData (output) {
	url = '${SERVER_BASE_URL}' // docker replaces this with the actual value needed
	// url = 'http://localhost:3000' // use this for non-docker local setup
	var option = {
		method: 'POST',
		headers: {'content-Type': 'application/json'},
		mode: 'no-cors',
		body: output
	}
	const response = await fetch(url, option)
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	const data = await response.json();    
	console.log(data)
	    
}
