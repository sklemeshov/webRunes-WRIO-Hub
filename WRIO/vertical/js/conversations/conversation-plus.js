﻿(function () {

    var tour = new Tour({
        storage: false,
        template: '<div class="popover tour"><div class="arrow"></div><h3 class="popover-title"></h3><img src="img/profile-ia.png" class="profile-ia"><div class="popover-content"></div><div class="popover-navigation col-xs-12"><div class="btn-group"><button class="btn btn-sm btn-default go-to" data-go-to-step="0" data-role="prev">Repeat</button></div><div class="btn-group pull-right"><button class="btn btn-sm btn-default" data-role="end">End conversation</button></div></div></div>'
    });

    tour.addSteps([
      {
          //0
          orphan: true,
          title: "Plus",
          content: "Это Plus - приложение с которым вы будете часто взаимодействовать. По сути дела это браузер платформы WRIO.<ul class='nav nav-pills nav-stacked'><li><a href='#'>Подожди, что такое хаб?</a></li><li><a href='#' class='go-to' data-go-to-step='1'>Что представляет из себя платформа WRIO?</a></li><li><a href='#' class='go-to' data-go-to-step='1'>Я хотел бы спросить о другом</a></li></ul>"
      },
      {
          //1
          element: ".step1",
          placement: "left",
          title: "Регистрация",
          content: "Отлично! Тогда прошу ввести здесь email, а ниже желаемый пароль. Ребята из webRunes подошли к вопросу безопасности весьма демократично в отличие от практически всех других сайтов и не ставят раздражающих требований к паролю, но со своей стороны я бы рекомендовал выбрать пароль посложнее. Я буду рад помочь вам с этим и могу сгенерировать подходящий.<ul class='nav nav-pills nav-stacked'><li><a href='#' class='go-to' data-go-to-step='2'>Да, пожалуйста, помоги</a></li></ul>"
      },
      {
          //2
          element: ".step2",
          placement: "left",
          title: "Регистрация",
          content: "Готово! Ваш пароль: [пароль]. Я могу отослать его копию на почту после регистрации, но помните, что это может быть небезопасно если вы не уверены в приватности своей почты.<ul class='nav nav-pills nav-stacked'><li><a href='#' class='go-to' data-go-to-step='2'>Что-то мне не нравится пароль, пожалуйста, сгенерируй другой</a></li><li><a href='#' class='go-to' data-go-to-step='2'>Спасибо, отошли. Я уверен в безопасности почтового ящика, а забыть пароль не хочу</a></li></ul>"
      }
    ]);

    // Initialize the tour
    tour.init();

    // Start the tour
    tour.start();

    $(document).on("click", ".go-to", function (e) {
        var step = parseInt($(this).data("go-to-step"));
        tour.goTo(step);
    });

}());