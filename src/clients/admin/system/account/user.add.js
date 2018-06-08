import React from 'react'

import {addUser} from '../../../../common/actions/api/user'
import {Input, Dropdown, Icon, Menu, Button, message} from 'antd'

const roles = {
    '1': '县级管理员',
    '2': '乡镇管理员'
}

const menuItems = []
let data = Object.entries(roles);
data.forEach((item, i) => {
    menuItems.push(<Menu.Item key={item[0]}>{item[1]}</Menu.Item>)
})

export default class AddUser extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            role: '1',
            rolename: '县级管理员',
        }
    }

    addPerson() {
        addUser({
            props: this.props,
            body: this.state,
            success: (result) => {
                if (result.status == 100) {
                    message.success('创建成功！')
                } else {
                    message.error(result.message)
                }
            },
            error: (error) => {
                console.log(error)
                message.error(error.message)
            }
        })
    }

    handleChange = (e) => {
        console.log(e.target.name)
        console.log(e.target.value)
        const newState = {}
        newState[e.target.name] = e.target.value
        this.setState(newState)
    }

    handleMenuClick = (item, key) => {
        console.log('click', item.key);
        this.setState({
            role: item.key,
            rolename: roles[item.key]
        })
    }

    render() {
        const menu = (
          <Menu onClick={this.handleMenuClick}>
              {menuItems}
          </Menu>
        );
        return (
          <div className="container">
              <div className="base-info">
                  <div className="adduser-container">
                      <div className="form-inline" style={{marginTop: 30}}>
                          <label>账号：</label>
                          <Input type="text" onChange={this.handleChange} className="form-control" name="username"/>
                      </div>
                      <div className="form-inline" style={{marginTop: 30}}>
                          <label>密码：</label>
                          <Input type="text" onChange={this.handleChange} className="form-control" name="password"/>
                      </div>
                      <div className="form-inline" style={{marginTop: 30, marginBottom: 30}}>
                          <label>角色：</label>
                          <Dropdown overlay={menu}>
                              <Button>
                                  {this.state.rolename} <Icon type="down"/>
                              </Button>
                          </Dropdown>
                      </div>
                  </div>
              </div>
              <div className="form-inline action_btn_parent" style={{width: 160}}>
                  <Button type="primary" onClick={() => this.addPerson()} className="submitbtn">创建</Button>
              </div>
          </div>
        )
    }
}