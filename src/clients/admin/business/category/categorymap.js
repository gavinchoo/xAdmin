export const Columns = [
    {title: '枚举名称', dataIndex: 'dataIndex',key: 'dataIndex', type: String, width: 150, required: true, f7: undefined, listshow:true},
    {title: '枚举别名', dataIndex: 'title',key: 'title', type: String, width: 150, required: true, f7: undefined, listshow:true},
    {title: '枚举项', dataIndex: 'subitems',key: 'subitems', type: Array, width: 150, required: false, f7: {"columns":[{"title":"枚举名称","dataIndex":"dataIndex","key":"dataIndex","required":true,"width":60},{"title":"枚举别名","dataIndex":"title","key":"title","required":true,"width":60},{"title":"枚举值","dataIndex":"value","key":"value","required":true,"width":60}]}, listshow:false},

]

export const Uri = {
    query: '/api/v1/category/query',
    remove: '/api/v1/category/remove',
    edit: '/api/v1/category/edit',
    create: '/api/v1/category/create'
}