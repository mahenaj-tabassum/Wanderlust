# WanderLust
🌍WanderLust: A full-stack travel destination app built with the MERN stack. Browse, add, edit, and delete destinations with a clean, responsive UI.



JWT has 3 parts:
- Header: 
{
	algorithm: "HS256" // by this encoded code decode
 	type: "JWT"
}
- Payload: // It contains user data. By this we can send user data securely
{
	sub: ",
	name: "John Doe"
	admin: false
	iat: 
} 

- JWT Signature Verification // JWT secret. in .env developer set this
By the secret the decoded token gets encoded


Process (newer)
- We generate JWT in the frontend and then save that somewhere securely
- It will be getting generated when the user logged in and logged out

- Then send that JWT to the backend. And then we check that JWt through middleware

- we will use better auth to generate the JWT by frontend

- Main thing is: We will generate a JWT in the Frontend then send that token to the backend and the backend will verify the token through middleware. It will help us know if teh user is valid


If we create and save the JWT manually then the places we can save the Token:
- Local Storage  : (Limited Storage)(like Database)(5MB)(Data access: very Easy by JS)(Token isn't very secured)
- Session Storage: (same as Local storage) (But it removes data when the browser is closed)
- Cookie Storage :(we can add expire data of token)(Data from here can't be accessed by JS)(HTTP only check)(Token can be secured)