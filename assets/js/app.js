/**
 * Main application JavaScript
 * Handles site-wide functionality and component initialization
 */

// Main app object
const App = {
  // Initialize all components
  init() {
    this.initResearchCitations();
    this.initScrollEffects();
    this.initLoadingStates();
  },

  // Initialize research citation functionality
  initResearchCitations() {
    document.querySelectorAll('.copy-ref').forEach((btn) => {
      btn.addEventListener('click', this.handleCitationCopy.bind(this));
    });
  },

  // Handle citation copying with improved UX
  async handleCitationCopy(event) {
    const button = event.target;
    const citation = button.getAttribute('data-ref');
    const originalText = button.textContent;

    try {
      await navigator.clipboard.writeText(citation);
      button.textContent = 'Copied!';
      button.classList.add('copied');
      
      setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('copied');
      }, 2000);
    } catch (err) {
      // Fallback for older browsers
      this.fallbackCopyText(citation);
      button.textContent = 'Copied!';
      
      setTimeout(() => {
        button.textContent = originalText;
      }, 2000);
    }
  },

  // Fallback copy method
  fallbackCopyText(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  },

  // Initialize scroll effects
  initScrollEffects() {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      // Observe elements that should animate in
      document.querySelectorAll('.blog-entry, .publication, .research-header').forEach((el) => {
        observer.observe(el);
      });
    }
  },

  // Initialize loading states for better UX
  initLoadingStates() {
    // Add loading class initially
    document.body.classList.add('loading');
    
    // Remove loading class when everything is loaded
    window.addEventListener('load', () => {
      document.body.classList.remove('loading');
      document.body.classList.add('loaded');
    });
  }
};

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => App.init());
} else {
  App.init();
}

// Export for use in other modules
window.App = App;
