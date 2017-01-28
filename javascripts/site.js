$j(document).ready(function() {
    //     function equalHeight() {

    // function setEqualHeight_CommonClass(arr){
    //     var x = new Array([]);
    //     $j(arr).each(function(i) {
    //         $j(this).height('auto');
    //         x[i] = $j(this).outerHeight();
    //     });
    //     Max_Value = Array.max(x);
    //     $j(arr).each(function(i) {
    //         //if($j(arr[i]).height() != Max_Value)
    //         //  {x[i] = $j(arr[i]).height(Max_Value);}
    //         $j(this).outerHeight(Max_Value);
    //     });
    // }

    // function setEqualHeight(arr) {
    //     var x = new Array([]);
    //     for (i = 0; i < arr.length; i++) {
    //         x[i] = $j(arr[i]).height('auto');
    //         x[i] = $j(arr[i]).outerHeight();
    //     }
    //     Max_Value = Array.max(x);
    //     for (i = 0; i < arr.length; i++) {
    //         //if($j(arr[i]).height() != Max_Value)
    //         // {x[i] = $j(arr[i]).height(Max_Value);}
    //         x[i] = $j(arr[i]).outerHeight(Max_Value);
    //     }
    // }
    // Array.min = function(array) {
    //     return Math.min.apply(Math, array);
    // };

    // Array.max = function(array) {
    //     return Math.max.apply(Math, array);
    // };
    //         myObj = $j('.searchItem-wrapper').getSameTopGroups({
    //             commonParent: '.row'}, function(gc) {
    //             for(i = 1; i <= gc; i++) {
    //                 setEqualHeight_CommonClass('.gg-g-' + i + " .item-name");
    //                 setEqualHeight_CommonClass('.gg-g-' + i + " .item-content");
    //                 setEqualHeight_CommonClass('.gg-g-' + i + " .searchItem");

    //             }
    //         });
    //     }


    /*------------- Set equal height function Ends -------------- */
    $j(".mainWrapper").css('min-height', '');
    $j(".mainWrapper").css('min-height', $j(window).height() - 1);
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
            $j.ajax(githubAPi, {
                    sort: "stars",
                    order: "desc",
                    per_page: "20",
                    page: currentpage
                })
                .done(function(data) {
                    $j('.total-count').html(data.total_count);
                    $j('.search-count').show();
                    $j('.searchs').remove();
                    maxpage = Math.ceil(data.total_count / 20);
                    $j.each(data.items, function(i, item) {
                        out = searchItems(item.html_url, item.full_name, item.language, item.description);
                        $j(".searchWrapper").append(out);
                    });
                    if (currentpage < maxpage) {
                        $j(".loader").html("<a href='#'' id='morebtn'>load more</a>");
                    } else {
                        $j(".loader").html("");
                    }
                    // equalHeight();
                })
                .fail(function() {

                });
        })();

        // equalHeight();
    });

    $j(document).on('click', "#morebtn", function(e) {
        e.preventDefault();
        $j('.loader').html('<div id="loader"><img src=" loader.gif" alt="loading..."></div>');
        currentpage = currentpage + 1;
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
                        out = searchItems(item.html_url, item.full_name, item.language, item.description);
                        $j(".searchWrapper").append(out);

                    });
                    if (currentpage < maxpage) {
                        $j(".loader").html("<a href='#' id='morebtn'>load more</a>");
                    } else {
                        $j(".loader").html("");
                    }

                });
        })();
        // equalHeight();
    });
    //
    function searchItems(url, full_name, language, description) {
        return "<div class='col col-md-3 col-sm-6 col-xs-12 searchs'><div class='card'><div class='card-block'><div class='card-title'><h2>" + full_name + "</h2></div><div class='card-text item-content'><div class='card-text'>Language: " + language + "</div><div> " + description + "</div></div><a class='btn btn-primary' href='" + url + "' target='_blank' title='Opens in a new Window' >View</a></div></div></div>";
    }
});

// $j(window).load(function() {
//     $j(".mainWrapper").css('min-height', '');
//     $j(".mainWrapper").css('min-height', $j(window).height() - 1);
// });
// $j(window).resize(function() {
//     $j(".mainWrapper").css('min-height', '');
//     $j(".mainWrapper").css('min-height', $j(window).height() - 1);
// });