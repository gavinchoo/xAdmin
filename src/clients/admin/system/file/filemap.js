export const Columns = [
    {title: '创建人', dataIndex: 'userid',key: 'userid', type: String, width: 150, required: true, f7: undefined, listshow:true},
    {title: '文件名', dataIndex: 'filename',key: 'filename', type: String, width: 150, required: true, f7: undefined, listshow:true},
    {title: '文件后缀', dataIndex: 'ext',key: 'ext', type: String, width: 150, required: true, f7: undefined, listshow:true},
    {title: '文件路径', dataIndex: 'path',key: 'path', type: String, width: 150, required: true, f7: undefined, listshow:true},
    {title: '文件大小', dataIndex: 'size',key: 'size', type: Number, width: 150, required: true, f7: undefined, listshow:true},
    {title: '原名', dataIndex: 'originalname',key: 'originalname', type: String, width: 150, required: undefined, f7: undefined, listshow:true},
    {title: '类型', dataIndex: 'mimetype',key: 'mimetype', type: Object, width: 150, required: undefined, f7: {"source":"category","table":"mimetype","query":"/api/v1/mimetype/query"}, listshow:true},

]

export const Uri = {
    query: '/api/common/file/query',
    remove: '/api/common/file/remove',
    edit: '/api/v1/common/edit',
    create: '/api/common/file/create'
}