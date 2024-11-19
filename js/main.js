/* ===================================================================
 * Kreative 2.0.0 - Main JS
 *
 * ------------------------------------------------------------------- */

(function ($) {
  "use strict";

  const cfg = {
    scrollDuration: 800, // smoothscroll duration
    mailChimpURL: "", // mailchimp url
  };

  // Add the User Agent to the <html>
  // will be used for IE10/IE11 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0; rv:11.0))
  // const doc = document.documentElement;
  // doc.setAttribute('data-useragent', navigator.userAgent);

  /* preloader
   * -------------------------------------------------- */
  const ssPreloader = function () {
    const preloader = document.querySelector("#preloader");

    if (!preloader) return;

    document.querySelector("html").classList.add("ss-preload");

    window.addEventListener("load", function () {
      document.querySelector("html").classList.remove("ss-preload");
      document.querySelector("html").classList.add("ss-loaded");

      preloader.addEventListener("transitionend", function (e) {
        if (e.target.matches("#preloader")) {
          this.style.display = "none";
        }
      });
    });

    // force page scroll position to top at page refresh
    window.addEventListener("beforeunload", function () {
      window.scrollTo(0, 0);
    });
  };

  /* move header
   * -------------------------------------------------- */
  const ssMoveHeader = function () {
    const hdr = document.querySelector(".s-header");
    const hero = document.querySelector("#home");
    let triggerHeight;

    if (!(hdr && hero)) return;

    setTimeout(function () {
      triggerHeight = hero.offsetHeight - 170;
    }, 300);

    window.addEventListener("scroll", function () {
      let loc = window.scrollY;

      if (loc > triggerHeight) {
        hdr.classList.add("sticky");
      } else {
        hdr.classList.remove("sticky");
      }

      if (loc > triggerHeight + 20) {
        hdr.classList.add("offset");
      } else {
        hdr.classList.remove("offset");
      }

      if (loc > triggerHeight + 150) {
        hdr.classList.add("scrolling");
      } else {
        hdr.classList.remove("scrolling");
      }
    });
  };

  /* Mobile Menu
   * ---------------------------------------------------- */
  const ssMobileMenu = function () {
    const $toggleButton = $(".s-header__menu-toggle");
    const $nav = $(".s-header__nav");

    $toggleButton.on("click", function (event) {
      event.preventDefault();
      $toggleButton.toggleClass("is-clicked");
      $nav.slideToggle();
    });

    // add mobile class
    if ($toggleButton.is(":visible")) $nav.addClass("mobile");

    $(window).resize(function () {
      if ($toggleButton.is(":visible")) $nav.addClass("mobile");
      else $nav.removeClass("mobile");
    });

    $(".s-header__nav ul")
      .find("a")
      .on("click", function () {
        if ($nav.hasClass("mobile")) {
          $toggleButton.trigger("click");
        }
      });
  };

  /* search
   * ------------------------------------------------------ */
  const ssSearch = function () {
    const searchWrap = document.querySelector(".s-header__search");
    const searchTrigger = document.querySelector(".s-header__search-trigger");

    if (!(searchWrap && searchTrigger)) return;

    const searchField = searchWrap.querySelector(".search-field");
    const closeSearch = searchWrap.querySelector(".s-header__overlay-close");
    const siteBody = document.querySelector("body");

    searchTrigger.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      siteBody.classList.add("search-is-visible");
      setTimeout(function () {
        searchWrap.querySelector(".search-field").focus();
      }, 100);
    });

    closeSearch.addEventListener("click", function (e) {
      e.stopPropagation();

      if (siteBody.classList.contains("search-is-visible")) {
        siteBody.classList.remove("search-is-visible");
        setTimeout(function () {
          searchWrap.querySelector(".search-field").blur();
        }, 100);
      }
    });

    searchWrap.addEventListener("click", function (e) {
      if (!e.target.matches(".search-field")) {
        closeSearch.dispatchEvent(new Event("click"));
      }
    });

    searchField.addEventListener("click", function (e) {
      e.stopPropagation();
    });

    searchField.setAttribute("placeholder", "Type Keywords");
    searchField.setAttribute("autocomplete", "off");
  };

  /* Highlight the current section in the navigation bar
   * ------------------------------------------------------ */
  // const ssWaypoints = function () {
  //   const $sections = $(".target-section");
  //   const $navigationLinks = $(".s-header__nav li a");

  // $sections.waypoint({
  //   handler: function (direction) {
  //     let $activeSection;

  //     $activeSection = $("section#" + this.element.id);

  //     if (direction === "up")
  //       $activeSection = $activeSection.prevAll(".target-section").first();

  //     let $activeLink = $(
  //       '.s-header__nav li a[href="#' + $activeSection.attr("id") + '"]'
  //     );

  //     $navigationLinks.parent().removeClass("current");
  //     $activeLink.parent().addClass("current");
  //   },

  //   offset: "25%",
  // });
  // };

  /* Slick Slider
   * ------------------------------------------------------ */
  const ssSlickSlider = function () {
    // Home Slider
    // ----------------------------
    function ssRunHomeSlider() {
      const $heroSlider = $(".s-home__slider");

      $heroSlider.slick({
        arrows: false,
        dots: false,
        speed: 1000,
        fade: true,
        cssEase: "linear",
        autoplay: false,
        autoplaySpeed: 5000,
        pauseOnHover: false,
      });

      $(".s-home__arrow-prev").on("click", function () {
        $heroSlider.slick("slickPrev");
      });

      $(".s-home__arrow-next").on("click", function () {
        $heroSlider.slick("slickNext");
      });
    } // end ssRunHomeSlider

    function ssRunTestimonialSlider() {
      const $testimonialSlider = $(".testimonial-slider");

      $testimonialSlider.slick({
        arrows: false,
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        pauseOnFocus: false,
        autoplaySpeed: 1500,
        responsive: [
          {
            breakpoint: 1080,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 800,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      });
    } // end ssRunTestimonialSlider

    ssRunHomeSlider();
    ssRunTestimonialSlider();
  };

  /* animate on scroll
   * ------------------------------------------------------ */
  const ssAOS = function () {
    AOS.init({
      offset: 100,
      duration: 600,
      easing: "ease-in-out",
      delay: 300,
      once: true,
      disable: "mobile",
    });
  };

  /* alert boxes
   * ------------------------------------------------------ */
  const ssAlertBoxes = function () {
    const boxes = document.querySelectorAll(".alert-box");

    boxes.forEach(function (box) {
      box.addEventListener("click", function (e) {
        if (e.target.matches(".alert-box__close")) {
          e.stopPropagation();
          e.target.parentElement.classList.add("hideit");

          setTimeout(function () {
            box.style.display = "none";
          }, 500);
        }
      });
    });
  };

  /* smooth scrolling
   * ------------------------------------------------------ */
  // const ssSmoothScroll = function () {
  //   $(".smoothscroll").on("click", function (e) {
  //     const target = this.hash;
  //     const $target = $(target);

  //     // e.preventDefault();
  //     e.stopPropagation();

  //     $("html, body")
  //       .stop()
  //       .animate(
  //         {
  //           scrollTop: $target.offset().top,
  //         },
  //         cfg.scrollDuration,
  //         "swing"
  //       )
  //       .promise()
  //       .done(function () {
  //         window.location.hash = target;
  //       });
  //   });
  // };

  /* back to top
   * ------------------------------------------------------ */
  const ssBackToTop = function () {
    const pxShow = 800;
    const goTopButton = document.querySelector(".ss-go-top");

    if (!goTopButton) return;

    // Show or hide the button
    if (window.scrollY >= pxShow) goTopButton.classList.add("link-is-visible");

    window.addEventListener("scroll", function () {
      if (window.scrollY >= pxShow) {
        if (!goTopButton.classList.contains("link-is-visible"))
          goTopButton.classList.add("link-is-visible");
      } else {
        goTopButton.classList.remove("link-is-visible");
      }
    });
  };

  /* initialize
   * ------------------------------------------------------ */
  (function ssInit() {
    ssPreloader();
    ssMoveHeader();
    ssMobileMenu();
    ssSearch();
    ssSlickSlider();
    ssAOS();
    ssAlertBoxes();
    ssBackToTop();
  })();
})(jQuery);

