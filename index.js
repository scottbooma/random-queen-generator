const button = document.querySelector("button")

button.addEventListener("click", event => {
    getQueenData().then(randomQueenInfo => {
        createQueenInfo(randomQueenInfo)
    })
})

function getRandomNumber(max) {
    return Math.floor(Math.random() * max)
}

async function getListOfQueens() {
    try {
        const response = await fetch("https://www.nokeynoshade.party/api/queens/all")
        const list = await response.json()
        return list

    }
    catch (error) {
        console.error(error.message)
    }
}

async function getRandomQueen() {
    try {
        const queenList = await getListOfQueens()
        const queen = await queenList[getRandomNumber((queenList.length - 1))]
        return queen
    }
    catch (error) {
        console.error(error.message)
    }
}

async function getQueenData() {
    try {
        const randomQueen = await getRandomQueen()
        const request = await fetch(`https://www.nokeynoshade.party/api/queens/${randomQueen.id}`)
        const randomQueenData = await request.json()
        return randomQueenData
    }
    catch (error) {
        console.error(error.message)
    }
}

function getQueenSeasons(queen) {
    return queen.seasons.map(season => season.seasonNumber).join(", ")
}

function createQueenInfo(queen) {
    const queenInfoContainer = document.querySelector("#queen")
    queenInfoContainer.innerHTML = `
        <h2>${queen.name}</h2>
        <img src="${queen.image_url}" alt="${queen.name}">
        <p>"${queen.quote}"</p>
        <p>Season(s): ${getQueenSeasons(queen)}</p>
    `
}





