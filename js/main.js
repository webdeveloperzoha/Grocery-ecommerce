$(document).ready(function () {
  "use strict";

  // Init AOS
  AOS.init({
    duration: 800,
    easing: "ease-out-cubic",
    once: true,
    offset: 50
  });

  // Sticky Navbar Scroll Effect
  $(window).on("scroll", function () {
    if ($(window).scrollTop() >= 80) {
      $("#site-header").addClass("scrolled");
    } else {
      $("#site-header").removeClass("scrolled");
    }
  });

  // Initialize Swiper (Home / Products)
  if ($(".productSwiper").length) {
    new Swiper(".productSwiper", {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoplay: { delay: 3500, disableOnInteraction: false },
      pagination: { el: ".swiper-pagination", clickable: true },
      breakpoints: {
        576: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1200: { slidesPerView: 4 }
      }
    });
  }

  // Cart Counter & Animation
  let cartCount = parseInt(localStorage.getItem("zgrocery_cart") || "0", 10);
  $("#cart-counter").text(cartCount);

  $(".add-to-cart-btn").on("click", function (e) {
    e.preventDefault();
    cartCount++;
    localStorage.setItem("zgrocery_cart", cartCount);
    
    const $badge = $("#cart-counter");
    $badge.text(cartCount);
    $badge.removeClass("badge-pop");
    void $badge[0].offsetWidth;
    $badge.addClass("badge-pop");

    const $btn = $(this);
    const prev = $btn.html();
    $btn.html('<i class="fa-solid fa-check"></i> Added!').addClass("btn-success text-white").removeClass("btn-outline-success");
    setTimeout(() => {
      $btn.html(prev).removeClass("btn-success text-white").addClass("btn-outline-success");
    }, 1200);
  });

  // Dynamic Product selection passing to order page
  $(".order-item-btn").on("click", function () {
    const itemName = $(this).data("product");
    sessionStorage.setItem("selected_grocery_item", itemName);
    window.location.href = "order.html";
  });

  // Pre-fill selected item if on order page
  if ($("#orderItemSelect").length) {
    const prefill = sessionStorage.getItem("selected_grocery_item");
    if (prefill) {
      $("#orderItemSelect").val(prefill);
      sessionStorage.removeItem("selected_grocery_item");
    }
  }

  // Handle Order Form Submission
  $("#checkoutOrderForm").on("submit", function (e) {
    e.preventDefault();
    const orderRef = "ZGR-" + Math.floor(100000 + Math.random() * 900000);
    $("#orderReceiptRef").text(orderRef);
    $("#orderConfirmationModal").modal("show");
    this.reset();
    localStorage.setItem("zgrocery_cart", "0");
    $("#cart-counter").text("0");
  });
});