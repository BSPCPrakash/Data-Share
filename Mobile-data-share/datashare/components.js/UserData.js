export default class UserDetails {
    static username = "";
    static setUsername(x){
        console.log(x);
        this.username=x;
    }
    static getUsername() {
        console.log(this.username);
      return this.username;
    }
  }


