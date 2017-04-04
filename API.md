#INFOR-Pad Api Document
This document contains how to use the REST api
***
#### Session Control
```
 POST /api/session
```
 * Login to an account
	 * Request Body
	 	* username : The user's name to login
	 	* password : The user's password
	 	* autoLogin : 0 or 1. Specify if the session can be use for 14 days
	 * Respond Status
	 	* 200 : Login Successfully
	 	* 400 : Invaild Value
	 	* 403 : Login Failed
	 * Respond Body
	 	* sessionID : The ID which can be used to login
	 	* name : The user's name
