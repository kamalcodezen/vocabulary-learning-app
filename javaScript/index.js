// API  data get and access show in display

const displayAllLevelData = () => {

    const url = "https://openapi.programming-hero.com/api/levels/all";

    fetch(url)
        .then((res) => res.json())
        .then((data) =>console.log(data.data))

}






displayAllLevelData();