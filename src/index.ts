$(document).ready(function () {
  if (window.location.hash) {
    $("[loader-content='true']").hide();
  } else {
    $("[loader-content='true']").show();
    $('body').addClass('lock-scroll-loader');

    window.addEventListener(
      'load',
      function load() {
        window.removeEventListener('load', load, false);

        // Delay before the loading complete trigger in MS
        setTimeout(function () {
          $("[loader-trigger='true']").click();
        }, 7000);

        // Delay before unlocking scroll after load in MS
        setTimeout(function () {
          $('body').removeClass('lock-scroll-loader');
        }, 7000);
      },
      false
    );
  }
});
