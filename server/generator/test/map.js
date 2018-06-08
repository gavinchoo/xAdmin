/**
 *  UI规则定义：
 *  1. table:    数据库表，
 *               1) addNew 标识需要创建新增页面。
 *               2) isMenu {true, false} = {在菜单上显示，在列表右上角显示添加按钮}
 *  2. group:    生成的代码数据分组，相同分组的代码会创建在同一个文件夹下。
 *  3. columns:  字段集合。
 *  4. required：标记为true的字段必须输入，值不能为空。
 *  5. listshow：是否在列表页面显示。
 *  6. width：   列表项显示宽度。
 *  6. type：    数据类型，
 *  7  f7:       数据操作，
 *               1）当为f7 存在table字段时， 会解析为查询数据源。
 *               此时f7:   查询数据源，{table， group, columns, show} = {表名，表分组，查询列表显示的字段，选择后显示的字段}
 *               2）当为f7 存在upload字段时， 会解析为文档附件数据。
 *               此时f7:  {upload, download} = {文件上传地址，文件下载地址}
 *               3）当为f7 只存在columns字段时， 会解析为分录数据。
 *               此时f7:  {columns} = {分录列表字段}
 *
 *  DB规则定义：
 *  1. table:    数据库表，
 *  2. type：    数据类型，依赖f7定义，
 *  3. required：标记为true的字段必须输入，值不能为空。
 *  4. f7:       定义字表字段类型，
 *               1) 当为f7 存在table字段时,会解析为该字段类型为引用外部表，根据table,group字段引用对应的表。
 *               2) 当为f7 存在upload字段时,会解析为该字段类型为引用附件表，根据table,group字段引用对应的表。
 *               3) 当为f7 只存在columns字段时,会解析为该字段类型为内部表，直接创建内部表结构。
 */
const map = [
    {
        table: {title: "货品管理", dataIndex: "product", addNew: {title: "新增货品", isMenu: true}},
        group: {title: "商品管理", dataIndex: "product"},
        columns: [
            {title: "商店编号", dataIndex: "shop_id", type: String, required: true, listshow: true},
            {title: "产品名称", dataIndex: "title", type: String, required: true, width: 150, listshow: true},
            {
                title: "产品类型",
                dataIndex: "type",
                type: Object,
                // 1. [...] 数组说明是静态列表数据， 直接下拉选择。
                // 2. {...} 对象类型说明是查询数据， 查询后弹框显示。
                f7: {
                    source: "other_busi",
                    table: "category", group: "product", columns: [
                        {title: "编号", dataIndex: "_id", key: "_id", type: String, required: true, width: 60},
                        {title: "分类名称", dataIndex: "title", key: "title", type: String, required: true, width: 60},
                    ], showFiled: "title"
                }
                , listshow: true
            },
            {title: "原价", dataIndex: "price", type: String, width: 150, listshow: true},
            {title: "数量", dataIndex: "quantity", type: String, width: 150, listshow: true},
            {title: "创建时间", dataIndex: "create_time", type: Date, width: 200, listshow: true},
            {
                title: "附件",
                dataIndex: "movie",
                type: Array,
                width: 150,
                f7: {
                    source: "attachment",
                    table: "file",
                    group: "file",
                    upload: "/api/file/upload",
                    download: "/api/file/download",
                    remove: "/api/file/remove"
                }
            },
        ]
    },
    {
        table: {title: "分类管理", dataIndex: "category", addNew: {title: "新增分类", isMenu: false}},
        group: {title: "商品管理", dataIndex: "product"},
        columns: [
            {
                title: "父级编号", dataIndex: "pid", type: String, required: false,
                f7: {
                    table: "category", group: "product", columns: [
                        {title: "编号", dataIndex: "_id", key: "_id", type: String, required: true, width: 60},
                        {title: "分类名称", dataIndex: "title", key: "title", type: String, required: true, width: 60},
                    ], showFiled: "title", valueFiled: "_id"
                }
            },
            {title: "分类名称", dataIndex: "title", type: String, required: true, listshow: true},
            {title: "图标", dataIndex: "image", type: String, required: false},
            {title: "排序", dataIndex: "sort", type: String, required: false},
            {
                title: "下级分类", dataIndex: "child", type: Array, required: false,
                f7: {
                    source: "entity",
                    columns: [
                        {title: "编号", dataIndex: "_id", key: "_id", type: String, required: true, width: 60},
                        {title: "分类名称", dataIndex: "title", key: "title", type: String, required: true, width: 60},
                    ]
                }
            },
        ]
    },
    {
        table: {title: "文件列表", dataIndex: "file"},
        group: {title: "文件管理", dataIndex: "file"},
        columns: [
            {title: "创建人", dataIndex: "userid", type: String, required: true},
            {title: "文件名", dataIndex: "filename", type: String, required: true},
            {title: "文件后缀", dataIndex: "ext", type: String, required: true},
            {title: "文件路径", dataIndex: "path", type: String, required: true},
            {title: "文件大小", dataIndex: "size", type: Number, required: true},
            {title: "原名", dataIndex: "originalname", type: String},
            {
                title: "类型", dataIndex: "mimetype", type: Object,
                f7: {
                    source: "category",
                    table: "mimetype"
                }
            }
        ]
    }
]

module.exports = map