// define the fetchGitHubInformation() with an 'event' argument
function fetchGitHubInformation(event) {
    // define a username variable that selects the username typed in the text field
    var username = $("#gh-username").val();
    // define what happens if a username is not entered
    if (!username) {
        $("#gh-user-data").html(`<h2>Please enter a GitHub username</h2>`);
        return;
    }

    // add a loading image while data is being accessed
    $("#gh-user-data").html(
        `<div id="loader">
            <img src="assets/css/loader.gif" alt="loading..." />
        </div>`);

    // create a promise
    // when this username is requested...
    $when(
        $.getJSON(`https://api.github.com/users/${username}`)
    ).then(
        // run this function to display the GitHub response
        function(response) {
            var userData = response;
            $("#gh-user-data").html(userInformationHTML(userData));
            // in case of 400 error run this function
        }, function(errorResponse) {
            if (errorResponse.status === 400) {
                $("#gh-user-data").html(
                    `<h2>User ${username} not found</h2>`);
            // if not 400 error, display JSON error message in the console
            } else {
                console.log(errorResponse);
                $("#gh-user-data").html(
                    `<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
            }
        });

}