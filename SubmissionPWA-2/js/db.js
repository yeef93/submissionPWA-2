var dbPromised = idb.open("bebo", 25, function(upgradeDb) {
  var articlesObjectStore = upgradeDb.createObjectStore("articles", {
    keyPath: "id"
  });
  articlesObjectStore.createIndex("teams_id", "id", { unique: false });
});

function saveForLater(data) {
  console.log(data)
  dbPromised
    .then(function(db) {
      var tx = db.transaction("articles", "readwrite");
      var store = tx.objectStore("articles");    
      store.put(data);
      console.log(data)
      return tx.complete;
    })
    .then(function() {
      console.log("Tim berhasil di simpan.");
    });
}

function getAll() {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("articles", "readonly");
        var store = tx.objectStore("articles");
        return store.getAll();
      })
      .then(function(data) {
        resolve(data);
      });
  });
}

function getById(id) {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("articles", "readonly");
        var store = tx.objectStore("articles");
        return store.get(id);
      })
      .then(function(data) {         
        resolve(data);  
      });
  });
}