export const Columns = [
    {title: '名称', dataIndex: 'title',key: 'title', type: String, width: 150, required: true, f7: undefined, listshow:true},
    {title: '分类', dataIndex: 'category',key: 'category', type: Object, width: 150, required: true, f7: {"source":"category","table":"category","group":"category","value":"productcategory","columns":[{"title":"枚举别名","dataIndex":"title","key":"title","required":true,"width":60},{"title":"枚举名称","dataIndex":"dataIndex","key":"dataIndex","required":true,"width":60}],"showFiled":"title","query":"/api/v1/category/query"}, listshow:true},
    {title: '供应商', dataIndex: 'supply',key: 'supply', type: Object, width: 150, required: true, f7: {"source":"other_busi","table":"supply","group":"productmanage","columns":[{"dataIndex":"number","title":"编号","type":"String","source":{"value":"input","title":"手工输入","_id":"5b18c174f47378255cd0d39f"},"listshow":true,"required":true,"_id":"5b18c174f47378255cd0d39e"},{"dataIndex":"title","title":"供应商名称","type":"String","source":{"value":"input","title":"手工输入","_id":"5b18c174f47378255cd0d39d"},"listshow":true,"required":true,"_id":"5b18c174f47378255cd0d39c"}],"showFiled":"title","query":"/api/v1/supply/query"}, listshow:true},

]

export const Uri = {
    query: '/api/v1/product/query',
    remove: '/api/v1/product/remove',
    edit: '/api/v1/product/edit',
    create: '/api/v1/product/create'
}