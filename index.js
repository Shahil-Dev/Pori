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
    <button onclick="design(${item.category_id})" class="btn btn-outline  focus:bg-[#f46661]">${item.category}</button>`;
    core.append(btnDiv);
  });
};
//category design
const design = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => showVideo(data.category))
    .catch((error) => console.log(error));
};


const showModal = (videoId) =>{
  fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`)
  .then(res => res.json())
  .then(data => displayDetails(data.video)
  )
}

const displayDetails = (chobi) =>{
  console.log(chobi);
  const modalHide = document.getElementById('modal_view')
  modalHide.innerHTML =`
   <p class="text-center font-extrabold">${chobi.title}</p>
     <div class="divider"></div>
   <p class="text-center">${chobi.description}</p>
  `
  document.getElementById('showButtonData').click()

}




//video section
const getVideo = (searchText = "") => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then((res) => res.json())
    .then((data) => showVideo(data.videos)) // Ensure data.videos matches API response structure
    .catch((error) => console.log(error));
};




const showVideo = (videos) => {
  const videoContainer = document.getElementById("videos_div");
  videoContainer.innerHTML = "";

  if (videos.length === 0) {
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML = `
      <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center"> 
        <img src="./image/Icon.png" alt="">
        <h1 class="text-center font-extrabold">NO content available</h1>
      </div>
    `;
    return;
  } else {
    videoContainer.classList.add("grid");
  }

  videos.forEach((video) => {
    const card = document.createElement("div");
    card.classList = `card card-compact`;

    card.innerHTML = `
      <figure class="md:w-[350px] md:h-[200px] relative">
        <img class="w-full h-full rounded-[5px] object-cover" src="${video.thumbnail}" alt="${video.title}" />
      </figure>
      <div class="px-0 py-5">
        <div class="flex gap-5">
          <div>
            <img class="w-10 object-cover rounded-full h-10" src="${video.authors[0].profile_picture}" alt="">
          </div>
          <div class="justify-between">
            <h1 class="text-[16px] font-bold">${video.title}</h1>
            <div class="flex gap-1 justify-items-stretch">
              <p class="mt-[-5px] text-[13px]">${video.authors[0].profile_name}</p>
              ${
                video.authors[0].verified
                  ? '<img class="w-3 h-3" src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png">'
                  : ""
              }
            </div>
          <button onclick="showModal('${video.video_id}')" class="btn btn-sm border-[1px] border-black">Details</button>
          </div>
        
      </div>
    `;
    videoContainer.append(card);
  });
};


document.getElementById('searchInput').addEventListener("keyup",(e)=>{
  getVideo(e.target.value);
  
})



showCategories();
getVideo();
