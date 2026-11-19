// About page scripts. Source: About page footer.
// Needs (loaded before this file): pathseg, poly-decomp, matter-js.
//
// The Webflow footer contained the drag-to-scroll script three times and each
// library three times; two of the copies failed with errors. This file keeps
// the one copy of each that actually ran.

// History timeline: click and drag to scroll sideways.
/* @block about-drag-scroll */
// Stops images from being ghosted while dragging
const scrollContainer = document.querySelector('.our-history-bottom-content');

let isDragging = false;
let startX;
let scrollLeft;

scrollContainer.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.pageX - scrollContainer.offsetLeft;
  scrollLeft = scrollContainer.scrollLeft;
  scrollContainer.style.cursor = 'grabbing'; // Optional for UX
});

scrollContainer.addEventListener('mouseleave', () => {
  isDragging = false;
  scrollContainer.style.cursor = 'grab'; // Reset cursor
});

scrollContainer.addEventListener('mouseup', () => {
  isDragging = false;
  scrollContainer.style.cursor = 'grab'; // Reset cursor
});

scrollContainer.addEventListener('mousemove', (e) => {
  if (!isDragging) return; // Exit if not dragging
  e.preventDefault();
  const x = e.pageX - scrollContainer.offsetLeft;
  const walk = (x - startX) * 1; // Adjust multiplier for scroll speed
  scrollContainer.scrollLeft = scrollLeft - walk;
});

/* @endblock */

