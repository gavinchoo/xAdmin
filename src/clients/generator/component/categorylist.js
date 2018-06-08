import React from 'react'
import {Row, Col, message} from 'antd';

import {requestPost} from '../../../common/utils/request';
import MyCard from './mycard'

const Uri = {
    query: '/api/generator/category/query',
    remove: '/api/generator/category/remove',
    edit: '/api/generator/category/edit',
    create: '/api/generator/category/create'
}

const containerSpan = {xs: 8, sm: 16, md: 24, lg: 32}

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectItem: {}
        }
    }

    componentWillMount() {
        if (!localStorage.getItem("project")){
            message.warn("请选择项目")
            return
        }
        this.queryForPage(1);
    }

    queryForPage(page) {
        requestPost(Uri.query, {
            props: this.props,
            body: {
                projectId:localStorage.getItem("project"),
                page: page,
                pagesize: 0
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

    removeItem = (record) => {
        requestPost(Uri.remove, {
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

    onSubmitSuccess = (data) => {
        var listData = [...this.state.listData, data];
        this.setState({
            totalcount: listData.length,
            listData: listData,
        })
    }

    onTableEditClick = (item) => {
        this.props.history.push({
            pathname: "/model/category_add",
            selectItem: item,
        })
    }

    onTableDelClick = (item) => {
        this.removeItem(item);
    }

    render() {
        var cards = [];
        if (this.state.listData) {
            cards = this.state.listData.map((item, index) => {
                return (
                  <Col key={index} span={containerSpan}>
                      <MyCard coverIcon="profile" item={item} onTableEditClick={this.onTableEditClick}
                              onTableDelClick={this.onTableDelClick}/>
                  </Col>)
            })
        }
        return (
          <Row gutter={24} type="flex">
              {cards}
          </Row>
        )
    }
}