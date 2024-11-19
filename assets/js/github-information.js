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

}