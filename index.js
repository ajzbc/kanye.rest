//get api for first load
get();

function get() {
    var url = 'https://api.kanye.rest'
    //call api
    fetch(url).then(response => {
        return response.json();
    }).then(data => {
        //populate code with quote from api call
        document.getElementById("quote").innerHTML = data.quote;

        //tweet
        var tweet = encodeURIComponent('"' + data.quote + '" -Kanye via https://kanye.rest @ajzbc');
        document.getElementById("tweet").href = "https://twitter.com/intent/tweet?text=" + tweet;
    }).catch(err => {
        console.log(err);
    });
}

//copy api url
function copy() {
    const copy = document.createElement('textarea');
    copy.value = "https://api.kanye.rest";
    document.body.appendChild(copy);
    copy.select();
    document.execCommand('copy');
    document.body.removeChild(copy);
}