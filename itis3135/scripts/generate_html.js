document.addEventListener("DOMContentLoaded", function () {

  var button = document.getElementById("generateHtmlButton");

  button.addEventListener("click", function () {

    var first = getVal("firstName");
    var middle = getVal("middleName");
    var last = getVal("lastName");

    var mi = "";
    if (middle !== "") {
      mi = middle.charAt(0) + ".";
    }

    var mascotAdj = getVal("mascotAdj");
    var mascotAnimal = getVal("mascotAnimal");
    var caption = getVal("caption");

    var imagePath = "images/brian-and-buffy-low-quality.png";
    var fileInput = document.getElementById("introImage");
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      imagePath = "images/" + fileInput.files[0].name;
    }

    var b1 = getVal("b1");
    var b2 = getVal("b2");
    var b3 = getVal("b3");
    var b4 = getVal("b4");
    var b5 = getVal("b5");
    var funny = getVal("funny");

    var coursesHTMLList = buildCoursesList();

    var h3line = first;
    if (mi !== "") {
      h3line = h3line + " " + mi;
    }
    if (last !== "") {
      h3line = h3line + " " + last;
    }
    h3line = h3line + " ★ " + mascotAdj + " " + mascotAnimal;

    var htmlText = "";
    htmlText = htmlText + "<h2>Introduction HTML</h2>\n";
    htmlText = htmlText + "<h3>" + escapeHtml(h3line) +"</h3>\n";
    htmlText = htmlText + "<figure>\n";
    htmlText = htmlText + " <img src=\"" + escapeAttr(imagePath) + "\" alt=\"" + escapeAttr(first + " " + last) + "\" />\n";
    htmlText = htmlText + " <figcaption>" + escapeHtml(caption) + "</figcaption>\n";
    htmlText = htmlText + "</figure>\n";
    htmlText = htmlText + "<ul>\n";
    htmlText = htmlText + " <li><strong>Personal Background:</strong> " + escapeHtml(b1) + "</li>\n";
    htmlText = htmlText + " <li><strong>Professional Background:</strong> " + escapeHtml(b2) + "</li>\n";
    htmlText = htmlText + " <li><strong>Academic Background:</strong> " + escapeHtml(b3) + "</li>\n";
    htmlText = htmlText + " <li><strong>Background in this Subject:</strong> " + escapeHtml(b4) + "</li>\n";
    htmlText = htmlText + " <li><strong>Primary Computer Platform:</strong> " + escapeHtml(b5) + "</li>\n";
    htmlText = htmlText + coursesHTMLList;
    if (funny !== "") {
      htmlText = htmlText + " <li><strong>Funny/Interesting Item to Remember me by:</strong> " + escapeHtml(funny) + "</li>\n";
    }
    htmlText = htmlText + "</ul>\n";

    var main = document.getElementById("main");
    main.innerHTML = "<h2>Introduction HTML</h2>"
      + "<section>" + "  <pre><code class='language-html' id='htmlBlock'></code></pre>" + "  <p><a href='#' id='backToForm'>Reset to Form</a></p>" + "</section>";

    var codeEl = document.getElementById("htmlBlock");
    codeEl.textContent = htmlText;

    if (window.hljs) {
      hljs.highlightAll();
    }

    var back = document.getElementById("backToForm");
    back.addEventListener("click", function (evt) {
      evt.preventDefault();
      window.location.reload();
    });
  });

  function getVal(id) {
    var el = document.getElementById(id);
    if (!el) {
      return "";
    }
    if (el.value) {
      return el.value.trim();
    }
    return "";
  }

  function buildCoursesList() {
    var rows = document.querySelectorAll("#courses .course-row");
    var out = "";
    for (var i = 0; i < rows.length; i++) {
      var inputs = rows[i].getElementsByTagName("input");
      var dept = "";
      var num = "";
      var name = "";
      var reason = "";

      if (inputs[0]) {
        dept = inputs[0].value.trim();
      }

      if (inputs[1]) {
        num = inputs[1].value.trim();
      }

      if (inputs[2]) {
        name = inputs[2].value.trim();
      } 

      if (inputs[3]) {
        reason = inputs[3].value.trim();
      }

      var code = "";
      if (dept !== "") {
        code = dept; 
      }
      if (num !== "") {
        if (code !== "") {
          code = code + " " + num;
        } else {
          code = num;
        }
      }

      var strong = "";
      if (code !== "") {
        strong = "<b>" + escapeHtml(code) + "</b>";
      }

      var dash = "";
      if (name !== "") {
        dash = " - " + escapeHtml(name);
      }

      var why = "";
      if (reason !== "") {
        why = ": " + escapeHtml(reason);
      }

      out = out + "  <li>" + strong + dash + why + "</li>\n";
    }

    if (out !== "") {
      var wrapped = "  <li><strong>Courses I'm Taking & Why:</strong>\n" + " <ul>\n" + out + " </ul>\n" + " </li>\n";
      return wrapped;
    } else {
      return "";
    }
  }

  function escapeHtml(s) {
    var str = String(s);
    str = str.replace(/&/g, "&amp;");
    str = str.replace(/</g, "&lt;");
    str = str.replace(/>/g, "&gt;");
    return str;
  }

  function escapeAttr(s) {
    var str = String(s);
    str = str.replace(/&/g, "&amp;");
    str = str.replace(/"/g, "&quot;");
    str = str.replace(/</g, "&lt;");
    str = str.replace(/>/g, "&gt;");
    return str;
  }
});