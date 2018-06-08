import React from 'react'
import moment from 'moment'
import {Pagination} from 'antd'
import {getAllUser, delUser} from "../../../../common/actions/api/user";

class UserItem extends React.Component {
    constructor(...args) {
        super(...args)
    }

    handlerDelete(evt) {
        this.props.removeUserItem(this.props.item._id);
    }

    render() {
        return (
          <tr>
              <td className='itemTd'>{this.props.item.username}</td>
              <td className='itemTd'>{this.props.item.rolename}</td>
              <td className='itemTd'>{moment(this.props.item.createtime).format('YYYY-MM-DD HH:mm')}</td>
              <td className='itemTd'>
                  <a className="itemBtn" onClick={this.handlerDelete.bind(this)}>删除</a>
              </td>
          </tr>
        )
    }
}

class UserList extends React.Component {
    constructor(...args) {
        super(...args)
    }

    render() {
        var result = []
        if (this.props.users.length > 0) {
            this.props.users.forEach(item => {
                result.push(<UserItem key={item.id} item={item} removeUserItem={this.props.removeUserItem}/>)
            })
        }
        return (
          <tbody>{result}</tbody>
        )
    }
}

export default class User extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            totalcount: 0,
            pagesize: 10,
            users: [],
        }
    }

    componentWillMount() {
        this.queryUser(1)
    }

    queryUser(page) {
        getAllUser({
            props: this.props,
            body: {
                page: page,
                pagesize: this.state.pagesize
            },
            success: (result) => {
                console.log(result)
                this.setState({
                    totalcount: result.total,
                    users: result.data
                })
            },
            error: (message) => {
                console.error(message)
            }
        })
    }

    removeUserItem(key) {
        console.log(key)
        delUser({
            props: this.props,
            body: {'_id': key},
            success: (result) => {
                if (result.status == 100) {
                    this.removeLocalUser(key)
                }
            },
            error: (message) => {
                alert('删除失败,' + message)
            }
        })
    }

    removeLocalUser(key) {
        for (var index = 0; index < this.state.users.length; index++) {
            if (this.state.users[index]._id == key) {
                this.state.users.splice(index, 1)
                break
            }
        }
        this.setState({
            users: this.state.users
        })
    }

    handlePageChange = (page, pageSize) => {
        console.log(page)
        console.log(pageSize)
        this.queryUser(page)
    }

    render() {
        return (
          <div style={{width:'70%', marginRight:'auto', marginLeft:'auto'}}>
              <div style={{minHeight:380}}>
                  <table className="table table-bordered table-hover index_table">
                      <thead>
                      <tr>
                          <th>账号</th>
                          <th>角色</th>
                          <th>创建时间</th>
                          <th>操作</th>
                      </tr>
                      </thead>
                      <UserList users={this.state.users} removeUserItem={this.removeUserItem.bind(this)}/>
                  </table>
              </div>
              <label className="index_data_empty" style={{'display': (this.state.totalcount == 0) ? 'block' : 'none'}}>暂无数据</label>
              <div className="personlist_page">
                  <Pagination style={{'display': (this.state.totalcount == 0) ? 'none' : 'block'}}
                              defaultCurrent={1}
                              total={this.state.totalcount}
                              onChange={this.handlePageChange}/>
              </div>
          </div>
        )
    }
}