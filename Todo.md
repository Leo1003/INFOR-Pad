# My TodoList & Note

### Api:
  * GET /api/session -> userid (with session id in headers)
  * GET /api/user/:id -> user data (with sessinoid can get hidden data)
  * GET /api/fs/:fsid -> file(folder) data

### Cookie:
  * sessionid

### Todo:
  * Router
    / -> home
    /:user -> userhome
    ```
    if(isLogin && username == user) redirect myhome; render private + public data
    else render public data of the user

    ```
    /Sign_In -> if(!isLogin) render it
    /Sign_Up -> if(!isLogin) render it

    /:folderid -> ace editor

  * CheckAuth -> get Initail by sessionid
    ```
    function CheckAuth() {
      const sessionid = cookie.load('sessionid')
      if(sessionid) {
        get_initail_state
        return true
      }
      else return false
    }

    if(CheckAuth()) {
      render (
        searchBar,
        Username,
        Logout,
        userHomePage,
        rootFolder
      )
    } else {
      render (
        HomePage,
        SearchBar
        Sign in,
        Sign up,
      )
    }
    ```
