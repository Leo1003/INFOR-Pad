# My TodoList & Note

### Api:
  * GET /api/session -> userid (with session id in headers)
  * GET /api/user/:id -> user data (with sessinoid can get hidden data)
  * GET /api/fs/:fsid -> file(folder) data

### Cookie:
  * sessionid

### Todo:
  * Make Loading
  
  * Router

    / -> homePage

    /Sign_In -> only for guest

    /Sign_Up -> only for guest

    /mypad -> user's rootfile
    (with 'all' 'public' 'private' buttons)

    /users/:user -> user profile & user public
      ```
        if(this.props.name = user) {
          render all file(folder) & edit button
        }
        else {
          render profile & public file(folder)
        }
      ```
    /folder/:folderid -> folder page

    /file/:fileid -> ace editor

    /:shareId (short Id)

    Index Route -> Main

    Every Page With Index and receive Props before rendering
