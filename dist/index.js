"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/index.ts
  $(document).ready(function() {
    if (window.location.hash) {
      $("[loader-content='true']").hide();
    } else {
      $("[loader-content='true']").show();
      $("body").addClass("lock-scroll-loader");
      window.addEventListener(
        "load",
        function load() {
          window.removeEventListener("load", load, false);
          setTimeout(function() {
            $("[loader-trigger='true']").click();
          }, 2e3);
          setTimeout(function() {
            $("body").removeClass("lock-scroll-loader");
          }, 2e3);
        },
        false
      );
    }
  });
})();
//# sourceMappingURL=index.js.map
