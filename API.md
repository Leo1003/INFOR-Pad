# INFOR-Pad Api Document
This document contains how to use the REST api
***
#### Session Control
~~~
 POST /api/session
~~~
 * Login to an account
	 * Request Body
	 	* username : The user's name to login
	 	* password : The user's password
	 	* autoLogin : 0 or 1. Specify if the session can be use for 14 days
	 * Respond Status
	 	* 200 : Login Successfully
	 	* 400 : Invaild Value
	 	* 403 : Login Failed
	 	* 500 : Server Error
	 * Respond Body
	 	* sessionid : The ID which can be used to login
	 	* name : The user's name
	 	* error : The error message

~~~
 DELETE /api/session
~~~
 * Logout a session
	 * Request Header
	 	* sessionid : The session ID to logout
	 * Respond Status
	 	* 200 : Logout Successfully
	 	* 403 : Logout Failed
	 	* 500 : Server Error
	 * Respond Body
       	* error : The error message

***
#### User Control
~~~
 POST /api/user
~~~
 * Create a new user
 	* Request Body
 		* username : The name to register
 		* password : The password to login
 		* email : The email address which can be used to verify
 	* Respond Status
 		* 201 : The user has been created successfully
 		* 400 : Some data lost
 		* 409 : The username or the email address had been used by someone else
 		* 500 : Server Error
 	* Respond Body
 		* sessionid : The ID which can be used to login
	 	* name : The user's name
	 	* error : The error message
