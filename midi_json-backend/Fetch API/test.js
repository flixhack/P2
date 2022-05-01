

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
	url = 'http://localhost:3000'
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