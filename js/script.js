var imgorgH, imgorgW;
var modalON=false;
var imgTitle;

$(document).ready(function() {

  	$(window).resize(function(){
        $('.loader').css({
            'top':($(window).height()-$('.loader').outerHeight())/2+$(document).scrollTop(),
            'left':($(window).width()-$('.loader').outerWidth())/2+$(document).scrollLeft()
        });

        if(modalON) {
      		$('.modal').css({
      			'top':($(window).height()-$('.modal').outerHeight())/2+$(document).scrollTop(),
      			'left':($(window).width()-$('.modal').outerWidth())/2+$(document).scrollLeft()
      		});
        }
  	});
	
    $(".image").click( function() {
         
        var clickedImg = $(this).find('img');
        imgTitle = $(this).next().text();

        var imgName = "images/" + clickedImg.attr("alt") + ".jpg";

        $(".loader").show();
        $(window).resize();

        if($('.enlarged-img').attr('src'))  { //if <img> has src attr remove it
            $('.enlarged-img').removeAttr('src');
        }
        $(".enlarged-img").attr("src",imgName);

        return false;
    });

    $(".enlarged-img").load(function()  {

        $(".loader").hide();

        modalOpen(400);
        positionImg();

    	  var w,h;
        w=$(this).width();
        h=$(this).height();

        $('.modal .image-title').text(imgTitle);
        $(".modal").css({'height':h,'width':w});
        $(window).resize();
        
    }).error(function () { 
        /*alert("Can't Load image.");*/
    });

    function realSize(){
        var orgImg = $('.enlarged-img');
        var newImg = new Image();
        newImg.src=orgImg.attr('src');
        imgorgH = newImg.height;
        imgorgW = newImg.width;
    }

    function positionImg()  {
        var windowH, windowW, minHdiff, minVdiff, diffH, diffV;
        var newW,newH;
        
        realSize();

        windowW = $(window).innerWidth();
        windowH = $(window).innerHeight();

        minHdiff = (windowW/10)*2;
        minVdiff = (windowH/10)*2;

        diffH = windowW - imgorgW;
        diffV = windowH - imgorgH;

        //calculate new width
        if((windowW-minHdiff)>=imgorgW)
          newW=imgorgW;
        else
          newW=(windowW-minHdiff);


        if((windowH-minVdiff)>=imgorgH)
          newH=imgorgH;
        else
          newH=(windowH-minVdiff);

       $(".enlarged-img").css({"width":"auto","height":"auto"});
       //auto adjust width or height if other changes in below code

       if(diffH<=minHdiff && diffV<=minVdiff) {
          if(diffH<=diffV) 
            $(".enlarged-img").css("width",newW);
          else
            $(".enlarged-img").css("height",newH);
       }
       else if(diffH<=minHdiff) //recalculate image width
       {
          $(".enlarged-img").css("width",newW);
       }
       else if(diffV<=minVdiff) //recalculate image height
       {
         $(".enlarged-img").css("height",newH);
       }

    }

    $(".modal").hover(function()  {
      $(".close").stop(true,true).fadeIn('fast');
    },function(){
      $(".close").stop(true,true).fadeOut('fast');
    });

    $('.modal-bg').click(function() {
    	modalClose(400);
    });

    $('.close').click(function()  {
      modalClose(400);
      return false;
    });

    function modalOpen(delay) {
      modalON=true;
    	$('.modal-bg').stop().fadeIn(delay/2);
      $('.modal').css({'opacity':0,'display':'block'});
    	$('.modal').stop().delay(delay/2).animate({'opacity':1},delay);
    }

    function modalClose(delay)  {
        $('.modal').stop().fadeOut(delay/2);
        $('.modal-bg').stop().delay(delay/2).fadeOut(delay,function(){
             $('.modal').removeAttr('style');
             $('.modal-bg').removeAttr('style');
            modalON=false;
        });
    }
$(function(){
  $(".img-swap").on('click', function() {
    if ($(this).attr("rel") == "img-swap") {
      this.src = this.src.replace("_off","_on");
    } else {
      this.src = this.src.replace("_on","_off");
    }
    $(this).toggleClass("on");
  });
});

var divdbl = $( "div.blue" );
divdbl.dblclick(function() {
  divdbl.toggleClass( "dbl" );
});

    var i = 0;
$( "div.overout" )
  .mouseover(function() {
    i += 1;
    $( this ).find( "span" ).text( "mouse over x " + i );
  })
  .mouseout(function() {
    $( this ).find( "span" ).text( "mouse out " );
  });
 
var n = 0;
$( "div.enterleave" )
  .mouseenter(function() {
    n += 1;
    $( this ).find( "span" ).text( "mouse enter x " + n );
  })
  .mouseleave(function() {
    $( this ).find( "span" ).text( "mouse leave" );
  });

  var last, diff;
$( "div.time" ).click(function( event ) {
  if ( last ) {
    diff = event.timeStamp - last;
    $( "div.time" ).append( "time since last event: " + diff + "<br>" );
  } else {
    $( "div.time" ).append( "Click again.<br>" );
  }
  last = event.timeStamp;
});
$( "p1" ).bind( "click", function( event ) {
  var str = "( " + event.pageX + ", " + event.pageY + " )";
  $( "p2" ).text( "Click happened! " + str );
});
$( "p1" ).bind( "dblclick", function() {
  $( "p2" ).text( "Double-click happened in " + this.nodeName );
});
$( "p1" ).bind( "mouseenter mouseleave", function( event ) {
  $( this ).toggleClass( "over" );
});
$( "p1" ).bind( "click", function() {
  alert( $( this ).text() );
});

});