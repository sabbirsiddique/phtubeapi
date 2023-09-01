const handleCategory = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");


    const data = await response.json();

    const tabContainer = document.getElementById("tab-container");
    data.data.forEach((category) => {
        const div = document.createElement("div");
        div.innerHTML = `
        <button onclick = "handleLoadVideo('${category.category_id}')" class="text-lg font-semibold mr-2 px-5">${category.category}</button>
        `;

        div.style.backgroundColor = "rgba(37,37,37,0.15)"
        div.style.marginRight = "7px"
        div.style.borderRadius = "4px"
        div.style.color = "rgba(37,37,37,0.70)"


        div.addEventListener("click", () => {
            const currentColor = div.style.backgroundColor;
            const textCurrentColor = div.style.color;

            div.style.backgroundColor = "red";
            div.style.color = "white";

            if (previousButton) {
                previousButton.style.backgroundColor = currentColor;
                previousButton.style.color = textCurrentColor;

            }
            previousButton = div;
        })
        tabContainer.appendChild(div);
    });


};

let previousButton = null;

const handleLoadVideo = async (id) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await response.json();

    const cardContainer = document.getElementById("card-container")
    cardContainer.innerHTML = "";


    data.data.forEach((videos) => {
        console.log(videos);
        const div = document.createElement('div');
        const isVerified = videos?.authors[0]?.verified;
        const postedDate = videos.others.posted_date;


        if (postedDate > 0) {
            const hours = Math.floor(postedDate / 3600);
            const minutes = Math.floor((postedDate % 3600) / 60);
            const formattedDate = `${hours}hrs  ${minutes}min  ago`;

            div.innerHTML = `
        <div class="card bg-base-100">
                    <figure><img class="h-[200px] w-full relative inline-block" src=${videos.thumbnail} alt="Shoes" /></figure>
                    <div class="time absolute bottom-32 px-2 py-2 rounded-lg right-1 bg-[#171717] text-white">${formattedDate}</div>
                    <div class="mt-6 flex gap-3">
                      
                        <div>
                            <img src=${videos.authors[0].profile_picture} class="rounded-full w-10 h-10 ml-3 alt="">
                        </div>
                        <div class="">
                            <h2>${videos.title}</h2>
                            <p>${videos?.authors[0]?.profile_name} ${isVerified ? '<img class="inline-block" src="./images/verified.jpg">' : ''}</p> 
                            <p>${videos.others.views} views</p>
                        </div>
                      
                    </div>
                  </div>
        `;

            cardContainer.appendChild(div)
        } else {
            div.innerHTML = `
        <div class="card bg-base-100">
                    <figure><img class="h-[200px] w-full relative inline-block" src=${videos.thumbnail} alt="Shoes" /></figure>
                    <div class="mt-6 flex gap-3">
                      
                        <div>
                            <img src=${videos.authors[0].profile_picture} class="rounded-full w-10 h-10 ml-3 alt="">
                        </div>
                        <div class="">
                            <h2>${videos.title}</h2>
                            <p>${videos?.authors[0]?.profile_name} ${isVerified ? '<img class="inline-block" src="./images/verified.jpg">' : ''}</p> 
                            <p>${videos.others.views}  views</p>
                        </div>
                      
                    </div>
                  </div>
        `;

            cardContainer.appendChild(div)
        }




    })

};


handleCategory();

handleLoadVideo(1000)


