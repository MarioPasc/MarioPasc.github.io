/**
 * Hardened Syntax Highlighter
 * - Preserves whitespace (uses textContent).
 * - Escapes HTML first, then injects <span> tokens.
 * - Pre-cleans *any* residual artifacts like:  class="keyword">  left by other scripts.
 * - Runs idempotently and marks nodes with data-sh="1".
 */
(function(){
  class SyntaxHighlighter {
    constructor() {
      this.languages = {
        python: {
          comments: /#.*/gm,
          strings: [
            /("""[\s\S]*?""")/g,
            /(\'\'\'[\s\S]*?\'\'\')/g,
            /("([^"\\]|\\.)*")/g,
            /(\'([^'\\]|\\.)*\')/g
          ],
          keywords: /\b(False|None|True|and|as|assert|async|await|break|class|continue|def|del|elif|else|except|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|raise|return|try|while|with|yield)\b/g,
          builtins: /\b(abs|all|any|ascii|bin|bool|bytearray|bytes|callable|chr|classmethod|compile|complex|dict|dir|divmod|enumerate|eval|exec|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|isinstance|issubclass|iter|len|list|locals|map|max|memoryview|min|next|object|oct|open|ord|pow|print|property|range|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|vars|zip)\b/g,
          numbers: /\b\d+(?:\.\d+)?\b/g
        },
        cpp: {
          comments: /\/\/.*$|\/\*[\s\S]*?\*\//gm,
          strings: [
            /("([^"\\]|\\.)*")/g,
            /(\'([^'\\]|\\.)*\')/g
          ],
          preprocessor: /^(?:\s*)#\s*[A-Za-z_]+\b.*$/gm,
          keywords: /\b(alignas|alignof|and|and_eq|asm|auto|bitand|bitor|bool|break|case|catch|char|char8_t|char16_t|char32_t|class|compl|concept|const|consteval|constexpr|constinit|const_cast|continue|co_await|co_return|co_yield|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|false|float|for|friend|goto|if|inline|int|long|mutable|namespace|new|noexcept|not|not_eq|nullptr|operator|or|or_eq|private|protected|public|register|reinterpret_cast|requires|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|true|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while|xor|xor_eq)\b/g,
          builtins: /\b(std|size_t|string|cout|cin|endl)\b/g,
          numbers: /\b\d+(?:\.\d+)?\b/g
        }
      };
      window.addEventListener('DOMContentLoaded', () => this.highlightAll());
    }

    highlightAll() {
      const blocks = document.querySelectorAll('.code-block code[data-lang]');
      blocks.forEach(block => this.highlightBlock(block));
    }

    // Remove any garbage left by other scripts (e.g., "<span" stripped -> 'class="x">')
    _despanGarbage(html) {
      // 1) Literal escaped spans like &lt;span ...&gt; or &lt;/span&gt;
      html = html.replace(/&lt;\/?span[^&]*?&gt;/gi, '');
      // 2) Orphan attribute residue:  class="token">
      html = html.replace(/(^|[\s>])class="(?:keyword|string|comment|number|built-in|preprocessor)"\>/gi, '$1');
      return html;
    }

    highlightBlock(block) {
      if (block.dataset.sh === '1') return;

      const langKey = (block.getAttribute('data-lang') || '').toLowerCase();
      const lang = this.languages[langKey] || this.languages.python;

      // Always start from the raw text (idempotent)
      let code = block.textContent;

      // Escape HTML entities
      let html = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      // Tokenize in order
      if (lang.comments) {
        html = html.replace(lang.comments, m => `<span class="comment">${m}</span>`);
      }
      if (lang.strings) {
        for (const pat of lang.strings) {
          html = html.replace(pat, m => `<span class="string">${m}</span>`);
        }
      }
      if (lang.preprocessor) {
        html = html.replace(lang.preprocessor, m => `<span class="preprocessor">${m}</span>`);
      }
      if (lang.numbers) {
        html = html.replace(lang.numbers, m => `<span class="number">${m}</span>`);
      }
      if (lang.keywords) {
        html = html.replace(lang.keywords, m => `<span class="keyword">${m}</span>`);
      }
      if (lang.builtins) {
        html = html.replace(lang.builtins, m => `<span class="built-in">${m}</span>`);
      }

      // Clean any residue that might be produced by other scripts
      html = this._despanGarbage(html);

      block.innerHTML = html;
      block.dataset.sh = '1';
    }
  }

  new SyntaxHighlighter();
})();