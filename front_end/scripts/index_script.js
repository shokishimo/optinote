// drop down setting
function mediaQueriesWin()
{
    var width = $(window).width();
    if(width <= 768) // less than 768px
    {
        $(".has-another-layer > a").off('click'); // initialize has-another-layer calss's <a> tag on-events for avoiding duplicates
        $(".has-another-layer > a").on('click', function()
        {// clicking <a> tag with has-another-layer
            var parentElem =  $(this).parent(); // get <a> tag's parent <li>
            $(parentElem).toggleClass('active');
            $(parentElem).children('ul').stop().slideToggle(500); // the greater the number gets, the slower it opens
            return false; // deactivate link
        });
    }
    else // greater than 768px
    {
        $(".has-another-layer > a").off('click');
        $(".has-another-layer").removeClass('active');
        $('.has-another-layer').children('ul').css("display","");
    }
}
  
// resize
$(window).resize(function() 
{
    mediaQueriesWin();
});

// call mediaQueriesWin function after page loading
$(window).on('load',function()
{
    mediaQueriesWin();
});