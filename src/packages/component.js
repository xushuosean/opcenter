export default [
  {
    name: '容器组件',
    child: [
      {
        name: '区块容器1',
        component: 'indexEmptyList',
        container: true
      },
      {
        name: '区块容器2',
        component: 'indexEmptyBetween',
        container: true
      },
      {
        name: '区块容器3',
        component: 'indexRecommendBox',
        container: true
      },
      {
        name: '商家列表容器',
        component: 'storeListScrollBox',
        container: true
      },
      {
        name: '优惠券列表容器',
        component: 'couponListScrollBox',
        container: true
      }
    ]
  }, {
    name: '功能组件',
    child: [
      {
        name: '搜索框组件',
        component: 'indexSearch'
      },
      {
        name: '轮播图组件',
        component: 'indexBanner'
      },
      {
        name: '列表单元组件',
        component: 'indexListItem'
      },
      {
        name: '券入口组件',
        component: 'indexCouponEntry'
      },
      {
        name: '券组件',
        component: 'indexCouponItem'
      },
      {
        name: '商户组件',
        component: 'discountStoreItem'
      },
      {
        name: '查看更多组件',
        component: 'indexLookMore'
      },
      {
        name: '营销活动入口组件',
        component: 'indexActivityEntry'
      }
    ]
  }, {
    name: '辅助组件',
    child: [
      {
        name: '下拉筛选组件',
        component: 'dropDownMenu'
      }
    ]
  }
]

