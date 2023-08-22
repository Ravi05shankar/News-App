const API_KEY = "290e1840e5484d09a682024164d334e3";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
  window.location.reload();
}
// function bindData(articles) {
//   const cardsContainer = document.getElementById("cards-container");
//   const newsCardTemplate = document.getElementById("template-news-card");

//   cardsContainer.innerHTML = "";

//   articles.forEach((article) => {
//     if (!article.urlToImage) return;
//     const cardClone = newsCardTemplate.content.cloneNode(true);
//     fillDataInCard(cardClone, article);
//     cardsContainer.appendChild(cardClone);
//   });
// }



// async function fetchNews(query) {
  //   const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  //   const data = await res.json();
  //   bindData(data.articles);
  // }
  
  function bindData(articles) {
    if (!articles || !Array.isArray(articles)) {
      console.error("Invalid or missing articles data");
      return;
    }
  
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");
  
    cardsContainer.innerHTML = "";
  
    articles.forEach((article) => {
      if (!article.urlToImage) return;
      const cardClone = newsCardTemplate.content.cloneNode(true);
      fillDataInCard(cardClone, article);
      cardsContainer.appendChild(cardClone);
    });
  }

async function fetchNews(query) {
  try {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();

    console.log(res)
    
    console.log(data.articles)
    bindData(data.articles);
  } catch (error) {
    console.error("Error fetching news:", error);
  }
}


function fillDataInCard(cardClone, article) {
  const newsImg = cardClone.querySelector("#news-img");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-source");
  const newsDesc = cardClone.querySelector("#news-desc");

  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;

  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });

  newsSource.innerHTML = `${article.source.name} · ${date}`;

  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}

let curSelectedNav = null;
function onNavItemClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = navItem;
  curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
  const query = searchText.value;
  if (!query) return;
  fetchNews(query);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = null;
});
