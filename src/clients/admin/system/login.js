import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {Icon, message} from 'antd'
import {loginValidate, accessToken} from '../../../common/actions/api/user'

class Login extends Component {

    constructor(...args) {
        super(...args)
        this.state = {
            message:'用户名或密码不正确',
            checkPass: true,
            logined: false
        }
    }

    login = () => {
        accessToken({
            props: this.props,
            body: {
                username: this.username.value,
                pwd: this.password.value
            },
            success: (result) => {
                this.setState({
                    logined: true
                })
            },
            error: (errormsg) => {
                this.setState({
                    checkPass: false
                })
                console.log(errormsg)
                message.error(errormsg.message);
            }
        })
    }

    render() {
        if (this.state.logined) {
            return (
              <Redirect to="/"/>
            )
        }
        return (
          <div className="login-wrapper">
              <div className="login-form">
                  <h2>人员信息管理系统</h2>
                  <div className="form-input">
                      <Icon className="icon" name="user" type="user"/>
                      <input value='admin' ref={(ref) => this.username = ref} name='username' placeholder="用户名" type="text"/>
                  </div>
                  <div className="form-input">
                      <Icon className="icon" type="lock" name="lock"/>
                      <input value='123456' ref={(ref) => this.password = ref} name='password' type="password" placeholder="登录密码"/>
                  </div>
                  <div className="form-submit">
                      <button type="button"
                              onClick={this.login}>登 录
                      </button>
                  </div>
              </div>
          </div>
        )
    }
}

export default Login