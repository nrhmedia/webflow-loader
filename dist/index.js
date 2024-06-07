"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/index.ts
  $(document).ready(function() {
    function isBreakpointEnabled() {
      const isDesktop = $("[loader-content='true']").attr("loader-on-desktop") === "true";
      const isTablet = $("[loader-content='true']").attr("loader-on-tablet") === "true";
      const isMobileLandscape = $("[loader-content='true']").attr("loader-on-mobile-landscape") === "true";
      const isMobilePortrait = $("[loader-content='true']").attr("loader-on-mobile-portrait") === "true";
      const width = $(window).width();
      if (width >= 992 && !isDesktop)
        return false;
      if (width >= 768 && width < 992 && !isTablet)
        return false;
      if (width >= 480 && width < 768 && !isMobileLandscape)
        return false;
      if (width < 480 && !isMobilePortrait)
        return false;
      return true;
    }
    if (window.location.hash || !isBreakpointEnabled()) {
      $("[loader-content='true']").hide();
    } else {
      $("[loader-content='true']").show();
      $("body").addClass("lock-scroll-loader");
      window.addEventListener(
        "load",
        function load() {
          window.removeEventListener("load", load, false);
          let triggerDelay = $("[loader-content='true']").attr("loader-trigger-delay");
          let scrollDelay = $("[loader-content='true']").attr("loader-scroll-delay");
          triggerDelay = parseInt(triggerDelay, 10);
          scrollDelay = parseInt(scrollDelay, 10);
          setTimeout(function() {
            $("[loader-trigger='true']").click();
            setTimeout(function() {
              $("[loader-content='true']").hide();
            }, 500);
          }, triggerDelay);
          setTimeout(function() {
            $("body").removeClass("lock-scroll-loader");
          }, scrollDelay);
        },
        false
      );
    }
  });
})();
//# sourceMappingURL=index.js.map
