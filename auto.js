var phantom = require('phantom');
var counter = 0;
var seach_term = "too close";
var number = 2;
var search_url = "http://nr.mit.edu/audio/search/?q="+ encodeURIComponent(seach_term) +"&from=all_songs";
var id_url = null;

phantom.create().then(function(ph) {
      ph.createPage().then(function(page) {
        page.open(search_url).then(function(status) {
            page.evaluate(getID).then(function(second_part){

                if(second_part === null){
                    console.log("Failed!")
                }
                else{
                    id_url = second_part;
                    //ok, now do it!
                    for(var i = 0; i < number; i ++){
                        page.open(id_url).then(function(status) {
                            console.log(status);
                        });
                    }
                }



            });
        });
      });
});

function getID(){
    var rows = document.querySelectorAll("tbody tr");
    if(rows.length === 0){
        return null
    }
    else{
        return $("tbody tr")[0].querySelector(".title").querySelector("a").href;
    }
}

