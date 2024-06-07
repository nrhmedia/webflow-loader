$(document).ready(function () {
  function isBreakpointEnabled() {
    const isDesktop = $("[loader-content='true']").attr('loader-on-desktop') === 'true';
    const isTablet = $("[loader-content='true']").attr('loader-on-tablet') === 'true';
    const isMobileLandscape =
      $("[loader-content='true']").attr('loader-on-mobile-landscape') === 'true';
    const isMobilePortrait =
      $("[loader-content='true']").attr('loader-on-mobile-portrait') === 'true';

    const width = $(window).width();

    if (width >= 992 && !isDesktop) return false; // Desktop (Webflow: 992px and up)
    if (width >= 768 && width < 992 && !isTablet) return false; // Tablet (Webflow: 768px to 991px)
    if (width >= 480 && width < 768 && !isMobileLandscape) return false; // Mobile Landscape (Webflow: 480px to 767px)
    if (width < 480 && !isMobilePortrait) return false; // Mobile Portrait (Webflow: up to 479px)

    return true;
  }

  if (window.location.hash || !isBreakpointEnabled()) {
    $("[loader-content='true']").hide();
  } else {
    $("[loader-content='true']").show();
    $('body').addClass('lock-scroll-loader');

    window.addEventListener(
      'load',
      function load() {
        window.removeEventListener('load', load, false);

        // Get the delay values from the respective attributes
        let triggerDelay = $("[loader-content='true']").attr('loader-trigger-delay');
        let scrollDelay = $("[loader-content='true']").attr('loader-scroll-delay');

        triggerDelay = parseInt(triggerDelay, 10); // Convert the value to an integer in milliseconds
        scrollDelay = parseInt(scrollDelay, 10); // Convert the value to an integer in milliseconds

        // Use the trigger delay value for the setTimeout
        setTimeout(function () {
          $("[loader-trigger='true']").click();
        }, triggerDelay);

        // Use the scroll delay value for the setTimeout
        setTimeout(function () {
          $('body').removeClass('lock-scroll-loader');
        }, scrollDelay);
      },
      false
    );
  }
});
