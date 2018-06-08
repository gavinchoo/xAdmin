import React from 'react'
import {Select, Row, Col, Button, Spin, message} from 'antd';

import {requestPost} from '../../../common/utils/request';
import eventBus from "../../../common/utils/eventbus";

const Uri = {
    query: '/api/generator/project/query',
    export: '/api/generator/project/export'
}

export default class SelectProject extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            listData: [],
        }
    }

    componentWillMount() {
        this.queryForPage(1)
    }

    handleProjectChange = (value) => {
        var item = this.state.listData.find((item) => {
            return item._id == value
        })
        localStorage.setItem("project", item._id);
        eventBus.emit("changeproject", item);
    }

    handleExport = () => {
        console.log("handleExport")
        this.setState({
            loading: true
        })
        requestPost(Uri.export, {
            props: this.props,
            body: {projectId: localStorage.getItem("project")},
            success: (result) => {
                message.success('执行成功')
                this.setState({
                    loading: false
                })
            },
            error: (error) => {
                this.setState({
                    loading: false
                })
                message.error(error.message)
            }
        })
    }

    queryForPage(page) {
        requestPost(Uri.query, {
            props: this.props,
            body: {
                page: page,
                pagesize: 0
            },
            success: (result) => {
                this.setState({
                    listData: result.data.result,
                })
            },
            error: (message) => {
                console.error(message)
            }
        })
    }

    render() {

        var options = []
        if (this.state.listData) {
            options = this.state.listData.map((item) => {
                return (<Option key={item._id} value={item._id}>{item.projectName}</Option>);
            })
        }

        return (
          <Row gutter={12}>
              <Col span={6}>
                  <Select
                    showSearch
                    style={{width: 200, marginLeft: 30}}
                    defaultValue={localStorage.getItem("project")}
                    placeholder="选择项目"
                    optionFilterProp="children"
                    onChange={this.handleProjectChange}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                      {options}
                  </Select>
              </Col>
              <Col span={3}>
                  <Button onClick={this.handleExport}>导出</Button>
              </Col>
              <Col span={1}>
                  <Spin spinning={this.state.loading}/>
              </Col>

          </Row>
        )
    }
}