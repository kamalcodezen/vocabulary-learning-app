



// API all data get and access 
const allLevelApiData = async () => {
    spinnerLoader(true);

    const res = await fetch("https://openapi.programming-hero.com/api/levels/all")
    const data = await res.json()
    displayLevelData(data.data)

    spinnerLoader(false);
}


// spinLoader function
const spinnerLoader = (status) => {
    if (status == true) {
        document.getElementById("spin-container").classList.remove("hidden");
        document.getElementById("all-card-container").classList.add("hidden");
    } else {
        document.getElementById("spin-container").classList.add("hidden");
        document.getElementById("all-card-container").classList.remove("hidden");
    }

}


// sound function 
function pronounceWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-EN"; // English
    window.speechSynthesis.speak(utterance);
}


// modal synonyms show
const showSynonyms = (array) => {
    let synonyms = array.map((elem) => `<span class="bg-sky-200 py-1 px-2 rounded font-medium">${elem}</span>`)
    return synonyms.join(" ");

}

// info button click korlam akhane aslo id ta tarpor api ke hit korlam api amake data dilo sta function er through te ami show korabo
const showModal = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    const res = await fetch(url)
    const modalData = await res.json()
    displayModalDataShow(modalData.data)
}

const displayModalDataShow = (cardDetailsModal) => {

    const modalContainer = document.getElementById("modal_container")
    modalContainer.innerHTML = `
    
    <div class="border border-sky-200 rounded-lg modal-word  p-4">
        <h2 class="font-bangla text-2xl font-semibold mb-4">${cardDetailsModal.word} (<i
                class="fa-solid fa-microphone-lines"></i>:${cardDetailsModal.pronunciation})</h2>
        <h3 class="font-semibold">Meaning</h3>
        <p class="font-bangla font-semibold mb-4">${cardDetailsModal.meaning}</p>
        <p class="font-semibold">Example</p>
        <p class="font-medium mb-4">${cardDetailsModal.sentence}</p>
        <p class="font-bangla font-medium mb-2">সমার্থক শব্দ গুলো</p>

        <div class="flex gap-6">
               ${showSynonyms(cardDetailsModal.synonyms)}
        </div>
    </div>

    `;
    document.getElementById("card_modal").showModal();

}

// active btn class remove select btn
const removeActiveBtn = () => {
    const activeBtn = document.querySelectorAll(".active-btn");
    activeBtn.forEach((btn) => btn.classList.remove("bg-sky-500", "text-white"));
}


// akhane button ke click korlam akhane aslo ase api theke data niye nicher function er bhetore  notun kore card toiri kore screeen a dekhachch
const displayLevelBtn = async (id) => {
    spinnerLoader(true);

    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    const res = await fetch(url)
    const data = await res.json()
    // button click active / select
    const levelBtnActive = document.getElementById(`level-btn-${id}`)
    removeActiveBtn()
    levelBtnActive.classList.add("bg-sky-500", "text-white");

    displayAllLevelCard(data.data);

}

const displayAllLevelCard = (cards) => {
    const allCardContainer = document.getElementById("all-card-container");
    allCardContainer.innerHTML = "";

    // jokhon card er bhetore kihcu thkabe na tokhn ei div ta show korbe
    if (cards.length === 0) {
        allCardContainer.innerHTML = `
       <div class="my-container col-span-full text-center pb-10 ">
                    <img class="mx-auto" src="./assets/alert-error.png" alt="">
                    <p class="font-bangla font-semibold text-gray-500">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
                    </p>
                    <h2 class="text-4xl font-bangla font-semibold">নেক্সট Lesson এ যান</h2>
                </div>
    
    `;
        spinnerLoader(false);

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

                        <button onclick="showModal(${card.id})"
                            class="bg-sky-100 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer">
                            <i class="fa-solid fa-circle-info hover:scale-110 transition-all duration-300"></i>
                        </button>

                        <button onclick="pronounceWord('${card.word}')"
                            class="bg-sky-100 w-10 h-10 rounded-full cursor-pointer flex justify-center items-center">
                            <i class="fa-solid fa-volume-high hover:scale-110 transition-all duration-300"></i>
                        </button>

                    </div>

             </div>
        
        `;

        spinnerLoader(false);

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
        <button id="level-btn-${btn.level_no}" onclick="displayLevelBtn(${btn.level_no})" class="active-btn  btn btn-outline btn-info">${btn.lessonName}</button>
        `;
        displayAllLevelContainer.append(divBtn);
    });

}

allLevelApiData();
// search input Vocabulary
const vocabularyBtn = document.getElementById("search-btn")
    .addEventListener("click", () => {

        const searchInput = document.getElementById("input-search")
        const inputValue = searchInput.value;

        fetch("https://openapi.programming-hero.com/api/words/all")
            .then((res) => res.json())
            .then((data) => {
                const allWord = data.data;

                const searchWord = allWord.filter((word) => word.word.toLowerCase().includes(inputValue));

                displayAllLevelCard(searchWord);
                removeActiveBtn()
            });

    });
