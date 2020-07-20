// mainpage video playback speed

// document.querySelector("#mainpagevideo").playbackRate = 0.7

let apiUrl = 'https://www.alphavantage.co/query?function=OVERVIEW&symbol=msft&apikey=486OHSPRRLZR5IJI';




document.querySelector('#saver-search-btn').addEventListener('click', function(){
    searchInput = document.querySelector('#saver-search').value;
    let newApiUrl = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${searchInput}&apikey=486OHSPRRLZR5IJI
    `
    alert(newApiUrl)
       
})

