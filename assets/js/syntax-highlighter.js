/**
 * Enhanced Syntax Highlighter
 * Supports Python, C++, JavaScript, and more
 */

class SyntaxHighlighter {
  constructor() {
    this.languages = {
      python: {
        keywords: /(def|class|if|else|elif|for|while|try|except|finally|import|from|return|break|continue|pass|lambda|with|as|in|not|and|or|is|None|True|False|global|nonlocal|yield|async|await)\b/g,
        builtins: /(print|len|range|enumerate|zip|map|filter|sum|max|min|abs|round|str|int|float|list|dict|set|tuple)\b/g,
        strings: [
          /("""[\s\S]*?""")/g,  // Triple quotes
          /('''[\s\S]*?''')/g,  // Triple quotes
          /(['"])((?:\\.|(?!\1)[^\\])*)\1/g  // Regular strings
        ],
        comments: /(#.*$)/gm,
        numbers: /\b(\d+\.?\d*)\b/g
      },
      
      cpp: {
        keywords: /(int|float|double|char|bool|void|string|auto|const|static|class|struct|enum|namespace|using|if|else|for|while|do|switch|case|default|break|continue|return|public|private|protected|virtual|override|template|typename|sizeof|new|delete|this|true|false|nullptr)\b/g,
        builtins: /(cout|cin|endl|printf|scanf|malloc|free|sizeof|std)\b/g,
        strings: [
          /(["'])((?:\\.|(?!\1)[^\\])*)\1/g
        ],
        comments: /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm,
        preprocessor: /(#\w+)/g,
        numbers: /\b(\d+\.?\d*f?)\b/g
      },
      
      javascript: {
        keywords: /(function|var|let|const|if|else|for|while|do|switch|case|break|continue|return|class|extends|constructor|super|this|new|typeof|instanceof|true|false|null|undefined|async|await|try|catch|finally|throw)\b/g,
        builtins: /(console|document|window|Array|Object|String|Number|Boolean|Date|Math|JSON|Promise)\b/g,
        strings: [
          /(["'`])((?:\\.|(?!\1)[^\\])*)\1/g
        ],
        comments: /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm,
        numbers: /\b(\d+\.?\d*)\b/g
      }
    };
    
    this.init();
  }
  
  init() {
    document.addEventListener('DOMContentLoaded', () => this.highlightAll());
    this.setupMutationObserver();
  }
  
  highlightAll() {
    const codeBlocks = document.querySelectorAll('.code-block code, pre code, code[data-lang]');
    codeBlocks.forEach(block => this.highlightBlock(block));
  }
  
  highlightBlock(block) {
    // Skip if already highlighted
    if (block.classList.contains('highlighted')) return;
    
    const lang = this.getLanguage(block);
    // Preserve original whitespace by using textContent
    const code = block.textContent;
    
    // Add language indicator to parent
    if (block.parentElement.classList.contains('code-block')) {
      block.parentElement.setAttribute('data-lang', lang);
    }
    
    const highlightedCode = this.highlight(code, lang);
    block.innerHTML = highlightedCode;
    block.classList.add('highlighted');
  }
  
  getLanguage(block) {
    return block.getAttribute('data-lang') || 
           block.className.replace('language-', '') || 
           block.parentElement.className.replace('language-', '') || 
           'python';
  }
  
  highlight(code, language) {
    const lang = this.languages[language] || this.languages.python;
    let highlightedCode = code;
    
    // Escape HTML entities first to prevent issues
    highlightedCode = highlightedCode
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    
    // Process in order: comments first, then strings, then keywords
    if (lang.comments) {
      highlightedCode = highlightedCode.replace(lang.comments, '<span class="comment">$1</span>');
    }
    
    if (lang.strings) {
      lang.strings.forEach(pattern => {
        highlightedCode = highlightedCode.replace(pattern, (match, ...args) => {
          if (args.length > 1) {
            return `<span class="string">${args[0]}${args[1]}${args[0]}</span>`;
          }
          return `<span class="string">${match}</span>`;
        });
      });
    }
    
    if (lang.preprocessor) {
      highlightedCode = highlightedCode.replace(lang.preprocessor, '<span class="preprocessor">$1</span>');
    }
    
    if (lang.builtins) {
      highlightedCode = highlightedCode.replace(lang.builtins, '<span class="built-in">$1</span>');
    }
    
    if (lang.keywords) {
      highlightedCode = highlightedCode.replace(lang.keywords, '<span class="keyword">$1</span>');
    }
    
    if (lang.numbers) {
      highlightedCode = highlightedCode.replace(lang.numbers, '<span class="number">$1</span>');
    }
    
    return highlightedCode;
  }
  
  setupMutationObserver() {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.addedNodes.length > 0) {
          this.highlightAll();
        }
      });
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
}

// Initialize the syntax highlighter
new SyntaxHighlighter();
