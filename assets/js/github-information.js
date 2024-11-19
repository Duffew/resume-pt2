function userInformationHTML(user) {
    return `
    <h2>${user.name}
        <span class="small-name">
            (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
        </span>
    </h2>
    <div class="gh-content"
        <div class="gh-avatar">
            <a href="${user.html_url}" target="_blank">
            <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}" />
            </a>
        </div>
        <p>Followers: ${user.followers} - Following ${user.following} <br> Repos: ${user.public_repos}</p>
    </div>`;
}

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
    $.when(
        $.getJSON(`https://api.github.com/users/${username}`),
        // add a new getJSON() method call to request repo data
        $.getJSON(`https://api.github.com/users/${username}/repos`)
    ).then(
        // then run this function to display the GitHub response(s)
        // when we now make two calls, the reponses are sorted into arrays and each
        // response is the first element in those arrays
        function (fisrtResponse, secondResponse) {
            var userData = fisrtResponse[0];
            var repoData = secondResponse[0];
            $("#gh-user-data").html(userInformationHTML(userData));
            $("#gh-repo-data").html(repoInformationHTML(repoData));
            // in case of 400 error run this function
        }, function (errorResponse) {
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