// Portfolio piece videos. Replaces the 14 code embeds on the Portfolio Pieces
// template with one script.
//
// In Webflow, each video container gets a custom attribute `data-vimeo-id`
// bound to its CMS "Vimeo ID" field (see docs/webflow-setup.md). On page load
// this script builds the same Vimeo player each embed used to build: the same
// URL options, the same wrapper and the same sizing, slot by slot.
//
// Needs (loaded before this file): https://player.vimeo.com/api/player.js

(function () {
  // 16:9 box that the player fills.
  var PADDED_WRAPPER = "padding:56.25% 0 0 0;position:relative;";
  var FILL_WRAPPER = "position:absolute;top:0;left:0;width:100%;height:100%;";

  // Background video centred to cover its container. `size` adds the
  // per-slot height and width the original embeds set.
  function coverStyles(size) {
    var styles = [["boxSizing", "border-box"]];
    if (size) styles.push(["height", size.height], ["width", size.width]);
    return styles.concat([
      ["left", "50%"],
      ["top", "50%"],
      ["minHeight", "100%"],
      ["minWidth", "100%"],
      ["transform", "translate(-50%, -50%)"],
      ["position", "absolute"],
    ]);
  }

  // One entry per video slot on the template, in page order.
  //   container  the element that carries data-vimeo-id and receives the player
  //   query      options added to the Vimeo URL
  //   cover      styles for a cover-fill background video (no 16:9 wrapper)
  //   api        control the player with the Vimeo API after it is added
  var SLOTS = [
    { container: ".portfolio-hero-image-container", query: "autoplay=0&muted=1&badge=0&autopause=0&loop=1&player_id=0&app_id=58479", api: true },
    { container: ".image-block-2-video-container", query: "background=1&muted=1&loop=1&autopause=0", cover: coverStyles() },
    { container: ".image-block-3-video-container", query: "background=1&muted=1&loop=1&autopause=false" },
    { container: ".image-block-4-video-container", query: "autoplay=1&muted=1&badge=0&loop=1&autopause=0&player_id=0&app_id=58479" },
    { container: ".image-block-5-video-container", query: "autoplay=1&loop=1&muted=1&badge=0&autopause=0&player_id=0&app_id=58479" },
    { container: ".image-block-5-video-container-background", query: "background=1&autoplay=1&loop=1&muted=1&badge=0&autopause=0&player_id=0&app_id=58479" },
    { container: ".image-block-6-video-container", query: "background=1&muted=1&loop=1&autopause=0", cover: coverStyles({ height: "56.25vw", width: "30vh" }) },
    { container: ".image-block-7-video-container", query: "autoplay=1&muted=1&badge=0&autopause=0&player_id=0&app_id=58479" },
    { container: ".image-block-7-video-container-background", query: "background=1&autoplay=1&muted=1&badge=0&autopause=0&player_id=0&app_id=58479" },
    { container: ".image-block-10-video-container-case-study", query: "background=1&muted=1&loop=1&autopause=0", cover: coverStyles() },
    { container: ".image-block-11-video-container-case-study", query: "background=1&muted=1&loop=1&autopause=false" },
    { container: ".image-block-8-video-container", query: "autoplay=1&muted=1&badge=0&autopause=0&player_id=0&app_id=58479" },
    { container: ".image-block-8-background-video-container", query: "background=1&muted=1&loop=1&autopause=false" },
    { container: ".image-block-9-video-container", query: "background=1&muted=1&loop=1&autopause=0", cover: coverStyles({ height: "28.125vw", width: "88.889vh" }) },
  ];

  function addPlayer(slot) {
    var container = document.querySelector(slot.container);
    if (!container) return;
    var videoId = (container.getAttribute("data-vimeo-id") || "").trim();
    if (videoId.length === 0) return;

    var wrapper = document.createElement("div");
    var iframe = document.createElement("iframe");
    iframe.src = "https://player.vimeo.com/video/" + videoId + "?" + slot.query;
    iframe.frameBorder = "0";
    iframe.allow = "autoplay; fullscreen; picture-in-picture; clipboard-write";

    // Accessibility (new in the repository). Every frame gets a name. Background
    // videos are decorative: they have no controls, so they are taken out of
    // the keyboard tab order and hidden from screen readers.
    if (/(^|&)background=1(&|$)/.test(slot.query)) {
      iframe.title = "Background video";
      iframe.tabIndex = -1;
      iframe.setAttribute("aria-hidden", "true");
    } else {
      iframe.title = "Project video";
    }

    if (slot.cover) {
      slot.cover.forEach(function (pair) {
        iframe.style[pair[0]] = pair[1];
      });
    } else {
      wrapper.style = PADDED_WRAPPER;
      iframe.style = FILL_WRAPPER;
    }

    wrapper.appendChild(iframe);
    container.appendChild(wrapper);

    if (slot.api) {
      var videoPlayer = new Vimeo.Player(iframe);
      videoPlayer.setVolume(0); // Ensure the video is muted
      videoPlayer.play(); // Autoplay the video
    }
  }

  window.addEventListener("load", function () {
    SLOTS.forEach(addPlayer);
  });
})();
