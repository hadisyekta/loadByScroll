const url = 'https://script.google.com/macros/s/AKfycbxFlQXkvna9jYamLWhTQ1k3cJItWZDvCYoCmLTcN-CJcr7vZw/exec';
const val = {page:15};
const page = {};
page.main = document.querySelector('.container');

page.loadMore = true;
page.inside = document.createElement('div')
page.container = document.createElement('ul');
page.container.textContent = "hello World";
page.message = document.createElement('div');
page.message.textContent = "-- Scroll to load More Content --"
page.main.appendChild(page.container);
page.main.appendChild(page.message);
//page.main.appned(inside);
//page.inside.appned(container);
firstLoad();

function firstLoad(){
    page.container.textContent = "";
    getCourses()
}


function getCourses(){
  const baseURL = url + '?p=' + val.page;
  page.message.textContent = "Loading ...";
  fetch(baseURL).then((rep)=> rep.json())
  .then((json) => {
    if (json.data.pages.next != null){
        page.loadMore = true;
        page.message.textContent = "- Page " + val.page + " -- Scroll to load More Content--";
    }else{
        page.message.style.display = "none";
    }
    console.log(page);
    console.log(json.data.posts);
    renderData(json.data.posts);
  })
}

window.onscroll = function(ev){
//    console.log(ev);
//    console.log(window);
//    console.log(window.innerHeight);
//    console.log(window.scrollY);
//    console.log(window.innerHeight+ window.scrollY);
//    console.log(document.body.offsetHeight);
//    console.log(page.main.offsetHeight);
    if ((window.innerHeight + window.scrollY)>= (document.body.offsetHeight - 300)){
        if (page.loadMore){
            page.loadMore = false;
            addNewLi();
        }
    }
}

function addNewLi(){
    val.page ++;
    getCourses();
};


function renderData(data){
    data.forEach(function(d){
        const li = document.createElement('li');
        li.innerHTML = `<h3>${d[2]}</h3>
        <div class="summary">${d[3]}</div>
        <div >${d[5]} starts by ${d[6]} students</div>
        <a href="${d[0]}" target="_blank">${d[0]}</a>
        <hr>`;
        page.container.appendChild(li);

    })
    }
