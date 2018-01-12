import React from 'react';

import { withRouter } from "react-router-dom";

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import Checkbox from 'material-ui/Checkbox';
import Paper from 'material-ui/Paper';
import {orange500, cyan500} from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog';



class MainContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            idErrorText: '',
            pwdErrorText: '',
            // emailErrorText: '',
            authkeyErrorText: '',
            idErrorStyle: {},
            pwdErrorStyle: {},
            // emailErrorStyle: {},
            authkeyErrorStyle: {},
            idCheck: false,
            pwdCheck: false,
            // emailCheck: false,
            authkeyCheck: false,
            termsCheck:false, //이용약관 default false
            termsModal:false, //약관 모달 오프너
        
        };

        this.termsModalHandler = this.termsModalHandler.bind(this);//모달창 온오프 헨들러
        this.termsAgree = this.termsAgree.bind(this);
        this.thermsModalClose = this.thermsModalClose.bind(this);
    }

    termsModalHandler(){
        if(this.state.termsCheck==true){
            //check 상태 일때 클릭시 취소
            this.setState({
                termsCheck:false
            })
        }else{
            //uncheck 상태일때 클릭시 모달생성과 함께 이용약관 확인
            this.setState({
                termsModal:!this.state.termsModal
            })
        }
    }

    //모달창 닫기
    thermsModalClose(){
        this.setState({
            termsModal:!this.state.termsModal
        })
    }

    termsAgree(){
        this.setState({
            termsCheck:true,
            termsModal:!this.state.termsModal
        })
    }

    submit() {

        if (!this.state.idCheck) {
            alert("아이디를 확인해주세요.");
            return;
        } else if (!this.state.pwdCheck) {
            alert("비밀번호를 확인해주세요.");
            return;
        // } else if (!this.state.emailCheck) {
        //     alert("이메일을 확인해주세요.")
        //     return;
        } else if ($('#userName').val() == '') {
            alert('이름을 입력해주세요.');
            return;
        } else if(!this.state.termsCheck){
            alert('이용약관을 확인해 주세요.');
            return;
        }

        const $form = $('#join');

        let userDivision = '2';
        if (this.state.authkeyCheck) {
            // const userDivision = $('<input type="hidden" name="userDivision" value="1" />');
            // userDivision.appendTo($form);
            userDivision = '1';
        }

        // this.props.history.push("./login");
        // $form.submit();

        ajaxJson(
            ['POST', apiSvr+'/users.json'],
            {
                userid: $('form[id=join] input[name=userid]').val(),
                password: $('form[id=join] input[name=password]').val(),
                userName: $('form[id=join] input[name=userName]').val(),
                // userEmail: $('form[id=join] input[name=userEmail]').val(),
                // schoolName: $('form[id=join] input[name=schoolName]').val(),
                userDivision: userDivision
            }, function(res) {
                // if (res.response.code == 200) {
                    // alert('가입이 완료되었습니다. 로그인 페이지로 이동합니다.')
                    document.location = './login';
                // } else {
                //     alert('가입시 오류가 발생하였습니다. 다시 시도해 주세요!')
                // }
            }.bind(this),
            function(xhr, status, err) {
                alert('Error');
            }.bind(this)
        );
    }

    checkID(value) {

        if (value == '') {

            this.setState({
                idErrorText: "필수 입력 사항입니다.",
                idErrorStyle: {color: orange500},
                isComplete: false
            });

            return;
        }

        $.ajax({
            url: apiSvr + '/users/' + value + '.json',
            dataType: 'json',
            cache: false,
            success: function(data) {

                const users = JSON.parse(JSON.stringify(data)).response.data;

                if (users) {
                    this.setState({
                        idErrorText: "이미 사용중인 아이디입니다.",
                        idErrorStyle: {color: orange500},
                        idCheck: false
                    });
                } else {
                    this.setState({
                        idErrorText: "사용 가능한 아이디입니다.",
                        idErrorStyle: {color: cyan500},
                        idCheck: true
                    });
                }

            }.bind(this),
            error: function(xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }

    // checkEmail(userEmail) {

        // if (userEmail == '') {
        //     this.setState({
        //         emailErrorText: "필수 입력 사항입니다.",
        //         emailErrorStyle: {color: orange500},
        //         emailCheck: false
        //     });
        //     return;
        // }

        // if (!this.isEmail(userEmail)) {
        //     this.setState({
        //         emailErrorText: "올바른 이메일 형식이 아닙니다.",
        //         emailErrorStyle: {color: orange500},
        //         emailCheck: false
        //     });
        //     return;
        // }

        // $.ajax({
        //     url: apiSvr + '/users/' + userEmail + '.json',
        //     dataType: 'json',
        //     cache: false,
        //     success: function(data) {

                // const users = JSON.parse(JSON.stringify(data)).response.data;

                // if (users) {
                //     this.setState({
                //         emailErrorText: "이미 사용중인 이메일입니다.",
                //         emailErrorStyle: {color: orange500},
                //         emailCheck: false
                //     });
                // } else {
                //     this.setState({
                //         emailErrorText: "사용 가능한 이메일입니다.",
                //         emailErrorStyle: {color: cyan500},
                //         emailCheck: true
                //     });
                // }

        //     }.bind(this),
        //     error: function(xhr, status, err) {
        //         console.error(status, err.toString());
        //     }.bind(this)
        // });

    // }

    // isEmail(email) {
    //     var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    //     return re.test(email);
    // }

    checkPwd(id) {

        const password = $('#password').val();
        const rePassword = $('#rePassword').val();

        if (password == rePassword) {
            this.setState({
                pwdErrorText: "비밀번호가 일치합니다.",
                pwdErrorStyle: {color: cyan500},
                pwdCheck: true
            });
        } else {
            if (this.state.pwdErrorText == '' && id == "password") return;

            this.setState({
                pwdErrorText: "비밀번호가 일치하지 않습니다.",
                pwdErrorStyle: {color: orange500},
                pwdCheck: false
            });
        }

    }

    checkAuthkey(schoolAuthkey) {

        if (schoolAuthkey == '') {
            this.setState({
                authkeyErrorText: "",
                authkeyErrorStyle: {color: cyan500},
                authkeyCheck: false
            });
            return;
        }

        $.ajax({
            url: apiSvr + '/schools/authkey/' + schoolAuthkey +'/get.json',
            dataType: 'json',
            cache: false,
            success: function(data) {

                const school = JSON.parse(JSON.stringify(data)).response.data;

                if (school) {
                    this.setState({
                        authkeyErrorText: "학교명: " + school.schoolName + ", 소재지: " + school.schoolAddrRoad,
                        authkeyErrorStyle: {color: cyan500},
                        authkeyCheck: true
                    });
                } else {
                    this.setState({
                        authkeyErrorText: "해당하는 학교코드가 없습니다.",
                        authkeyErrorStyle: {color: orange500},
                        authkeyCheck: false
                    });
                }

            }.bind(this),
            error: function(xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });

    }

    render() {
        return (
            <main id="main">
                <div id="contentsWrap">
                    <Paper style={{padding:30}}>
                    <h3 className="edge">회원가입</h3>
                    {/* <p style={{textAlign: 'center', fontSize: '11px'}}>로그인정보 및 가입정보를 입력하세요.</p> */}
                    <p style={{textAlign: 'right', fontSize: '13px'}}>*표시는 필수입력 사항입니다.</p>
                    <form method="post" id="join">
                        <div style={{maxWidth: '60%', textAlign: 'center', margin: 'auto'}}>
                            <TextField
                                name="userid"
                                floatingLabelText="*아이디"
                                fullWidth={true}
                                errorText={this.state.idErrorText}
                                errorStyle={this.state.idErrorStyle}
                                floatingLabelFocusStyle={this.state.idErrorStyle}
                                onChange={(e) => this.checkID(e.target.value)}
                            />
                            <TextField
                                id="password"
                                name="password"
                                floatingLabelText="*비밀번호"
                                fullWidth={true}
                                type="password"
                                onChange={() => this.checkPwd("password")}
                            />
                            <TextField
                                id="rePassword"
                                name="rePassword"
                                floatingLabelText="*비밀번호 재확인"
                                fullWidth={true}
                                type="password"
                                errorText={this.state.pwdErrorText}
                                errorStyle={this.state.pwdErrorStyle}
                                floatingLabelFocusStyle={this.state.pwdErrorStyle}
                                onChange={() => this.checkPwd("rePassword")}
                            />
                            <TextField
                                id="userName"
                                name="userName"
                                floatingLabelText="*별명"
                                fullWidth={true}
                            />
                            {/* <TextField
                                name="userEmail"
                                floatingLabelText="*이메일"
                                fullWidth={true}
                                errorText={this.state.emailErrorText}
                                errorStyle={this.state.emailErrorStyle}
                                floatingLabelFocusStyle={this.state.emailErrorStyle}
                                onChange={(e) => this.checkEmail(e.target.value)}
                            />
                            <TextField
                                name="schoolName"
                                floatingLabelText="학교명"
                                fullWidth={true}
                            /> */}
                            <TextField
                                name="schoolAuthkey"
                                floatingLabelText="학교 비밀코드(교사전용)"
                                fullWidth={true}
                                errorText={this.state.authkeyErrorText}
                                errorStyle={this.state.authkeyErrorStyle}
                                floatingLabelFocusStyle={this.state.authkeyErrorStyle}
                                onChange={(e) => this.checkAuthkey(e.target.value)}
                            />
                            <div style={{textAlign:'left',marginTop:20}}>
                                <Checkbox
                                    label="이용약관 동의"
                                    checked={this.state.termsCheck}
                                    onCheck={()=>this.termsModalHandler()}
                                />
                            </div>
                        </div>
                        <div style={{textAlign: 'center', maxWidth: '30%', margin: 'auto'}}>
                            <br /> <br /> <br /> 
                            <FlatButton
                                label="가입하기"
                                fullWidth={true}
                                backgroundColor={'#3e81f6'}
                                style={{color: 'white'}}
                                onClick={this.submit.bind(this)}
                            />
                            {/* <RaisedButton
                                label="가입하기"
                                fullWidth={true}
                                primary={true}
                                icon={<FontIcon className="fa fa-check" />}
                                onClick={this.submit.bind(this)}
                            /> */}
                        </div>
                    </form>
                    </Paper>
                </div>

                <Dialog
                    title="이용약관"
                    actions={[
                            <FlatButton
                              label="동의안함"
                              style={{backgroundColor:'#43444c',color:'#fff'}}
                              primary={true}
                              onClick={this.thermsModalClose}
                            />,
                            <FlatButton
                              label="동의함"
                              style={{backgroundColor:'#fff',color:'#43444c',border:'1px solid #43444c'}}
                              primary={true}
                              onClick={this.termsAgree}
                            />
                    ]}
                    autoScrollBodyContent={true}
                    autoDetectWindowHeight={true}
                    modal={true}
                    open={this.state.termsModal}
                    >
                    <div>
                    본 약관은 서비스 이용자가 국토지리정보원(이하 “우리원“이라 합니다)이 제공하는 가칭 ‘공간정보융합활용지원시스템’의 온라인상 인터넷 서비스 (이하 “서비스“라고 합니다)에 회원으로 가입하고 이를 이용함에 있어 권리•의무 및 책임사항을 규정함을 목적으로 합니다.
                    <br/>
                    서비스 이용자의 개인정보 입력을 최소화 하기 위한 노력으로 인터넷상에서 자주사용하는 아이디, 별칭 등의 사용으로 사용자를 유추할 수 있는 정보의 입력은 지양하여 주시기 바랍니다.
                    <br/>
                    감사합니다.
                    </div>
                </Dialog>

            </main>
        );
    }
}

export default withRouter(MainContainer);
