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

  document.addEventListener("DOMContentLoaded", function () {
    bindPrintButton();
    bindProfileFallback();
  });
})();
