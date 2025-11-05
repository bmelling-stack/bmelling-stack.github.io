document.addEventListener("DOMContentLoaded", function () {

  var button = document.getElementById("generateHtmlButton");

  button.addEventListener("click", function () {

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

    var firstName = document.getElementById("firstName").value;
    var middleName = document.getElementById("middleName").value;
    var lastName = document.getElementById("lastName").value;
    var mascotAdj = document.getElementById("mascotAdj").value;
    var mascotAnimal = document.getElementById("mascotAnimal").value;
    var caption = document.getElementById("caption").value;

    var imagePath = "images/brian-and-buffy-low-quality.png";
    var fileInput = document.getElementById("introImage");
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      imagePath = "images/" + fileInput.files[0].name;
    }

    var b1 = document.getElementById("b1").value;
    var b2 = document.getElementById("b2").value;
    var b3 = document.getElementById("b3").value;
    var b4 = document.getElementById("b4").value;
    var b5 = document.getElementById("b5").value;
    var funny = document.getElementById("funny").value;

    var mi = "";
    if (middleName !== "") {
      mi = middleName.charAt(0) + ".";
    }

    var h3line = firstName;
    if (mi !== "") {
      h3line = h3line + " " + mi;
    }
    if (lastName !== "") {
      h3line = h3line + " " + lastName;
    }
    h3line = h3line + " ★ " + mascotAdj + " " + mascotAnimal;

    var coursesHTML = "";
    var courseRows = document.querySelectorAll("#courses .course-row");
    for (var i = 0; i < courseRows.length; i++) {
      var inputs = courseRows[i].getElementsByTagName("input");
      var dept = inputs[0].value.trim();
      var num = inputs[1].value.trim();
      var name = inputs[2].value.trim();
      var reason = inputs[3].value.trim();

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

      coursesHTML = coursesHTML + " <li>" + strong + dash + why + "</li>\n";
    }

    if (coursesHTML !== "") {
      coursesHTML = " <li><strong>Courses I'm Taking & Why:</strong>\n" + " <ul>\n" + coursesHTML + " </ul>\n" + " </li>\n";
    }

    var htmlText = "";
    htmlText = htmlText + "<h2>Introduction HTML</h2>\n";
    htmlText = htmlText + "<h3>" + escapeHtml(h3line) + "</h3>\n";
    htmlText = htmlText + "<figure>\n";
    htmlText = htmlText + "<img src=\"" + escapeAttr(imagePath) + "\" alt=\"" + escapeAttr(firstName + " " + lastName) + "\" />\n";
    htmlText = htmlText + "<figcaption>" + escapeHtml(caption) + "</figcaption>\n";
    htmlText = htmlText + "</figure>\n";
    htmlText = htmlText + "<ul>\n";
    htmlText = htmlText + "<li><strong>Personal Background:</strong> " + escapeHtml(b1) + "</li>\n";
    htmlText = htmlText + "<li><strong>Professional Background:</strong> " + escapeHtml(b2) + "</li>\n";
    htmlText = htmlText + "<li><strong>Academic Background:</strong> " + escapeHtml(b3) + "</li>\n";
    htmlText = htmlText + "<li><strong>Background in this Subject:</strong> " + escapeHtml(b4) + "</li>\n";
    htmlText = htmlText + "<li><strong>Primary Computer Platform:</strong> " + escapeHtml(b5) + "</li>\n";
    htmlText = htmlText + coursesHTML;
    if (funny !== "") {
      htmlText = htmlText + "<li><strong>Funny/Interesting Item to Remember me by:</strong> " + escapeHtml(funny) + "</li>\n";
    }
    htmlText = htmlText + "</ul>\n";

    var main = document.getElementById("main");
    main.innerHTML = "<h2>Introduction HTML</h2>" + "<section>" + " <pre><code class='language-html' id='htmlBlock'></code></pre>" + " <p><a href='#' id='backLink'>Reset to Form</a></p>" + "</section>";

    var codeBlock = document.getElementById("htmlBlock");
    codeBlock.textContent = htmlText;

    if (window.hljs) {
      hljs.highlightAll();
    }

    var backLink = document.getElementById("backLink");
    backLink.addEventListener("click", function (event) {
      event.preventDefault();
      window.location.reload();
    });
  });
});