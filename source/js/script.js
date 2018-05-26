$(document).ready(function() {

  // Smooth Scroll
  $('a[href*="#"]')
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
        && 
        location.hostname == this.hostname
      ) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          event.preventDefault();
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000, function() {
            // var $target = $(target);
            // $target.focus();
            // if ($target.is(":focus")) {
            //   return false;
            // } else {
            //   $target.attr('tabindex','-1');
            //   $target.focus();
            // };
          });
        }
      }
    });

  // Check if header is in viewport
  $.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();
  
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
  
    return elementBottom > viewportTop && elementTop < viewportBottom;
  };
  
  $(window).on('resize scroll', function() {
    var sdBtn = $('.main-nav__arrow');
    if($('#top').isInViewport()) {
      if(sdBtn.hasClass('turn')) {
        sdBtn.removeClass('turn');
        sdBtn.parent().attr('href', '#content');
      }
    } else {
      if(!sdBtn.hasClass('turn')) {
        sdBtn.addClass('turn');
        sdBtn.parent().attr('href', '#top');
      }
    }
  });

  // Slider Reviews
  $('.reviews__slider').slick({
    centerMode: true,
    slidesToShow: 3,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          centerMode: true,
          slidesToShow: 1
        }
      },
      {
        breakpoint: 840,
        settings: {
          centerMode: false,
          slidesToShow: 1
        }
      }
    ]
  });

  // Menu
  // Toggle
  $('.menu-toggle').on('click', function() {
    $('html').toggleClass('menu-open');
  });

  // Dropdown
  var linksWithDD = $('.menu li').has('ul');
  var dropdownList = $('.menu li ul');
  linksWithDD.on('click', function() {
    dropdownList.not($(this).children('ul')).each(function() {
      $(this).slideUp(300);
      $(this).parent().removeClass('open');
    });
    $(this).children('ul').slideToggle(300);
    $(this).toggleClass('open');
  });

})