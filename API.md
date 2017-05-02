# INFOR-Pad Api Document
This document contains how to use the REST api
#### NOTE
 * All the POST request bodies format are NOT json format
 * All the respond bodies are json format
 * If any 4xx or 5xx status return, check respond body's error for detail reason
***
#### Request Header
 * sessionid: A string for this session. We use this to identify your login status.
***
#### Session Control
~~~http
 GET /api/session
~~~
 * Get this session's detail
     * Respond Status
         * 200: Succeed
         * 401: Login first!
         * 500: Server Error
     * Respond Body
         * user: The user object of the login user
         * expire: The session's expire time
         * autoLogin: If the session support autoLogin

~~~http
 POST /api/session
~~~
 * Login to an account
	 * Request Body
	 	 * username: The user's name to login
	 	 * password: The user's password
	 	 * autoLogin: 0 or 1. Specify if the session can support autoLogin
	 * Respond Status
	 	 * 200: Login Successfully
	 	 * 400: Invalid Value
	 	 * 403: Login Failed
	 	 * 500: Server Error
	 * Respond Body
	 	 * sessionid: The ID which can be used to login
	 	 * userid: The user's id

~~~http
 DELETE /api/session
~~~
 * Logout a session
	 * Request Header
	 	 * sessionid: The session ID to logout
	 * Respond Status
	 	 * 200: Logout Successfully
	 	 * 401: Not logged in
	 	 * 500: Server Error

***
#### User
~~~http
 GET /api/user?name=
~~~
 * Get a user's profile by name
     * Request Query
         * name: The user's name
     * Respond Status
         * 200: Succeed
         * 404: Not Found
         * 500: Server Error
     * Respond Body
         * name: username,
         * level: userlevel,
         * createDate: The time when the user created
         * email: The user's email **(Hidden)**
         * lastLogin: The last time when the user login **(Hidden)**
         * rootfsid: user's root directory fsid **(Hidden)**

~~~http
 GET /api/user/:id
~~~
 * Get a user's profile by ID
     * Respond Status
         * 200: Succeed
         * 404: Not Found
         * 500: Server Error
     * Respond Body
         * name: username,
         * level: userlevel,
         * createDate: The time when the user created
         * email: The user's email **(Hidden)**
         * lastLogin: The last time when the user login **(Hidden)**
         * rootfsid: user's root directory fsid **(Hidden)**

~~~http
 POST /api/user
~~~
 * Create a new user
 	 * Request Body
 		 * username: The name to register
 		 * password: The password to login
 		 * email: The email address which can be used to verify
 	 * Respond Status
 		 * 201: The user has been created successfully
 		 * 400: Some data lost
 		 * 409: The username or the email address had been used by someone else
 		 * 500: Server Error
   	 * Respond Body
         * user: The user object of the login user
 		 * sessionid: The ID which can be used to login

***
#### File System
~~~http
 GET /api/fs/:fsid
~~~
 * Query a file or a directory
     * Respond Status
         * 200: Succeed
         * 401: Login first!
         * 403: You don't have enough permission
         * 404: The file isn't exist
         * 500: Server Error
     * Respond Body
         * name: File name
         * parent: Parent Directory
         * owner: The user id of the file's owner
         * createDate: CreateDate
         * modifyDate: LastModifyDate
         * isPublic: If the file can be viewed by anyone
         * format: The file's format or 'Directory'
         * code: The code of the file **(File Only)**
         * stdin: The stdin data **(File Only)**
         * files[]: The list of the files contained **(Directory Only)**

~~~http
 POST /api/fs/:fsid
~~~
 * Create a new file or a directory
     * Request Param
     	 * fsid: **MUST** point to a directory!
     * Request Body
         * filename: The name of the file
         * format: Code type or 'Directory'
     * Respond Status
         * 201: Succeed
         * 400: Data missed or the id isn't a diretory
         * 401: Login first!
         * 403: You don't have enough permission
         * 404: The directory isn't exist
         * 500: Server Error
     * Respond Body
         * id: The id of the new file

~~~http
 PUT /api/fs/:fsid
~~~
 * Update a file or directory's data
     * Request Body
         * filename: The new name [Optional]
         * isPublic: Save new view permission [Optional]
         * code: Save new code **(File Only)** [Optional]
         * stdin: Save new input **(File Only)** [Optional]
         * format: Change file format **(File Only)** [Optional]
     * Respond Status
         * 200: Succeed
         * 400: Wrong Request Body
         * 401: Login first!
         * 403: You don't have enough permission
         * 413: Your data is too big to save
         * 404: The directory isn't exist
         * 500: Server Error
     * Respond Body
         * id: The file id be updated

~~~http
 PUT /api/fs/:fsid/:tgfsid
~~~
 * Move file or directory to another directory
     * Request Param
         * fsid: the file or directory to move
         * tgfsid: the target directory
     * Respond Status
         * 200: Succeed
         * 202: The file is already in the target directory. Nothing will happen.
         * 400: Bad request!
         * 401: Login first!
         * 403: You don't have enough permission
         * 404: Not Found
         * 500: Server Error
     * Respond Body
         * fsid: The file's id
         * newParent: The file's new parent id

~~~http
 DELETE /api/fs/:fsid
~~~
 * Delete a directory or a file permanently!
     * Respond Status
         * 200: Succeed
         * 400: You can't delete your root directory
         * 401: Login first!
         * 403: You don't have enough permission
         * 404: The directory isn't exist
         * 500: Server Error
         * 507: Error occurred when deleting
     * Respond Body
         * count: The total number of deleted files or directories
