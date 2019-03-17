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
        document.getElementById("id").innerHTML = data.id;

        //tweet
        var tweet = encodeURIComponent('"' + data.quote + '" -Kanye via https://kanye.rest');
        document.getElementById("tweet").href = "https://twitter.com/intent/tweet?text=" + tweet;
    }).catch(err => {
        console.log(err);
    });
}

// //init firebase
// var db = firebase.firestore();

// //get total number of api calls
// db.collection("stats").doc("public").get().then(function(doc) {
//     if (doc.exists) {

//         var options = {
//               useEasing: true, 
//               useGrouping: true, 
//               separator: ',', 
//               decimal: '.', 
//         };
//         var stat = new CountUp('apiCalls', 0, doc.data().apiCalls, 0, 0.5, options);
//         if (!stat.error) {
//             stat.start();
//         } else {
//              console.error(stat.error);
//         }

//     } else {
//         console.log("No such document!");
//     }
// }).catch(function(error) {
//     console.log("Error getting document:", error);
// });

//copy api url
function copy() {
    const copy = document.createElement('textarea');
    copy.value = "https://api.kanye.rest";
    document.body.appendChild(copy);
    copy.select();
    document.execCommand('copy');
    document.body.removeChild(copy);
}

//suggestion submitted
function submitSuggestion() {
    var newQuote = document.getElementById("newQuote").value;
    var newProof = document.getElementById("newProof").value;

    //make sure fields are filled out
    if (newQuote != "" && newProof != "") {
        //push new suggestion
        db.collection("suggestion").add({
                quote: newQuote,
                proof: newProof
            })
            .then(function (docRef) {
                document.getElementById("newQuote").value = "";
                document.getElementById("newProof").value = "";
                alert("submitted for review");
                //console.log("Document written with ID: ", docRef.id);
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
    } else {
        alert("please provide a quote and proof");
    }
}