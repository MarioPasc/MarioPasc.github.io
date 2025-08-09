/**
 * Minimal, whitespace-safe Syntax Highlighter
 * Languages: Python, C/C++ (basic)
 * 
 * Design:
 *  - Read raw text via innerHTML reconstruction → survives accidental tags like <Arduino.h>.
 *  - Escape HTML before wrapping tokens → no accidental tags.
 *  - Tokenize to non-overlapping spans by priority → stable highlighting.
 * 
 * Usage: <div class="code-block"><code data-lang="python">...</code></div>
 *        or fenced markdown → <pre><code class="language-python">...</code></pre>
 */

/** Escape raw text for HTML injection (leaves newlines & spaces intact). */
function escapeHtml(s) {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

/** Merge overlapping token intervals by priority (lower is stronger). */
function buildHtmlFromTokens(escapedText, tokens) {
  // Sort by start, then priority
  tokens.sort((a, b) => (a.start - b.start) || (a.priority - b.priority));

  // Greedy select non-overlapping, honoring priority order
  const selected = [];
  let lastEnd = -1;
  for (const t of tokens) {
    if (t.start >= lastEnd) {
      selected.push(t);
      lastEnd = t.end;
    }
  }

  // Stitch HTML
  let html = '';
  let pos = 0;
  for (const t of selected) {
    if (t.start > pos) html += escapedText.slice(pos, t.start);
    html += `<span class="${t.cls}">${escapedText.slice(t.start, t.end)}</span>`;
    pos = t.end;
  }
  html += escapedText.slice(pos);
  return html;
}

/** Collect token ranges for a given set of regex specs. */
function collectTokens(text, specs) {
  const out = [];
  for (const spec of specs) {
    const re = new RegExp(spec.re.source, spec.re.flags.includes('g') ? spec.re.flags : spec.re.flags + 'g');
    let m;
    while ((m = re.exec(text)) !== null) {
      out.push({
        start: m.index,
        end: m.index + m[0].length,
        cls: spec.cls,
        priority: spec.priority
      });
      // Prevent zero-length infinite loops (shouldn't happen with these regexes)
      if (m.index === re.lastIndex) re.lastIndex++;
    }
  }
  return out;
}

/** Language token specifications. Work on ESCAPED text (quotes remain quotes). */
function getLanguageSpecs(langKey) {
  // Common pieces
  const number = { re: /\b(?:0x[0-9a-fA-F]+|\d+(?:\.\d+)?(?:[eE][+\-]?\d+)?)\b/g, cls: 'number', priority: 40 };

  if (langKey === 'python') {
    const keywords = [
      'False','None','True','and','as','assert','async','await','break','class','continue','def','del','elif','else',
      'except','finally','for','from','global','if','import','in','is','lambda','nonlocal','not','or','pass','raise',
      'return','try','while','with','yield'
    ];
    const builtins = [
      'abs','all','any','bool','bytes','callable','chr','complex','dict','dir','enumerate','filter','float','format',
      'getattr','hasattr','hash','help','hex','id','int','isinstance','issubclass','iter','len','list','map','max',
      'min','next','object','open','ord','pow','print','range','repr','reversed','round','set','slice','sorted','str',
      'sum','tuple','type','vars','zip'
    ];
    return [
      // Highest priority first (lower number = stronger)
      { re: /("""[\s\S]*?""")/g, cls: 'string', priority: 10 },
      { re: /(\'\'\'[\s\S]*?\'\'\')/g, cls: 'string', priority: 10 },
      { re: /"([^"\\]|\\.)*"/g, cls: 'string', priority: 12 },
      { re: /'([^'\\]|\\.)*'/g, cls: 'string', priority: 12 },
      { re: /#[^\n]*/g, cls: 'comment', priority: 15 },
      number,
      { re: new RegExp(`\\b(?:${keywords.join('|')})\\b`, 'g'), cls: 'keyword', priority: 60 },
      { re: new RegExp(`\\b(?:${builtins.join('|')})\\b`, 'g'), cls: 'built-in', priority: 70 }
    ];
  }

  // C / C++ (cpp)
  const cppKeywords = [
    'alignas','alignof','and','and_eq','asm','auto','bitand','bitor','bool','break','case','catch','char','class',
    'const','constexpr','const_cast','continue','decltype','default','delete','do','double','dynamic_cast','else',
    'enum','explicit','export','extern','false','float','for','friend','goto','if','inline','int','long','mutable',
    'namespace','new','noexcept','not','not_eq','nullptr','operator','or','or_eq','private','protected','public',
    'register','reinterpret_cast','return','short','signed','sizeof','static','static_cast','struct','switch',
    'template','this','throw','true','try','typedef','typeid','typename','union','unsigned','using','virtual','void',
    'volatile','wchar_t','while','xor','xor_eq'
  ];
  const cppBuiltins = ['std','size_t','string','cout','cin','endl'];

  return [
    { re: /\/\*[\s\S]*?\*\//g, cls: 'comment', priority: 15 },    // block comments
    { re: /\/\/[^\n]*/g, cls: 'comment', priority: 15 },          // line comments
    { re: /^\s*#\s*(?:include|define|if|ifdef|ifndef|endif|pragma).*$/gm, cls: 'preprocessor', priority: 20 },
    { re: /"([^"\\]|\\.)*"/g, cls: 'string', priority: 12 },
    { re: /'([^'\\]|\\.)*'/g, cls: 'string', priority: 12 },
    number,
    { re: new RegExp(`\\b(?:${cppKeywords.join('|')})\\b`, 'g'), cls: 'keyword', priority: 60 },
    { re: new RegExp(`\\b(?:${cppBuiltins.join('|')})\\b`, 'g'), cls: 'built-in', priority: 70 }
  ];
}

/** Resolve language key. */
function normalizeLang(raw) {
  if (!raw) return null;
  const k = String(raw).toLowerCase();
  if (k === 'c++' || k === 'cpp' || k === 'c' || k === 'hpp' || k === 'h' || k === 'cxx') return 'cpp';
  if (k === 'py' || k === 'python') return 'python';
  if (k === 'js' || k === 'javascript') return 'javascript';
  return null;
}

// New helpers for robust extraction and selection
function detectLanguageFromEl(code) {
  const data = code.getAttribute('data-lang');
  if (data) return normalizeLang(data);
  const clsMatch = Array.from(code.classList).map(c => c.toLowerCase()).find(c => c.startsWith('language-'));
  if (clsMatch) return normalizeLang(clsMatch.replace('language-', ''));
  return null;
}

/**
 * Build an escaped text from the code element's DOM so that accidentally
 * parsed HTML tags (e.g., <arduino.h>) become literal text.
 */
function getEscapedFromInnerHTML(codeEl) {
  function walk(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.nodeValue || '';
    }
    if (node.nodeType === Node.ELEMENT_NODE) {
      const tag = node.tagName.toLowerCase();
      if (tag === 'br') return '\n';
      // If element has no textual content, represent as literal <tag>
      const hasText = Array.from(node.childNodes).some(n => (n.nodeType === Node.TEXT_NODE && (n.nodeValue || '').trim() !== ''));
      if (!node.firstChild || !hasText) {
        return `<${tag}>`;
      }
      // Otherwise, concatenate children (ignore the element wrapper itself)
      let s = '';
      node.childNodes.forEach(child => { s += walk(child); });
      return s;
    }
    return '';
  }

  let raw = '';
  codeEl.childNodes.forEach(n => { raw += walk(n); });
  // Normalize non-breaking spaces
  raw = raw.replace(/\u00A0/g, ' ');
  // Escape to safe HTML for injection
  return escapeHtml(raw);
}

class SyntaxHighlighter {
  /** Bootstraps on DOMContentLoaded (script is loaded with defer). */
  constructor() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.init());
    } else {
      this.init();
    }
  }

  /** Highlight all supported code blocks once. */
  init() {
    const nodeListA = document.querySelectorAll('.code-block > code[data-lang]');
    const nodeListB = document.querySelectorAll('pre > code');
    const nodes = Array.from(new Set([ ...nodeListA, ...nodeListB ]));

    nodes.forEach(code => {
      if (code.classList.contains('highlighted')) return; // avoid re-run

      const lang = detectLanguageFromEl(code);
      if (!lang) return;

      // Set language label on closest container (.code-block or pre)
      const parent = code.closest('.code-block, pre');
      if (parent) parent.setAttribute('data-lang', (code.getAttribute('data-lang') || (Array.from(code.classList).find(c => c.startsWith('language-')) || 'text').replace('language-', '')).toLowerCase());

      // Get raw code robustly from innerHTML to survive accidental tags
      const escaped = getEscapedFromInnerHTML(code);

      const specs = getLanguageSpecs(lang);
      const tokens = collectTokens(escaped, specs);
      const html = buildHtmlFromTokens(escaped, tokens);

      code.innerHTML = html;
      code.classList.add('highlighted');
      code.dataset.langResolved = lang;
      // Accessibility: indicate code language
      code.setAttribute('aria-label', `Code block: ${lang}`);
    });
  }
}

// Bootstrap
new SyntaxHighlighter();
