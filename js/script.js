$(document).ready(function() {

  $('.photos-slider').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
    infinite: false,
    prevArrow: $('.photos-slider__arrow--prev'),
    nextArrow: $('.photos-slider__arrow--next'),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });
  $('.viewed-products__slider').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    infinite: true,
    arrows: true,
    dots: true,
    appendArrows: $('.viewed-products__controls'),
    prevArrow: $('.viewed-products__arrow--prev'),
    nextArrow: $('.viewed-products__arrow--next'),
    appendDots: $('.viewed-products__dots'),
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });
  const navButton = document.getElementById('mobile-footer-nav__button');
  const navMenu = document.getElementById('mobile-footer-nav__menu');

  navButton.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    navButton.classList.toggle('open');
  });
  const bestCategoriesBtn = document.getElementById('mobile-footer-best-categories__button');
  const bestCategoriesMenu = document.getElementById('mobile-footer-best-categories__menu');

  bestCategoriesBtn.addEventListener('click', () => {
    bestCategoriesMenu.classList.toggle('open');
    bestCategoriesBtn.classList.toggle('open');
  });


  $('.wishlist-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: $('.wishlist-slider__arrow--prev'),
    nextArrow: $('.wishlist-slider__arrow--next'),
    dots: true,
    appendDots: $('.wishlist-slider__dots'),
    customPaging: function(slider, i) {
      return '<button type="button" class="dot" aria-label="Перейти до слайду ' + (i + 1) + '"></button>';
    },
    accessibility: true,
    adaptiveHeight: true,
    infinite: false,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1
        }
      }]
  });

  // Add ARIA roles for dots
  $('.wishlist-slider__dots').attr('role', 'tablist');
  $('.wishlist-slider__dots .dot').each(function(i) {
    $(this).attr({
      'role': 'tab',
      'tabindex': i === 0 ? 0 : -1,
      'aria-selected': i === 0 ? 'true' : 'false',
      'id': 'wishlist-dot-' + i
    });
  });

  // Update ARIA attributes on slide change
  $('.wishlist-slider').on('afterChange', function(event, slick, currentSlide) {
    $('.wishlist-slider__dots .dot').each(function(i) {
      $(this).attr({
        'tabindex': i === currentSlide ? 0 : -1,
        'aria-selected': i === currentSlide ? 'true' : 'false'
      });
    });
  });

  // Таймер для .timer-section
  function startWishlistTimer() {
    // Установить дату окончания через 2 дня
    const endDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
    function updateTimer() {
      const now = new Date();
      let diff = Math.max(0, endDate - now);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      diff -= days * (1000 * 60 * 60 * 24);
      const hours = Math.floor(diff / (1000 * 60 * 60));
      diff -= hours * (1000 * 60 * 60);
      const minutes = Math.floor(diff / (1000 * 60));
      diff -= minutes * (1000 * 60);
      const seconds = Math.floor(diff / 1000);
      // Обновить DOM
      const $timer = $('.countdown-timer');
      $timer.find('.time-block').eq(0).find('.time-value').text(String(days).padStart(2, '0'));
      $timer.find('.time-block').eq(1).find('.time-value').text(String(hours).padStart(2, '0'));
      $timer.find('.time-block').eq(2).find('.time-value').text(String(minutes).padStart(2, '0'));
      $timer.find('.time-block').eq(3).find('.time-value').text(String(seconds).padStart(2, '0'));
    }
    updateTimer();
    setInterval(updateTimer, 1000);
  }
  startWishlistTimer();

  // Promo-section slider
  $('.promo-item-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    accessibility: true,
    adaptiveHeight: true,
    infinite: true
  });

  // Product-main slider
  $('.product-main__slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    asNavFor: '.product-main__slider-nav',
    focusOnSelect: true
  });

  // Product-main slider nav
  $('.product-main__slider-nav').slick({
    slidesToShow: 7,
    slidesToScroll: 1,
    asNavFor: '.product-main__slider',
    focusOnSelect: true,
    arrows: true,
    dots: false,
    centerMode: true,
    centerPadding: '0px'
  });

  // Service slider
  $('.service-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    infinite: false,
    dots: false,
    prevArrow: $('.service-slider__arrow--prev'),
    nextArrow: $('.service-slider__arrow--next'),
    accessibility: true,
    adaptiveHeight: true
  });
  $('.aksesuar-slider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    infinite: false,
    dots: false,
    prevArrow: $('.service-slider__arrow--prev'),
    nextArrow: $('.service-slider__arrow--next'),
    accessibility: true,
    adaptiveHeight: true
  });

  // Интерактивные звезды рейтинга (Unicode)
  $(document).on('mouseenter focusin', '.product-main__star', function() {
    var star = $(this).data('star');
    $(this).parent().children('.product-main__star').each(function(i) {
      if (i < star) {
        $(this).addClass('active');
      } else {
        $(this).removeClass('active');
      }
    });
  });
  $(document).on('mouseleave focusout', '.product-main__stars', function() {
    var $stars = $(this).find('.product-main__star');
    var selected = $stars.filter('.selected').last().data('star') || 0;
    $stars.each(function(i) {
      if (i < selected) {
        $(this).addClass('active');
      } else {
        $(this).removeClass('active');
      }
    });
  });
  $(document).on('click', '.product-main__star', function() {
    var star = $(this).data('star');
    var $stars = $(this).parent().children('.product-main__star');
    if ($(this).hasClass('selected') && $stars.filter('.selected').length === star) {
      $stars.removeClass('selected active');
    } else {
      $stars.removeClass('selected');
      $stars.each(function(i) {
        if (i < star) {
          $(this).addClass('selected active');
        } else {
          $(this).removeClass('active');
        }
      });
    }
  });

  // Complectation Tabs & Slider
  $(function() {
    // Tabs logic
    $('.complectation-tab').each(function(i) {
      $(this).attr({
        'role': 'tab',
        'tabindex': $(this).hasClass('active') ? 0 : -1,
        'aria-selected': $(this).hasClass('active') ? 'true' : 'false',
        'id': 'complectation-tab-' + i
      });
    });
    $('.complectation-tabs').attr('role', 'tablist');
    $('.complectation-item').each(function(i) {
      $(this).attr({
        'role': 'tabpanel',
        'aria-labelledby': 'complectation-tab-' + i
      });
    });
    $('.complectation-tab').on('click keydown', function(e) {
      if (e.type === 'click' || (e.type === 'keydown' && (e.key === 'Enter' || e.key === ' '))) {
        var idx = $(this).index();
        $('.complectation-tab').removeClass('active').attr({'aria-selected': 'false', 'tabindex': -1});
        $(this).addClass('active').attr({'aria-selected': 'true', 'tabindex': 0});
        $('.complectation-item').removeClass('active');
        $('.complectation-item').eq(idx).addClass('active');
        // Фокус на первый элемент внутри таба
        $('.complectation-item').eq(idx).find('button, a, input, [tabindex]:not([tabindex="-1"])').first().focus();
      }
      // Клавиши влево/вправо для навигации по табам
      if (e.type === 'keydown' && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
        var tabs = $('.complectation-tab');
        var idx = $(this).index();
        var nextIdx = e.key === 'ArrowLeft' ? (idx === 0 ? tabs.length - 1 : idx - 1) : (idx === tabs.length - 1 ? 0 : idx + 1);
        tabs.eq(nextIdx).focus();
      }
    });

    setTimeout(() => {
      $('.complectation-item').removeClass('active');
      $('.complectation-item').eq(0).addClass('active');
    }, 1);

    $('.complectation-slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      dots: true,
      appendDots: $('.complectation-slider-dots'),
      customPaging: function(slider, i) {
        return '<button type="button" class="complectation-slider-dot" aria-label="Перейти до слайду ' + (i + 1) + '"></button>';
      },
      accessibility: true,
      infinite: false
    });
  });

  // Product Aksesuar Tabs
  $(function() {
    $('.product-setting-aksesuar-tabs-item').on('click keydown', function(e) {
      if (e.type === 'click' || (e.type === 'keydown' && (e.key === 'Enter' || e.key === ' '))) {
        var tab = $(this).data('tab');
        // Сбросить активные табы
        $('.product-setting-aksesuar-tabs-item').removeClass('active').attr({'aria-selected': 'false', tabindex: 0});
        $(this).addClass('active').attr({'aria-selected': 'true', tabindex: 0});
        // Скрыть все списки
        $('.product-setting-aksesuar-list').hide();
        // Показать нужный
        $('.product-setting-aksesuar-list[data-tab-content="' + tab + '"]').show();
      }
    });
    // Инициализация: показать только активный таб
    $('.product-setting-aksesuar-tabs-item').each(function() {
      var tab = $(this).data('tab');
      if ($(this).hasClass('active')) {
        $('.product-setting-aksesuar-list[data-tab-content="' + tab + '"]').show();
      } else {
        $('.product-setting-aksesuar-list[data-tab-content="' + tab + '"]').hide();
      }
    });
  });



  // Универсальный dropdown для .custom-dropdown
  $(function() {
    $('.custom-dropdown').each(function() {
      var $dropdown = $(this);
      var $list = $dropdown.find('.custom-dropdown__dropdown');
      var $options = $list.find('.custom-dropdown__option');
      var $current = $dropdown.find('.custom-dropdown__current');

      function open() { $dropdown.attr('aria-expanded', 'true'); }
      function close() { $dropdown.attr('aria-expanded', 'false'); }

      $dropdown.on('click', function(e) {
        e.preventDefault();
        $dropdown.attr('aria-expanded') === 'true' ? close() : open();
      });
      $dropdown.on('mouseenter focusin', open);
      $dropdown.on('mouseleave focusout', function() {
        setTimeout(function() {
          if (!$(document.activeElement).closest($dropdown).length && !$dropdown.is(':hover')) close();
        }, 50);
      });
      $options.on('click keydown', function(e) {
        if (e.type === 'click' || e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          $options.attr('aria-selected', 'false');
          $(this).attr('aria-selected', 'true');
          $current.text($(this).text());
          close();
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          $(this).next().focus();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          $(this).prev().focus();
        } else if (e.key === 'Escape') {
          close();
          $dropdown.focus();
        }
      });
      $(document).on('mousedown', function(e) {
        if (!$dropdown.is(e.target) && $dropdown.has(e.target).length === 0) close();
      });
    });
  });

  // Sidebar accordion for filters (множественное открытие)
  $(function() {
    $('.product-sidebar-group-title').on('click', function(e) {
      e.preventDefault();
      var $group = $(this).closest('.product-sidebar-group');
      var $content = $group.find('.product-sidebar-group-content');
      if ($group.hasClass('open')) {
        $content.stop().animate({ height: 0 }, 200, function() {
          $content.css('display', 'none');
          $group.removeClass('open');
        });
      } else {
        $content.css({ display: 'block', height: 0 });
        $group.addClass('open');
        var targetHeight = $content[0].scrollHeight;
        $content.stop().animate({ height: targetHeight }, 200, function() {
          $content.css('height', 'auto');
        });
      }
    });
    // Инициализация: скрыть все, кроме открытых
    $('.product-sidebar-group').each(function() {
      var $group = $(this);
      var $content = $group.find('.product-sidebar-group-content');
      if ($group.hasClass('open')) {
        $content.css({ display: 'block', height: 'auto' });
      } else {
        $content.css({ display: 'none', height: 0 });
      }
    });
  });

  // Reviews slider
  $('.reviews-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    appendDots: $('.reviews-dots'),
    customPaging: function(slider, i) {
      return '<button type="button" class="dot" aria-label="Перейти до слайду ' + (i + 1) + '"></button>';
    },
    accessibility: true,
    adaptiveHeight: false,
    infinite: true
  });

  // Add ARIA roles for reviews dots
  $('.reviews-dots').attr('role', 'tablist');
  $('.reviews-dots .dot').each(function(i) {
    $(this).attr({
      'role': 'tab',
      'tabindex': i === 0 ? 0 : -1,
      'aria-selected': i === 0 ? 'true' : 'false',
      'id': 'reviews-dot-' + i
    });
  });

  // Update ARIA attributes on reviews slide change
  $('.reviews-slider').on('afterChange', function(event, slick, currentSlide) {
    $('.reviews-dots .dot').each(function(i) {
      $(this).attr({
        'tabindex': i === currentSlide ? 0 : -1,
        'aria-selected': i === currentSlide ? 'true' : 'false'
      });
    });
  });

  // Auth Modal Tab Switching
  $('.auth-modal__tab').on('click', function(e) {
    e.preventDefault();

    var tabType = $(this).data('tab');

    // Remove active class from all tabs
    $('.auth-modal__tab').removeClass('auth-modal__tab--active');

    // Add active class to clicked tab
    $(this).addClass('auth-modal__tab--active');

    // Hide all forms
    $('.auth-modal__form').removeClass('auth-modal__form--active');

    // Show corresponding form
    $('.auth-modal__form--' + tabType).addClass('auth-modal__form--active');
  });

  // Auth Modal Form Submission
  $('#loginForm').on('submit', function(e) {
    e.preventDefault();
    // Add your login logic here
    console.log('Login form submitted');
  });

  $('#registerForm').on('submit', function(e) {
    e.preventDefault();
    // Add your registration logic here
    console.log('Registration form submitted');
  });

  // Close modal when clicking outside
  $('.auth-modal__overlay').on('click', function(e) {
    if (e.target === this) {
      $('.auth-modal').hide();
    }
  });

  // Account Orders Accordion
  $('.account-orders-item__header').on('click', function() {
    const $item = $(this).closest('.account-orders-item');
    const $content = $item.find('.account-orders-item__content');
    const $arrow = $item.find('.account-orders-item__arrow');

    // Toggle active state
    $item.toggleClass('active');

    // Slide toggle the content
    if ($item.hasClass('active')) {
      $content.slideDown(300).addClass('active');
      $arrow.css('transform', 'rotate(180deg)');
    } else {
      $content.slideUp(300).removeClass('active');
      $arrow.css('transform', 'rotate(0deg)');
    }
  });

  // Review Modal Functionality
  $('.account-orders-item__product-link').on('click', function(e) {
    e.preventDefault();
    $('#reviewModal').fadeIn(300);
    $('body').css('overflow', 'hidden');
  });

  // Close review modal
  $('.review-modal__close, .review-modal__overlay').on('click', function() {
    $('#reviewModal').fadeOut(300);
    $('body').css('overflow', 'auto');
    // Reset form
    resetReviewForm();
  });

  // Star rating functionality
  $('.review-modal__star').on('mouseenter', function() {
    const rating = $(this).data('rating');
    highlightStars(rating);
  });

  $('.review-modal__stars').on('mouseleave', function() {
    // Find the highest selected star rating
    let selectedRating = 0;
    $('.review-modal__star.selected').each(function() {
      const rating = $(this).data('rating');
      if (rating > selectedRating) {
        selectedRating = rating;
      }
    });
    highlightStars(selectedRating);
  });

  $('.review-modal__star').on('click', function() {
    const rating = $(this).data('rating');

    // Remove all selected and active classes
    $('.review-modal__star').removeClass('selected active');

    // Add selected class to clicked stars (1 to rating)
    for (let i = 1; i <= rating; i++) {
      $('.review-modal__star[data-rating="' + i + '"]').addClass('selected active');
    }

    updateSubmitButton();
  });

  // Comment section toggle
  $('.review-modal__comment-btn').on('click', function() {
    const $wrapper = $('.review-modal__textarea-wrapper');
    const $btn = $(this);

    if ($wrapper.is(':visible')) {
      $wrapper.slideUp(300);
      $btn.removeClass('active');
    } else {
      $wrapper.slideDown(300);
      $btn.addClass('active');
      $('.review-modal__textarea').focus();
    }
  });

  // Submit review
  $('.review-modal__submit-btn').on('click', function() {
    const rating = $('.review-modal__star.selected').length;
    const comment = $('.review-modal__textarea').val().trim();

    if (rating === 0) {
      alert('Будь ласка, оберіть рейтинг');
      return;
    }

    // Here you would normally send the data to your server
    console.log('Review submitted:', { rating, comment });

    // Show success message and close modal
    alert('Дякуємо за ваш відгук!');
    $('#reviewModal').fadeOut(300);
    $('body').css('overflow', 'auto');
    resetReviewForm();
  });

  // Helper functions for review modal
  function highlightStars(rating) {
    $('.review-modal__star').removeClass('active');
    for (let i = 1; i <= rating; i++) {
      $('.review-modal__star[data-rating="' + i + '"]').addClass('active');
    }
  }

  function updateSubmitButton() {
    const rating = $('.review-modal__star.selected').length;
    const $submitBtn = $('.review-modal__submit-btn');

    if (rating > 0) {
      $submitBtn.prop('disabled', false);
    } else {
      $submitBtn.prop('disabled', true);
    }
  }

  function resetReviewForm() {
    $('.review-modal__star').removeClass('selected active');
    $('.review-modal__textarea').val('');
    $('.review-modal__textarea-wrapper').hide();
    $('.review-modal__comment-btn').removeClass('active');
    updateSubmitButton();
  }

  // Initialize review form
  updateSubmitButton();

  // Cart functionality
  function updateCartTotals() {
    let total = 0;
    let itemCount = 0;

    $('.cart-item').each(function() {
      const quantity = parseInt($(this).find('.quantity-input').val()) || 0;
      const price = parseFloat($(this).find('.cart-item__current-price').text().replace(/[^\d]/g, '')) || 0;

      total += quantity * price;
      itemCount += quantity;
    });

    // Update summary
    $('.cart-summary__row:first-child span:first-child').text(itemCount + ' товар на суму');
    $('.cart-summary__row:first-child span:last-child').text(total.toLocaleString() + ' ₴');
    $('.cart-summary__total span:last-child').text(total.toLocaleString() + ' ₴');
  }

  // Quantity controls
  $('.quantity-btn--plus').on('click', function() {
    const input = $(this).siblings('.quantity-input');
    const currentValue = parseInt(input.val()) || 1;
    const maxValue = parseInt(input.attr('max')) || 99;

    if (currentValue < maxValue) {
      input.val(currentValue + 1);
      updateCartTotals();
    }
  });

  $('.quantity-btn--minus').on('click', function() {
    const input = $(this).siblings('.quantity-input');
    const currentValue = parseInt(input.val()) || 1;
    const minValue = parseInt(input.attr('min')) || 1;

    if (currentValue > minValue) {
      input.val(currentValue - 1);
      updateCartTotals();
    }
  });

  // Remove item from cart
  $('.cart-item__remove-btn').on('click', function() {
    const cartItem = $(this).closest('.cart-item');

    cartItem.fadeOut(300, function() {
      cartItem.remove();
      updateCartTotals();

      // Check if cart is empty
      if ($('.cart-item').length === 0) {
        $('.cart-content').html('<div class="cart-empty"><div class="cart-empty__content"><div class="cart-empty__text-content"><h2 class="cart-empty__title">Твій кошик порожній</h2><p class="cart-empty__text">Короткий текст відносно <br> порожнього кошику</p><a href="#" class="cart-empty__button">Перейти до головної</a></div><div class="cart-empty__icon"><img src="images/icon-account-main.svg" alt="Порожній кошик"></div></div></div>');
      }
    });
  });

  // Remove all items from cart
  $('.cart-remove-all-btn').on('click', function() {
    if (confirm('Ви впевнені, що хочете видалити всі товари з кошика?')) {
      $('.cart-items').fadeOut(300, function() {
        $('.cart-content').html('<div class="cart-empty"><div class="cart-empty__content"><div class="cart-empty__text-content"><h2 class="cart-empty__title">Твій кошик порожній</h2><p class="cart-empty__text">Короткий текст відносно <br> порожнього кошику</p><a href="#" class="cart-empty__button">Перейти до головної</a></div><div class="cart-empty__icon"><img src="images/icon-account-main.svg" alt="Порожній кошик"></div></div></div>');
      });
    }
  });

  // Add to favorites
  $('.cart-item__like-btn').on('click', function() {
    const btn = $(this);
    const img = btn.find('img');

    // Toggle favorite state (visual feedback)
    if (img.attr('src').includes('icon-like.svg')) {
      img.attr('src', 'images/icon-like-filled.svg');
      btn.addClass('active');
    } else {
      img.attr('src', 'images/icon-like.svg');
      btn.removeClass('active');
    }
  });

  // Initialize cart totals
  updateCartTotals();

  // Delivery method selection
  $('.order-delivery__method').on('click', function() {
    // Remove active class from all methods
    $('.order-delivery__method').removeClass('order-delivery__method--active');

    // Add active class to clicked method
    $(this).addClass('order-delivery__method--active');
  });

  // Continue Button
  $('.order-continue__btn').on('click', function() {
    // Check if any delivery method is selected
    if ($('.order-delivery__method--active').length === 0) {
      alert('Будь ласка, оберіть спосіб доставки');
      return;
    }

    // Here you would typically proceed to the next step
    console.log('Proceeding to next step...');
  });

  // City Modal Functionality
  $('.order-delivery__city').on('click', function(e) {
    e.preventDefault();
    $('#cityModal').fadeIn(300);
    $('#cityModal').css('display', 'flex')
    $('body').css('overflow', 'hidden');
  });

  // Close city modal
  $('.city-modal__close, .city-modal__overlay').on('click', function() {
    $('#cityModal').fadeOut(300);
    $('body').css('overflow', 'auto');
  });

  // Close modal with Escape key
  $(document).on('keydown', function(e) {
    if (e.key === 'Escape' && $('#cityModal').is(':visible')) {
      $('#cityModal').fadeOut(300);
      $('body').css('overflow', 'auto');
    }
  });

  // Store Modal Functionality
  $('.order-delivery__store').on('click', function(e) {
    e.preventDefault(); // Prevent default button behavior
    e.stopPropagation(); // Prevent triggering delivery method selection

    $('#storeModal').fadeIn(300);
    $('#storeModal').css('display', 'flex')
    $('body').css('overflow', 'hidden');
  });

  $('.store-modal__close, .store-modal__overlay').on('click', function() {
    $('#storeModal').fadeOut(300);
    $('body').css('overflow', 'auto');
  });

  // Delivery Type Switching
  $('.order-delivery__type-item').on('click', function() {
    const deliveryType = $(this).data('type');

    // Update active state for type buttons
    $('.order-delivery__type-item').removeClass('order-delivery__type-item--active');
    $(this).addClass('order-delivery__type-item--active');

    // Hide all delivery methods
    $('.order-delivery__methods').hide();

    // Show selected delivery type methods
    $(`[data-delivery-type="${deliveryType}"]`).show();
  });



  // Delivery Method Selection
  $(document).on('click', '.order-delivery__method', function(e) {
    // Skip accordion-style methods (they have their own handler)
    if ($(this).hasClass('order-delivery__postomat-np')) {
      return;
    }

    // Remove active state from all delivery methods
    $('.order-delivery__method').removeClass('order-delivery__method--active');

    // Add active state to clicked method
    $(this).addClass('order-delivery__method--active');
  });

  // Postomat Accordion Functionality
  $(document).on('click', '.order-delivery__method-header', function(e) {
    e.preventDefault();
    e.stopPropagation(); // Prevent event bubbling

    console.log('Accordion header clicked'); // Debug log

    const $method = $(this).closest('.order-delivery__method');
    const $content = $method.find('.order-delivery__accordion-content');

    console.log('Method found:', $method.length); // Debug log
    console.log('Content found:', $content.length); // Debug log

    // Close other accordion methods first
    $('.order-delivery__method.expanded').not($method).each(function() {
      $(this).removeClass('expanded');
      $(this).find('.order-delivery__accordion-content').removeClass('expanded');
    });

    // Toggle expanded state
    $method.toggleClass('expanded');
    $content.toggleClass('expanded');

    console.log('Method has expanded class:', $method.hasClass('expanded')); // Debug log

    // Remove active state from other delivery methods and add to this one
    $('.order-delivery__method').removeClass('order-delivery__method--active');
    if ($method.hasClass('expanded')) {
      $method.addClass('order-delivery__method--active');
    }
  });

  // Store Selection Button
  $(document).on('click', '.order-delivery__store-btn', function(e) {
    e.preventDefault();
    e.stopPropagation(); // Prevent triggering parent accordion

    console.log('Store selection button clicked'); // Debug log

    // Open store modal
    $('#storeModal').fadeIn(300);
    $('#storeModal').css('display', 'flex');
    $('body').css('overflow', 'hidden');
  });

  // Receive Modal Functionality
  $(document).on('click', '.order-delivery__client', function(e) {
    e.preventDefault();

    // Initialize modal state - show first form wrapper, hide second
    $('.recieve-modal__form-first').show();
    $('.recieve-modal__form-another').hide();

    // Ensure first tab is active
    $('.recieve-modal__tab').removeClass('recieve-modal__tab--active');
    $('.recieve-modal__tab').first().addClass('recieve-modal__tab--active');

    // Open receive modal
    $('#recieveModal').fadeIn(300);
    $('#recieveModal').css('display', 'flex');
    $('body').css('overflow', 'hidden');
  });

  // Receive Modal Close
  $(document).on('click', '.recieve-modal__close, .recieve-modal__overlay', function(e) {
    e.preventDefault();

    $('#recieveModal').fadeOut(300);
    $('body').css('overflow', 'auto');
  });

  // Receive Modal Tab Switching
  $(document).on('click', '.recieve-modal__tab', function(e) {
    e.preventDefault();

    // Remove active class from all tabs
    $('.recieve-modal__tab').removeClass('recieve-modal__tab--active');

    // Add active class to clicked tab
    $(this).addClass('recieve-modal__tab--active');

    // Get tab index (0 for first tab, 1 for second tab)
    const tabIndex = $(this).index();

    // Hide all form wrappers
    $('.recieve-modal__form-first, .recieve-modal__form-another').hide();

    // Show corresponding form wrapper
    if (tabIndex === 0) {
      $('.recieve-modal__form-first').css('display', 'flex');
    } else {
      $('.recieve-modal__form-another').css('display', 'flex');
    }
  });

  // Receive Modal Form Submission (both forms)
  $(document).on('submit', '.recieve-modal__form', function(e) {
    e.preventDefault();

    // Get form data
    const phone = $(this).find('input[type="tel"]').val();
    const firstName = $(this).find('input[type="text"]').first().val();
    const lastName = $(this).find('input[type="text"]').eq(1).val();
    const email = $(this).find('input[type="email"]').val();

    // Update the client info in the main form
    $('.order-delivery__client .order-delivery__desc').html(`${lastName} ${firstName} <br>${phone}`);

    // Close modal
    $('#recieveModal').fadeOut(300);
    $('body').css('overflow', 'auto');

    console.log('Receive form submitted:', { phone, firstName, lastName, email });
  });

  // Day Choose Functionality
  $(document).on('click', '.order-delivery__day-choose-item-button', function(e) {
    e.preventDefault();
    e.stopPropagation();

    // Remove active class from all day buttons
    $('.order-delivery__day-choose-item-button').removeClass('active');

    // Add active class to clicked button
    $(this).addClass('active');

    console.log('Day selected:', $(this).text());
  });

  // Calendar Button Functionality
  $(document).on('click', '.order-delivery__day-choose-calendar-btn', function(e) {
    e.preventDefault();
    e.stopPropagation();

    // Here you can add calendar modal functionality
    console.log('Calendar button clicked');

    // For now, just highlight the button temporarily
    $(this).css('border-color', '#2EA4FF');
    setTimeout(() => {
      $(this).css('border-color', '#D9D9D9');
    }, 300);
  });

  // Choose Date Modal Functionality
  $(document).on('click', '#open-choose-date-modal', function(e) {
    e.preventDefault();
    e.stopPropagation();

    // Open choose date modal
    $('#chooseDateModal').fadeIn(300);
    $('#chooseDateModal').css('display', 'flex');
    $('body').css('overflow', 'hidden');

    console.log('Choose date modal opened');
  });

  // Choose Date Modal Close
  $(document).on('click', '.choose-date-modal__close, .choose-date-modal__overlay', function(e) {
    e.preventDefault();

    $('#chooseDateModal').fadeOut(300);
    $('body').css('overflow', 'auto');

    console.log('Choose date modal closed');
  });

  // Prevent modal content click from closing modal
  $(document).on('click', '.choose-date-modal__content', function(e) {
    e.stopPropagation();
  });


});
