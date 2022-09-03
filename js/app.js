const loadAllNews = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await res.json();
    return data.data.news_category;
    // console.log(data.data.news_category);
}


const setAllMenu = async () => {
    // console.log(loadAllProducts());
    const data = await loadAllNews();
    // console.log(data);
    const allMenu = document.getElementById('all-menu');
    for (const news of data) {
        // console.log(news.category_name);
        getNewsCategoryDetails(news.category_id, news.category_name);
        const div = document.createElement('div');
        div.innerHTML = `
            <li class="nav-item mx-4 fw-bold menu-hover">
                <a onclick="getNewsCategoryDetails('${news.category_id}', '${news.category_name}')" class="nav-link" href="#home">${news.category_name}</a>
            </li>
        `;
        allMenu.appendChild(div);
    }
    processSearch(false);
}

// loader 
const processSearch = () => {
    toggleSpinner(true);
    const clickedNews = document.getElementById('search-field')
    const newsClicked = clickedNews.value;
    setAllMenu(newsClicked);
}

const getNewsCategoryDetails = async (category_id, category_name) => {
    console.log(category_id);
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`);
    const data = await res.json();
    const allNews = data.data;
    displayAllNews(allNews);
    console.log(allNews);
    document.getElementById('count-item-name').innerText = category_name;
}

const displayAllNews = categoryNews => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = '';
    if (categoryNews.length !== 0) {
        document.getElementById('count-item').innerText = categoryNews.length;
    } else {
        document.getElementById('count-item').innerText = 'No';
    }


    for (const news of categoryNews) {
        console.log(news);
        const cardDiv = document.createElement('div');
        // cardDiv.classList.add('row');
        cardDiv.innerHTML = `
        <div  class="card mb-4 p-4">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${news.title}</h5>
                    <p class="card-text">${news.details.length > 400 ? news.details.substring(0, 399) + '...' : news.details}</p>

                </div>
                <div class="d-flex align-items-center justify-content-between mt-5">
                    <div class="d-flex align-items-center">
                        <img class="image-round" src="${news.author.img}" alt="">
                        <h6>${news.author.name ? news.author.name : 'No Data Found'}</h6>
                    </div>
                    <div>
                        <h3>${news.total_view ? news.total_view : 'No Data Found'}</h3>
                    </div>
                    <div>
                        <button onclick="loadNewsDetails('${news._id}')" class="border-0 text-primary fw-bold fs-2" data-bs-toggle="modal" data-bs-target="#newsModal"><i class="fa-solid fa-arrow-right"></i></button>
                    </div>
                </div>
            </div>
        </div>
        </div>
        `;
        newsContainer.appendChild(cardDiv);

    }

}
const loadNewsDetails = async _id => {
    console.log(_id);
    const url = `https://openapi.programming-hero.com/api/news/${_id}`
    const res = await fetch(url);
    const data = await res.json();
    const detailsNews = data.data;
    displayNewsDetails(detailsNews);
    // console.log(data.data);
}

const displayNewsDetails = newsDetails => {
    console.log(newsDetails);
    const newsModalLabel = document.getElementById('newsModalLabel');
    newsModalLabel.innerText = newsDetails[0].title;
    const modalBody = document.getElementById('details-news');
    modalBody.innerHTML = `
    <img class="w-100" src="${newsDetails[0].image_url}">
    <p> ${newsDetails[0].details} </p>
    <div class="d-flex align-items-center justify-content-around">
        <img class="image-round" src="${newsDetails[0].author.img}" alt="">
        <h6>${newsDetails[0].author.name ? newsDetails[0].author.name : 'No Data Found'}</h6>
        <p>${newsDetails[0].author.published_date}</p>
    </div>
    `;

    // document.getElementById('details-news').innerText = newsDetails[0].details;

}

setAllMenu()

// loadAllNews();