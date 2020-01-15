


// Reusable function to send data in POST request
const postData = ( url="", data={} ) => {
	return fetch( url, {
		method: "POST",
		mode: "cors",
		cache: "no-cache",
		credentials: "include", //Needed to send cookies
		headers:
		{
			"Content-Type": "application/json"
		},
		redirect: "follow",
		referrer: "no-referrer",
		body: JSON.stringify(data)
	})
	.then( response => response.json()
	);
}



// Login button function
const signIn = () => {
	const body = {
		email: document.getElementById("email").value,
		password: document.getElementById("password").value
	};

	postData( "/login", body )
		.then( response => {
			if( response.status !== 200 ) throw new Error(response.error);
			window.location.replace("/game.html");
		})
		.catch( error => {
			window.alert(error.message);
			window.location.replace("/index.html");
		})
}



// Register button function
const signUp = () => {
	const body = {
		email: document.getElementById("email").value,
		password: document.getElementById("password").value,
		username: document.getElementById("username").value
	};

	postData( "/signup", body )
		.then( response => {
			if( response.status !== 200 ) throw new Error(response.error);
			window.alert("User created successfully!");
			window.location.replace("/index.html");
		})
		.catch( error => {
			window.alert(error.message);
			window.location.replace("/signup.html");
		})
}




const forgotPassword = () => {
	const body = {
		email: document.getElementById("email").value
	};

	postData( "/forgot-password", body )
		.then( response => {
			if( response.status !== 200 ) throw new Error(response.error);
			window.alert("Password reset email sent.");
			window.location.replace("/index.html");
		})
		.catch( error => {
			window.alert(error.message);
			window.location.replace("/forgot-password.html");
		})
}

const resetPassword = () => {
	const urlParams = new URLSearchParams(window.location.search);
	const token = urlParams.get("token");
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;
	const password_verify = document.getElementById("verifiedPassword").value;
	const body = {
		password,
		password_verify,
		token,
		email
	};

	console.log("CBF body: ", body);

	if( password !== password_verify )
	{
		window.alert("Password do not match.")
	}
	else
	{
		postData( "/reset-password", body )
			.then( response => {
				if( response.status !== 200 ) throw new Error(response.error);
				window.alert("Password updated.");
				window.location.replace("/index.html");
			})
			.catch( error => {
				window.alert(error.message);
				window.location.replace("/forgot-password.html");
			})
	}

}