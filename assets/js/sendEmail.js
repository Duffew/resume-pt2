function sendEmail(contactForm) {
    emailjs.send("service_1deey6f","template_slwyad7", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.emailaddress.value,
        "project_request": contactForm.projectsummary.value
    })
    // create a promise for the send function
    .then(
        // if the function is a success
        function (response) {
            // log the message ""success" and pass in the response message
            console.log("SUCCESS", response)
        },
        // if there is an error
        function(error) {
            console.log("FAILED", error);
        });

}