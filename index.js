import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, onValue, push, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-6c186-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementInDB = ref(database, "input-el")

const inputEl = document.getElementById("input-el")
const publishBtn = document.getElementById("publish-btn")
const endorsementList = document.getElementById("endorsement-list")

publishBtn.addEventListener("click", function () {
    let inputValue = inputEl.value
    push(endorsementInDB, inputValue)
    clearInputFieldEl()
})

onValue(endorsementInDB, function (snapshot) {
    if (snapshot.exists()) {
        let endorsements = Object.entries(snapshot.val())

        clearEndorsementListEl()

        for (let i = 0; i < endorsements.length; i++) {
            let currentItem = endorsements[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]

            appendItemToEndorsementEl(currentItem)
        }
    } else {
        endorsementList.innerHTML = "Waiting for some praise!"
    }
})


function clearEndorsementListEl() {
    endorsementList.innerHTML = ""
}

function clearInputFieldEl() {
    inputEl.value = ""
}

function appendItemToEndorsementEl(item) {
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")

    newEl.textContent = itemValue

    newEl.addEventListener("click", function () {
        let exactLocationOfItemInDB = ref(database, `input-el/${itemID}`)

        remove(exactLocationOfItemInDB)
    })

    endorsementList.append(newEl)
}


