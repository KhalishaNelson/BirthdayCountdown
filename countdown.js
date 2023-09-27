// Special Accounts: (today@birthday.com, birthday) <- Today | (leapday@birthday.com, leapday) <- leapling | (future@birthday.com, future) <- 1 week out

$(document).ready(() => {

    const userName = localStorage.getItem('name');
    $('.username').html(userName);
    
    const daysUntilBirthday = () => {
        const userBirthdate = localStorage.getItem('birthday');
        const today = new Date();
        const oneDayinMS = 1000 * 60 * 60 * 24
        var userBirthday = new Date(userBirthdate);
        if(userName == "Birthday Person") {
            userBirthday = new Date();
        } else if (userName == "Future Person") {
            userBirthday.setDate(today.getDate() + 7);
        }
        console.log(userName, userBirthday, userBirthdate);
        let currentYear = today.getFullYear();
        userBirthday.setFullYear(currentYear);
        // Handling month and day for leap year detection
        const birthdateParts = userBirthdate.split('-');
        const birthMonth = parseInt(birthdateParts[1], 10);
        const birthDate = parseInt(birthdateParts[2], 10);
    
        if (birthMonth === 2 && birthDate === 29) {
            if (!(currentYear % 4 === 0 && (currentYear % 100 !== 0 || currentYear % 400 === 0))) { 
                // Not a leap year, set to March 1st
                console.log("Leapling detected")
                userBirthday.setDate(1);
                userBirthday.setMonth(2);
            }
        }

        let diffTime = (userBirthday - today);
        let diffDays = Math.floor(diffTime / oneDayinMS)
        
        if (userBirthday.getMonth() === today.getMonth() && userBirthday.getDate() === today.getDate()) {
            diffDays === 0;
        } else if (diffTime < 0) {
            userBirthday.setFullYear(currentYear + 1);
            diffTime = (userBirthday - today)
            // Recalculate diffDays for next year
            diffDays = Math.floor(diffTime / oneDayinMS); // New line
        }

        displayMessage(diffDays);  
    }

    const getQuote = () => {
        const quoteEndpoint = 'https://type.fit/api/quotes';
    
        fetch(quoteEndpoint)
            .then(response => {
                if (response.ok) {
                    console.log('API retrieval successful.');
                    return response.json();
                } else {
                    console.log('API retrieval was unsuccessful.');
                }
            })
            .then(data => {
                const randomNumber = Math.floor(Math.random() * data.length);
                const quoteArray = Object.values(data[randomNumber]);
                const quote = '"'+quoteArray[0]+'"';
                let quotee = quoteArray[1];
                
                if (quotee === 'null') {
                    quotee === 'Anonymous'; 
                }
                $('#quote').html(quote);
                $('#quotee').html(quotee);
                }
            )
            .catch(error => {
                console.log(error.message)
            })
        }

    const displayMessage = (days) => {
        console.log(`${days} days left`)
        $('#days-left').html(days);

        if (days === 1) {
            $('#stmnt-change').html("Your birthday is tomorrow! How exciting!")
        } else if (days === 0) {
            $('#countdown-message').removeClass('shown');
            $('#countdown-message').addClass('hidden');
            
            getQuote();

            $('#birthday-message').removeClass('hidden');
            $('#birthday-message').addClass('shown');
        }
    }
    
    daysUntilBirthday();

    $('#signout-btn').on('click', () => {
        window.location.href = "index.html"
    })
})

