$(document).ready(function () {
  $(".carousel__inner").slick({
    //  dots: true,
    speed: 400,
    //  adaptiveHeight: true,
    prevArrow:
      '<button type="button" class="slick-prev"> <img src="icons/left.png"></button>',
    nextArrow:
      '<button type="button" class="slick-next"><img src="icons/right.png"</button>',
  });
});
