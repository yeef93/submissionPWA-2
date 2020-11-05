var base_url = "https://api.football-data.org/v2/";

var API_TOKEN = {
  headers: {
    'X-Auth-Token': '4e82535387fd4d458d6858a7331de9b2'
  }
};


// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}
// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

// Blok kode untuk melakukan request data json
var getteam = "competitions/2001/teams/";
function getTeams() {
  if ('caches' in window) {
    caches.match(base_url + getteam, API_TOKEN).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          var allteamHTML = "";
          data.teams.forEach(function (team) {
            allteamHTML += `                  
            <table class="z-depth-1 toast rounded">       
            <tr>
            <td><a href="./team.html?id=${team.id}"> 
            <img class ="circle" src="${team.crestUrl}" alt="Logo Tim" style="height:100px;padding: 0 25px;"/></td>
            <td style = "padding: 0 25px;"><a href="./team.html?id=${team.id}"><strong><span class="white-text">${team.name}</span></strong></a>
            <p><strong>Address :</strong> ${team.address}</p>
            <p><strong>Website :</strong> <a href="${team.website}" target="_blank">${team.website}</a></p>
            <p><strong>Venue :</strong> ${team.venue}</p></td>
            <td><strong>Phone :</strong> ${team.phone} <br><strong>Email :</strong> ${team.email} </td>
            </tr>
          </table> 
                  `;
          });

          document.getElementById("articles").innerHTML = allteamHTML;
        })
      }
    })
  }

  fetch(base_url + getteam, API_TOKEN)
    .then(status)
    .then(json)
    .then(function (data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.
      var allteamHTML = "";
      data.teams.forEach(function (team) {
        allteamHTML += `       
        <table class="z-depth-1 toast rounded">       
          <tr>
          <td><a href="./team.html?id=${team.id}"> 
          <img class ="circle" src="${team.crestUrl}" alt="Logo Tim" style="height:100px;padding: 0 25px;"/></td>
          <td style = "padding: 0 25px;"><a href="./team.html?id=${team.id}"><strong><span class="white-text">${team.name}</span></strong></a>
          <p><strong>Address :</strong> ${team.address}</p>
          <p><strong>Website :</strong> <a href="${team.website}" target="_blank">${team.website}</a></p>
          <p><strong>Venue :</strong> ${team.venue}</p></td>
          <td><strong>Phone :</strong> ${team.phone} <br><strong>Email :</strong> ${team.email} </td>
          </tr>
        </table>         
        `;
      });

      document.getElementById("articles").innerHTML = allteamHTML;

    })
    .catch(error);
}

function getArticleById() {
  return new Promise(function (resolve, reject) {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    if ("caches" in window) {
      caches.match(base_url + "article/" + idParam).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            var articleHTML = `
            <div class="card">
              <div class="card-image waves-effect waves-block waves-light">
                <img src="${data.result.cover}" />
              </div>
              <div class="card-content">
                <span class="card-title">${data.result.post_title}</span>
                ${snarkdown(data.result.post_content)}
              </div>
            </div>
          `;
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("body-content").innerHTML = articleHTML;

            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
          });
        }
      });
    }



    fetch(base_url + "article/" + idParam)
      .then(status)
      .then(json)
      .then(function (data) {
        // Objek JavaScript dari response.json() masuk lewat variabel data.
        console.log(data);
        // Menyusun komponen card artikel secara dinamis
        var articleHTML = `
          <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
              <img src="${data.result.cover}" />
            </div>
            <div class="card-content">
              <span class="card-title">${data.result.post_title}</span>
              ${snarkdown(data.result.post_content)}
            </div>
          </div>
        `;
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("body-content").innerHTML = articleHTML;
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
      });
  });
}

function getSavedArticles() {
  getAll().then(function (articles) {
    console.log(articles);
    // Menyusun komponen card artikel secara dinamis
    var articlesHTML = "";
    articles.forEach(function (article) {
      var description = article.post_content.substring(0, 100);

      articlesHTML += `
              <div class="card">
                <a href="./article.html?id=${article.ID}&saved=true">
                  <div class="card-image waves-effect waves-block waves-light">
                    <img src="${article.cover}" />
                  </div>
                </a>
                <div class="card-content">
                  <span class="card-title truncate">${article.post_title
        }</span>
                  <p>${description}</p>
                </div>
              </div>
            `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = articlesHTML;
  });
}

function getSavedArticleById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");

  getById(idParam).then(function (article) {
    articleHTML = '';
    var articleHTML = `
<div class="card">
  <div class="card-image waves-effect waves-block waves-light">
    <img src="${article.cover}" />
  </div>
  <div class="card-content">
    <span class="card-title">${article.post_title}</span>
    ${snarkdown(article.post_content)}
  </div>
</div>
`;
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = articleHTML;
  });
}
