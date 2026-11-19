// Sandbox Inc. site-wide scripts.
// Source: Webflow Site settings > Custom code > Footer.
// Needs (loaded before this file): gsap, ScrollTrigger, CustomEase.

// Portfolio pieces: hide sections according to "Project Content Size" and
// apply the Labs colour override.
/* @block display-size */
	if(document.querySelector("[displaysize]")) {
  	  const displaySize = document.querySelector("[displaySize]").getAttribute("displaySize")
  const labsOverride = document.querySelector("[regularorlabsproject]").getAttribute("regularorlabsproject")  
  const sizeArray = ["Large", "Medium", "Small", "Extra Small"]

  
	const hideElement = (element) => {
  	element.style.display = "none"
  }
  
  const hideAllElementsInNodeListWithThisAttributeValue = (attributeValue) => {
  	const elementList = document.querySelectorAll(`[hideOnSize="${attributeValue}"]`)
  	for(const element of elementList){
    	hideElement(element)
    }
  }
  

  	if(labsOverride === "Labs Project") {
    	document.querySelectorAll('[labsText]').forEach(el => el.style.color = '#4CEEB4');
			document.querySelectorAll('[labsHoverBackground]').forEach(el => el.addEventListener('mouseover', () => el.style.backgroundColor = '#4CEEB4'));
      document.querySelectorAll('[labsHoverBackground]').forEach(el => el.addEventListener('mouseleave', () => el.style.backgroundColor = ''));      
    }  
    if(displaySize !== "Extra Large") {
	  const indexOfSizeInSizeArray = sizeArray.indexOf(displaySize);//set a pointer to the index of the size in the sizeArray
    for(i = indexOfSizeInSizeArray; i >= 0; i--) {
    	hideAllElementsInNodeListWithThisAttributeValue(sizeArray[i])
    }  
    }

  }

  
/* @endblock */

// Scroll animations: fade-in, animated text and grouped step animations.
/* @block animations */
  addEventListener("DOMContentLoaded", () => {
    // -----------------------------
    // Fade-in elements (unchanged)
    // -----------------------------
    gsap.utils.toArray('[data-animate="fade"], [data-animate="animated-text"]').forEach((element) => {
      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          start: "top 90%",
          toggleActions: "play none none none",
          once: true,
        },
        opacity: 0,
        autoAlpha: 0,
        ease: CustomEase.create("custom", "M0,0 C0.21,0.077 0.492,1 1,1"),
        duration: 1,
      });
    });

    // -----------------------------
    // Animated text (SplitType) — rebuilt to handle resize + clipping
    // -----------------------------
    const animatedTextEls = gsap.utils.toArray('[data-animate="animated-text"]');

    // Keep references so we can revert() on resize
    const splitInstances = new Map(); // element -> SplitType instance

    function buildAnimatedText() {
      animatedTextEls.forEach((el) => {
        // Clean up any previous SplitType + triggers for this element
        if (splitInstances.has(el)) {
          splitInstances.get(el).revert();
          splitInstances.delete(el);
        }

        // Kill only the triggers tied to this element
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === el) st.kill();
        });

        // Split again (this recalculates line/word measurements)
        const split = new SplitType(el, { types: "words, lines" });
        splitInstances.set(el, split);

        // Animate words/lines (your original was words; keeping words)
        gsap.from(split.words, {
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true,
          },
          opacity: 0,
          autoAlpha: 0,
          y: 100,
          duration: 0.3,
          stagger: { amount: 0.3 },
          // Safety: force visibility on wrappers
          onStart: () => gsap.set(el, { overflow: "visible" }),
        });
      });

      // After rebuilding splits, refresh ScrollTrigger positions
      ScrollTrigger.refresh();
    }

    //buildAnimatedText();

    // Debounced resize: revert + re-split for accurate wrapping at new sizes
    let resizeTimer = null;
    addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
//        buildAnimatedText();
      }, 150);
    });

    // -----------------------------
    // Grouped elements (unchanged)
    // -----------------------------
    function groupElementsByDataAttribute(attributeName) {
      const elements = document.querySelectorAll(`[data-${attributeName}]`);
      const groups = {};
      elements.forEach((element) => {
        const value = element.getAttribute(`data-${attributeName}`);
        if (!groups[value]) groups[value] = [];
        groups[value].push(element);
      });
      return Object.values(groups);
    }

    const groupedElements = groupElementsByDataAttribute("animation-group");

    groupedElements.forEach((group) => {
      group.sort((a, b) => {
        const aOrder = Number(a.getAttribute("data-animate-step"));
        const bOrder = Number(b.getAttribute("data-animate-step"));
        return aOrder - bOrder;
      });

      const groupTarget = group.find((el) => el.getAttribute("data-animation-target"));

      group.forEach((element) => {
        gsap.from(element, {
          scrollTrigger: {
            trigger: groupTarget,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true,
          },
          opacity: 0,
          autoAlpha: 0,
          ease: CustomEase.create("custom", "M0,0 C0.21,0.077 0.492,1 1,1"),
          duration: 1,
          delay: Number(element.getAttribute("data-animate-step")) * 0.3,
        });
      });
    });
  });
/* @endblock */
