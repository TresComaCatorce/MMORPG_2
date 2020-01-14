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

const signUp = () => {
	const body = {
		email: document.getElementById("email").value,
		password: document.getElementById("password").value,
		username: document.getElementById("username").value
	};

	console.log("CBF signup: ", body);

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
	console.log("CBF forgotPassword")
}

const resetPassword = () => {
	console.log("CBF resetPassword")
}