import React from 'react'
import {requestPost} from '../../utils/request';
import {Table, Divider, message} from 'antd'
import {Link} from 'react-router-dom'
import moment from 'moment'

class PageList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            totalcount: 0,
            pagesize: 10,
            listData: [],
            childData: []
        }
    }

    componentWillMount() {
        this.queryForPage(1);
    }

    queryForPage(page) {
        requestPost(this.props.uri.query, {
            props: this.props,
            body: {
                page: page,
                pagesize: this.state.pagesize
            },
            success: (result) => {
                this.setState({
                    totalcount: result.data.total,
                    listData: result.data.result
                })
            },
            error: (message) => {
                console.error(message)
            }
        })
    }

    removeItem(record) {
        requestPost(this.props.uri.remove, {
            props: this.props,
            body: {'_id': record._id},
            success: (result) => {
                if (result.code == 1) {
                    this.removeLocal(record)
                }
                message.info('删除成功')
            },
            error: (msg) => {
                message.error('删除失败,' + msg)
            }
        })
    }

    editItem(key) {

    }

    removeLocal(record) {
        for (var index = 0; index < this.state.listData.length; index++) {
            if (this.state.listData[index]._id == record._id) {
                this.state.listData.splice(index, 1)
                break
            }
        }
        this.setState({
            listData: this.state.listData
        })
    }

    handlePageChange = (page, pageSize) => {
        this.queryForPage(page)
    }

    render() {
        var columns = this.props.columns.filter((item) => {
            if (item.listshow) {
                return true;
            }
            return false;
        })
        columns.map((item) => {
            if (item.type instanceof Array && item.f7) {
                item.render = (text, record) => {
                    return text && text[item.f7.show];
                }
            } else if (item.type instanceof Object && item.f7) {
                item.render = (text, record) => {
                    return text && text[item.f7.showFiled];
                }
            } else if (item.type == Date) {
                item.render = (text, record) => {
                    return text && moment(text).format("YYYY-MM-DD HH:mm");
                }
            }
        })
        columns.push({
            title: '操作',
            key: 'action',
            width: 150,
            render: (text, record) => (
              <span>
                  <Link to={{pathname: this.props.location.pathname + "_add", params: record}}>编辑</Link>
                  <Divider type="vertical"/>
                  <a href="javascript:;" onClick={() => this.removeItem(record)}>删除</a>
                </span>
            )
        })
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            }
        };
        return (
          <div>
              <Table bordered scroll={{x: 800, y: 320}}
                     onRow={(record) => {
                         return {
                             onClick: () => {
                                 this.setState({
                                     childData: record.child,
                                     pid: record._id
                                 })
                             }
                         }
                     }}
                     dataSource={this.state.listData}
                     columns={columns}
                     rowKey="_id"
                     rowSelection={rowSelection}
                     pagination={{
                         position: 'bottom', total: this.state.totalcount,
                         onChange: this.handlePageChange
                     }}/>
          </div>
        )
    }
}

export default PageList