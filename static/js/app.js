(function () {
  function bindPrintButton() {
    var printButton = document.querySelector("[data-print-button]");

    if (!printButton) {
      return;
    }

    printButton.addEventListener("click", function () {
      window.print();
    });
  }

  function bindProfileFallback() {
    var profileImage = document.querySelector("[data-profile-image]");

    if (!profileImage) {
      return;
    }

    var holder = profileImage.closest(".profile-photo");

    function showPlaceholder() {
      if (holder) {
        holder.classList.add("is-placeholder");
      }

      profileImage.setAttribute("aria-hidden", "true");
    }

    profileImage.addEventListener("error", showPlaceholder);

    if (!profileImage.getAttribute("src")) {
      showPlaceholder();
      return;
    }

    if (profileImage.complete && profileImage.naturalWidth === 0) {
      showPlaceholder();
    }
  }

  function bindLightbox() {
    var items = Array.prototype.slice.call(
      document.querySelectorAll("[data-lightbox-item]")
    );
    var lightbox = document.querySelector("[data-lightbox]");

    if (!items.length || !lightbox) {
      return;
    }

    var image = lightbox.querySelector("[data-lightbox-image]");
    var caption = lightbox.querySelector("[data-lightbox-caption]");
    var count = lightbox.querySelector("[data-lightbox-count]");
    var closeButtons = lightbox.querySelectorAll("[data-lightbox-close]");
    var prevButton = lightbox.querySelector("[data-lightbox-prev]");
    var nextButton = lightbox.querySelector("[data-lightbox-next]");
    var activeIndex = 0;

    function showImage(index) {
      activeIndex = (index + items.length) % items.length;

      var item = items[activeIndex];
      var src = item.getAttribute("data-lightbox-src");
      var alt = item.getAttribute("data-lightbox-alt") || "";
      var label = item.getAttribute("data-lightbox-caption") || alt;

      image.src = src;
      image.alt = alt;
      caption.textContent = label;
      count.textContent = activeIndex + 1 + " / " + items.length;
    }

    function openLightbox(index) {
      showImage(index);
      lightbox.hidden = false;
      document.body.classList.add("is-lightbox-open");
    }

    function closeLightbox() {
      lightbox.hidden = true;
      document.body.classList.remove("is-lightbox-open");
      image.removeAttribute("src");
    }

    function showPrevious() {
      showImage(activeIndex - 1);
    }

    function showNext() {
      showImage(activeIndex + 1);
    }

    items.forEach(function (item, index) {
      item.addEventListener("click", function () {
        openLightbox(index);
      });
    });

    Array.prototype.forEach.call(closeButtons, function (button) {
      button.addEventListener("click", closeLightbox);
    });

    if (prevButton) {
      prevButton.addEventListener("click", showPrevious);
    }

    if (nextButton) {
      nextButton.addEventListener("click", showNext);
    }

    document.addEventListener("keydown", function (event) {
      if (lightbox.hidden) {
        return;
      }

      if (event.key === "Escape") {
        event.preventDefault();
        closeLightbox();
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPrevious();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        showNext();
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    bindPrintButton();
    bindProfileFallback();
    bindLightbox();
  });
})();
