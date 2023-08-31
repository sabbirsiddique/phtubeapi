const handleCategory = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");


    const data = await response.json();

    const tabContainer = document.getElementById("tab-container");
    data.data.forEach((category) => {
        const div = document.createElement("div");
        div.innerHTML = `
        <a onclick = "handleLoadCategory('${category.category_id}')" class="tab text-lg font-semibold bg-gray-100 mr-2 rounded-md px-5">${category.category}</a>
        `;
        tabContainer.appendChild(div);
    });


};

const handleLoadCategory = async (id) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data= await response.json();

    const cardContainer = document.getElementById("card-container")
    
    
    data.data.forEach((videos)=>{
        console.log(videos);
        const div = document.createElement('div');
        const isVerified = videos?.authors[0]?.verified;
        
        
        div.innerHTML = `
        <div class="card bg-base-100">
                    <figure><img class="h-[200px] w-full relative inline-block" src=${videos.thumbnail} alt="Shoes" /></figure>
                    <div class="time absolute bottom-32 px-2 py-2 rounded-lg right-1 bg-black text-white">${videos.others.posted_date}</div>
                    <div class="mt-6 flex gap-3">
                      
                        <div>
                            <img src=${videos.authors[0].profile_picture} class="rounded-full w-10 h-10 ml-3 alt="">
                        </div>
                        <div class="">
                            <h2>${videos.title}</h2>
                            <p>${videos?.authors[0]?.profile_name} ${isVerified? '<img class="inline-block" src="./images/verified.jpg">' : ''}</p> 
                            <p>${videos.others.views}</p>
                        </div>
                      
                    </div>
                  </div>
        `;
        
        cardContainer.appendChild(div)
        
        
    })
};

handleCategory();

