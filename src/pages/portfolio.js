// Portfolio page scripts. Source: Portfolio page footer.

// Mark the clicked tab as selected.
/* @block portfolio-tabs */
  const portfolioTabs = document.querySelectorAll(".portfolio-tab");

  function clearPortfolioTabs() {
    portfolioTabs.forEach((tab) => {
      tab.classList.remove("portfolio-tab--selected");
    });
  }

  portfolioTabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      clearPortfolioTabs();
      e.currentTarget.classList.add("portfolio-tab--selected");
    });
  });
/* @endblock */

// Open a tab and scroll to a section from the URL, e.g. /portfolio?tab=service
/* @block portfolio-url-params */
  var Webflow = Webflow || [];
  Webflow.push(function () {
    var rawTabName = getParam("tab");
    var rawSectionId = getParam("section");

    var tabName = rawTabName ? rawTabName.toLowerCase() : "";
    var sectionId = rawSectionId ? rawSectionId.toLowerCase() : "";

    if (tabName) {
      var tabEl = document.getElementById(tabName);
      var pairedButtonId = tabName + "-button";
      var pairedButtonEl = document.getElementById(pairedButtonId);

      console.log("tab id:", tabName);
      console.log("button id:", pairedButtonId);

      if (tabEl) {
        tabEl.click();
      } else {
        console.log("Tab not found:", tabName);
      }

      if (pairedButtonEl) {
        pairedButtonEl.click();
      } else {
        console.log("Paired button not found:", pairedButtonId);
      }
    }

    if (sectionId) {
      setTimeout(function () {
        var sectionEl = document.getElementById(sectionId);
        if (sectionEl) {
          sectionEl.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        } else {
          console.log("Section not found:", sectionId);
        }
      }, 200);
    }

    function getParam(name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
      var results = regex.exec(location.search);
      return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
  });
/* @endblock */

// Accessibility: tell screen readers which tab is selected by keeping
// `aria-current` in step with the "portfolio-tab--selected" class.
// New in the repository (not part of the original inline code).
(function () {
  var tabs = document.querySelectorAll(".portfolio-tab");
  if (!tabs.length || !("MutationObserver" in window)) return;

  function sync(tab) {
    if (tab.classList.contains("portfolio-tab--selected")) tab.setAttribute("aria-current", "true");
    else tab.removeAttribute("aria-current");
  }

  var observer = new MutationObserver(function (changes) {
    changes.forEach(function (change) {
      sync(change.target);
    });
  });
  tabs.forEach(function (tab) {
    sync(tab);
    observer.observe(tab, { attributes: true, attributeFilter: ["class"] });
  });
})();
