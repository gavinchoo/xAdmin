import ListProduct from './productmanage/productlist'
import AddProduct from './productmanage/productadd'
import ListSupply from './productmanage/supplylist'
import AddSupply from './productmanage/supplyadd'
import ListCategory from './category/categorylist'
import AddCategory from './category/categoryadd'


const route = {
    productmanage: {title: '商品管理',path: '/productmanage',icon: 'appstore-o',child: [
        {path: '/product', title: '商品', component: ListProduct, isMenu: true, editable: true},
        {path: '/product_add', title: '新增', component: AddProduct, isMenu: false, editable: false},
        {path: '/supply', title: '供应商', component: ListSupply, isMenu: true, editable: true},
        {path: '/supply_add', title: '新增', component: AddSupply, isMenu: false, editable: false},
]},
    category: {title: '分类管理',path: '/category',icon: 'appstore-o',child: [
        {path: '/category', title: '分类', component: ListCategory, isMenu: true, editable: true},
        {path: '/category_add', title: '新增', component: AddCategory, isMenu: false, editable: false},
]},

}

module.exports = {
    route: route
}