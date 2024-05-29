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

        // Get the delay value from the loader-trigger-delay attribute
        let delay = $("[loader-content='true']").attr('loader-trigger-delay');
        delay = parseInt(delay, 10); // Convert the value to an integer in milliseconds

        // Use the delay value for the setTimeout
        setTimeout(function () {
          $("[loader-trigger='true']").click();
        }, delay);

        // Delay before unlocking scroll after load in MS
        setTimeout(function () {
          $('body').removeClass('lock-scroll-loader');
        }, delay);
      },
      false
    );
  }
});
