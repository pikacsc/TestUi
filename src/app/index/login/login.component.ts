import { NgForm, EmailValidator } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { ToastyService, ToastOptions, ToastData, ToastyConfig } from "ng2-toasty";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "../../shared/services/user.service";
import { AuthService } from "../../shared/services/auth.service";
import { User } from "../../shared/models/user";
import { Login } from "../../shared/models/login";

declare var $: any;

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
  // providers: [EmailValidator]
})
export class LoginComponent implements OnInit {
  loginUser = {
    userId: "",
    userPassword: ""
  };
  //로그인할때만 쓰는 로그인객체
  login1 = new Login;


  user = new User;

  //아이디 찾은 user로 토큰을 유지하고있기때문에 새로운 user2로 비번찾기시도용도
  user2 = new User;

  //가입하는 유저
  createUser;

  //아이디/비밀번호를 분실한 유저
  findIDUser=new User;
  findPWUser=new User;

  //upw2.value (비밀번호확인)
  upw2;


  constructor(
    private userService: UserService,
    private authService: AuthService,
    private toastyService: ToastyService,
    private router: Router,
    private route: ActivatedRoute,
    private toastyConfig: ToastyConfig
  ) {
    this.toastyConfig.position = "top-right";
    this.toastyConfig.theme = "material";
    this.createUser = new User();
  }

  ngOnInit() { }
  // signupcheck(){
  //   this.submitStatus=true;
  //   if(
  //     this.createUser.uid==!null,
  //     this.createUser.upw==!null,
  //     this.createUser.uname==!null,
  //     this.createUser.uphone==!null,
  //     this.createUser.uaddr1==!null,
  //     this.createUser.ubirth==!null,
  //     this.createUser.ugender==!null,
  //     this.createUser.usmsyn==!null,
  //     this.createUser.uemailyn==!null
  //   ){
  //     this.submitStatus=false;
  //   }
  // }
  signup() {
    // this.authService.signup(this.emailId, this.password);
    this.loginUser.userId= this.login1.uid;
    this.loginUser.userPassword= this.login1.upw;
  }


  FindUserId(FindIdForm: NgForm){
    this.userService.findUserID(this.findIDUser).subscribe((data:User)=>{
      this.user = data;

    },(error: any)=>{
      alert("일치하는 데이터가 없습니다.");
      this.user = new User;
  });

  }

  FindUserPw(FindPwForm:NgForm){
    this.userService.findUserPW(this.findPWUser).subscribe((data:User)=>{
      this.user2 = data;
    },(error: any)=>{
      alert("일치하는 데이터가 없습니다.");
      this.user2 = new User;
    }
  );
  }

  addUser(userForm: NgForm) {
    userForm.value["isAdmin"] = false;

    // 회원가입 폼 입력필터
    let submitStatus:Boolean=false;
    if(
      this.createUser.uid!=null &&
      this.createUser.upw!=null &&
      this.createUser.uname!=null &&
      this.createUser.uphone!=null &&
      this.createUser.uaddr1!=null &&
      this.createUser.ubirth!=null &&
      this.createUser.ugender!=null &&
      this.createUser.usmsyn!=null &&
      this.createUser.uemailyn!=null
    ){
      // let numPattern = /[^0-9]/;

        if(this.upw2!=this.createUser.upw){ //비밀번호 틀렸을때
          submitStatus=false;
          alert('비밀번호를 다시 확인해주세요');
        }if(this.createUser.ubirth.length!=6 || (this.createUser.ubirth*=1).constructor!=Number){
          submitStatus=false;
          alert('생년월일을 다시 확인해주세요.');
        }
        else{ //모든 항목 입력완료, 비밀번호 확인완료
          console.log(submitStatus);
          submitStatus=true;
          // console.log('if문 실행됨. 가입조건만족. submitStatus='+submitStatus);
        }
    }else{
      submitStatus=false;
      // console.log('else문 실행됨. submitStatus='+submitStatus);
      alert('모든 항목을 입력해주세요.');
    }

    //submitStatus 가 true일 경우에만 실행
    if(submitStatus){
    this.userService.createUser(userForm.value).subscribe((data:User) => {
      this.createUser = data;

      const toastOption: ToastOptions = { //3초동안 우측상단 회원가입중... 창 띄워줌
        title: "회원가입 확인중",
        msg: "회원가입 확인중...",
        showClose: true,
        timeout: 3000,
        theme: "material"
      };
      this.toastyService.wait(toastOption);
      setTimeout((router: Router) => {
        $("#createUserForm").modal("hide");
        alert("회원가입 완료. 로그인 해주세요.");
        this.router.navigate(["index/login"]);
      }, 1500);
    },
      (error:any) => {
          alert('이미 존재하는 아이디입니다.');
          return false;
      }
    );//subscribe끝
  }else if(submitStatus==false){
    console.log('회원가입 취소');
    return false;
  }
}//addUser() 끝

