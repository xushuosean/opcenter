<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#409EFF"
      unique-opened
      router
    >
      <!-- <template v-for="item in sideMeuns"> -->
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu
            :key="item.index"
            :index="item.index"
          >
            <template slot="title">
              <i :class="item.icon" /><span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu
                v-if="subItem.subs"
                :key="subItem.index"
                :index="subItem.index"
              >
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem,i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                >
                  {{ threeItem.title }}
                </el-menu-item>
              </el-submenu>
              <el-menu-item
                v-else
                :key="subItem.index"
                :index="subItem.index"
              >
                {{ subItem.title }}
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item
            :key="item.index"
            :index="item.index"
          >
            <i :class="item.icon" /><span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      collapse: false,
      items: [
        {
          permId: 'SysIndex',
          icon: 'el-icon-s-home',
          index: '/dashboard',
          title: '系统首页'
        },
        {
          permId: 'MerchantManage',
          icon: 'el-icon-s-shop',
          index: '/merchantManage',
          title: '商户与门店管理',
          subs: [
            {
              permId: 'MerchantManage:MerAdd',
              index: '/merchantManage/enter',
              title: '商户入驻'
            },
            {
              permId: 'MerchantManage:MerList',
              index: '/merchantManage/merchantList',
              title: '商户列表'
            },
            {
              permId: 'MerchantManage:ShopList',
              index: '/merchantManage/storeList',
              title: '门店列表'
            },
            {
              permId: 'MerchantManage:incomingList',
              index: '/merchantManage/entryList',
              title: '进件记录列表'
            }
          ]
        },
        {
          permId: 'CouponManage',
          icon: 'el-icon-s-ticket',
          index: '/ticketManage',
          title: '票券管理',
          subs: [
            {
              permId: 'CouponManage:CpnList',
              index: '/ticketManage/ticketList',
              title: '票券列表'
            },
            {
              permId: 'CouponManage:CpnAdd',
              index: '/ticketManage/createTicket',
              title: '创建票券'
            }
          ]
        },
        {
          permId: 'RpkManage',
          icon: 'el-icon-s-finance',
          index: '/redPacketManage',
          title: '红包管理',
          subs: [
            {
              permId: 'RpkManage:RpkList',
              index: '/redPacketManage/redPacketList',
              title: '红包列表'
            },
            {
              permId: 'RpkManage:RpkAdd',
              index: '/redPacketManage/createRedPacket',
              title: '创建红包'
            }
          ]
        },
        {
          permId: 'DiscountsPayManage',
          icon: 'el-icon-s-goods',
          index: '/discountPaymentManage',
          title: '优惠买单管理',
          subs: [
            {
              permId: 'DiscountsPayManage:DisPayList',
              index: '/discountPaymentManage/discountPaymentList',
              title: '优惠买单列表'
            },
            {
              permId: 'DiscountsPayManage:DisPayAdd',
              index: '/discountPaymentManage/createDiscountPayment',
              title: '创建优惠买单'
            }
          ]
        },
        {
          permId: 'CustomPolyManage',
          icon: 'el-icon-s-platform',
          index: '/customAggregation',
          title: '自定义聚合',
          subs: [
            {
              permId: 'CustomPolyManage:CustomPolyList',
              index: '/customAggregation/customAggregationList',
              title: '自定义聚合列表'
            },
            {
              permId: 'CustomPolyManage:CustomPolyAdd',
              index: '/customAggregation/createCustomAggregation',
              title: '创建自定义聚合'
            }
          ]
        },
        {
          permId: 'OrientGrantManage',
          icon: 'el-icon-s-release',
          index: '/targetedDistribution',
          title: '票券红包定向发放',
          subs: [
            {
              permId: 'OrientGrantManage:GrantCpnOrRpk',
              index: '/targetedDistribution/targetDistributeTicket',
              title: '发放票券或红包'
            },
            {
              permId: 'OrientGrantManage:GrantRecord',
              index: '/targetedDistribution/targetedDistributionRecords',
              title: '定向发放记录'
            },
            {
              permId: 'OrientGrantManage:GrantRecord',
              index: '/targetedDistribution/authorizeDistribution',
              title: '定向发放授权'
            }
          ]
        },
        {
          permId: 'AuditManage',
          icon: 'el-icon-s-order',
          index: '7',
          title: '审核管理',
          subs: [
            {
              permId: 'AuditManage:MerAddAudit',
              index: '/audit/MerchantImportAudit',
              title: '商户入驻审核'
            },
            {
              permId: 'AuditManage:MerUpdateAudit',
              index: '/audit/MerchantUpdateAudit',
              title: '商户变更审核'
            },
            {
              permId: 'AuditManage:MerRelationUpdateAudit',
              index: '/audit/MerchantRelationUpdateAudit',
              title: '商户关系变更审核'
            },
            {
              permId: 'AuditManage:ShopAddAudit',
              index: '/audit/ShopImportAudit',
              title: '门店新增审核'
            },
            {
              permId: 'AuditManage:ShopUpdateAudit',
              index: '/audit/ShopUpdateAudit',
              title: '门店变更审核'
            },
            {
              permId: 'AuditManage:ShopRelationUpdateAudit',
              index: '/audit/ShopRelationUpdateAudit',
              title: '门店状态变更审核'
            },
            {
              permId: 'AuditManage:CpnAddAudit',
              index: '/audit/TicketCreationAudit',
              title: '票券新增审核'
            },
            {
              permId: 'AuditManage:CpnUpdateAudit',
              index: '/audit/TicketUpdateAudit',
              title: '票券变更审核'
            },
            {
              permId: 'AuditManage:RpkAddAudit',
              index: '/audit/RedPacketCreationAudit',
              title: '红包新增审核'
            },
            {
              permId: 'AuditManage:RpkUpdateAudit',
              index: '/audit/RedPacketUpdateAudit',
              title: '红包变更审核'
            },

            {
              permId: 'AuditManage:DisPayAddAudit',
              index: '/audit/DiscountPayCreationAudit',
              title: '优惠买单新增审核'
            },
            {
              permId: 'AuditManage:DisPayUpdateAudit',
              index: '/audit/DiscountPayUpdateAudit',
              title: '优惠买单变更审核'
            },
            {
              permId: 'equity:mgm:fin:user:query',
              index: '/audit/DirectionalReleaseAudit',
              title: '定向发放审核'
            },
            // {
            //   permId: 'equity:mgm:fin:user:query',
            //   index: '/audit/CustomAggregationAudit',
            //   title: '自定义聚合审核'
            // },
            // {
            //   permId: 'equity:mgm:fin:user:query',
            //   index: '/audit/BroadcastAudit',
            //   title: '平台广播审核'
            // },
            // {
            //   permId: 'equity:mgm:fin:user:query',
            //   index: '/audit/ClientPageAudit',
            //   title: '用户端页面审核'
            // },
            {
              permId: 'AuditManage:OnlinePayRefundAudit',
              index: '/audit/OnlinePayRefundAudit',
              title: '在线买单退款审核'
            },
            {
              permId: 'AuditManage:VerifyCancelAudit',
              index: '/audit/RevokeVerifiAudit',
              title: '票券核销撤销审核'
            }
          ]
        },
        {
          permId: 'ClientIndexManage',
          icon: 'el-icon-s-management',
          index: '/contentManage',
          title: '内容管理',
          subs: [
            {
              permId: 'ClientIndexManage',
              index: '/contentManage/Broadcast',
              title: '平台广播'
            },
            {
              permId: 'ClientIndexManage',
              title: '用户端页面管理',
              icon: 'el-icon-s-management',
              index: '/contentManage/ClientPageManage/content'
              // subs: [
              //   {
              //     permId: 'equity:mgm:fin:user:query',
              //     index: '/contentManage/ClientPageManage/structure',
              //     title: '用户端页面结构管理'
              //   },
              //   {
              //     permId: 'equity:mgm:fin:user:query',
              //     index: '/contentManage/ClientPageManage/content',
              //     title: '用户端页面内容管理'
              //   }
              // ]
            }
          ]
        },
        {
          permId: 'ManageRecord',
          icon: 'el-icon-s-claim',
          index: '9',
          title: '经营记录',
          subs: [
            {
              permId: 'ManageRecord',
              index: '/manageRecord/OrderRecord',
              title: '订单记录'
            },
            {
              permId: 'ManageRecord',
              index: '/manageRecord/TicketVerifiRecord',
              title: '票券核销记录'
            }
          ]
        },

        {
          permId: 'SettleReport',
          index: '/acountStatement/AcountChecking',
          icon: 'el-icon-s-data',
          title: '对账结算报表',
          subs: [
            {
              permId: 'SettleReport',
              index: '/acountStatement/AcountChecking',
              title: '对账报表'
            },
            {
              permId: 'SettleReport',
              index: '/acountStatement/CreditAndCancelAcount',
              title: '挂销账报表'
            },
            {
              permId: 'SettleReport',
              index: '/acountStatement/ClearingStatement',
              title: '清分报表'
            },
            {
              permId: 'SettleReport',
              index: '/acountStatement/ToSettleStatement',
              title: '待结算报表'
            },
            {
              permId: 'SettleReport',
              index: '/tradeManagement/share/DispayShareReport',
              title: '优惠买单满减补贴分摊报表'
            }
          ]
        },

        {
          permId: 'AfterSaleManage',
          icon: 'el-icon-setting',
          index: '11',
          title: '售后管理',
          subs: [
            {
              permId: 'AfterSaleManage',
              index: '/afterSaleManage/RefundRecord',
              title: '退款记录'
            },
            {
              permId: 'AfterSaleManage',
              index: '/afterSaleManage/RevokeVerifi',
              title: '票券核销撤销'
            },
            {
              permId: 'AfterSaleManage',
              index: '/afterSaleManage/OnlinePayRefund',
              title: '在线买单退款'
            }
          ]
        },
        {
          permId: 'SystemManage',
          icon: 'el-icon-user',
          index: '12',
          title: '系统管理',
          subs: [
            {
              permId: 'SystemManage',
              index: '/systemManage/AcountManage',
              title: '账号管理'
            },
            {
              permId: 'SystemManage',
              index: '/systemManage/RoleManage',
              title: '角色管理'
            },
            {
              permId: 'SystemManage',
              index: '/systemManage/OrgnizationManage',
              title: '机构管理'
            },
            {
              permId: 'SystemManage',
              index: '/systemManage/SiteManage',
              title: '站点管理'
            },
            {
              permId: 'SystemManage',
              index: '/systemManage/AreaManage',
              title: '地区管理'
            },
            {
              permId: 'SystemManage',
              index: '/systemManage/BussinessAreaManage',
              title: '商圈管理'
            },
            {
              permId: 'SystemManage',
              index: '/systemManage/CategoryManage',
              title: '门店类别管理'
            },
            {
              permId: 'SystemManage',
              index: '/systemManage/MenuManage',
              title: '菜单管理'
            }
          ]
        },
        {
          permId: 'AfterSaleManage',
          icon: 'el-icon-search',
          index: '13',
          title: '搜索管理',
          subs: [
            {
              permId: 'AfterSaleManage',
              index: '/searchManage/UserHistory',
              title: '用户搜索历史'
            },
            {
              permId: 'AfterSaleManage',
              index: '/searchManage/HotWord',
              title: '热门搜索词管理'
            },
            {
              permId: 'AfterSaleManage',
              index: '/searchManage/Synonyms',
              title: '搜索同义词管理'
            },
            {
              permId: 'AfterSaleManage',
              index: '/searchManage/Dict',
              title: '索引分词管理'
            },
            {
              permId: 'AfterSaleManage',
              index: '/searchManage/SearchTemplate',
              title: '搜索模板配置'
            }
          ]
        }
      ]
    }
  },
  computed: {
    ...mapGetters('commonData', ['permissionList']),
    // 筛选后的菜单列表
    sideMeuns() {
      let menus = this.items.map(e => this.mapTree(e, 'icon', 'index', 'title', 'subs'))
      return menus.filter(e => e.index !== undefined)
    },
    onRoutes() {
      if (this.handleDeepRoute()) {
        return this.handleDeepRoute()
      } else {
        return this.$route.path
      }
    }
  },
  methods: {
    handleCollapse(msg) {
      this.collapse = msg
    },
    // 多级路由不匹配侧边栏active的问题
    handleDeepRoute() {
      let currentRoute = ''
      const deepRoute = ['/merchantManage/enter', '/ticketManage/createTicket', '/redPacketManage/createRedPacket', '/discountPaymentManage/createDiscountPayment', '/customAggregation/createCustomAggregation']
      deepRoute.map(e => {
        const hasRoute = this.$route.path.includes(e)
        if (hasRoute) {
          currentRoute = e
        }
      })
      return currentRoute
    },
    // 筛选登录用户菜单列表
    mapTree(tree, icon, index, title, subs) {
      const hasChildren = Array.isArray(tree[subs]) && tree[subs].length > 0
      if (this.permissionList.includes(tree.permId)) {
        let commonItem = {
          index: tree[index],
          title: tree[title]
        }
        if (tree.icon) {
          commonItem[icon] = tree[icon]
        }
        if (hasChildren) {
          commonItem[subs] = hasChildren ? tree[subs].map(e => this.mapTree(e, icon, index, title, subs)) : []
          // 过滤空值
          commonItem[subs] = commonItem[subs].filter(e => e.index !== undefined)
        }
        return commonItem
      }
      return {}
    }
  }
}
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 60px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 200px;
}
.sidebar > ul {
  height: 100%;
}
</style>
