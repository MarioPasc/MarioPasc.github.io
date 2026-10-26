// Light/dark theme toggle for the header button. Light is the default; the
// visitor's choice is kept in localStorage and applied before first paint by
// the inline script in _layouts/default.html.
(function () {
  "use strict";

  var button = document.querySelector(".theme-toggle");
  if (!button) {
    return;
  }
  var root = document.documentElement;

  function isDark() {
    return root.getAttribute("data-theme") === "dark";
  }

  function render() {
    var dark = isDark();
    button.textContent = dark ? "Light" : "Dark";
    button.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
  }

  button.addEventListener("click", function () {
    var dark = !isDark();
    if (dark) {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch (e) {
      // Storage blocked (private mode): the choice lasts for this page only.
    }
    render();
  });

  render();
  // Shown only when this script runs; without JavaScript the site stays light.
  button.hidden = false;
})();
