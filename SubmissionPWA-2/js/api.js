const base_url = "https://api.football-data.org/v2/";

const API_TOKEN = {
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
var getteam = "competitions/2021/teams/";
function getTeams() {
  if ('caches' in window) {
    caches.match(base_url + getteam, API_TOKEN).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          var allteamHTML = "";
          data.teams.forEach(function (team) {
            allteamHTML += `                  
            <div class="container">
                <div class="col s12 m5">
                  <div class="card" style="margin-top:50px;">
                    <div class="card-image waves-effect waves-block waves-light">
                    <a href="./team.html?id=${team.id}"> 
                    <img class="responsive-img" style="margin-top:20px;" alt="Logo Tim" src="${team.crestUrl}"/></a>
                    </div>                      
                    <div class="card-content pink lighten-3" style="margin-top:15px;">                         
                      <span class="card-title truncate center-align" style="font-weight:bold; font-size:30px;">
                      <a href="./team.html?id=${team.id}"> ${team.name}</a></span>
                    </div>
                  </div>
                </div>  
                </div>
                  `;
          });

          document.getElementById("teams").innerHTML = allteamHTML;
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
        <div class="container">
                <div class="col s12 m5">
                  <div class="card" style="margin-top:50px;">
                    <div class="card-image waves-effect waves-block waves-light">
                    <a href="./team.html?id=${team.id}"> 
                    <img class="responsive-img" style="margin-top:20px;" alt="Logo Tim" src="${team.crestUrl}"/></a>
                    </div>                      
                    <div class="card-content pink lighten-3" style="margin-top:15px;">                         
                      <span class="card-title truncate center-align" style="font-weight:bold; font-size:30px;">
                      <a href="./team.html?id=${team.id}"> ${team.name}</a></span>
                    </div>
                  </div>
                </div>  
                </div>
        `;
      });

      document.getElementById("teams").innerHTML = allteamHTML;

    })
    .catch(error);
}

// kode get data klasemen la liga
var getKlasemen = "competitions/2021/standings/";
function getAllKlasemen() {
  if ('caches' in window) {
    caches.match(base_url + getKlasemen, API_TOKEN).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          var winner = data.standings[0];
          var klasemenHTML = "";
          winner.table.forEach(function (data) {
            klasemenHTML += `                      
                    <tr>                      
                      <td class="center-align">${data.position}</td>                     
                      <td>${data.team.name}</td>
                      <td class="center-align"><img class="responsive-img" alt="logo" style="width:40px; height:40px;" src="${data.team.crestUrl}"/></td>
                      <td class="center-align">${data.won}</td>
                      <td class="center-align">${data.draw}</td>
                      <td class="center-align">${data.lost}</td>
                      <td class="center-align">${data.points}</td>                  
                    </tr>                          
                  `;
          });

          document.getElementById("klasemens").innerHTML = klasemenHTML;

        })
      }
    })
  }

  fetch(base_url + getKlasemen, API_TOKEN)
    .then(status)
    .then(json)
    .then(function (data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.
      var winner = data.standings[0];
      var klasemenHTML = "";
      winner.table.forEach(function (data) {
        klasemenHTML += `            
            <tr>
              <td class="center-align">${data.position}</td>              
              <td>${data.team.name}</td>
              <td class="center-align"><img class="responsive-img" alt="logo" style="width:40px; height:40px;" src="${data.team.crestUrl}"/></td>
              <td class="center-align">${data.won}</td>
              <td class="center-align">${data.draw}</td>
              <td class="center-align">${data.lost}</td>
              <td class="center-align">${data.points}</td>        
            </tr> 
          `;
      });

      document.getElementById("klasemens").innerHTML = klasemenHTML;

    })
    .catch(error);
}

function getAllTeamsById() {
  return new Promise(function (resolve, reject) {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    if ("caches" in window) {
      caches.match(base_url + "teams/" + idParam, API_TOKEN).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            var allteambyidHTML = `         
            <div class="row">
                <div class="col s12 m5">
                  <div class="card" style="margin-top:50px;"> 
                    <div class="card-image waves-effect waves-block waves-light">                         
                      <img class="responsive-img" style="margin-top:20px;" src="${data.crestUrl}"/>
                    </div>                      
                    <div class="card-content pink lighten-3" style="margin-top:15px;">                         
                      <span class="card-title truncate center-align" style="font-weight:bold; font-size:30px;">${data.name}</span>
                    </div>
                  </div>
                </div>

                <div class="col s12 m7">
                        <div class="section card-panel teal lighten-3" style="margin-top:50px;">
                        <span style="font-weight:bold; font-size:30px;">Detail</span>
                            <p><strong>Address :</strong> ${data.address}</p>
                            <p>Phone : ${data.phone}</p>
                            <p>Email : ${data.email}</p>
                            <p>Founded : ${data.founded}</p>
                            <p>Club Colors :${data.clubColors}</p>
                            <p>Venue : ${data.venue}</p>
                            <p>Website : <a href="${data.website}" target="_blank">${data.website}</a></p>
                        </div>                    
                </div>  
            </div>          
            `;

            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("body-content").innerHTML = allteambyidHTML;

            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
          });
        }
      });
    }

    fetch(base_url + "teams/" + idParam, API_TOKEN)
      .then(status)
      .then(json)
      .then(function (data) {
        // Objek JavaScript dari response.json() masuk lewat variabel data.     
        var allteambyidHTML = ` 
        <div class="row">
                <div class="col s12 m5">
                  <div class="card" style="margin-top:50px;"> 
                    <div class="card-image waves-effect waves-block waves-light">                         
                      <img class="responsive-img" style="margin-top:20px;" src="${data.crestUrl}"/>
                    </div>                      
                    <div class="card-content pink lighten-3" style="margin-top:15px;">                         
                      <span class="card-title truncate center-align" style="font-weight:bold; font-size:30px;">${data.name}</span>
                    </div>
                  </div>
                </div>
                <div class="col s12 m7">
                        <div class="section card-panel teal lighten-3" style="margin-top:50px;">
                            <span style="font-weight:bold; font-size:30px;">Detail</span>
                            <p><strong>Address :</strong> ${data.address}</p>
                            <p><strong>Phone :</strong> ${data.phone}</p>
                            <p><strong>Email :</strong> ${data.email}</p>
                            <p><strong>Founded :</strong> ${data.founded}</p>
                            <p><strong>Club Colors :</strong>${data.clubColors}</p>
                            <p><strong>Venue :</strong> ${data.venue}</p>
                            <p><strong>Website :</strong> <a href="${data.website}" target="_blank">${data.website}</a></p>
                        </div>                    
                </div>  
            </div>                     
        `;

        // Sisipkan komponen card ke dalam elemen dengan id #content        
        document.getElementById("body-content").innerHTML = allteambyidHTML;

        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
      });
  });
}


function getTeamById() {
  return new Promise(function (resolve, reject) {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    if ("caches" in window) {
      caches.match(base_url + "team/" + idParam).then(function (response) {
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



    fetch(base_url + "team/" + idParam)
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

//menyimpan artikel
function getSavedArticles() {
  getAll().then(function (data) {
    console.log(data);
    var teamHTML = `<div class="row" style="margin-bottom:50px;">
                        <div class="card-panel teal darken-3" style="height: auto">
                            <h4 class="center-align" style="margin-top:0; color: white;">TIM FAVORIT</h4>          
                        </div>  
                    </div>                
                    `;

    data.forEach(function (team) {
      teamHTML += `        
      <div class="row ">
                <div class="col s12 m5">
                  <div class="card" style="margin-top:10px;"> 
                    <div class="card-image waves-effect waves-block waves-light">                         
                      <img class="responsive-img" style="margin-top:20px;" src="${team.crestUrl}"/>
                    </div>                      
                    <div class="card-content pink lighten-3" style="margin-top:15px;">                         
                      <span class="card-title truncate center-align" style="font-weight:bold; font-size:30px;">${team.name}</span>
                    </div>
                  </div>
                </div>

                <div class="col s12 m7">                    
                <div class="section card-panel teal lighten-3" style="margin-top:10px;">
                <span style="font-weight:bold; font-size:30px;">Detail</span>
                <p><strong>Address :</strong> ${team.address}</p>
                <p><strong>Phone :</strong> ${team.phone}</p>
                <p><strong>Email :</strong> ${team.email}</p>
                <p><strong>Founded :</strong> ${team.founded}</p>
                <p><strong>Club Colors :</strong>${team.clubColors}</p>
                <p><strong>Venue :</strong> ${team.venue}</p>
                <p><strong>Website :</strong> <a href="${team.website}" target="_blank">${team.website}</a></p>
            </div>  
                </div>                            
            </div>
            <br>                      
                `;
    });

    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("body-content").innerHTML = teamHTML;
  });
}

//  Menyimpan artikel By.ID
function getSavedArticleById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");

  getById(parseInt(idParam)).then(function (data) {
    console.log(data)
    teambyidHTML = '';
    var teambyidHTML = `         
              <div class="card" style="margin-top:50px;"> 
                <div class="card-image waves-effect waves-block waves-light">                         
                  <img class="responsive-img" style="margin-top:20px;" src="${data.crestUrl}"/>
                </div>                      
                <div class="card-content pink lighten-3" style="margin-top:15px;">                         
                  <span class="card-title truncate" style="font-weight:bold; font-size:30px;">${data.name}</span>
                </div>
              </div>
                <br>
                  <table style="margin-bottom:50px;">
                  <thead class="teal lighten-2">
                    <tr>
                        <th>Short Name</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>E-Mail</th>
                        <th>Founded</th>
                        <th>Club Colors</th>
                        <th>Venue</th>
                        <th> Website</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>${data.shortName}</tr>                   
                    <tr>${data.address}</tr>
                    <tr>${data.phone}</tr> 
                    <tr>${data.email}</tr> 
                    <tr>${data.founded}</tr>
                    <tr>${data.clubColors}</tr>
                    <tr>${data.venue}</tr>  
                    <tr><a href="${data.website}" target="_blank">${data.website}</a></tr>
                  </tbody>    
                  </table>
        `;

    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = teambyidHTML;

  });
}