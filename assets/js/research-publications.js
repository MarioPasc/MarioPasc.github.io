/**
 * Research Publications JavaScript Module
 * Handles citation copying and other research page interactions
 */

const ResearchPublications = {
  init() {
    this.initCitationCopying();
  },

  initCitationCopying() {
    document.querySelectorAll('.copy-ref').forEach(btn => {
      btn.addEventListener('click', function() {
        const citation = this.getAttribute('data-ref');
        
        if (navigator.clipboard) {
          navigator.clipboard.writeText(citation)
            .then(() => this.showCopySuccess())
            .catch(() => this.fallbackCopy(citation));
        } else {
          this.fallbackCopy(citation);
        }
      });
    });
  },

  showCopySuccess() {
    const originalText = this.textContent;
    this.textContent = 'Copied!';
    this.classList.add('copied');
    
    setTimeout(() => {
      this.textContent = originalText;
      this.classList.remove('copied');
    }, 2000);
  },

  fallbackCopy(text) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
      document.execCommand('copy');
      this.showCopySuccess();
    } catch (err) {
      console.error('Failed to copy citation:', err);
    }
    
    document.body.removeChild(textArea);
  }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => ResearchPublications.init());
} else {
  ResearchPublications.init();
}

// Export for potential external use
window.ResearchPublications = ResearchPublications;
