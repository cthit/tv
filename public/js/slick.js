$(document).ready(function(){
  //Initialize slick
  $('.main-container').slick({
    infinite: true
  });
  //To make sure buttons dont "get stuck" in hover mode when pressed
  $("button").mouseup(function(){
      $(this).blur();
  });
  //Keys to make navigation easier
  $("body").keydown(function(e) {
    //left 65 && 37
    //right 68 && 34
    if(e.which == 65 || e.which == 37){
      $('.main-container').slick('slickPrev');
    }else if (e.which == 68 || e.which == 34) {
      $('.main-container').slick('slickNext');
    }
  });
});
