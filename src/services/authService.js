import Cookies from "universal-cookie";
import axios from "axios";

const cookies = new Cookies();

const authService = {
  isAuthenticated() {
    return cookies.get("auth") === "true";
  },

  signIn(userName) {
    cookies.set("auth", "true", { path: "/" });
    cookies.set("user", userName, {
      path: "/",
      expires: new Date(Date.now() + 21600000)
    });
    console.log(cookies.get("auth"));
  },

  getUser() {
    console.log(cookies.get("user"));
    return cookies.get("user");
  },

  signOut() {
    console.log("Logout");
    axios
      .post("/logout", { userName: this.getUser() })
      .then(res =>
        res.data.success
          ? (cookies.remove("user", { path: "/" }),
            cookies.set("auth", false, { path: "/" }))
          : null
      )
      .catch(err => console.log(err));
  }
};

export default authService;
