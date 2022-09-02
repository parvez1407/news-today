const loadAllNews = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await res.json();
    return data.data.news_category;
    // console.log(data.data.news_category);
}


const setAllMenu = async () => {
    // console.log(loadAllProducts());
    const data = await loadAllNews();
    console.log(data);
    const allMenu = document.getElementById('all-menu');
    for (const news of data) {
        // console.log(news.category_name);
        const div = document.createElement('div');
        div.innerHTML = `
            <li class="nav-item mx-4">
                <a onclick="getNewsCategoryDetails('${news.category_id}')" class="nav-link" href="#home">${news.category_name}</a>
            </li>
        `;
        allMenu.appendChild(div);
    }
}

const getNewsCategoryDetails = async (category_id) => {
    console.log(category_id);
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`);
    const data = await res.json();
    const allNews = data.data;
    console.log(allNews);

    const newsContainer = document.getElementById('news-container');

    allNews.forEach(news => {
        const cardDiv = createElement('div');
        cardDiv.classList.add('row g-0');
        cardDiv.innerHTML = `
        <div class="col-md-4">
            <img src="..." class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to
                    additional content. This content is a little bit longer.</p>

            </div>
            <div class="d-flex align-items-center justify-content-around">
                <div>
                    <img src="" alt="">
                    <h6>Name</h6>
                </div>
                <div>
                    <h3>1.5M</h3>
                </div>
                <div>
                    <button class="btn btn-info">show Details</button>
                </div>
            </div>
        </div>
        `
        newsContainer.appendChild(cardDiv);
    });



}

setAllMenu()

// loadAllNews();