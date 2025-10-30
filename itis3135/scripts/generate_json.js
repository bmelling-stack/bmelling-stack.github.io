document.addEventListener("DOMContentLoaded", function () {

  var button = document.getElementById("generateJsonButton");

  button.addEventListener("click", function () {
 
    var firstName = document.getElementById("firstName").value;
    var middleName = document.getElementById("middleName").value;
    var lastName = document.getElementById("lastName").value;
    var divider = document.getElementById("divider").value;
    var mascotAdj = document.getElementById("mascotAdj").value;
    var mascotAnimal = document.getElementById("mascotAnimal").value;
    var caption = document.getElementById("caption").value;
    var fileInput = document.getElementById("introImage");
    var imagePath = "images/brian-and-buffy-low-quality.png";
    if (fileInput.files.length > 0) {
      imagePath = "images/" + fileInput.files[0].name;
    }

    var b1 = document.getElementById("b1").value;
    var b2 = document.getElementById("b2").value;
    var b3 = document.getElementById("b3").value; 
    var b4 = document.getElementById("b4").value;
    var b5 = document.getElementById("b5").value;

    var courses = [];
    var courseRows = document.querySelectorAll("#courses .course-row");
    for (var i = 0; i < courseRows.length; i++) {
      var inputs = courseRows[i].getElementsByTagName("input");
      var course = {
        "department": inputs[0].value, 
        "number": inputs[1].value, 
        "name": inputs[2].value, 
        "reason": inputs[3].value
      };
      courses.push(course);
    }

    var links = [];
    for (var j = 1; j <= 5; j++) {
      var linkValue = document.getElementById("link" + j).value;
      if (linkValue !== "") {
        links.push({
          "name": "Link " + j, 
          "href": linkValue
        });
      }
    }

    // JSON objects
    var data = {
      "firstName": firstName,
      "preferredName": firstName,
      "middleInitial": middleName.charAt(0),
      "lastName": lastName,
      "divider": divider,
      "mascotAdjective": mascotAdj,
      "mascotAnimal": mascotAnimal,
      "image": imagePath,
      "imageCaption": caption,
      "personalStatement": "",
      "personalBackground": b1,
      "professionalBackground": b2,
      "academicBackground": b3, 
      "subjectBackground": b4,
      "primaryComputer": b5,
      "courses": courses,
      "links": links
    };

    var jsonText = JSON.stringify(data, null, 2);

    var main = document.getElementById("main");
    main.innerHTML = "" + "<h2>Introduction HTML</h2>" + "<pre><code class='language-json' id='jsonBlock'></code></pre>" + "<p><a href='#' id='backLink'>Reset to Form</a></p>";

    var codeBlock = document.getElementById("jsonBlock");
    codeBlock.textContent = jsonText;

    if (window.hljs) {
      hljs.highlightElement(codeBlock);
    }

    var backLink = document.getElementById("backLink");
    backLink.addEventListener("click", function (event) {
      event.preventDefault();
      window.location.reload();
    });
  });
});
