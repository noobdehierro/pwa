//Configurar SW
let swLocation = "sw.js";
// "/beerjs/sw.js";

if (navigator.serviceWorker) {
  if (window.location.href.includes("localhost")) swLocation = "/sw.js"; //Varia según el host
  navigator.serviceWorker.register(swLocation);
}

// //Logic of web app
// console.log("Hello world!!");

// confirmado service worker
// if (navigator.serviceWorker) {
//   navigator.serviceWorker.register("/sw.js");
// }

$(document).ready(function () {
  // Tu código jQuery aquí

  $("#formPWA").submit(function (e) {
    e.preventDefault();
    var name = $("#name").val(),
      email = $("#email").val(),
      phone = $("#phone").val(),
      message = $("#message").val();

    // if ($("#formPWA").valid()) {
    //   $.ajax({
    //     showLoader: true,
    //     type: "post",
    //     url: "http://serverpwa.test/api/pwa",
    //     data: {
    //       name,
    //       email,
    //       phone,
    //       message,
    //     },
    //     success: function (result) {
    //       console.log(result);

    //       if (result.status == "success") {
    //         Swal.fire({
    //           icon: "success",
    //           title: "success...",
    //           text: "se guardo a la bd",
    //         });

    //         $("#name").val("");
    //         $("#email").val("");
    //         $("#phone").val("");
    //         $("#message").val("");
    //       } else {
    //         Swal.fire({
    //           icon: "error",
    //           title: "Oops...",
    //           text: "Something went wrong!",
    //           footer: '<a href="">Why do I have this issue?</a>',
    //         });
    //       }
    //     },
    //     error: function (error) {
    //       console.log(error, "prrasd");
    //     },
    //   }).done(function () {
    //     setTimeout(function () {
    //       $("#overlay").fadeOut(300);
    //     }, 500);
    //   });
    // }

    fetch("http://serverpwa.test/api/pwa", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: $("#name").val(),
        email: $("#email").val(),
        phone: $("#phone").val(),
        message: $("#message").val(),
      }),
    })
      .then(function (response) {
        console.log(response);
        if (response.ok) {
          // La solicitud fue exitosa
          console.log("Solicitud exitosa");
          return response.json();
        } else {
          // La solicitud no fue exitosa
          throw new Error("Error en la solicitud");
        }
      })
      .then(function (result) {
        // Manipular los datos de la respuesta

        if (result.status == "success") {
          Swal.fire({
            icon: "success",
            title: "success...",
            text: "se guardo a la bd",
          });

          $("#name").val("");
          $("#email").val("");
          $("#phone").val("");
          $("#message").val("");
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="">Why do I have this issue?</a>',
          });
        }
      })
      .catch(function (error) {
        // Manejar errores
        console.log("Error:", error);
      });
  });

  $(document).ajaxSend(function () {
    $("#overlay").fadeIn(300);
  });

  $(document).ajaxComplete(function () {
    $("#overlay").fadeOut(300);
  });

  $("#formPWA").validate({
    rules: {
      name: {
        required: true,
        minlength: 2,
      },
      email: {
        required: true,
        email: true,
      },
      phone: {
        required: true,
        minlength: 10,
      },
      message: {
        required: true,
        minlength: 10,
      },
    },
    messages: {
      name: {
        required: "Por favor, ingresa tu nombre",
        minlength: "El nombre debe tener al menos 2 caracteres",
      },
      email: {
        required: "Por favor, ingresa tu correo electrónico",
        email: "Por favor, ingresa un correo electrónico válido",
      },
      phone: {
        required: "Por favor, ingresa tu número de teléfono",
        minlength: "Por favor, El teléfono debe tener  caracteres",
      },
      message: {
        required: "Por favor, ingresa un mensaje",
        minlength: "El mensaje debe tener al menos 10 caracteres",
      },
    },
    errorElement: "em",
    errorPlacement: function (error, element) {
      // Add the `help-block` class to the error element
      error.addClass("help-block");

      if (element.prop("type") === "checkbox") {
        error.insertAfter(element.parent("div").find("label"));
      } else {
        error.insertAfter(element);
      }
    },
    highlight: function (element, errorClass, validClass) {
      $(element)
        .parents(".form-group")
        .addClass("error")
        .removeClass("success");
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element)
        .parents(".form-group")
        .addClass("success")
        .removeClass("error");
    },
  });
});