// Initialize the Map
// This example adds a marker to indicate the position of Bondi Beach in Sydney,
// Australia.
function initMap() {
  const map = new google.maps.Map(document.querySelector(".map"), {
    zoom: 14,
    center: { lat: 45.4418505, lng: 28.0186163 },
  });
  const image = "./images/map-marker-alt-solid.svg";
  const myMarker = new google.maps.Marker({
    position: { lat: 45.4418505, lng: 28.0186163 },
    map,
    icon: {
      url: image,
      scaledSize: new google.maps.Size(20, 20),
    },
  });
}

// Side Buttons Effects

const whatsappBtn = document.querySelector(".whatsapp-button");
const facebookBtn = document.querySelector(".facebook-messenger-button");
const formBtn = document.querySelector(".form-button");

const sideButtonsContainer = document.querySelector(".side-buttons-contact");

function addHoverEffect() {
  sideButtonsContainer.addEventListener("mouseover", function (event) {
    if (window.innerWidth < 1024) return;
    const hoveredElement = event.target.closest(".button-item");
    if (hoveredElement) {
      // message for WhatsApp
      if (
        hoveredElement.classList.contains("whatsapp-button") &&
        !hoveredElement.querySelector(".message-div")
      ) {
        const messageDiv = document.createElement("div");
        messageDiv.innerHTML = "Scrie-ne pe WhatsApp";
        messageDiv.classList.add("message-div");
        whatsappBtn.insertAdjacentElement("afterbegin", messageDiv);
      }

      // message for WhatsApp
      if (
        hoveredElement.classList.contains("facebook-messenger-button") &&
        !hoveredElement.querySelector(".message-div")
      ) {
        const messageDiv = document.createElement("div");
        messageDiv.innerHTML = "Scrie-ne pe Facebook";
        messageDiv.classList.add("message-div");
        facebookBtn.insertAdjacentElement("afterbegin", messageDiv);
      }

      // message for Form
      if (
        hoveredElement.classList.contains("form-button") &&
        !hoveredElement.querySelector(".message-div")
      ) {
        const messageDiv = document.createElement("div");
        messageDiv.innerHTML = "Programeaza-te online";
        messageDiv.classList.add("message-div");
        formBtn.insertAdjacentElement("afterbegin", messageDiv);
      }
    }
  });

  sideButtonsContainer.addEventListener("mouseout", function (event) {
    if (window.innerWidth < 1024) return;
    const hoveredElement = event.target.closest(".button-item");
    if (hoveredElement) {
      // remove message for WhatsApp
      if (hoveredElement.classList.contains("whatsapp-button")) {
        const messageDiv = document.querySelector(".message-div");
        whatsappBtn.removeChild(messageDiv);
      }

      // remove message for Facebook Messenger
      if (hoveredElement.classList.contains("facebook-messenger-button")) {
        const messageDiv = document.querySelector(".message-div");
        facebookBtn.removeChild(messageDiv);
      }

      // remove message for Form
      if (hoveredElement.classList.contains("form-button")) {
        const messageDiv = document.querySelector(".message-div");
        formBtn.removeChild(messageDiv);
      }
    }
  });
}

