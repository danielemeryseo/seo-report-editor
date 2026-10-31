/* seo-report editor 8.8.0
   Hosted bundle for the seo-report skill's chat widget. The widget shell sets
   window.SER = { md, project, draft } and loads this file; the editor mounts
   itself into #ser-root. Preview renders with marked, loaded on demand from
   cdnjs, and shows the Markdown as plain text until it arrives. */
(function () {
  var VERSION = "8.8.0";
  var MARKED_SRC = "https://cdnjs.cloudflare.com/ajax/libs/marked/12.0.2/marked.min.js";
  var CSS = ".ser{font-family:system-ui,-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,sans-serif;-webkit-font-smoothing:antialiased}.ser button{font-family:inherit}.ser-bar{display:flex;align-items:center;gap:8px;flex-wrap:wrap;padding:0 0 12px;border-bottom:0.5px solid var(--border);margin:0 0 1rem}.ser-bar button{font-size:14px}.ser-bar button:disabled{opacity:0.5;cursor:default}.ser-bar-bottom{padding:12px 0 0;border-bottom:0;border-top:0.5px solid var(--border);margin:1rem 0 0}.ser-link{display:inline-flex;align-items:center;font-size:14px;padding:6px 12px;border:0.5px solid var(--border-strong);border-radius:var(--radius);color:var(--text-primary);text-decoration:none}.ser-link:hover{background:var(--surface-1)}.ser-bar button[aria-pressed=\"true\"]{background:var(--fill-ghost-selected);border-color:var(--border-strong);color:var(--text-primary)}.ser-draft{font-size:13px;color:var(--text-secondary)}.ser-status{font-size:13px;color:var(--text-secondary);margin-left:auto;min-height:1em}.ser-status.ser-warn{color:var(--text-warning)}.ser-doc{position:relative}.ser-preview{font-size:15px;line-height:1.5;color:var(--text-primary)}.ser-preview h1{font-size:22px;font-weight:500;line-height:1;margin:0 0 1rem}.ser-preview h2{font-size:20px;font-weight:500;line-height:1;margin:1.75rem 0 0.5rem;padding-bottom:6px;border-bottom:0.5px solid var(--border)}.ser-preview h3{font-size:16px;font-weight:500;line-height:1;margin:1.25rem 0 0.5rem}.ser-preview p{margin:0.6rem 0}.ser-preview ul,.ser-preview ol{margin:0.5rem 0 1rem;padding-left:1.5rem}.ser-preview li{margin:4px 0}.ser-preview strong{font-weight:500}.ser-preview a{color:var(--text-accent)}.ser-preview code{font-family:var(--font-mono);font-size:14px;background:var(--surface-1);padding:1px 5px;border-radius:var(--radius)}.ser-preview pre{background:var(--surface-1);padding:12px;border-radius:var(--radius);overflow-x:auto}.ser-preview pre code{background:none;padding:0}.ser-preview blockquote{margin:0.75rem 0;padding-left:12px;border-left:2px solid var(--border-strong);border-radius:0;color:var(--text-secondary)}.ser-preview hr{border:0;border-top:0.5px solid var(--border);margin:1.5rem 0}.ser-preview table{border-collapse:collapse;width:100%;font-size:14px}.ser-preview th,.ser-preview td{border:0.5px solid var(--border);padding:6px 10px;text-align:left}.ser-preview mark.ser-mark{background:var(--fill-ghost-selected);color:inherit;border-bottom:2px solid var(--text-warning);border-radius:0;padding:0;cursor:pointer}.ser-preview mark.ser-mark[data-n]::after{content:attr(data-n);font-size:11px;font-weight:500;vertical-align:super;margin-left:2px;color:var(--text-warning)}.ser-source[hidden],.ser-preview[hidden],.ser-chip[hidden],.ser-pop[hidden],.ser-comments[hidden]{display:none}.ser-source{display:block;width:100%;box-sizing:border-box;min-height:240px;resize:none;overflow:hidden;font-family:var(--font-mono);font-size:14px;line-height:1.6;color:var(--text-primary);background:var(--surface-2);border:0.5px solid var(--border);border-radius:var(--radius);padding:12px 14px}.ser-chip{position:absolute;z-index:2;font-size:13px;padding:4px 10px;background:#30363a;}.ser-chip,.ser-chip:hover{background:var(--bg-accent);color:var(--text-accent);border-color:var(--border-accent)}.ser-pop{position:absolute;z-index:3;width:min(320px,100%);box-sizing:border-box;padding:10px;font-size:15px;line-height:1.5;background:var(--surface-2);border:0.5px solid var(--border-strong);border-radius:var(--radius)}.ser-pop-quote{color:var(--text-secondary);margin:0 0 8px;max-height:3em;overflow:hidden}.ser-pop textarea{display:block;width:100%;box-sizing:border-box;min-height:85px;font-family:inherit;font-size:15px;line-height:1.15;color:var(--text-primary);background:var(--surface-1);border:0.5px solid var(--border);border-radius:var(--radius);padding:8px;resize:vertical}.ser-pop-actions{display:flex;gap:8px;justify-content:flex-end;margin-top:8px}.ser-pop-actions button{font-size:15px}.ser-comments{font-size:15px;line-height:1.5;margin:0 0 1rem;padding:10px 12px;border:0.5px solid var(--border);border-radius:var(--radius);background:var(--surface-1)}.ser-comments-head{font-weight:500;margin:0 0 6px}.ser-comments ol{margin:0;padding-left:1.25rem}.ser-comments li{margin:6px 0}.ser-c-meta{font-size:13px;color:var(--text-secondary)}.ser-c-note{white-space:pre-wrap}.ser-c-remove{font-size:12px;padding:1px 8px;margin-left:6px}";
  var MARKUP = "<div class=\"ser\"><div class=\"ser-bar\" role=\"toolbar\" aria-label=\"Report editor\"><button type=\"button\" data-ser=\"preview\" aria-pressed=\"true\">Preview</button><button type=\"button\" data-ser=\"markdown\" aria-pressed=\"false\">Markdown</button><button type=\"button\" data-ser=\"copy\"><i class=\"ti ti-copy\" aria-hidden=\"true\" style=\"font-size:16px;vertical-align:-2px;margin-right:6px\"></i>Copy Markdown</button><button type=\"button\" data-ser=\"send\" disabled><i class=\"ti ti-message-forward\" aria-hidden=\"true\" style=\"font-size:16px;vertical-align:-2px;margin-right:6px\"></i><span class=\"ser-send-label\">Send comments</span></button><a class=\"ser-link\" href=\"https://ad.optimising.cloud/ui/projects/__PROJECT_ID__?tab=tasks&amp;task_type=report#new-task-modal\"><i class=\"ti ti-external-link\" aria-hidden=\"true\" style=\"font-size:16px;margin-right:6px\"></i>New Report</a><span class=\"ser-draft\"></span><span class=\"ser-status\" role=\"status\" aria-live=\"polite\"></span></div><div class=\"ser-comments\" id=\"ser-comments\" hidden><p class=\"ser-comments-head\"></p><ol id=\"ser-comment-list\"></ol></div><div class=\"ser-doc\" id=\"ser-doc\"><div class=\"ser-preview\" id=\"ser-preview\"></div><textarea class=\"ser-source\" id=\"ser-source\" aria-label=\"Report Markdown\" spellcheck=\"false\" hidden></textarea><button type=\"button\" class=\"ser-chip\" id=\"ser-chip\" hidden><i class=\"ti ti-message-plus\" aria-hidden=\"true\" style=\"font-size:14px;vertical-align:-2px;margin-right:4px\"></i>Comment</button><div class=\"ser-pop\" id=\"ser-pop\" role=\"dialog\" aria-label=\"Add a comment\" hidden><p class=\"ser-pop-quote\" id=\"ser-pop-quote\"></p><textarea id=\"ser-pop-text\" aria-label=\"Comment\" placeholder=\"What should change? Cmd+Enter to save\"></textarea><div class=\"ser-pop-actions\"><button type=\"button\" id=\"ser-pop-cancel\">Cancel</button><button type=\"button\" id=\"ser-pop-save\">Save comment</button></div></div></div><div class=\"ser-bar ser-bar-bottom\" role=\"toolbar\" aria-label=\"Report editor, bottom\"><button type=\"button\" data-ser=\"preview\" aria-pressed=\"true\">Preview</button><button type=\"button\" data-ser=\"markdown\" aria-pressed=\"false\">Markdown</button><button type=\"button\" data-ser=\"copy\"><i class=\"ti ti-copy\" aria-hidden=\"true\" style=\"font-size:16px;vertical-align:-2px;margin-right:6px\"></i>Copy Markdown</button><button type=\"button\" data-ser=\"send\" disabled><i class=\"ti ti-message-forward\" aria-hidden=\"true\" style=\"font-size:16px;vertical-align:-2px;margin-right:6px\"></i><span class=\"ser-send-label\">Send comments</span></button><a class=\"ser-link\" href=\"https://ad.optimising.cloud/ui/projects/__PROJECT_ID__?tab=tasks&amp;task_type=report#new-task-modal\"><i class=\"ti ti-external-link\" aria-hidden=\"true\" style=\"font-size:16px;margin-right:6px\"></i>New Report</a><span class=\"ser-status\" role=\"status\" aria-live=\"polite\"></span></div></div>";

  function loadMarked(done) {
    if (window.marked && typeof window.marked.parse === "function") { done(); return; }
    var s = document.createElement("script");
    s.src = MARKED_SRC;
    s.async = true;
    s.onload = done;
    document.head.appendChild(s);
  }

  function mount(cfg) {
    cfg = cfg || {};
    var root = document.getElementById(cfg.root || "ser-root");
    if (!root) return;
    if (!document.getElementById("ser-style")) {
      var st = document.createElement("style");
      st.id = "ser-style";
      st.textContent = CSS;
      document.head.appendChild(st);
    }
    var projectId = String(cfg.project == null ? "" : cfg.project).replace(/\D/g, "");
    root.innerHTML = MARKUP.replace(/__PROJECT_ID__/g, projectId);

    var SOURCE = String(cfg.md == null ? "" : cfg.md);
    var DRAFT = Number(cfg.draft) || 1;
    var doc = document.getElementById("ser-doc");
    var preview = document.getElementById("ser-preview");
    var source = document.getElementById("ser-source");
    var chip = document.getElementById("ser-chip");
    var pop = document.getElementById("ser-pop");
    var popQuote = document.getElementById("ser-pop-quote");
    var popText = document.getElementById("ser-pop-text");
    var panel = document.getElementById("ser-comments");
    var panelHead = panel.querySelector(".ser-comments-head");
    var list = document.getElementById("ser-comment-list");
    var btnsPreview = document.querySelectorAll('[data-ser="preview"]');
    var btnsMarkdown = document.querySelectorAll('[data-ser="markdown"]');
    var btnsCopy = document.querySelectorAll('[data-ser="copy"]');
    var btnsSend = document.querySelectorAll('[data-ser="send"]');
    var statuses = document.querySelectorAll(".ser-status");
    var statusTimer = null;
    var comments = [];
    var pending = null;

    function each(list, fn) {
      for (var i = 0; i < list.length; i++) fn(list[i], i);
    }

    function setPressed(previewOn) {
      each(btnsPreview, function (b) { b.setAttribute("aria-pressed", previewOn ? "true" : "false"); });
      each(btnsMarkdown, function (b) { b.setAttribute("aria-pressed", previewOn ? "false" : "true"); });
    }

    function escapeHtml(text) {
      return text.replace(/&/g, "&amp;").replace(/</g, "&lt;");
    }

    function render() {
      var md = source.value;
      if (window.marked && typeof window.marked.parse === "function") {
        preview.innerHTML = window.marked.parse(escapeHtml(md), { gfm: true, breaks: false });
      } else {
        var pre = document.createElement("pre");
        pre.style.whiteSpace = "pre-wrap";
        pre.textContent = md;
        preview.innerHTML = "";
        preview.appendChild(pre);
      }
      markAll();
    }

    function fitTextarea() {
      source.style.height = "auto";
      source.style.height = (source.scrollHeight + 2) + "px";
    }

    function setStatus(status, text, warn) {
      each(statuses, function (s) { s.textContent = ""; s.className = "ser-status"; });
      status.textContent = text;
      status.className = "ser-status" + (warn ? " ser-warn" : "");
      if (statusTimer) { clearTimeout(statusTimer); statusTimer = null; }
      if (text && !warn) {
        statusTimer = setTimeout(function () { status.textContent = ""; }, 2500);
      }
    }

    function showPreview() {
      render();
      preview.hidden = false;
      source.hidden = true;
      setPressed(true);
    }

    function showMarkdown() {
      hideCommentUi();
      preview.hidden = true;
      source.hidden = false;
      setPressed(false);
      fitTextarea();
    }

    function selectAllSource() {
      showMarkdown();
      source.focus();
      source.setSelectionRange(0, source.value.length);
    }

    function copyViaExecCommand(text) {
      var temp = document.createElement("textarea");
      temp.value = text;
      temp.setAttribute("readonly", "");
      temp.style.position = "absolute";
      temp.style.left = "-9999px";
      temp.style.top = "0";
      document.body.appendChild(temp);
      temp.select();
      temp.setSelectionRange(0, text.length);
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
      document.body.removeChild(temp);
      return ok;
    }

    function copyText(text, onCopied, onBlocked) {
      var fallback = function () {
        if (copyViaExecCommand(text)) onCopied(); else onBlocked();
      };
      if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        var p;
        try { p = navigator.clipboard.writeText(text); } catch (e) { p = Promise.reject(e); }
        Promise.resolve(p).then(onCopied, fallback);
      } else {
        fallback();
      }
    }

    function copyMarkdown(event) {
      var status = event.currentTarget.parentNode.querySelector(".ser-status");
      copyText(source.value,
        function () { setStatus(status, "Copied", false); },
        function () {
          selectAllSource();
          setStatus(status, "Copy blocked here. Text is selected, press Cmd+C", true);
        });
    }

    // ------------------------------------------------------------ comments

    function squash(text) {
      return text.replace(/\s+/g, " ").trim();
    }

    // Text nodes of the preview flattened to one whitespace-collapsed string,
    // with a map from each character back to its node and offset.
    function textIndex() {
      var walker = document.createTreeWalker(preview, NodeFilter.SHOW_TEXT, null);
      var text = "";
      var map = [];
      var lastSpace = true;
      var node;
      while ((node = walker.nextNode())) {
        for (var i = 0; i < node.data.length; i++) {
          var ch = node.data.charAt(i);
          if (/\s/.test(ch)) {
            if (lastSpace) continue;
            ch = " ";
            lastSpace = true;
          } else {
            lastSpace = false;
          }
          text += ch;
          map.push({ node: node, offset: i });
        }
      }
      return { text: text, map: map };
    }

    function markComment(c, index) {
      var idx = textIndex();
      var at = idx.text.indexOf(c.quote);
      if (at < 0) return false;
      var start = idx.map[at];
      var end = idx.map[at + c.quote.length - 1];
      var nodes = [];
      var walker = document.createTreeWalker(preview, NodeFilter.SHOW_TEXT, null);
      var node, inside = false;
      while ((node = walker.nextNode())) {
        if (node === start.node) inside = true;
        if (inside) nodes.push(node);
        if (node === end.node) break;
      }
      var marks = [];
      each(nodes, function (n) {
        var from = n === start.node ? start.offset : 0;
        var to = n === end.node ? end.offset + 1 : n.data.length;
        if (to <= from || !n.data.slice(from, to).trim()) return;
        var target = n;
        if (to < target.data.length) target.splitText(to);
        if (from > 0) target = target.splitText(from);
        var mark = document.createElement("mark");
        mark.className = "ser-mark";
        mark.setAttribute("data-c", String(index));
        target.parentNode.insertBefore(mark, target);
        mark.appendChild(target);
        marks.push(mark);
      });
      if (marks.length) marks[marks.length - 1].setAttribute("data-n", String(index + 1));
      return marks.length > 0;
    }

    function markAll() {
      each(comments, markComment);
    }

    function sectionOf(range) {
      var el = range.startContainer;
      while (el && el.parentNode !== preview) el = el.parentNode;
      var h2 = "", h3 = "";
      for (var n = el; n; n = n.previousElementSibling) {
        if (!h3 && n.tagName === "H3") h3 = squash(n.textContent);
        if (n.tagName === "H2") { h2 = squash(n.textContent); break; }
      }
      return h3 ? h2 + " > " + h3 : (h2 || "Top of report");
    }

    function hideCommentUi() {
      chip.hidden = true;
      pop.hidden = true;
      pending = null;
    }

    function place(el, rect) {
      var box = doc.getBoundingClientRect();
      var left = Math.max(0, Math.min(rect.left - box.left, box.width - el.offsetWidth));
      el.style.left = left + "px";
      el.style.top = (rect.bottom - box.top + 6) + "px";
    }

    // Widen a selection that starts or ends mid-word to the whole word.
    function snapToWords(range) {
      var s = range.startContainer, e = range.endContainer;
      if (s.nodeType === 3) {
        var a = range.startOffset;
        while (a > 0 && /\w/.test(s.data.charAt(a - 1))) a--;
        range.setStart(s, a);
      }
      if (e.nodeType === 3) {
        var b = range.endOffset;
        while (b < e.data.length && /\w/.test(e.data.charAt(b))) b++;
        range.setEnd(e, b);
      }
    }

    function onSelect() {
      if (!pop.hidden) return;
      var sel = window.getSelection();
      if (!sel || sel.isCollapsed || !sel.rangeCount) { chip.hidden = true; return; }
      var range = sel.getRangeAt(0);
      if (!preview.contains(range.commonAncestorContainer)) { chip.hidden = true; return; }
      snapToWords(range);
      sel.removeAllRanges();
      sel.addRange(range);
      var quote = squash(sel.toString());
      if (!quote) { chip.hidden = true; return; }
      pending = { quote: quote, section: sectionOf(range), rect: range.getBoundingClientRect() };
      chip.hidden = false;
      place(chip, pending.rect);
    }

    function openPop() {
      if (!pending) return;
      chip.hidden = true;
      popQuote.textContent = "“" + pending.quote + "”";
      popText.value = "";
      pop.hidden = false;
      place(pop, pending.rect);
      popText.focus();
    }

    function saveComment() {
      var note = popText.value.trim();
      if (!pending || !note) { popText.focus(); return; }
      comments.push({ quote: pending.quote, section: pending.section, note: note });
      hideCommentUi();
      window.getSelection().removeAllRanges();
      refresh();
    }

    function removeComment(i) {
      comments.splice(i, 1);
      refresh();
    }

    function refresh() {
      render();
      list.innerHTML = "";
      each(comments, function (c, i) {
        var li = document.createElement("li");
        var meta = document.createElement("div");
        meta.className = "ser-c-meta";
        var q = c.quote.length > 90 ? c.quote.slice(0, 87) + "..." : c.quote;
        meta.textContent = c.section + ": “" + q + "”";
        var rm = document.createElement("button");
        rm.type = "button";
        rm.className = "ser-c-remove";
        rm.textContent = "Remove";
        rm.addEventListener("click", function () { removeComment(i); });
        meta.appendChild(rm);
        var note = document.createElement("div");
        note.className = "ser-c-note";
        note.textContent = c.note;
        li.appendChild(meta);
        li.appendChild(note);
        list.appendChild(li);
      });
      var n = comments.length;
      panel.hidden = n === 0;
      panelHead.textContent = n === 1 ? "1 comment" : n + " comments";
      each(btnsSend, function (b) {
        b.disabled = n === 0;
        b.querySelector(".ser-send-label").textContent = n ? "Send " + panelHead.textContent : "Send comments";
      });
    }

    function buildMessage() {
      var lines = ["[seo-report:comments] Draft " + DRAFT + ", " + panelHead.textContent, ""];
      each(comments, function (c, i) {
        lines.push((i + 1) + ". Section: " + c.section);
        lines.push("Text: \"" + c.quote + "\"");
        lines.push("Comment: " + c.note);
        lines.push("");
      });
      if (source.value !== SOURCE) {
        lines.push("The Markdown was also edited in the widget. Edited report:");
        lines.push("```markdown", source.value, "```");
      }
      return lines.join("\n").trim();
    }

    function sendComments(event) {
      var status = event.currentTarget.parentNode.querySelector(".ser-status");
      if (!comments.length) return;
      var message = buildMessage();
      var done = function (text, warn) {
        comments = [];
        refresh();
        setStatus(status, text, warn);
      };
      if (typeof window.sendPrompt === "function") {
        window.sendPrompt(message);
        done("Sent to Claude", false);
      } else {
        copyText(message,
          function () { done("Comments copied. Paste them into the chat", true); },
          function () { setStatus(status, "Could not send or copy the comments here", true); });
      }
    }

    chip.addEventListener("mousedown", function (e) { e.preventDefault(); });
    chip.addEventListener("click", openPop);
    document.getElementById("ser-pop-save").addEventListener("click", saveComment);
    document.getElementById("ser-pop-cancel").addEventListener("click", hideCommentUi);
    popText.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); saveComment(); }
      if (e.key === "Escape") hideCommentUi();
    });
    preview.addEventListener("mouseup", function () { setTimeout(onSelect, 0); });
    preview.addEventListener("keyup", function () { setTimeout(onSelect, 0); });
    preview.addEventListener("click", function (e) {
      var mark = e.target.closest && e.target.closest("mark.ser-mark");
      if (!mark || !window.getSelection().isCollapsed) return;
      var item = list.children[Number(mark.getAttribute("data-c"))];
      if (item) item.scrollIntoView({ block: "nearest", behavior: "smooth" });
    });
    document.addEventListener("mousedown", function (e) {
      if (!chip.hidden && !chip.contains(e.target) && !preview.contains(e.target)) chip.hidden = true;
    });

    document.querySelector(".ser-draft").textContent = "Draft " + DRAFT;
    source.value = SOURCE;
    source.addEventListener("input", fitTextarea);
    each(btnsPreview, function (b) { b.addEventListener("click", showPreview); });
    each(btnsMarkdown, function (b) { b.addEventListener("click", showMarkdown); });
    each(btnsCopy, function (b) { b.addEventListener("click", copyMarkdown); });
    each(btnsSend, function (b) { b.addEventListener("click", sendComments); });
    showPreview();

    loadMarked(function () { if (!preview.hidden) render(); });
  }

  window.SER_EDITOR = { mount: mount, version: VERSION };
  if (window.SER) mount(window.SER);
})();
