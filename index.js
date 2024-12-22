const showCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => getCategories(data.categories))
    .catch((error) => console.log(error));
};
const getCategories = (params) => {
  // console.log(params);
  const core = document.getElementById("btn_nav");
  params.forEach((item) => {
    console.log(item);
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
    <button onclick="design(${item.category_id})" class="btn btn-outline">${item.category}</button>`
    core.append(btnDiv);
  });
};
//category design
const design = (id) =>{
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => showVideo(data. category))
    .catch((error) => console.log(error));
}



//video section
const getVideo = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => showVideo(data.videos)) // Ensure data.videos matches API response structure
    .catch((error) => console.log(error));
};

const showVideo = (videos) => {
  const videoContainer = document.getElementById("videos_div");
  videoContainer.innerHTML = ""
  if (videos.length == 0) {
    videoContainer.classList.remove('grid')
    videoContainer.innerHTML =`
    <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center"> 
    <img src="./image/Icon.png" alt="">
    <h1 class="text-center font-extrabold">NO contain available</h1>
    </div>
    `
    return
  }
  else{
    videoContainer.classList.add('grid')
  }
  videos.forEach((video) => {
    const card = document.createElement("div");
    
    card.classList = `card card-compact `;
    card.innerHTML = `
        <figure class="md:w-[350px] md:h-[200px]  relative">
          <img class="w-full h-full rounded-[5px] object-cover" src="${video.thumbnail}" alt="${video.title}" />
         
        </figure>
        <div class="px-0 py-5 ">
       <div class="flex gap-5">
        <div>
           <img class="w-10 object-cover rounded-full h-10" src="${video.authors[0].profile_picture}" alt="">
       </div>
       <div class="justify-between">
       <h1 class="text-[16px] font-bold">${video.title}</h1>
      <div class="flex gap-1 justify-items-stretch">
      <p class="mt-[-5px] text-[13px]">${video.authors[0].profile_name}</p>
      ${video.authors[0].verified === true ? '<img class="w-3 h-3" src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png">' : ""}
      </div>
      <p class="text-[13px]">${video.others.posted_date} views</p>
       </div>
       
       </div>
          
          </div>
        </div>
      `;
    videoContainer.append(card);
  });
};

showCategories();
getVideo();
