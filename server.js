const express = require('express');
var admin = require('firebase-admin');
const app = express();

console.log(process.env.PRIVATE_KEY);

admin.initializeApp({
    credential: admin.credential.cert({
        type: process.env.TYPE,
        project_id: process.env.PROJECT_ID,
        private_key_id: process.env.PRIVATE_KEY_ID,
        private_key: process.env.PRIVATE_KEY,
        client_email: process.env.CLIENT_EMAIL,
        client_id: process.env.CLIENT_ID,
        auth_uri: process.env.AUTH_URI,
        token_uri: process.env.TOKEN_URI,
        auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.CLIENT_X509_CERT_URL
    }),
    databaseURL: process.env.DATABASEURL
  });

var db = admin.firestore();

var quotes = db.collection("quotes");
var publicStats = db.collection('stats').doc('public');

app.get('/', function (req, res) {
    var key = quotes.doc().id;
    console.log(key);

    var quote = quotes.where(admin.firestore.FieldPath.documentId(), '>', key).limit(1).get()
    .then(snapshot => {
        if(snapshot.size > 0) {
            snapshot.forEach(doc => {
                console.log(doc.id, '=>', doc.data());
                res.send({ quote: doc.data().quote, id: doc.id});
                incrementAPICalls();
            });
        }
        else {
            var quote = quotes.where(admin.firestore.FieldPath.documentId(), '<', key).limit(1).get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    console.log(doc.id, '=>', doc.data());
                    res.send({ quote: doc.data().quote, id: doc.id});
                    incrementAPICalls();
                });
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });
        }
    })
    .catch(err => {
        console.log('Error getting documents', err);
    });
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

function incrementAPICalls() {
    var apiCalls = publicStats.get()
    .then(doc => {
        if (!doc.exists) {
        console.log('No such document!');
        } else {
            publicStats.update({apiCalls: doc.data().apiCalls + 1});
        }
    })
    .catch(err => {
        console.log('Error getting document', err);
    });
}