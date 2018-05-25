$(document).ready(function() {

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