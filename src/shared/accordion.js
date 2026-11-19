// Accordion accessibility (Finsweet Attributes accordion).
// The accordion already opens and closes with Enter and Space, but it does not
// tell screen readers whether an item is open. This keeps `aria-expanded` on
// each heading in step with the accordion's own "is-active-accordion" class.
//
// New in the repository (not part of the original inline code).
(function () {
  var ACTIVE = "is-active-accordion";

  function sync(trigger) {
    trigger.setAttribute("aria-expanded", trigger.classList.contains(ACTIVE) ? "true" : "false");
  }

  function start() {
    var triggers = document.querySelectorAll('[fs-accordion-element="trigger"]');
    if (!triggers.length || !("MutationObserver" in window)) return;
    var observer = new MutationObserver(function (changes) {
      changes.forEach(function (change) {
        sync(change.target);
      });
    });
    triggers.forEach(function (trigger) {
      sync(trigger);
      observer.observe(trigger, { attributes: true, attributeFilter: ["class"] });
    });
  }

  if (document.readyState === "complete") start();
  else window.addEventListener("load", start);
})();
