var url = 'https://apikanyerest.herokuapp.com/'
fetch(url).then(response => {
    return response.json();
}).then(data => {
    console.log(data);
    document.getElementById("quote").innerHTML = data.quote;
}).catch(err => {
    console.log(err);
});