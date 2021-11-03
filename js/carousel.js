!(function (d) {
  var itemClassName = "carousel-item";
  var items = d.getElementsByClassName(itemClassName);
  var totalItems = items.length;
  var slide = 0;
  var moving = true;

  console.log("items");

  function setInitialClasses() {
    items = d.getElementsByClassName("carousel-item");
    items[totalItems - 1].classList.add("prev");
    items[0].classList.add("active");
    items[1].classList.add("next");
  }

  function setEventListeners() {
    var next = d.getElementsByClassName("carousel-btn-prev")[0];
    var prev = d.getElementsByClassName("carousel-btn-next")[0];

    next.addEventListener("click", moveNext);
    prev.addEventListener("click", movePrev);
  }

  function disableInteraction() {
    moving = true;

    setTimeout(function () {
      moving = false;
    }, 500);
  }

  function moveCarouselTo(slide) {
    if (!moving) {
      disableInteraction();

      var newPrev = slide - 1;
      var newNext = slide + 1;
      var oldPrev = slide - 2;
      var oldNext = slide + 2;

      if (totalItems - 1 > 3) {
        if (newPrev <= 0) {
          oldPrev = totalItems - 1;
        } else if (newNext >= totalItems - 1) {
          oldNext = 0;
        }

        if (slide === 0) {
          newPrev = totalItems - 1;
          oldPrev = totalItems - 2;
          oldNext = slide + 1;
        } else if (slide === totalItems - 1) {
          newPrev = slide - 1;
          newNext = 0;
          oldNext = 1;
        }

        items[oldPrev].className = itemClassName;
        items[oldNext].className = itemClassName;

        items[newPrev].className = itemClassName + " prev";
        items[slide].className = itemClassName + " active";
        items[newNext].className = itemClassName + " next";
      }
    }
  }

  // Next navigation handler
  function moveNext() {
    console.log("a");
    // Check if moving
    if (!moving) {
      // If it's the last slide, reset to 0, else +1
      if (slide === totalItems - 1) {
        slide = 0;
      } else {
        slide++;
      }

      // Move carousel to updated slide
      moveCarouselTo(slide);
    }
  }

  // Previous navigation handler
  function movePrev() {
    // Check if moving
    if (!moving) {
      // If it's the first slide, set as the last slide, else -1
      if (slide === 0) {
        slide = totalItems - 1;
      } else {
        slide--;
      }

      // Move carousel to updated slide
      moveCarouselTo(slide);
    }
  }

  // Initialise carousel
  function initCarousel() {
    setInitialClasses();
    setEventListeners();

    // Set moving to false now that the carousel is ready
    moving = false;
  }

  // make it rain
  initCarousel();
})(document);
