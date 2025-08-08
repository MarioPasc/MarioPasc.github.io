/**
 * Minimal, whitespace-safe Syntax Highlighter
 * Languages: Python, C/C++ (basic)
 * - Preserves indentation and newlines (uses textContent, never normalizes).
 * - Escapes HTML BEFORE injecting <span> wrappers.
 * - Processes in this order: comments → strings → preprocessor → numbers → keywords → builtins.
 */
class SyntaxHighlighter {
  constructor() {
    this.languages = {
      python: {
        comments: /#.*/gm,
        strings: [
          /("""[\s\S]*?""")/g,
          /('''[\s\S]*?''')/g,
          /("([^"\\]|\\.)*")/g,
          /('([^'\\]|\\.)*')/g
        ],
        keywords: /\b(False|None|True|and|as|assert|async|await|break|class|continue|def|del|elif|else|except|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|raise|return|try|while|with|yield)\b/g,
        builtins: /\b(abs|all|any|ascii|bin|bool|bytearray|bytes|callable|chr|classmethod|compile|complex|dict|dir|divmod|enumerate|eval|exec|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|isinstance|issubclass|iter|len|list|locals|map|max|memoryview|min|next|object|oct|open|ord|pow|print|property|range|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|vars|zip)\b/g,
        numbers: /\b\d+(?:\.\d+)?\b/g
      },
      cpp: {
        comments: /\/\/.*$|\/\*[\s\S]*?\*\//gm,
        strings: [
          /("([^"\\]|\\.)*")/g,
          /('([^'\\]|\\.)*')/g
        ],
        preprocessor: /^(?:\s*)#\s*[A-Za-z_]+\b.*$/gm,
        keywords: /\b(alignas|alignof|and|and_eq|asm|auto|bitand|bitor|bool|break|case|catch|char|char8_t|char16_t|char32_t|class|compl|concept|const|consteval|constexpr|constinit|const_cast|continue|co_await|co_return|co_yield|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|false|float|for|friend|goto|if|inline|int|long|mutable|namespace|new|noexcept|not|not_eq|nullptr|operator|or|or_eq|private|protected|public|register|reinterpret_cast|requires|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|true|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while|xor|xor_eq)\b/g,
        builtins: /\b(std|size_t|string|cout|cin|endl)\b/g,
        numbers: /\b\d+(?:\.\d+)?\b/g
      }
    };
    document.addEventListener('DOMContentLoaded', () => this.highlightAll());
  }

  highlightAll() {
    const blocks = document.querySelectorAll('.code-block code[data-lang]');
    blocks.forEach(block => this.highlightBlock(block));
  }

  highlightBlock(block) {
    if (block.classList.contains('highlighted')) return;

    const langKey = (block.getAttribute('data-lang') || '').toLowerCase();
    const lang = this.languages[langKey] || this.languages.python;

    // Preserve exact whitespace
    let code = block.textContent;

    // Add language label to parent if present
    const parent = block.closest('.code-block');
    if (parent) parent.setAttribute('data-lang', langKey || 'text');

    // Escape HTML entities so raw code is safe
    let html = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Tokenize: comments → strings → preprocessor → numbers → keywords → builtins
    // Use non-greedy matching and avoid conflicts with existing spans
    if (lang.comments) {
      html = html.replace(lang.comments, match => {
        if (match.includes('<span')) return match; // Skip if already processed
        return `<span class="comment">${match}</span>`;
      });
    }
    if (lang.strings) {
      for (const pat of lang.strings) {
        html = html.replace(pat, match => {
          if (match.includes('<span')) return match; // Skip if already processed
          return `<span class="string">${match}</span>`;
        });
      }
    }
    if (lang.preprocessor) {
      html = html.replace(lang.preprocessor, match => {
        if (match.includes('<span')) return match; // Skip if already processed
        return `<span class="preprocessor">${match}</span>`;
      });
    }
    if (lang.numbers) {
      html = html.replace(lang.numbers, match => {
        if (match.includes('<span')) return match; // Skip if already processed
        return `<span class="number">${match}</span>`;
      });
    }
    if (lang.keywords) {
      html = html.replace(lang.keywords, match => {
        if (match.includes('<span')) return match; // Skip if already processed
        return `<span class="keyword">${match}</span>`;
      });
    }
    if (lang.builtins) {
      html = html.replace(lang.builtins, match => {
        if (match.includes('<span')) return match; // Skip if already processed
        return `<span class="built-in">${match}</span>`;
      });
    }

    block.innerHTML = html;
    block.classList.add('highlighted');
  }
}

// Initialize the syntax highlighter
new SyntaxHighlighter();