if (window.innerWidth >= 1024) addHoverEffect();

window.addEventListener("resize", () => {
  if (window.innerWidth >= 1024) {
    addHoverEffect();
  } else {
    sideButtonsContainer.removeEventListener("mouseover", addHoverEffect);
    sideButtonsContainer.removeEventListener("mouseout", addHoverEffect);
  }
});

// Form Functionality
const initialDisplayButtons = document.querySelector(
  ".initial-display-buttons"
);
const initialDisplay = document.querySelector(".initial-display");

const formIt = document.querySelector(".container-form-italy");
const formFrDe = document.querySelector(".container-form-fr-de");
const actualFormIt = document.getElementById("form_it");
const actualFormFrDe = document.getElementById("form_fr-de");

initialDisplayButtons.addEventListener("click", function (event) {
  const clickedBtn = event.target.closest(".btn");
  if (clickedBtn) {
    // display Italy form
    if (clickedBtn.classList.contains("btn-form-it")) {
      // Hide the initial display
      initialDisplay.classList.add("display-none");
      // Make sure the Germany form is not displayed
      formFrDe.classList.add("display-none");
      // actually display the Italy form
      formIt.classList.remove("display-none");
    }
    // display France-Germany form
    if (clickedBtn.classList.contains("btn-form-it-de")) {
      // Hide the initial display
      initialDisplay.classList.add("display-none");
      // Make sure the Italy form is not displayed
      formIt.classList.add("display-none");
      // actually display the Germany form
      formFrDe.classList.remove("display-none");
    }
  }
});