  login() {
    // console.log("loginForm" + this.loginUser.userId);
    this.userService.getUsers(this.login1)
      .subscribe((user:User) => {
        if(user==null){
          console.log("아이디 불일치");
          alert("아이디가 없습니다");
          // this.router.navigate(["index/login"]);
          // this.user = new User;
          return false;
        }
        this.user = user;
        if(this.user.uaddr1=='err'){
          console.log("비밀번호 불일치");
          alert("비밀번호가 틀립니다");
          // this.router.navigate(["index/login"]);
          // this.user = new User;
          return false;
        }
        //서비스에 로그인된 객체를 저장
        this.userService.loginUser=this.user;
        console.log(this.userService.loginUser.uaddr1);

        //토큰부여(세션유지)
        if(this.userService.loginUser!=null){
          this.authService.saveUserToken();
          this.router.navigate(["index"]);
        }

      },(error: any)=>{
    });
    // if (this.authService.loginCheck(userForm.value["userId"], userForm.value["userPassword"]) === true) {
    //   const toastOption: ToastOptions = {
    //     title: "Authentication Success",
    //     msg: "Logging in please wait",
    //     showClose: true,
    //     timeout: 5000,
    //     theme: "material"
    //   };
    //   this.toastyService.wait(toastOption);
    //   const returnUrl = this.route.snapshot.queryParamMap.get("http://localhost:8080/toma/login/");
    //   setTimeout((router: Router) => {
    //     this.router.navigate([returnUrl || "/"]);
    //   }, 1500);
    // } else {
    //   const toastOption: ToastOptions = {
    //     title: "Authentication Failed",
    //     msg: "Invalid Credentials, Please Check your credentials",
    //     showClose: true,
    //     timeout: 5000,
    //     theme: "material"
    //   };
    // this.toastyService.error(toastOption);
    //     this.loginUser.userId = this.loginUser.userPassword = "";
    //   }

  }

  // login() {
  //   // console.log("loginForm" + this.loginUser.userId);
  //   this.userService.getUsers(this.login1)
  //     .subscribe((user:User) => {
  //       this.user = user;
  //     });
  //
  //   // if (this.authService.loginCheck(userForm.value["userId"], userForm.value["userPassword"]) === true) {
  //   //   const toastOption: ToastOptions = {
  //   //     title: "Authentication Success",
  //   //     msg: "Logging in please wait",
  //   //     showClose: true,
  //   //     timeout: 5000,
  //   //     theme: "material"
  //   //   };
  //   //   this.toastyService.wait(toastOption);
  //   //   const returnUrl = this.route.snapshot.queryParamMap.get("http://localhost:8080/toma/login/");
  //   //   setTimeout((router: Router) => {
  //   //     this.router.navigate([returnUrl || "/"]);
  //   //   }, 1500);
  //   // } else {
  //   //   const toastOption: ToastOptions = {
  //   //     title: "Authentication Failed",
  //   //     msg: "Invalid Credentials, Please Check your credentials",
  //   //     showClose: true,
  //   //     timeout: 5000,
  //   //     theme: "material"
  //   //   };
  //   // this.toastyService.error(toastOption);
  //   //     this.loginUser.userId = this.loginUser.userPassword = "";
  //   //   }
  // }
}
