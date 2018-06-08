import React from 'react'

import PageForm from '../../../common/ui/component/pageform'

const Columns = [
    {
        title: '枚举名称',
        dataIndex: 'dataIndex',
        key: 'dataIndex',
        type: String,
        required: true,
    },
    {
        title: '枚举别名',
        dataIndex: 'title',
        key: 'title',
        type: String,
        required: true,
    },
    {
        title: '枚举项',
        dataIndex: 'subitems',
        key: 'subitems',
        type: Array,
        required: false,
        f7: {
            "columns": [
                {"title": "枚举名称", "dataIndex": "dataIndex", "key": "dataIndex", "required": true, "width": 60},
                {"title": "枚举别名", "dataIndex": "title", "key": "title", "required": true, "width": 60},
                {"title": "枚举值", "dataIndex": "value", "key": "value", "required": true, "width": 60},
            ]
        },
    },
]

const Uri = {
    query: '/api/generator/category/query',
    remove: '/api/generator/category/remove',
    edit: '/api/generator/category/edit',
    create: '/api/generator/category/create'
}

export default class CategoryDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectItem: this.props.location.selectItem
        }
    }

    onTableEditClick = (item) => {
        this.setState({
            selectItem: item,
        })
    }

    onTableDelClick = (item) => {
        this.removeItem(item);
    }

    render() {
        return (
          <div style={{width: '95%', marginRight: 'auto', marginLeft: 'auto'}}>
              <PageForm columns={Columns} uri={Uri} dataSource={this.state.selectItem}
                        defaultParams={{projectId: localStorage.getItem("project")}}/>
          </div>
        )
    }
}