function resetInitialDisplayForm() {
  // Make sure that both forms are hidden
  formIt.classList.add("display-none");
  formFrDe.classList.add("display-none");
  // display the initial display
  initialDisplay.classList.remove("display-none");
  // reset forms
  actualFormIt.reset();
  actualFormFrDe.reset();
}

// show the initial display when the form is closed
// closing button
const customCloseBtn = document.querySelector(".custom-close-btn");
customCloseBtn.addEventListener("click", function () {
  setTimeout(resetInitialDisplayForm, 200);
});
// clicking outside
const modal = document.querySelector(".modal-dialog");
const modalContainer = document.querySelector(".modal");
document.addEventListener("click", function (event) {
  if (!modal.contains(event.target)) {
    setTimeout(resetInitialDisplayForm, 200);
  }
});

// "Esc" button
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    resetInitialDisplayForm();
  }
});

//Functionality for the "back" button inside the form
const allBackBtnsForm = document.querySelectorAll(".form-back-button");
allBackBtnsForm.forEach((button) =>
  button.addEventListener("click", function () {
    resetInitialDisplayForm();
  })
);

// France-Germany Form Functionality
actualFormFrDe.addEventListener("submit", function (e) {
  e.preventDefault();

  const inputName = document.getElementById("name").value;
  const inputPhone = document.getElementById("phone").value;
  const inputDepartureDate = document.getElementById(
    "departure-date-fr-de"
  ).value;
  const inputDeparturePlace = document.getElementById(
    "departure-place-fr-de"
  ).value;
  const inputArrivalPlace = document.getElementById(
    "arrival-place-fr-de"
  ).value;

  const message = `Informații programare: \n\nNume client: ${inputName} \nNumăr de telefon: ${inputPhone} \nDată de plecare: ${inputDepartureDate} \nLocul plecării: ${inputDeparturePlace} \nLocul sosirii: ${inputArrivalPlace}`;

  const encodedMessage = encodeURIComponent(message);

  const whatsappNumber = "400750419349";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  window.open(whatsappLink, "_blank");

  resetInitialDisplayForm();
});

// Functionality: close the navigation by clivking outside of it

// const navigation = document.querySelector(".s-header");
// const navigationMenu = document.querySelector(".s-header__nav");
// const navToggleButton = document.querySelector(".s-header__menu-toggle");

// navToggleButton.addEventListener("click", function () {
//   navigationMenu.classList.remove("display-none");
//   navToggleButton.classList.add("is-clicked");
// });

// document.addEventListener("click", function (e) {
//   const clickedElement = e.target;
//   if (!navigation.contains(clickedElement)) {
//     //".s-header__nav" --> display: none
//     document.querySelector(".s-header__nav").classList.add("display-none");
//     //s-header__menu-toggle --> remove ".is-clicked"
//     document
//       .querySelector(".s-header__menu-toggle")
//       .classList.remove("is-clicked");
//   }
// });

