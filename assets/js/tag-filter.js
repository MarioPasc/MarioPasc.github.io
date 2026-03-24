/**
 * Blog tag filter — client-side post filtering by tag
 */
(function() {
  'use strict';

  function initTagFilter() {
    var filterButtons = document.querySelectorAll('.tag-filter-btn');
    var blogCards = document.querySelectorAll('.blog-card[data-tag]');

    if (!filterButtons.length || !blogCards.length) return;

    filterButtons.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var tag = btn.dataset.tag;

        filterButtons.forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');

        blogCards.forEach(function(card) {
          if (tag === 'all' || card.dataset.tag === tag) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });

        if (tag === 'all') {
          history.replaceState(null, '', window.location.pathname);
        } else {
          history.replaceState(null, '', '#tag-' + tag);
        }
      });
    });

    // Restore filter from URL hash
    var hash = window.location.hash;
    if (hash && hash.indexOf('#tag-') === 0) {
      var tag = hash.replace('#tag-', '');
      var btn = document.querySelector('.tag-filter-btn[data-tag="' + tag + '"]');
      if (btn) btn.click();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTagFilter);
  } else {
    initTagFilter();
  }
})();
