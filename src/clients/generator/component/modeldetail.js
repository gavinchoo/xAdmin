import React from 'react'
import {Modal, Row, Col} from 'antd';
import PageForm from '../../../common/ui/component/pageform'

const Columns = [
    {
        title: '模型名称',
        dataIndex: 'dataIndex',
        key: 'dataIndex',
        type: String,
        required: true,
    },
    {
        title: '模型别名',
        dataIndex: 'title',
        key: 'title',
        type: String,
        required: true,
    },
    {
        title: '业务分组',
        dataIndex: 'group',
        key: 'group',
        type: String,
        required: true,
        f7: {
            source: "other_busi",
            query: "/api/generator/group/query",
            table: "table", columns: [
                {title: "分组别名", dataIndex: "title", key: "title", type: String, required: true, width: 60},
                {title: "分组名称", dataIndex: "dataIndex", key: "dataIndex", type: String, required: true, width: 60},
            ], showFiled: "title"
        }
    },
    {
        title: '字段集合',
        dataIndex: 'columns',
        key: 'columns',
        type: Array,
        required: false,
        f7: {
            "columns": [
                {"title": "字段名称", "dataIndex": "dataIndex", "key": "dataIndex", "required": true, "width": 60},
                {"title": "字段别名", "dataIndex": "title", "key": "title", "required": true, "width": 60},
                {"title": "字段类型", "dataIndex": "type", "key": "type", type: String, required: true, "width": 60},
                {
                    "title": "数据来源",
                    "dataIndex": "source",
                    "key": "source",
                    "type": Object,
                    "required": true,
                    "width": 60,
                },
                {
                    "title": "固定列表",
                    "dataIndex": "category",
                    "key": "category",
                    "type": Object,
                    "required": false,
                    width: 60,
                    listshow: true
                },
                {
                    "title": "其他业务单元",
                    "dataIndex": "table",
                    "key": "table",
                    "type": Object,
                    "required": false,
                    width: 60,
                    listshow: true
                },
                {"title": "是否必录", "dataIndex": "required", "key": "required", "required": false, "width": 60},
                {"title": "是否显示列表", "dataIndex": "listshow", "key": "listshow", "required": false, "width": 60},
            ]
        },
    },
]

const Columns1 = [
    {"title": "字段名称", "dataIndex": "dataIndex", "key": "dataIndex", "type": String, "required": true, width: 60},
    {"title": "字段别名", "dataIndex": "title", "key": "title", "type": String, "required": true, width: 60},
    {
        "title": "字段类型", "dataIndex": "type", "key": "type", "type": String, "required": true,
        f7: {
            source: "category", dataSource: ["String", "Number", "Boolean", "Object", "Array"]
        }
    },
    {
        "title": "数据来源", "dataIndex": "source", "key": "source", "type": Object, "required": true,
        f7: {
            source: "category",
            dataSource: [
                {value: "input", title: "手工输入"},
                {value: "other_busi", title: "其他业务单元"},
                {value: "category", title: "固定下拉列表"},
                {value: "attachment", title: "附件"},
                {value: "entity", title: "分录"},
            ]
        }
    },
    {
        "title": "固定列表", "dataIndex": "category", "key": "category", "type": Object, "required": false,
        f7: {
            source: "other_busi",
            query: "/api/generator/category/query",
            table: "category", columns: [
                {title: "枚举别名", dataIndex: "title", key: "title", type: String, required: true, width: 60},
                {title: "枚举名称", dataIndex: "dataIndex", key: "dataIndex", type: String, required: true, width: 60},
            ], showFiled: "title"
        }
    },
    {
        "title": "其他业务单元", "dataIndex": "table", "key": "table", "type": Object, "required": false,
        f7: {
            source: "other_busi",
            query: "/api/generator/table/query",
            table: "table", columns: [
                {title: "业务单元别名", dataIndex: "title", key: "title", type: String, required: true, width: 60},
                {title: "业务单元名称", dataIndex: "dataIndex", key: "dataIndex", type: String, required: true, width: 60},
            ], showFiled: "title"
        }
    },
    {"title": "显示字段", "dataIndex": "showFiled", "key": "showFiled", "type": String, "required": false, width: 60},
    {"title": "列表显示宽度", "dataIndex": "width", "key": "width", "type": String, "required": false, width: 60},
    {"title": "是否显示列表", "dataIndex": "listshow", "key": "listshow", "type": Boolean, "required": false, width: 60},
    {"title": "是否必录", "dataIndex": "required", "key": "required", "type": Boolean, "required": false, width: 60},
]

const Uri = {
    query: '/api/generator/table/query',
    remove: '/api/generator/table/remove',
    edit: '/api/generator/table/edit',
    create: '/api/generator/table/create'
}

export default class ModelDetail extends React.Component {
    constructor(props) {
        super(props)
        var selectItem = this.props.location.selectItem;
        this.state = {
            selectItem: selectItem ? selectItem : {}
        }
    }

    onEntityItemEdit = (dataIndex, entityItem) => {
        console.log("onEntityItemEdit", entityItem)
        this.setState({
            entityItem: entityItem,
            dataIndex: dataIndex,
            key: entityItem.key,
            visible: true,
        })
    }

    onEntityItemChange = (dataIndex, entityData) => {
        console.log("onEntityItemChange", entityData)
        this.state.selectItem[dataIndex] = entityData;
        this.setState({
            selectItem: this.state.selectItem,
        })
    }

    onSubmitSuccess = (data) => {
        if (!this.state.selectItem.hasOwnProperty(this.state.dataIndex)) {
            this.state.selectItem[this.state.dataIndex] = [];
            const tempData = [...this.state.selectItem[this.state.dataIndex], data]
            this.state.selectItem[this.state.dataIndex] = tempData;
        } else {
            const tempData = [...this.state.selectItem[this.state.dataIndex]]
            tempData[this.state.key] = data;
            this.state.selectItem[this.state.dataIndex] = tempData;
        }

        console.log("onSubmitSuccess", this.state.selectItem)
        this.setState({
            selectItem: this.state.selectItem,
            visible: false
        })
    }

    handleModalOk = () => {
        this.setState({
            visible: false,
        })
    }

    handleModalCancel = () => {
        this.setState({
            visible: false,
        })
    }

    render() {
        return (
          <Row gutter={24}>
              <Col span={24}>
                  <PageForm columns={Columns} uri={Uri} dataSource={{...this.state.selectItem}}
                            defaultParams={{projectId: localStorage.getItem("project")}}
                            onEntityItemEdit={this.onEntityItemEdit} onEntityItemChange={this.onEntityItemChange}/>
              </Col>
              <Modal visible={this.state.visible}
                     onOk={this.handleModalOk}
                     onCancel={this.handleModalCancel}
                     width={800}
                     destroyOnClose
                     footer={null}
              >
                  <PageForm columns={Columns1} dataSource={this.state.entityItem}
                            defaultParams={{projectId: localStorage.getItem("project")}}
                            onSubmitSuccess={this.onSubmitSuccess}/>
              </Modal>
          </Row>
        )
    }
}