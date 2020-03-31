export default [
  {
    title: '管理员管理',
    key: '1',
    path:'/box/root'
  },
  {
    title: '用户管理',
    key: '2',
    path:'/box/user'
  },
  {
    title: '商品管理',
    key: '3',
    path:'/box',
    children:[
      {
        title:'商品添加',
        key:'3-1',
        path:'/box/goodsadd'
      },
      {
        title:'商品列表',
        key:'3-2',
        path:'/box/goodslist'
      }
    ]
  },
  {
    title: '商品分类管理',
    key: '4',
    path:'/box/goodskind' ,
    children:[
      {
        title:'商品分类列表',
        key:'4-1',
        path:'/box/classifylist'
      },
    ]
  },
   {
    title: '广告管理',
    key: '5',
    path:'/box/advertisement'
  },
  {
    title:'个人设置',
    key: '7',
    path:'/box/mysetting'
  }

]