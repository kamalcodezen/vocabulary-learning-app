
// API all data get and access 
const allLevelApiData = () => {

    const url = "https://openapi.programming-hero.com/api/levels/all";

    fetch(url)
        .then((res) => res.json())
        .then((data) => displayLevelData(data.data))

}

allLevelApiData();




// akhane button ke click korlam akhane aslo ase api theke data niye nicher function er bhetore  notun kore card toiri kore screeen a dekhachch
const displayLevelBtn = async (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    const res = await fetch(url)
    const data = await res.json()
    displayAllLevelCard(data.data);
}

const displayAllLevelCard = (cards) => {
    const allCardContainer = document.getElementById("all-card-container");
    allCardContainer.innerHTML = "";

    // jokhon card er bhetore kihcu thkabe na tokhn ei div ta show korbe
    if (cards.length === 0) {
        allCardContainer.innerHTML = `
       <div class="col-span-full text-center pb-10 ">
                    <img class="mx-auto" src="./assets/alert-error.png" alt="">
                    <p class="font-bangla font-semibold text-gray-500">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
                    </p>
                    <h2 class="text-4xl font-bangla font-semibold">নেক্সট Lesson এ যান</h2>
                </div>
    
    `;
        return;
    }

    cards.forEach((card) => {

        const div = document.createElement("div");
        div.innerHTML = `
          <div class="p-4  bg-white text-center space-y-4 border border-sky-200 rounded-lg shadow h-full flex flex-col justify-between">
                    <div class="space-y-3">
                        <h2 class="text-2xl font-semibold ">${card.word}</h2>
                        <p class="font-medium opacity-80">Meaning/Pronunciation</p>
                        <p class="font-bangla text-2xl font-semibold">${card.meaning ? card.meaning : "অর্থ পাওয়া যায়নি "}/${card.pronunciation ? card.pronunciation : "pronunciation পাওয়া যায়নি"}</p>
                    </div>

                    <div class="flex  justify-between">

                        <button
                            class="bg-sky-100 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer">
                            <i class="fa-solid fa-circle-info hover:scale-110 transition-all duration-300"></i>
                        </button>

                        <button
                            class="bg-sky-100 w-10 h-10 rounded-full cursor-pointer flex justify-center items-center">
                            <i class="fa-solid fa-volume-high hover:scale-110 transition-all duration-300"></i>
                        </button>

                    </div>

             </div>
        
        `;

        allCardContainer.append(div);

    });

}


// display all level data ata page reload hole ata kaj korbe abong automatic button banbe
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


