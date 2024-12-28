document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.getElementById("search-btn");
    const usernameInput = document.getElementById("user-input");

    const easyProgressCircle = document.querySelector(".progress-easy");
    const mediumProgressCircle = document.querySelector(".progress-medium");
    const hardProgressCircle = document.querySelector(".progress-hard");

    const easyLabel = document.getElementById("easy-lable");
    const mediumLabel = document.getElementById("medium-lable");
    const hardLabel = document.getElementById("hard-lable");

    // Function to validate username
    function validateUsername(username) {
        if (username.trim() === "") {
            alert("Username should not be empty");
            return false;
        }
        const regex = /^[a-zA-Z][a-zA-Z0-9_]{4,19}$/;
        const isMatching = regex.test(username);
        if (!isMatching) {
            alert("Invalid username");
        }
        return isMatching;
    }

    // Function to fetch user details from the API
    async function fetchUserDetails(username) {
        const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
        
        try {
            // Disable button and change text to 'Searching...'
            searchButton.textContent = 'Searching...';
            searchButton.disabled = true;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Unable to fetch user details");
            }

            const data = await response.json();
            console.log("logging data:", data);

            // Calculate the progress for each category (easy, medium, hard)
            const easy = data.totalEasy ? (data.easySolved / data.totalEasy) * 100 : 0;
            const medium = data.totalMedium ? (data.mediumSolved / data.totalMedium) * 100 : 0;
            const hard = data.totalHard ? (data.hardSolved / data.totalHard) * 100 : 0;

            // Update the progress circle background using conic-gradient
            easyProgressCircle.style.background = `conic-gradient(rgb(60, 158, 60) ${easy}%, rgb(37, 65, 37) 0%)`;
            mediumProgressCircle.style.background = `conic-gradient(rgb(60, 158, 60) ${medium}%, rgb(37, 65, 37) 0%)`;
            hardProgressCircle.style.background = `conic-gradient(rgb(60, 158, 60) ${hard}%, rgb(37, 65, 37) 0%)`;

            // Create a new <span> element for the percentage
            const easyPercentage = document.createElement('span');
            easyPercentage.textContent = `${easy.toFixed(2)}%`;  // Showing percentage with 2 decimal places
            easyPercentage.style.display = 'block';
            easyLabel.appendChild(easyPercentage);  // Append the new element to the easyLabel

            document.querySelector(".easy-block").textContent=`${data.easySolved}/${data.totalEasy}`;
            document.querySelector(".medium-block").textContent=`${data.mediumSolved}/${data.totalMedium}`;
            document.querySelector(".hard-block").textContent=`${data.hardSolved}/${data.totalHard}`;

            const mediumPercentage = document.createElement('span');
            mediumPercentage.textContent = `${medium.toFixed(2)}%`;
            mediumPercentage.style.display = 'block';
            mediumLabel.appendChild(mediumPercentage);

            const hardPercentage = document.createElement('span');
            hardPercentage.textContent = `${hard.toFixed(2)}%`;
            hardPercentage.style.display = 'block';
            hardLabel.appendChild(hardPercentage);

            document.querySelector(".user-stats").style.display="flex";

        } catch (error) {
            console.error(error);
            alert("No data found");
        } finally {
            // Re-enable the button and reset the text
            searchButton.textContent = 'Search';
            searchButton.disabled = false;
        }
    }

    // Event listener for the search button
    searchButton.addEventListener("click", function () {
        const username = usernameInput.value;
        console.log("logging username:", username);
        if (validateUsername(username)) {
            fetchUserDetails(username);
        }
    });
});
