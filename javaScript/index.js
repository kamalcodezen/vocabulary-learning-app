// API all data get and access 

const allLevelApiData = () => {

    const url = "https://openapi.programming-hero.com/api/levels/all";

    fetch(url)
        .then((res) => res.json())
        .then((data) => displayLevelData(data.data))

}

allLevelApiData();



const displayLevelBtn = (id) => {

    // const url = `https://openapi.programming-hero.com/api/level/${id}`;

    fetch(`https://openapi.programming-hero.com/api/level/${id}`)
        .then((res) => res.json())
        .then((data) => console.log(data.data))

}


// display all level data 
const displayLevelData = (buttons) => {

    const displayAllLevelContainer = document.getElementById("display-all-level");
    displayAllLevelContainer.innerHTML = "";

    buttons.forEach((btn) => {
        // console.log(btn)

        const divBtn = document.createElement("div")
        divBtn.innerHTML = `
        <button onClick=displayLevelBtn(${btn.level_no}) class="btn btn-outline btn-info">${btn.lessonName}</button>
        `;
        displayAllLevelContainer.append(divBtn);
    });



}