// structure of faq_item:
{
  /* <div class="faq-item mb-4">
          <a type="button" class="faq-question text-dark" data-index="1">
            <span>Care sunt destinațiile către care oferim transport?</span>
            <span class="arrow" data-index="1">+</span>
          </a>
          <div class="faq-answer" data-index="1">
            <p class="faq-answer-p">
              Oferim transport către diferite destinații în Europa, inclusiv
              Italia și alte destinații solicitate de clienții noștri.
            </p>
          </div>
        </div> */
}
const accordionContainer = document.querySelector(".accordion");

accordionContainer.innerHTML = "";

function createQuestionItem(questions) {
  questions.forEach((question, index) => {
    // creating the div
    const div = document.createElement("div");
    div.classList.add("faq-item", "mb-4");
    // creating the <a> tag
    const link = document.createElement("a");
    link.classList.add("faq-question", "text-dark");
    link.setAttribute("type", "button");
    link.setAttribute("data-index", `${index + 1}`);

    // creating span for question
    const spanQuestion = document.createElement("span");
    spanQuestion.textContent = question.question;
    // creating span for sign
    const spanSign = document.createElement("span");
    spanSign.classList.add("arrow");
    spanSign.setAttribute("data-index", `${index + 1}`);
    spanSign.textContent = "+";

    link.appendChild(spanQuestion);
    link.appendChild(spanSign);

    // creating the div for the answer
    const answerDiv = document.createElement("div");
    answerDiv.classList.add("faq-answer");
    answerDiv.setAttribute("data-index", `${index + 1}`);

    // creating the paragraph with the actual answer
    const p = document.createElement("p");
    p.classList.add("faq-answer-p");
    p.textContent = question.answer;

    answerDiv.appendChild(p);

    div.appendChild(link);
    div.appendChild(answerDiv);

    accordionContainer.appendChild(div);
  });
}

let allQuestions;

async function fetchQuestions() {
  try {
    const result = await fetch("../data/questions.json")
      .then((res) => res.json())
      .then((data) => {
        allQuestions = data;
        createQuestionItem(allQuestions);
        console.log(allQuestions);
        return data;
      });
    return result;
  } catch (error) {
    console.error(error);
  }
}

fetchQuestions();

// FAQ Functionality

setTimeout(function () {
  const allArrowElements = document.querySelectorAll(".arrow");
  const allQuestionLinks = document.querySelectorAll(".faq-question");
  allQuestionLinks.forEach((question) =>
    question.addEventListener("click", function (e) {
      // Hide all the answers in the beginning
      document
        .querySelectorAll(".faq-answer")
        .forEach((answer) => answer.classList.remove("show"));
      // Make all "arrows" + in the beginning
      allArrowElements.forEach((arrow) => (arrow.textContent = "+"));

      // Display only the corresponding answer
      const questionIndex = Number(
        e.target.closest(".faq-question").getAttribute("data-index")
      );
      const correspondingAnswer = document.querySelector(
        `.faq-answer[data-index="${questionIndex}"]`
      );
      correspondingAnswer.classList.add("show");

      // Toggle arrow to "-" for open answer
      const arrow = document.querySelector(
        `.arrow[data-index="${questionIndex}"]`
      );
      arrow.textContent = correspondingAnswer.classList.contains("show")
        ? "-"
        : "+";
    })
  );
}, 100);

faqFunctionality();

// window.initMap = initMap;

// loading the reviews functionality
const showMoreReviews = document.querySelector(".show-more-reviews");
const testimonialsContainer = document.querySelector(".testimonials-container");

let allReviews = [];
let initialDisplayCount = 3;
let isShowingAll = false;

function clearReviews() {
  testimonialsContainer.innerHTML = "";
}

