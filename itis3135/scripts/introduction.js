function loadImage() {
  const file = document.getElementById("introImage").files[0];
  const container = document.getElementById("loadImage");
  container.innerHTML = "";

  const img = document.createElement("img");
  img.className = "intro-photo";
  img.alt = "Introduction photo";

  if (file) {
    img.src = URL.createObjectURL(file);
  } else {
    img.src = "images/brian-and-buffy-low-quality.png";
  }
  container.appendChild(img);
}

var form = document.getElementById("introForm");
var coursesWrap = document.getElementById("courses");

document.getElementById("addCourse").addEventListener("click", function () {
  var row = document.createElement("div");
  row.className = "course-row";
  row.innerHTML = '' + '<input type="text" placeholder="Dept">' + '<input type="text" placeholder="Number">' + '<input type="text" placeholder="Course name">' + '<input type="text" placeholder="Reason">' + '<button type="button" class="deleteCourse">Delete</button>';
  coursesWrap.appendChild(row);
});

coursesWrap.addEventListener("click", function (e) {
  if (e.target.classList.contains("deleteCourse")) {
    var row = e.target.closest(".course-row");
    if (row) {
      row.remove();
    } 
  }
});
 
document.getElementById("clearBtn").addEventListener("click", function () {
  var inputs = form.querySelectorAll("input, textarea");
  inputs.forEach(function (el) {
    el.value = "";
  });
  document.getElementById("loadImage").innerHTML = "";
});

function buildCoursesList() {
  var rows = Array.from(document.querySelectorAll("#courses .course-row"));
  if (!rows.length) {
    return "";
  }

  var items = rows.map(function (row) {
    var fields = Array.from(row.querySelectorAll("input")).map(function (i) {
      return i.value.trim();
    });
    var dept = fields[0];
    var num = fields[1];
    var name = fields[2];
    var reason = fields[3];

    var code = "";
    if (dept) {
      code = dept;
    }
    if (num) {
      code = code + " " + num;
    }

    var strong = "";
    if (code) {
      strong = "<b>" + code + "</b>";
    }

    var dash = "";
    if (name) {
      dash = " - " + name;
    }

    var why = "";
    if (reason) {
      why = ": " + reason;
    }
 
    return "<li>" + strong + dash + why + "</li>";
  }).join("");

  return '' + '<li><b>Courses I\'m Taking & Why: </b>' + '  <ul>' + items + '  </ul>' + '</li>';
}
form.addEventListener("submit", function (e) {
  e.preventDefault();

  var first = document.getElementById("firstName").value.trim();
  var last  = document.getElementById("lastName").value.trim();
  var b1 = document.getElementById("b1").value.trim();
  var b2 = document.getElementById("b2").value.trim();
  var b3 = document.getElementById("b3").value.trim();
  var b4 = document.getElementById("b4").value.trim();
  var b5 = document.getElementById("b5").value.trim();
  var funny = (document.getElementById("funny").value || "").trim();
  var caption = (document.getElementById("caption").value || "Photo").trim();
  var fileInput = document.getElementById("introImage");
  var imgSrc = "images/brian-and-buffy-low-quality.png";
  if (fileInput.files && fileInput.files[0]) {
    imgSrc = URL.createObjectURL(fileInput.files[0]);
  } 
  var coursesHTML = buildCoursesList();

  var ulHTML = "" 
    + "<li><b>Personal Background: </b>" + b1 + "</li>" + "<li><b>Professional Background: </b>" + b2 + "</li>" + "<li><b>Academic Background: </b>" + b3 + "</li>"
    + "<li><b>Background in this Subject: </b>" + b4 + "</li>" + "<li><b>Primary Computer Platform: </b>" + b5 + "</li>" + coursesHTML + (funny ? "<li><b>Funny/Interesting Item to Remember me by: </b>" + funny + "</li>" : "");

  var main = document.getElementById("main");
  main.innerHTML = ""
    + "<h2>Introduction Form</h2>" + "<h2>" + first + " " + last + ": Introduction</h2>" + "<figure>" + "<img class=\"intro-photo\" src=\"" + imgSrc + "\" alt=\"" + first + " " + last + "\">"
    + "<figcaption>" + caption + "</figcaption>" +"</figure>" + "<ul>" + ulHTML +"</ul>" + "<p><a href=\"#\" id=\"startOver\">Reset to Form</a></p>";

  document.getElementById("startOver").addEventListener("click", function (evt) {
    evt.preventDefault();
    window.location.reload();
  });
});