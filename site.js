$j(document).ready(function() {
  var currentpage;
  var maxpage;
  var search;
    $j('#ghsearchbtn').on('click', function(e) {
        currentpage = 1;
        search = $j('#ghsearch').val();

        e.preventDefault();
       $j('.loader').html('<div id="loader"><img src="loader.gif" alt="loading..."></div>');
        (function() {
            var githubAPi = "https://api.github.com/search/repositories?q=stars:>=500+language:" + $j('#ghsearch').val();
            $j.getJSON(githubAPi, {
                    sort: "stars",
                    order: "desc",
                    per_page: "20",
                    page: currentpage
                })
                .done(function(data) {
                    $j('.total-count').html(data.total_count);
                    $j('.search-count').show();
                    $j('#ghapidata').html("");
                    maxpage=Math.ceil(data.total_count / 20);
                    $j.each(data.items, function(i, item) {
                        out = searchItems(item.html_url,item.full_name,item.language,item.description);
                        $j("#ghapidata").append(out);

                    });
                    if(currentpage < maxpage) {
                        $j(".loader").html("<a href='#'' id='morebtn'>load more</a>");
                    } else {
                        $j(".loader").html("");
                    }

                })
                .fail(function() {
    alert();
  });
        })();
    });
    
    $j(document).on('click', "#morebtn", function(e) {
        e.preventDefault();
          $j('.loader').html('<div id="loader"><img src=" loader.gif" alt="loading..."></div>');
        currentpage =currentpage+1;
        //alert(currentpage);
        (function() {
            var githubAPi = "https://api.github.com/search/repositories?q=stars:>=500+language:" + search;
            $j.getJSON(githubAPi, {
                    sort: "stars",
                    order: "desc",
                    per_page: "20",
                    page: currentpage
                })
                .done(function(data) {

                    //alert(Math.ceil(maxpage = data.total_count / 100));
                    $j.each(data.items, function(i, item) {
                        out = searchItems(item.html_url,item.full_name,item.language,item.description);
                        $j("#ghapidata").append(out);

                    });
                    if(currentpage < maxpage) {
                        $j(".loader").html("<a href='#' id='morebtn'>load more</a>");
                    } else {
                        $j(".loader").html("");
                    }

                });
        })();
    });
    //
function searchItems(url,full_name,language,description) {
  return "<div class='searchItem'><div class='item-name'><i class='fa fa-arrow-right icon-right ' aria-hidden='true'></i><a href='"+ url + "' target='_blank' title='Opens in a new Window' >" + full_name + "</a></div><div><span>Language: " + language + "</span>\t<span> | "  + description + "</span></div></div>";
}
});