// Sector bubbles: physics simulation drawn with Matter.js.
/* @block about-matter */
// Module aliases
      const { Engine, Render, Runner, Bodies, World, Composite, Vertices, Svg, Events, Mouse, MouseConstraint, Vector } = Matter;
      let contentClass = "matter-content";
      let containerClass = "matter-container";

      function clamp(num, min, max) {
        return num <= min ? min : num >= max ? max : num;
      }

      function createImageCircle(x, y, radius, imageUrl, originalImageWidth, originalImageHeight) {
        return Bodies.circle(x, y, radius, {
          restitution: 0.5, // Bouncy circles
          frictionAir: 0.02, // Some air resistance for realism
          density: 0.000005, // Optional: Increase density for a heavier feel
          render: {
            sprite: {
              texture: imageUrl,
              xScale: (radius * 2) / originalImageWidth, // Scale image to match the circle size
              yScale: (radius * 2) / originalImageHeight,
            },
          },
        });
      }

      var select = function (root, selector) {
        console.log("should be selecting!", Array.prototype.slice.call(root.querySelectorAll(selector)));
        return Array.prototype.slice.call(root.querySelectorAll(selector));
      };

      var loadSvg = function (url) {
        return fetch(url)
          .then(function (response) {
            return response.text();
          })
          .then(function (raw) {
            return new window.DOMParser().parseFromString(raw, "image/svg+xml");
          });
      };

      let createSVG = async (svgURL, vectorColour, x, y) => {
        const response = await loadSvg(svgURL);

        var vertexSets = select(response, "path").map(function (path) {
          return Vertices.scale(Svg.pathToVertices(path, 10), 1, 1);
        });
        let body = Matter.Bodies.fromVertices(x, y, vertexSets, {
          restitution: 0.9, // Lower value reduces bounciness
          density: 0.005, // Optional: Increase density for a heavier feel

          frictionAir: 0.02, // Some air resistance for realism

          render: {
            fillStyle: vectorColour,
            strokeStyle: vectorColour,
            lineWidth: 1,
          },
        });

        return body;
      };

      // Create engine and world
      const engine = Engine.create();

      const world = engine.world;

      // Initial render setup
      let render = Render.create({
        element: document.querySelector(`.${contentClass}`),
        engine: engine,
        options: {
          width: document.querySelector(".matter-container").innerWidth / 4,
          height: document.querySelector(".matter-container").innerHeight / 4,
          wireframes: false,
          background: "NONE",
          pixelRatio: "auto",
        },
      });

      Render.run(render);

      // Create the simulation runner
      const runner = Runner.create();
      Runner.run(runner, engine);

      // Function to add walls, ceiling, and objects
      const setupScene = async () => {
        const width = render.options.width;
        const height = render.options.height;

        // Clear existing objects in the world
        Composite.clear(world);

        let containerWidth = document.querySelector(`.${containerClass}`).clientWidth;

        let containerWidthUnit = containerWidth / 5 - 40;

        // Static boundaries
        boundaryWidth = 100;
        const ground = Bodies.rectangle(width / 2, height + boundaryWidth / 2, width * 2, boundaryWidth, { isStatic: true, render: { visible: false } });
        const ceiling = Bodies.rectangle(width / 2, -boundaryWidth / 2, width * 2, boundaryWidth, { isStatic: true, render: { visible: false } });
        const leftWall = Bodies.rectangle(-boundaryWidth / 2, height / 2, boundaryWidth, height * 2, { isStatic: true, render: { visible: false } });
        const rightWall = Bodies.rectangle(width + boundaryWidth / 2, height / 2, boundaryWidth, height * 2, { isStatic: true, render: { visible: false } });
        // const img1 = createImageCircle(containerWidthUnit * 1, 200, 150, "./sector-bubble.svg");
        let standardSphereSize = 150

      
        const skillsSvg = createImageCircle(containerWidthUnit * 3, 700, standardSphereSize, "https://cdn.prod.website-files.com/66b23858269649af383cd986/698f75192b5bd38be1cad574_Sector%20Circle%20-%203%20-%20Skills%20Development%20and%20Work%20-%20V3.svg", standardSphereSize, standardSphereSize);
        const environmentSvg = createImageCircle(containerWidthUnit * 3.25, 400, standardSphereSize, "https://cdn.prod.website-files.com/66b23858269649af383cd986/698f7519dd56c9aee16f1195_Sector%20Circle%20-%206%20-%20Environment%20-%20V3.svg", standardSphereSize, standardSphereSize);
        const educationSvg = createImageCircle(containerWidthUnit * 4, 150, standardSphereSize, "https://cdn.prod.website-files.com/66b23858269649af383cd986/698f7519a2e096d30d700a8b_Sector%20Circle%20-%2010%20-%20Education%20and%20Learning%20-%20V3.svg", standardSphereSize, standardSphereSize);
        const humanRightsSvg = createImageCircle(containerWidthUnit * 5, 100, standardSphereSize, "https://cdn.prod.website-files.com/66b23858269649af383cd986/698f732f41a60299e0bbc740_Sector%20Circle%20-%202%20-%20Human%20Rights%20-%20V3.svg", standardSphereSize, standardSphereSize);
        const economySvg = createImageCircle(containerWidthUnit * 4.75, 300, standardSphereSize, "https://cdn.prod.website-files.com/66b23858269649af383cd986/698f7519ec965d2f6dc5ebe4_Sector%20Circle%20-%207%20-%20Economy%20-%20V3.svg", standardSphereSize, standardSphereSize);
        const communitySvg = createImageCircle(containerWidthUnit * 4, 700, standardSphereSize, "https://cdn.prod.website-files.com/66b23858269649af383cd986/698f75192baf8c47b8f39529_Sector%20Circle%20-%205%20-%20Community%20Safety%20and%20Wellbeing%20-%20V3.svg", standardSphereSize, standardSphereSize);
        const healthcareSvg = createImageCircle(containerWidthUnit * 5, 700, standardSphereSize, "https://cdn.prod.website-files.com/66b23858269649af383cd986/698f75192d561986f2ce6e42_Sector%20Circle%20-%208%20-%20Healthcare%20-%20V3.svg", standardSphereSize, standardSphereSize);
        const img10 = createImageCircle(containerWidthUnit * 2, 700, 45, "https://cdn.prod.website-files.com/66b23858269649af383cd986/698b77c47277bdbc67cbb46d_O-1-V2.svg", 45, 45);
        const img11 = createImageCircle(containerWidthUnit * 4, 500, 45, "https://cdn.prod.website-files.com/66b23858269649af383cd986/698b77c4e01a51a37b7574f4_O-2-V2.svg", 45, 45);
        const img12 = createImageCircle(containerWidthUnit * 4.5, 0, 45, "https://cdn.prod.website-files.com/66b23858269649af383cd986/698b77c42cf5cbfbb4114156_0-3--V2.svg", 45, 45);
        const img13 = createImageCircle(containerWidthUnit * 3, 400, 82, "https://cdn.prod.website-files.com/66b23858269649af383cd986/698b77c4962c8409d4104e6f_x-82-V2.svg", 82, 82);
        const img14 = createImageCircle(containerWidthUnit * 3.75, 700, 82, "https://cdn.prod.website-files.com/66b23858269649af383cd986/698b77c40caefedc07faa102_x-82-2-V2.svg", 82, 82);
        const img15 = createImageCircle(containerWidthUnit * 5, 600, 102, "https://cdn.prod.website-files.com/66b23858269649af383cd986/698b77c4c91c148991131f18_x-102--V2.svg", 102, 102);

        let objects = [skillsSvg, environmentSvg, educationSvg, humanRightsSvg, economySvg, communitySvg, healthcareSvg, img10, img11, img12, img13, img14, img15];
        // Add objects to the world
        World.add(world, [ground, ceiling, leftWall, rightWall, ...objects]);

        // Function to apply repulsion force
        function applyRepulsion() {
          const mousePosition = mouse.position;

          objects.forEach((object) => {
            const distance = Vector.magnitude(Vector.sub(object.position, mousePosition));

            // Apply repulsion only if the mouse is close to the object
            if (distance < 150) {
              const forceMagnitude = 0.002;
              const force = Vector.mult(Vector.normalise(Vector.sub(object.position, mousePosition)), forceMagnitude);

              // Apply the force to the object
              Matter.Body.applyForce(object, object.position, force);
            }
          });
        }

        // Add mouse control for dragging
        const mouse = Mouse.create(render.canvas, {
          enabledEvents: {
            mousewheel: false,
          },
        });
        console.log(mouse.element);
        mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
        mouse.element.removeEventListener("wheel", mouse.mousewheel);
        mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);
        const mouseConstraint = MouseConstraint.create(engine, {
          mouse: mouse,
          constraint: {
            stiffness: 0.2,
            render: {
              visible: false,
            },
          },
        });

        World.add(world, mouseConstraint);

        // Listen for mousemove events and apply repulsion
        Events.on(engine, "beforeUpdate", applyRepulsion);
      };

      // Initialize the scene

      // Function to resize canvas and scale it
      const resizeCanvas = () => {
        const container = document.querySelector(`.${containerClass}`);
        const width = container.clientWidth;
        const height = container.clientHeight;

        // Set canvas size based on pixel ratio
        render.canvas.width = width;
        render.canvas.height = height;

        // Scale the context to match pixel ratio
        

        // Update render options
        render.options.width = width / 2;
        render.options.height = height / 2;
        Matter.Render.setSize(render, width, height);
        // Reconfigure the scene to fit the new size
        setupScene();
      };

      // Add resize event listener
      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);
    
/* @endblock */
