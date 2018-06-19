import { Component, OnInit } from "@angular/core";
import { NgForm, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "../../shared/models/user";
import { AuthService } from "../../shared/services/auth.service";

import { UserService } from "../../shared/services/user.service";

declare var $: any;
@Component({
  selector: "app-user-account",
  templateUrl: "./user-account.component.html",
  styleUrls: ["./user-account.component.scss"]
})
export class UserAccountComponent implements OnInit {
  loggedUser: User;
  constructor(private authService:AuthService,private fb: FormBuilder, private userService: UserService,  private router: Router ) {

  }

  ngOnInit() {
    this.loggedUser = this.authService.getLoggedInUser(); //로그인된 유저 가져오고
    // console.log(this.loggedUser.uphone);
    // console.log(this.loggedUser.uphone*1); // 1012345678 앞에 0이빠진 값이 넘어오게됨
    // console.log(isNaN(this.loggedUser.uphone*1)); // ts 에러
    // console.log(isNaN(this.loggedUser.uphone)); // ts에러
    // console.log($(this.loggedUser.uphone)); // 원하는값이 안올라옴
    // console.log(isNaN($(this.loggedUser.uphone))); //true
    // console.log(isNaN($(parseInt(this.loggedUser.uphone)))); //true
    // console.log(typeof(this.loggedUser.ubirth)); // string
  }


  AddrChange1:boolean=false;

  updateProfile(updatePerson: NgForm) {
    let submitStatus:Boolean=false;
      // 1차 필터
    if(
      this.loggedUser.upw!=null &&
      this.loggedUser.uphone!=null &&
      this.loggedUser.uaddr1!=null &&
      this.loggedUser.uaddr2!=null &&
      this.loggedUser.uaddr3!=null &&
      this.loggedUser.ubirth!=null
    ){
      let numpattern=/^[0-9]*$/; //숫자표현식

      console.log('1차 정보수정조건 만족');
      // 2차 필터
      if(this.loggedUser.upw.length>20){
        submitStatus=false;
        alert('비밀번호가 너무 깁니다');
        $("#userPwd").focus();
        return;
      }if(this.loggedUser.uphone.length<=8 || this.loggedUser.uphone.length>=12){
        submitStatus=false;
        alert('연락처는 9~11자 이내로 입력해주세요');
        $("#userPhone").focus();
        return;
      }if(numpattern.test(this.loggedUser.uphone)==false){
        submitStatus=false;
        alert('연락처는 숫자만 입력 가능합니다');
        $("#userPhone").focus();
        return;
      }if(this.loggedUser.ubirth.length!=6){
        submitStatus=false;
        alert('생년월일은 주민등록번호 앞 6자리를 입력해야 합니다 (공백이 있나 확인해주세요)');
        $("#userBirth").focus();
        return;
      }if(numpattern.test(this.loggedUser.ubirth)==false){
        submitStatus=false;
        alert('생년월일은 숫자만 입력 가능합니다');
        $("#userBirth").focus();
        return;
      }if(this.loggedUser.uaddr1.length>=101){
        submitStatus=false;
        alert('[주소1] 을 100자 이내로 입력해주세요');
        return;
      }if(this.loggedUser.uaddr2.length>=101){
        submitStatus=false;
        alert('[주소2] 을 100자 이내로 입력해주세요');
        return;
      }if(this.loggedUser.uaddr3.length>=101){
        submitStatus=false;
        alert('[주소3] 을 100자 이내로 입력해주세요');
        return;
      }else{
        submitStatus=true;
      }
    }
    if(submitStatus){
      this.userService.updateUser(this.loggedUser).subscribe(()=>{
        //회원정보 수정이 성공적으로 실행될때, 토큰업데이트
        this.authService.updateUserToken(this.loggedUser);
        alert("수정되었습니다");
        this.router.navigate(["index"]);
      },
    (error:any)=>{
      alert("에러발생");
    });
    }

  }

  // 주소검색 모달 변경,취소 버튼 메서드
  modalsubmit(){
    if(this.AddrSearch1_3=="" || this.AddrSearch1_3==null){
      alert("상세주소를 입력해주세요");
      $("#AcountDetailAddr").focus();
      return;
    }if(this.AddrSearch1_2=="" || this.AddrSearch1_2==null){
      alert("기본주소를 입력해주세요");
      return;
    }else{
      this.loggedUser.uaddr1 = this.AddrSearch1_2+" / "+this.AddrSearch1_3;
      $("#addrChangeForm1").modal("hide");
      alert("주소변경 완료");
    }
  }

  modalsubmit2(){
    if(this.AddrSearch2_3=="" || this.AddrSearch2_3==null){
      alert("상세주소를 입력해주세요");
      $("#AcountDetailAddr2").focus();
      return;
    }if(this.AddrSearch2_2=="" || this.AddrSearch2_2==null){
      alert("기본주소를 입력해주세요");
      return;
    }else{
      this.loggedUser.uaddr2 = this.AddrSearch2_2+" / "+this.AddrSearch2_3;
      $("#addrChangeForm2").modal("hide");
      alert("주소변경 완료");
    }
  }

  modalsubmit3(){
    if(this.AddrSearch3_3=="" || this.AddrSearch3_3==null){
      alert("상세주소를 입력해주세요");
      $("#AcountDetailAddr3").focus();
      return;
    }if(this.AddrSearch3_2=="" || this.AddrSearch3_2==null){
      alert("기본주소를 입력해주세요");
      return;
    }else{
      this.loggedUser.uaddr3 = this.AddrSearch3_2+" / "+this.AddrSearch3_3;
      $("#addrChangeForm3").modal("hide");
      alert("주소변경 완료");
    }
  }

  modalclose(){
    this.AddrSearch1_2 = "";
    $("#addrChangeForm1").modal("hide");
    alert("주소변경 취소");
  }
  modalclose2(){
    this.AddrSearch2_2 = "";
    $("#addrChangeForm2").modal("hide");
    alert("주소변경 취소");
  }
  modalclose3(){
    this.AddrSearch3_2 = "";
    $("#addrChangeForm3").modal("hide");
    alert("주소변경 취소");
  }

  ValueClear(){
    // 주소변경 클릭했을때 '선택한 기본주소' 값 , '상세주소' 값초기화
    this.AddrSearch1_2 = "";
    this.AddrSearch2_2 = "";
    this.AddrSearch3_2 = "";
    this.AddrSearch1_3 = "";
    this.AddrSearch2_3 = "";
    this.AddrSearch3_3 = "";
  }

  //주소 입력 api (박스 3개 각각 다른변수 사용)
  daumAddressOptions =  {
    class: ['btn', 'btn-large', 'btn-info', 'waves-light']
  };
  AddrSearch1_2:string;    //우편번호(zip)+기본주소(addr)
  AddrSearch1_3:string=""; //상세주소
  setDaumAddressApi(AddrSearch){
  // 여기로 주소값이 반환
    this.AddrSearch1_2 = AddrSearch.zip+" / "+AddrSearch.addr;
    $("#AcountDetailAddr").focus();
  }
  AddrSearch2_2:string;
  AddrSearch2_3:string="";
  setDaumAddressApi2(AddrSearch2){
    this.AddrSearch2_2 = AddrSearch2.zip+" / "+AddrSearch2.addr;
    $("#AcountDetailAddr2").focus();
  }
  AddrSearch3_2:string;
  AddrSearch3_3:string="";
  setDaumAddressApi3(AddrSearch3){
  // 여기로 주소값이 반환
    this.AddrSearch3_2 = AddrSearch3.zip+" / "+AddrSearch3.addr;
    $("#AcountDetailAddr3").focus();
  }
}
