const CategoryModel = {
    table: {
        title: "分类",
        dataIndex: "category",
        addNew: {title: "新增", isMenu: false}
    },
    group: {title: "分类管理", dataIndex: "category"},
    columns: [
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
            listshow: false,
            required: false,
            f7: {
                "columns": [
                    {
                        "title": "枚举名称",
                        "dataIndex": "dataIndex",
                        "key": "dataIndex",
                        type: String,
                        "required": true,
                        "width": 60
                    },
                    {
                        "title": "枚举别名",
                        "dataIndex": "title",
                        "key": "title",
                        type: String,
                        "required": true,
                        "width": 60
                    },
                    {"title": "枚举值", "dataIndex": "value", "key": "value", type: String, "required": true, "width": 60},
                ]
            },
        },
    ]
}

module.exports = {
    CategoryModel: CategoryModel
}