function displayReviews(reviews) {
  reviews.forEach((review) => {
    // Create the main article element
    const reviewItem = document.createElement("article");
    reviewItem.classList.add("blog-entry");
    reviewItem.setAttribute("data-aos", "fade-up");

    // Create the row container
    const rowContainer = document.createElement("div");
    rowContainer.classList.add("row", "blog-entry__header");

    // Create the avatar container
    const avatarContainer = document.createElement("div");
    avatarContainer.classList.add("blog-entry__avatar");

    const avatarImg = document.createElement("img");
    avatarImg.setAttribute("src", review.src); // Placeholder for avatar image
    avatarImg.setAttribute("alt", `Avatar ${review.name}`);
    avatarContainer.appendChild(avatarImg);

    // Create the title container
    const titleContainer = document.createElement("div");
    titleContainer.classList.add(
      "column",
      "large-9",
      "w-1000-stack",
      "blog-entry__title"
    );

    const reviewTitle = document.createElement("h3");
    reviewTitle.classList.add("h2");

    const reviewText = document.createElement("span");
    reviewText.textContent = `"${review.comment}"`;

    reviewTitle.appendChild(reviewText);
    titleContainer.appendChild(reviewTitle);

    // Create the metadata container
    const metaContainer = document.createElement("div");
    metaContainer.classList.add(
      "column",
      "large-3",
      "w-1000-stack",
      "blog-entry__meta"
    );

    const bylineUser = document.createElement("span");
    bylineUser.classList.add("blog-entry__byline");
    bylineUser.textContent = "Utilizator: ";

    const bylineName = document.createElement("span");
    bylineName.classList.add("blog-entry__byline");

    const strongName = document.createElement("strong");
    strongName.textContent = review.name;
    bylineName.appendChild(strongName);

    const dateContainer = document.createElement("div");

    const dateLabel = document.createElement("span");
    dateLabel.classList.add("blog-entry__date");
    dateLabel.textContent = "Review Google: ";

    const ratingContainer = document.createElement("span");
    ratingContainer.classList.add("google-star-rating");

    // Generate the star rating based on the review's rating
    for (let i = 0; i < review.rating; i++) {
      const starIcon = document.createElement("i");
      starIcon.classList.add("fas", "fa-star", "star-custom");
      ratingContainer.appendChild(starIcon);
    }

    // Append elements to meta container
    metaContainer.appendChild(bylineUser);
    metaContainer.appendChild(bylineName);
    dateContainer.appendChild(dateLabel);
    dateContainer.appendChild(ratingContainer);
    metaContainer.appendChild(dateContainer);

    // Append everything to row container
    rowContainer.appendChild(avatarContainer);
    rowContainer.appendChild(titleContainer);
    rowContainer.appendChild(metaContainer);

    // Append row container to review item
    reviewItem.appendChild(rowContainer);

    // Append review item to testimonials container
    testimonialsContainer.appendChild(reviewItem);
  });
}

// fetch all the reviews and initialize the display

async function fetchReviews() {
  try {
    const res = await fetch("data/reviews.json");
    if (!res.ok) {
      throw new Error("Could not load reviews");
    }

    const data = await res.json();
    allReviews = data;

    // Displaying only the first 3 reviews initially
    displayReviews(allReviews.slice(0, initialDisplayCount));
  } catch (error) {
    console.error("There was a problem during the fetch operation", error);
  }
}

// Toggle function for the button
function toggleReviews() {
  const spanText = showMoreReviews.querySelector(".show-more-reviews-text");

  if (!isShowingAll) {
    // show all reviews
    displayReviews(allReviews.slice(initialDisplayCount));
    spanText.textContent = "Vezi mai putin";
    isShowingAll = true;
  } else {
    // revert to showing only the initial 3 reviews
    clearReviews();
    displayReviews(allReviews.slice(0, initialDisplayCount));
    spanText.textContent = "Vezi mai multe recenzii Google";
    isShowingAll = false;
  }
}

showMoreReviews.addEventListener("click", function (e) {
  e.preventDefault();
  toggleReviews();
});

fetchReviews();
