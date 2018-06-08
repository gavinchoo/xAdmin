export const Columns = [
    {title: '编号', dataIndex: 'number',key: 'number', type: String, width: 150, required: true, f7: undefined, listshow:true},
    {title: '供应商名称', dataIndex: 'title',key: 'title', type: String, width: 150, required: true, f7: undefined, listshow:true},

]

export const Uri = {
    query: '/api/v1/supply/query',
    remove: '/api/v1/supply/remove',
    edit: '/api/v1/supply/edit',
    create: '/api/v1/supply/create'
}