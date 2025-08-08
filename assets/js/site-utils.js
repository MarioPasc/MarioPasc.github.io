/**
 * Site Utilities Module
 * Contains utility functions for the site
 */

class SiteUtils {
  /**
   * Copy text to clipboard with fallback
   * @param {string} text - Text to copy
   * @param {HTMLElement} button - Button that triggered the copy
   */
  static async copyToClipboard(text, button) {
    try {
      await navigator.clipboard.writeText(text);
      SiteUtils.showCopyFeedback(button, 'Copied!');
    } catch (err) {
      // Fallback for older browsers
      SiteUtils.fallbackCopyTextToClipboard(text, button);
    }
  }

  /**
   * Fallback copy method for older browsers
   */
  static fallbackCopyTextToClipboard(text, button) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      const msg = successful ? 'Copied!' : 'Copy failed';
      SiteUtils.showCopyFeedback(button, msg);
    } catch (err) {
      SiteUtils.showCopyFeedback(button, 'Copy failed');
    }

    document.body.removeChild(textArea);
  }

  /**
   * Show visual feedback for copy operations
   */
  static showCopyFeedback(button, message) {
    const original = button.textContent;
    button.textContent = message;
    button.disabled = true;
    
    setTimeout(() => {
      button.textContent = original;
      button.disabled = false;
    }, 2000);
  }

  /**
   * Initialize copy buttons for research citations
   */
  static initCopyButtons() {
    document.querySelectorAll('.copy-ref').forEach(button => {
      button.addEventListener('click', function() {
        const text = this.getAttribute('data-ref');
        SiteUtils.copyToClipboard(text, this);
      });
    });
  }

  /**
   * Initialize all site utilities
   */
  static init() {
    document.addEventListener('DOMContentLoaded', () => {
      SiteUtils.initCopyButtons();
    });
  }
}

// Initialize utilities
SiteUtils.init();
