/**
 * Main application JavaScript
 * Handles site-wide functionality and component initialization
 */

// Main app object
const App = {
  // Initialize all components
  init() {
    this.initSyntaxHighlighter();
    this.initResearchCitations();
    this.initScrollEffects();
    this.initLoadingStates();
  },

  // Enhanced syntax highlighter with better performance
  initSyntaxHighlighter() {
    // Use requestIdleCallback for better performance
    const highlightWhenIdle = () => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => this.highlightCode());
      } else {
        setTimeout(() => this.highlightCode(), 0);
      }
    };

    // Highlight on load
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', highlightWhenIdle);
    } else {
      highlightWhenIdle();
    }

    // Observer for dynamic content
    if ('MutationObserver' in window) {
      const observer = new MutationObserver((mutations) => {
        let shouldHighlight = false;
        mutations.forEach((mutation) => {
          if (mutation.addedNodes.length > 0) {
            mutation.addedNodes.forEach((node) => {
              if (node.nodeType === 1 && 
                  (node.querySelector('.code-block, pre code') || 
                   node.matches('.code-block, pre code'))) {
                shouldHighlight = true;
              }
            });
          }
        });
        
        if (shouldHighlight) {
          highlightWhenIdle();
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    }
  },

  // Improved syntax highlighting with caching
  highlightCode() {
    const blocks = document.querySelectorAll('.code-block code, pre code, code[data-lang]');
    
    blocks.forEach((block) => {
      // Skip if already highlighted
      if (block.classList.contains('highlighted')) return;
      
      const lang = this.getLanguage(block);
      const code = block.textContent || block.innerText;
      
      // Add language indicator to parent
      if (block.parentElement.classList.contains('code-block')) {
        block.parentElement.setAttribute('data-lang', lang);
      }

      const highlightedCode = this.highlightSyntax(code, lang);
      block.innerHTML = highlightedCode;
      block.classList.add('highlighted');
    });
  },

  // Get language from various sources
  getLanguage(block) {
    return block.getAttribute('data-lang') || 
           block.className.replace('language-', '') || 
           block.parentElement.className.replace('language-', '') || 
           'python';
  },

  // Enhanced syntax highlighting
  highlightSyntax(code, lang) {
    const patterns = this.getHighlightPatterns(lang);
    let highlightedCode = code;

    // Apply patterns in order of precedence
    patterns.forEach(({ pattern, className }) => {
      highlightedCode = highlightedCode.replace(pattern, `<span class="${className}">$1</span>`);
    });

    return highlightedCode;
  },

  // Get highlighting patterns for each language
  getHighlightPatterns(lang) {
    const patterns = {
      python: [
        { pattern: /(#.*$)/gm, className: 'comment' },
        { pattern: /("""[\s\S]*?""")/g, className: 'string' },
        { pattern: /('''[\s\S]*?''')/g, className: 'string' },
        { pattern: /(['"])((?:\\.|(?!\1)[^\\])*)\1/g, className: 'string' },
        { pattern: /\b(print|len|range|enumerate|zip|map|filter|sum|max|min|abs|round)\b/g, className: 'built-in' },
        { pattern: /\b(def|class|if|else|elif|for|while|try|except|finally|import|from|return|break|continue|pass|lambda|with|as|in|not|and|or|is|None|True|False|global|nonlocal|yield|async|await)\b/g, className: 'keyword' },
        { pattern: /\b(\d+\.?\d*)\b/g, className: 'number' }
      ],
      cpp: [
        { pattern: /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm, className: 'comment' },
        { pattern: /(["'])((?:\\.|(?!\1)[^\\])*)\1/g, className: 'string' },
        { pattern: /(#\w+)/g, className: 'preprocessor' },
        { pattern: /\b(int|float|double|char|bool|void|string|auto|const|static|class|struct|enum|namespace|using|if|else|for|while|do|switch|case|default|break|continue|return|public|private|protected|virtual|override|template|typename|sizeof|new|delete|this|true|false|nullptr)\b/g, className: 'keyword' },
        { pattern: /\b(cout|cin|endl|printf|scanf|malloc|free|sizeof)\b/g, className: 'built-in' },
        { pattern: /\b(\d+\.?\d*f?)\b/g, className: 'number' }
      ],
      javascript: [
        { pattern: /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm, className: 'comment' },
        { pattern: /(["'`])((?:\\.|(?!\1)[^\\])*)\1/g, className: 'string' },
        { pattern: /\b(function|var|let|const|if|else|for|while|do|switch|case|break|continue|return|class|extends|constructor|super|this|new|typeof|instanceof|true|false|null|undefined|async|await|try|catch|finally|throw)\b/g, className: 'keyword' },
        { pattern: /\b(console|document|window|Array|Object|String|Number|Boolean|Date|Math|JSON|Promise)\b/g, className: 'built-in' },
        { pattern: /\b(\d+\.?\d*)\b/g, className: 'number' }
      ]
    };

    return patterns[lang] || patterns.python;
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
