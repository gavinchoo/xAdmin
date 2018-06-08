import React from 'react'
import {Row, Col, message} from 'antd';

import {requestPost} from '../../../common/utils/request';
import MyCard from './mycard'
import eventBus from "../../../common/utils/eventbus";

const Uri = {
    query: '/api/generator/table/query',
    remove: '/api/generator/table/remove',
    edit: '/api/generator/table/edit',
    create: '/api/generator/table/create'
}

const containerSpan = {xs: 8, sm: 16, md: 24, lg: 32}

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectItem: {}
        }

        eventBus.addListener('changeproject', (item) => {
            console.log("changeproject", item);
        })
    }

    componentWillMount() {
        if (!localStorage.getItem("project")) {
            message.warn("请选择项目")
            return
        }
        this.queryForPage(1);
    }

    queryForPage(page) {
        requestPost(Uri.query, {
            props: this.props,
            body: {
                projectId: localStorage.getItem("project"),
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
            pathname: "/model/model_add",
            selectItem: item,
        })
    }

    onTableDelClick = (item) => {
        this.removeItem(item);
    }

    render() {

        if (this.state.listData) {
            var map = new Map();
            this.state.listData.forEach((item, index) => {
                if (map.has(item.group.dataIndex)) {
                    map.set(item.group.dataIndex, [...map.get(item.group.dataIndex), item])
                } else {
                    map.set(item.group.dataIndex, [item])
                }
            })
            var groupCards = []
            for (var [key, value] of map) {
                var cards = value.map((item, index) => {
                    return (
                      <Col key={index} span={containerSpan}>
                          <MyCard coverIcon="table" item={item} onTableEditClick={this.onTableEditClick}
                                  onTableDelClick={this.onTableDelClick}/>
                      </Col>)
                })
                groupCards.push(
                  <Row style={{marginTop: 20}}>
                      <label style={{fontSize: 18}}>{value[0].group.title}</label>
                      <Row gutter={24} type="flex">
                          {cards}
                      </Row>
                  </Row>)
            }
        }
        return (
          <Row gutter={24}>
              {groupCards}
          </Row>
        )
    }
}