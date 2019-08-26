

const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);

const docRef = firestore.doc("players/username");
const outputList = document.querySelector("#player-room");

const inputTextField = document.querySelector("#username");
const joinButton = document.querySelector("#join");

const timestamp = firebase.firestore.FieldValue.serverTimestamp()



// get the room code
var x = document.getElementById("room-code").innerText;
console.log(x);

// rooms in firestore
var roomRef = firestore.collection("game-rooms").doc(x);

// see if room has been created
function checkRoom(){
    roomRef.onSnapshot(function (doc){
        if(doc && doc.exists) {
            return true;
        }
    })
}
document.getElementById("check-room").onclick = checkRoom;
if(checkRoom == false){
    onclick="window.open('notexist.html'); return false"
}



function init(){    
    document.getElementById("username").value = "";
}
window.onload = init;


// join button
joinButton.addEventListener("click", function(){
    const textToSave = inputTextField.value;
    console.log("I am going to save '" + textToSave + "' to Firestore");
    docRef.set({
        player: textToSave
    })
    .then(function() {
        console.log("Status saved!");
    }).catch(function (error){
        console.log("Got an error: ", error);
    });
});

function addRoom(){
    // add a timestamp to the room
    return roomRef.set({
        updatedAt: timestamp
    })
    .then(function() {
        console.log("Document successfully updated!");
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
    }
addRoom();


getRealTimeUpdates = function() {
    docRef.onSnapshot(function (doc){
        if(doc && doc.exists) {
            var myData = doc.data();
            // adding player to lobby
            var items = document.getElementById("player-room");
            var item = document.createElement("li");
            item.innerHTML = myData.player;
            items.appendChild(item);
        }
    })
}

getRealTimeUpdates();