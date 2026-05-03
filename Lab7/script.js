function loadHome() {
    document.getElementById("content").innerHTML = "<p>Ласкаво просимо!</p>";
}

function loadCatalog() {
    fetch("data/categories.json")
        .then(res => res.json())
        .then(data => {
            let html = "<h2>Категорії</h2>";

            data.forEach(cat => {
                html += `<p>
                    <a href="#" onclick="loadCategory('${cat.shortname}', '${cat.name}')">
                        ${cat.name}
                    </a>
                </p>`;
            });

            html += `<p><a href="#" onclick="loadRandom()">Specials</a></p>`;

            document.getElementById("content").innerHTML = html;
        });
}

function loadCategory(shortname, name) {
    fetch(`data/${shortname}.json`)
        .then(res => res.json())
        .then(data => {
            let html = `<h2>${name}</h2>`;

            data.forEach(item => {
                html += `
                <div class="card">
                    <img src="https://placehold.co/200x200">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <p><b>${item.price} грн</b></p>
                </div>`;
            });

            document.getElementById("content").innerHTML = html;
        });
}

function loadRandom() {
    fetch("data/categories.json")
        .then(res => res.json())
        .then(data => {
            let random = Math.floor(Math.random() * data.length);
            let cat = data[random];
            loadCategory(cat.shortname, cat.name);
        });
}
