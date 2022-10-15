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

  $("ul.catalog__tabs").on(
    "click",
    "li:not(.catalog__tab_active)",
    function () {
      $(this)
        .addClass("catalog__tab_active")
        .siblings()
        .removeClass("catalog__tab_active")
        .closest("div.container")
        .find("div.catalog__content")
        .removeClass("catalog__content_active")
        .eq($(this).index())
        .addClass("catalog__content_active");
    }
  );

  function toggleSlide(item) {
    $(item).each(function (i) {
      $(this).on("click", function (e) {
        e.preventDefault();
        $(".catalog-item__content")
          .eq(i)
          .toggleClass("catalog-item__content_active");
        $(".catalog-item__list").eq(i).toggleClass("catalog-item__list_active");
      });
    });
  }

  toggleSlide(".catalog-item__link");
  toggleSlide(".catalog-item__back");

  // Модальные окна

  $("[data-modal=consultation]").on("click", function () {
    $(".overlay,#consultation").fadeIn("slow");
  });
  $(".modal__close").on("click", function () {
    $(".overlay,#consultation,#thanks,#order").fadeOut("slow");
  });

  $(".button_mini").each(function (i) {
    $(this).on("click", function () {
      $("#order .modal__descr").text($(".catalog-item__subtitle").eq(i).text());
      $(".overlay, #order").fadeIn("slow");
    });
  });
  function validateForms(form) {
    $(form).validate({
      rules: {
        name: "required",
        phone: "required",
        email: {
          required: true,
          email: true,
        },
      },
      messages: {
        name: "Пожалуяста, ввкдите свое имя",
        phone: "Пожалуйста, введите свой номер телефона",
        email: {
          required: "Пожалуяста, введите своё почту ",
          email: "Не правильно введен адрес почты",
        },
      },
    });
  }
  validateForms("#consultation-form");
  validateForms("#consultation form");
  validateForms("#order form");

  $("input[name=phone]").mask("+7 (999)-999-99-99");

  $("form").submit(function (e) {
    e.preventDefault();
    // Используем превент дефолт что бы отключить перезагрузку страницы при клике на отправку формы. Благодаря этой команды страница не будет перезагружаться.
    if (!$(this).valid()) {
      return;
    }
    $.ajax({
      type: "POST",
      // Отправляем данные на сервер. Далее прописывае что данные мы будет отправлять а не получать.
      url: "mailer/smart.php",
      // указываем какой обработчик будт обрабатывать при url прописываем кудаю
      data: $(this).serialize(),
      // serialize() метод подготовки данных перед отправкой на сервер.
    }).done(function () {
      $(this).find("input").val("");
      // Прописываем что после отправки формы все инпуты будут очищены.
      $("#consultation, #order").fadeOut();
      $(".overlay, #thanks").fadeIn("slow");
      $("form").trigger("reset");
    });
    return false;
  });

  // Smooth scroll and pageup

  $(window).scroll(function () {
    if ($(this).scrollTop() > 1600) {
      $(".pageup").fadeIn();
    } else {
      $(".pageup").fadeOut();
    }
  });

  $("a[href=#up]").click(function () {
    const _href = $(this).attr("href");
    $("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
    return false;
  });

  new WOW().init();
});
