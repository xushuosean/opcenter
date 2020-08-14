import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/mobileView',
      component: () => import(/* webpackChunkName: "mobileView"*/ '@com/mobileClientPages/mobileClientView/deep-wrap.vue')
    },
    {
      path: '/',
      component: () => import(/* webpackChunkName: "home"*/ '@views/home/home.vue'),
      redirect: '/dashboard',
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import(/* webpackChunkName: "dashboard"*/ '@views/dashBoard/dashBoard.vue'),
          meta: {
            title: '系统首页'
          }
        }
      ]
    },
    {
      path: '/merchantManage',
      name: 'merchantManage',
      component: () => import(/* webpackChunkName: "home"*/ '@views/home/home.vue'),
      redirect: '/merchantManage/merchantList',
      meta: {
        title: '商户与门店管理'
      },
      children: [
        {
          path: '/merchantManage/enter',
          component: () => import(/* webpackChunkName: "enter"*/ '@views/merchantManage/enter/enter.vue'),
          redirect: '/merchantManage/enter/merchantBaseInfo',
          name: 'enter',
          meta: {
            title: '商户入驻'
          },
          children: [
            {
              path: '/merchantManage/enter/merchantBaseInfo',
              component: () => import(/* webpackChunkName: "merchantBaseInfo"*/ '@views/merchantManage/enter/merchantBaseInfo.vue'),
              name: 'merchantBaseInfo',
              meta: {
                title: '商户基本信息'
              }
            },
            {
              path: '/merchantManage/enter/merchantSettleAccount',
              component: () => import(/* webpackChunkName: "merchantSettleAccount"*/ '@views/merchantManage/enter/merchantSettleAccount.vue'),
              name: 'merchantSettleAccount',
              meta: {
                title: '商户结算信息及签约交易类型'
              }
            },
            {
              path: '/merchantManage/enter/merchantPictureResource',
              component: () => import(/* webpackChunkName: "merchantPictureResource"*/ '@views/merchantManage/enter/merchantPictureResource.vue'),
              name: 'merchantPictureResource',
              meta: {
                title: '商户结算信息及签约交易类型'
              }
            },
            {
              path: '/merchantManage/enter/merchantStores',
              component: () => import(/* webpackChunkName: "merchantStores"*/ '@views/merchantManage/enter/merchantStores.vue'),
              name: 'merchantStores',
              meta: {
                title: '新增商户下属门店'
              }
            },
            {
              path: '/merchantManage/enter/merchantStores/add',
              component: () => import(/* webpackChunkName: "merchantStoresAdd"*/ '@views/merchantManage/enter/merchantStoreAdd.vue'),
              name: 'merchantStoresAdd',
              meta: {
                title: '新增门店'
              }
            },
            {
              path: '/merchantManage/enter/merchantResultAudit',
              component: () => import(/* webpackChunkName: "merchantResultAudit"*/ '@views/merchantManage/enter/merchantResultAudit.vue'),
              name: 'merchantResultAudit',
              meta: {
                title: '确认提交审核'
              }
            }
          ]
        },
        {
          path: '/merchantManage/merchantList',
          name: 'merchantList',
          component: () => import(/* webpackChunkName: "merchantList"*/ '@views/merchantManage/merchantList.vue'),
          meta: {
            title: '商户列表'
          }
        },
        {
          path: '/merchantManage/merchantRelation',
          name: 'merchantRelation',
          component: () => import(/* webpackChunkName: "merchantRelation"*/ '@views/merchantManage/enter/merchantRelation.vue'),
          meta: {
            title: '商户关联关系'
          }
        },
        {
          path: '/merchantManage/merchantListDetail',
          name: 'merchantListDetail',
          component: () => import(/* webpackChunkName: "merchantListDetail"*/ '@views/merchantManage/merchantListDetail.vue'),
          meta: {
            title: '商户详情'
          }
        },
        {
          path: '/merchantManage/merchantList/detailAudit',
          component: () => import(/* webpackChunkName: "merchantDetailAudit"*/ '@views/merchantManage/enter/merchantResultAudit.vue'),
          name: 'merchantDetailAudit',
          meta: {
            title: '修改商户信息'
          }
        },
        {
          path: '/merchantManage/storeList',
          name: 'storeList',
          component: () => import(/* webpackChunkName: "storeList"*/ '@views/merchantManage/storeList.vue'),
          meta: {
            title: '门店列表'
          }
        },
        {
          path: '/merchantManage/storeListDetail',
          name: 'storeListDetail',
          component: () => import(/* webpackChunkName: "storeListDetail"*/ '@views/merchantManage/storeListDetail.vue'),
          meta: {
            title: '门店详情'
          }
        },
        {
          path: '/merchantManage/storeList/merchantStoreAdd',
          name: 'merchantStoreAdd',
          component: () => import(/* webpackChunkName: "merchantStoreAdd"*/ '@views/merchantManage/enter/merchantStoreAdd.vue'),
          meta: {
            title: '新增门店'
          }
        },
        {
          path: '/merchantManage/entryList',
          name: 'entryList',
          component: () => import(/* webpackChunkName: "entryList"*/ '@views/merchantManage/entryList.vue'),
          meta: {
            title: '进件记录列表'
          }
        }
      ]
    },
    {
      path: '/ticketManage',
      name: 'ticketManage',
      redirect: '/ticketManage/ticketList',
      meta: {
        title: '票券管理'
      },
      component: () => import(/* webpackChunkName: "home"*/ '@views/home/home.vue'),
      children: [
        {
          path: '/ticketManage/createTicket',
          component: () => import(/* webpackChunkName: "createTicket"*/ '@views/ticketManage/createTicket/createTicket.vue'),
          redirect: '/ticketManage/createTicket/createTicket',
          name: 'createTicket',
          meta: {
            title: '创建票券'
          },
          children: [
            {
              path: '/ticketManage/createTicket/createTicket',
              component: () => import(/* webpackChunkName: "createTicketBaseInfo"*/ '@views/ticketManage/createTicket/createTicketBaseInfo.vue'),
              name: 'createTicketBaseInfo'
              // meta: {
              //   title: '票券基本信息'
              // }
            },
            {
              path: '/ticketManage/createTicket/createTicketShow',
              component: () => import(/* webpackChunkName: "createTicketShow"*/ '@views/ticketManage/createTicket/createTicketShow.vue'),
              name: 'createTicketShow',
              meta: {
                title: '优惠券展示图'
              }
            },
            {
              path: '/ticketManage/createTicket/createTicketRules',
              component: () => import(/* webpackChunkName: "createTicketRules"*/ '@views/ticketManage/createTicket/createTicketRules.vue'),
              name: 'createTicketRules',
              meta: {
                title: '配置票券时间分摊规则及结算模式'
              }
            },
            {
              path: '/ticketManage/createTicket/createTicketActivityMessage',
              component: () => import(/* webpackChunkName: "createTicketActivityMessage"*/ '@views/ticketManage/createTicket/createTicketActivityMessage.vue'),
              name: 'createTicketActivityMessage',
              meta: {
                title: '活动信息配置'
              }
            },
            {
              path: '/ticketManage/createTicket/createTicketResultAudit',
              component: () => import(/* webpackChunkName: "createTicketResultAudit"*/ '@views/ticketManage/createTicket/createTicketResultAudit.vue'),
              name: 'createTicketResultAudit',
              meta: {
                title: '确认提交审核'
              }
            }
          ]
        },
        {
          path: '/ticketManage/ticketList',
          name: 'ticketList',
          component: () => import(/* webpackChunkName: "ticketList"*/ '@views/ticketManage/ticketList.vue'),
          meta: {
            title: '票券列表'
          }
        }
      ]
    },
    {
      path: '/redPacketManage',
      name: 'redPacketManage',
      component: () => import(/* webpackChunkName: "home"*/ '@views/home/home.vue'),
      redirect: '/redPacketManage/redPacketList',
      meta: {
        title: '红包管理'
      },
      children: [
        {
          path: '/redPacketManage/createRedPacket',
          component: () => import(/* webpackChunkName: "createRedPacket"*/ '@views/redPacketManage/createRedPacket/createRedPacket.vue'),
          redirect: '/redPacketManage/createRedPacket/createRedPacketBaseInfo',
          name: 'createRedPacket',
          meta: {
            title: '创建红包'
          },
          children: [
            {
              path: '/redPacketManage/createRedPacket/createRedPacketBaseInfo',
              component: () => import(/* webpackChunkName: "createRedPacketBaseInfo"*/ '@views/redPacketManage/createRedPacket/createRedPacketBaseInfo.vue'),
              name: 'createRedPacketBaseInfo',
              meta: {
                title: '红包基本信息'
              }
            },
            {
              path: '/redPacketManage/createRedPacket/createRedPacketShow',
              component: () => import(/* webpackChunkName: "createRedPacketShow"*/ '@views/redPacketManage/createRedPacket/createRedPacketShow.vue'),
              name: 'createRedPacketShow'
            },
            {
              path: '/redPacketManage/createRedPacket/createRedPacketRules',
              component: () => import(/* webpackChunkName: "createRedPacketRules"*/ '@views/redPacketManage/createRedPacket/createRedPacketRules.vue'),
              name: 'createRedPacketRules'
            },
            {
              path: '/redPacketManage/createRedPacket/createRedPacketActivityMessage',
              component: () => import(/* webpackChunkName: "createRedPacketActivityMessage"*/ '@views/redPacketManage/createRedPacket/createRedPacketActivityMessage.vue'),
              name: 'createRedPacketActivityMessage'
            },
            {
              path: '/redPacketManage/createRedPacket/createRedPacketResultAudit',
              component: () => import(/* webpackChunkName: "createRedPacketResultAudit"*/ '@views/redPacketManage/createRedPacket/createRedPacketResultAudit.vue'),
              name: 'createRedPacketResultAudit'
            }
          ]
        },
        {
          path: '/redPacketManage/redPacketList',
          name: 'redPacketList',
          component: () => import(/* webpackChunkName: "redPacketList"*/ '@views/redPacketManage/redPacketList.vue'),
          meta: {
            title: '红包列表'
          }
        }
      ]
    },
    // 审核管理栏目
    {
      path: '/discountPaymentManage',
      name: 'discountPaymentManage',
      component: () => import(/* webpackChunkName: "home"*/ '@views/home/home.vue'),
      redirect: '/discountPaymentManage/discountPaymentList',
      meta: {
        title: '优惠买单管理'
      },
      children: [
        {
          path: '/discountPaymentManage/createDiscountPayment',
          component: () => import(/* webpackChunkName: "createDiscountPayment"*/ '@views/discountPaymentManage/createDiscountPayment/createDiscountPayment.vue'),
          redirect: '/discountPaymentManage/createDiscountPayment/createDiscountPaymentBaseInfo',
          name: 'createDiscountPayment',
          meta: {
            title: '创建优惠买单'
          },
          children: [
            {
              path: '/discountPaymentManage/createDiscountPayment/createDiscountPaymentBaseInfo',
              component: () => import(/* webpackChunkName: "createDiscountPaymentBaseInfo"*/ '@views/discountPaymentManage/createDiscountPayment/createDiscountPaymentBaseInfo.vue'),
              name: 'createDiscountPaymentBaseInfo',
              meta: {
                title: '优惠买单基本信息'
              }
            },
            {
              path: '/discountPaymentManage/createDiscountPayment/createDiscountPaymentRules',
              component: () => import(/* webpackChunkName: "createDiscountPaymentRules"*/ '@views/discountPaymentManage/createDiscountPayment/createDiscountPaymentRules.vue'),
              name: 'createDiscountPaymentRules',
              meta: {
                title: '配置时间分摊规则及结算模式'
              }
            },
            {
              path: '/discountPaymentManage/createDiscountPayment/createDiscountPaymentResultAudit',
              component: () => import(/* webpackChunkName: "createDiscountPaymentResultAudit"*/ '@views/discountPaymentManage/createDiscountPayment/createDiscountPaymentResultAudit.vue'),
              name: 'createDiscountPaymentResultAudit',
              meta: {
                title: '确认提交审核'
              }
            }
          ]
        },
        {
          path: '/discountPaymentManage/discountPaymentList',
          name: 'discountPaymentList',
          component: () => import(/* webpackChunkName: "discountPaymentList"*/ '@views/discountPaymentManage/discountPaymentList.vue'),
          meta: {
            title: '优惠买单列表'
          }
        },
        {
          path: '/discountPaymentManage/discountPayDetail',
          name: 'discountPayDetail',
          component: () => import(/* webpackChunkName: "discountPayDetail"*/ '@views/discountPaymentManage/discountPayDetail.vue'),
          meta: {
            title: '优惠买单详情'
          }
        },
        {
          path: '/discountPaymentManage/discountPaymentModify',
          name: 'discountPaymentModify',
          component: () => import(/* webpackChunkName: "discountPayDetail"*/ '@views/discountPaymentManage/discountPaymentModify.vue'),
          meta: {
            title: '优惠买单变更'
          }
        }
      ]
    },
    {
      path: '/customAggregation',
      name: 'customAggregation',
      component: () => import(/* webpackChunkName: "home"*/ '@views/home/home.vue'),
      redirect: '/customAggregation/customAggregationList',
      meta: {
        title: '自定义聚合'
      },
      children: [
        {
          path: '/customAggregation/createCustomAggregation',
          component: () => import(/* webpackChunkName: "createCustomAggregation"*/ '@views/customAggregation/createCustomAggregation/createCustomAggregation.vue'),
          redirect: '/customAggregation/createCustomAggregation/createCustomAggregationBaseInfo',
          name: 'createCustomAggregation',
          meta: {
            title: '创建自定义聚合 '
          },
          children: [
            {
              path: '/customAggregation/createCustomAggregation/createCustomAggregationBaseInfo',
              component: () => import(/* webpackChunkName: "createCustomAggregationBaseInfo"*/ '@views/customAggregation/createCustomAggregation/createCustomAggregationBaseInfo.vue'),
              name: 'createCustomAggregationBaseInfo',
              meta: {
                title: '自定义聚合基本信息'
              }
            },
            {
              path: '/customAggregation/createCustomAggregation/createCustomAggregationResultAudit',
              component: () => import(/* webpackChunkName: "createCustomAggregationResultAudit"*/ '@views/customAggregation/createCustomAggregation/createCustomAggregationResultAudit.vue'),
              name: 'createCustomAggregationResultAudit',
              meta: {
                title: '确认创建'
              }
            }
          ]
        },
        {
          path: '/customAggregation/customAggregationList',
          name: 'customAggregationList',
          component: () => import(/* webpackChunkName: "customAggregationList"*/ '@views/customAggregation/customAggregationList.vue'),
          meta: {
            title: '自定义聚合列表'
          }
        },
        {
          path: '/customAggregation/customAggregationDetail',
          name: 'customAggregationDetail',
          component: () => import(/* webpackChunkName: "customAggregationList"*/ '@views/customAggregation/customAggregationDetail.vue'),
          meta: {
            title: '自定义聚合详情'
          }
        }
      ]
    },
    {
      path: '/targetedDistribution',
      name: 'targetedDistribution',
      component: () => import(/* webpackChunkName: "home"*/ '@views/home/home.vue'),
      redirect: '/targetedDistribution/targetedDistributionRecords',
      meta: {
        title: '票券红包定向发放'
      },
      children: [
        {
          path: '/targetedDistribution/targetDistributeTicket',
          name: 'targetDistributeTicket',
          component: () => import(/* webpackChunkName: "targetDistributeTicket"*/ '@views/targetedDistribution/targetDistributeTicket.vue'),
          meta: {
            title: '发放票券或红包'
          }
        },
        {
          path: '/targetedDistribution/targetedDistributionRecords',
          name: 'targetedDistributionRecords',
          component: () => import(/* webpackChunkName: "targetedDistributionRecords"*/ '@views/targetedDistribution/targetedDistributionRecords.vue'),
          meta: {
            title: '定向发放记录'
          }
        },
        {
          path: '/targetedDistribution/authorizeDistribution',
          name: 'authorizeDistribution',
          component: () => import(/* webpackChunkName: "authorizeDistribution"*/ '@views/targetedDistribution/authorizeDistribution.vue'),
          meta: {
            title: '定向发放授权'
          }
        },
        // 新增授权定向发放
        {
          path: '/targetedDistribution/newAuthorizeDistribution',
          name: 'authorizeDistribution',
          component: () => import(/* webpackChunkName: "newAuthorizeDistribution"*/ '@views/targetedDistribution/newAuthorizeDistribution.vue'),
          meta: {
            title: '新增定向发放授权'
          }
        }
      ]
    },
    {
      path: '/audit',
      name: 'audit',
      component: () => import(/* webpackChunkName: "home"*/ '@views/home/home.vue'),
      redirect: '/audit/MerchantImportAudit',
      meta: {
        title: '审核管理'
      },
      children: [
        {
          path: '/audit/MerchantImportAudit',
          component: () => import(/* webpackChunkName: "MerchantImportAudit"*/ '@views/audit/MerchantImportAudit.vue'),
          name: 'MerchantImportAudit',
          meta: {
            title: '商户入驻审核'
          }
        },
        {
          path: '/audit/merchantImportAudit/MerchantImportAuditF',
          component: () => import(/* webpackChunkName: "merchantImportAudit/MerchantImportAuditF"*/ '@views/audit/merchantImportAudit/MerchantImportAuditF.vue'),
          name: 'merchantImportAudit/MerchantImportAuditF',
          meta: {
            title: '审核',
            father: '商户入驻审核',
            fatherUrl: '/audit/MerchantImportAudit'
          }
        },
        {
          path: '/audit/merchantImportAudit/MerchantImportAuditDetail',
          component: () => import(/* webpackChunkName: "merchantImportAudit/MerchantImportAuditDetail"*/ '@views/audit/merchantImportAudit/MerchantImportAuditDetail.vue'),
          name: 'merchantImportAudit/MerchantImportAuditDetail',
          meta: {
            title: '审核详情',
            father: '商户入驻审核',
            fatherUrl: '/audit/MerchantImportAudit'

          }
        },
        {
          path: '/audit/MerchantUpdateAudit',
          component: () => import(/* webpackChunkName: "MerchantUpdateAudit"*/ '@views/audit/MerchantUpdateAudit.vue'),
          name: 'MerchantUpdateAudit',
          meta: {
            title: '商户变更审核'
          }

        },
        {
          path: '/audit/merchantUpdateAudit/MerchantUpdateAuditF',
          component: () => import(/* webpackChunkName: "MerchantUpdateAuditF"*/ '@views/audit/merchantUpdateAudit/MerchantUpdateAuditF.vue'),
          name: 'MerchantUpdateAuditF',
          meta: {
            title: '审核',
            father: '商户变更审核',
            fatherUrl: '/audit/MerchantUpdateAudit'
          }

        },
        {
          path: '/audit/merchantUpdateAudit/MerchantUpdateAuditDetail',
          component: () => import(/* webpackChunkName: "MerchantUpdateAuditDetail"*/ '@views/audit/merchantUpdateAudit/MerchantUpdateAuditDetail.vue'),
          name: 'MerchantUpdateAuditDetail',
          meta: {
            title: '审核详情',
            father: '商户变更审核',
            fatherUrl: '/audit/MerchantUpdateAudit'
          }

        },
        {
          path: '/audit/merchantUpdateAudit/MerchantRelationUpdateAuditDetail',
          component: () => import(/* webpackChunkName: "MerchanRelationtUpdateAuditDetail"*/ '@views/audit/merchantUpdateAudit/MerchantRelationUpdateAuditDetail.vue'),
          name: 'MerchantUpdateAuditDetail',
          meta: {
            title: '审核详情',
            father: '商户关系变更审核',
            fatherUrl: '/audit/MerchantRelationUpdateAudit'
          }

        },
        {
          path: '/audit/ShopImportAudit',
          component: () => import(/* webpackChunkName: "ShopImportAudit"*/ '@views/audit/ShopImportAudit.vue'),
          name: 'ShopImportAudit',
          meta: {
            title: '门店新增审核'
          }

        },
        {
          path: '/audit/shopImportAudit/ShopImportAuditF',
          component: () => import(/* webpackChunkName: "shopImportAudit/ShopImportAuditF"*/ '@views/audit/shopImportAudit/ShopImportAuditF.vue'),
          name: 'shopImportAudit/ShopImportAuditF',
          meta: {
            title: '审核',
            father: '门店新增审核',
            fatherUrl: '/audit/ShopImportAudit'
          }

        },
        {
          path: '/audit/shopImportAudit/ShopImportAuditDetail',
          component: () => import(/* webpackChunkName: "shopImportAudit/ShopImportAuditDetail"*/ '@views/audit/shopImportAudit/ShopImportAuditDetail.vue'),
          name: 'shopImportAudit/ShopImportAuditDetail',
          meta: {
            title: '审核详情',
            father: '门店新增审核',
            fatherUrl: '/audit/ShopImportAudit'
          }

        },
        {
          path: '/audit/ShopUpdateAudit',
          component: () => import(/* webpackChunkName: "ShopUpdateAudit"*/ '@views/audit/ShopUpdateAudit.vue'),
          name: 'ShopUpdateAudit',
          meta: {
            title: '门店变更审核'
          }

        },
        {
          path: '/audit/shopUpdateAudit/ShopUpdateAuditF',
          component: () => import(/* webpackChunkName: "shopUpdateAudit/ShopUpdateAuditF"*/ '@views/audit/shopUpdateAudit/ShopUpdateAuditF.vue'),
          name: 'shopUpdateAudit/ShopUpdateAuditF',
          meta: {
            title: '审核',
            father: '门店变更审核',
            fatherUrl: '/audit/ShopUpdateAudit'

          }

        },
        {
          path: '/audit/shopUpdateAudit/ShopUpdateAuditDetail',
          component: () => import(/* webpackChunkName: "shopUpdateAudit/ShopUpdateAuditDetail"*/ '@views/audit/shopUpdateAudit/ShopUpdateAuditDetail.vue'),
          name: 'shopUpdateAudit/ShopUpdateAuditDetail',
          meta: {
            title: '审核详情',
            father: '门店变更审核',
            fatherUrl: '/audit/ShopUpdateAudit'

          }

        },
        {// 门店状态变更审核
          path: '/audit/ShopRelationUpdateAudit',
          component: () => import(/* webpackChunkName: "ShopRelationUpdateAudit"*/ '@views/audit/ShopRelationUpdateAudit.vue'),
          name: 'ShopRelationUpdateAudit',
          meta: {
            title: '门店状态变更审核'
          }
        },
        {// 商户关系变更审核
          path: '/audit/MerchantRelationUpdateAudit',
          component: () => import(/* webpackChunkName: "ShopRelationUpdateAudit"*/ '@views/audit/MerchantRelationUpdateAudit.vue'),
          name: 'MerchantRelationUpdateAudit',
          meta: {
            title: '商户关系变更审核'
          }
        },
        {
          path: '/audit/TicketCreationAudit',
          component: () => import(/* webpackChunkName: "TicketCreationAudit"*/ '@views/audit/TicketCreationAudit.vue'),
          name: 'TicketCreationAudit',
          meta: {
            title: '票卷新增审核'
          }

        },
        {
          path: '/audit/ticketCreationAudit/TicketCreationAuditF',
          component: () => import(/* webpackChunkName: "TicketCreationAuditF"*/ '@views/audit/ticketCreationAudit/TicketCreationAuditF.vue'),
          name: 'TicketCreationAuditF',
          meta: {
            title: '审核',
            fatherUrl: '/audit/TicketCreationAudit',
            father: '票卷新增审核'
          }

        },
        {
          path: '/audit/ticketCreationAudit/TicketCreationAuditDetail',
          component: () => import(/* webpackChunkName: "TicketCreationAuditDetail"*/ '@views/audit/ticketCreationAudit/TicketCreationAuditDetail.vue'),
          name: 'TicketCreationAuditDetail',
          meta: {
            title: '审核详情',
            fatherUrl: '/audit/TicketCreationAudit',
            father: '票卷新增审核'
          }

        },
        {
          path: '/audit/TicketUpdateAudit',
          component: () => import(/* webpackChunkName: "TicketUpdateAudit"*/ '@views/audit/TicketUpdateAudit.vue'),
          name: 'TicketUpdateAudit',
          meta: {
            title: '票卷变更审核'
          }

        },
        {
          path: '/audit/ticketUpdateAudit/TicketUpdateAuditF',
          component: () => import(/* webpackChunkName: "ticketUpdateAudit/TicketUpdateAuditF"*/ '@views/audit/ticketUpdateAudit/TicketUpdateAuditF.vue'),
          name: 'ticketUpdateAudit/TicketUpdateAuditF',
          meta: {
            title: '审核',
            father: '票卷变更审核',
            fatherUrl: '/audit/TicketUpdateAudit'
          }

        },
        {
          path: '/audit/ticketUpdateAudit/TicketUpdateAuditDetail',
          component: () => import(/* webpackChunkName: "TicketUpdateAuditDetail"*/ '@views/audit/ticketUpdateAudit/TicketUpdateAuditDetail.vue'),
          name: 'TicketUpdateAuditDetail',
          meta: {
            title: '审核详情',
            father: '票卷变更审核',
            fatherUrl: '/audit/TicketUpdateAudit'
          }

        },
        {
          path: '/audit/RedPacketCreationAudit',
          component: () => import(/* webpackChunkName: "RedPacketCreationAudit"*/ '@views/audit/RedPacketCreationAudit.vue'),
          name: 'RedPacketCreationAudit',
          meta: {
            title: '红包新增审核'
          }

        },
        {
          path: '/audit/redPacketCreationAudit/RedPacketCreationAuditF',
          component: () => import(/* webpackChunkName: "redPacketCreationAudit/RedPacketCreationAuditF"*/ '@views/audit/redPacketCreationAudit/RedPacketCreationAuditF.vue'),
          name: 'redPacketCreationAudit/RedPacketCreationAuditF',
          meta: {
            title: '审核',
            father: '红包新增审核',
            fatherUrl: '/audit/RedPacketCreationAudit'
          }

        },
        {
          path: '/audit/redPacketCreationAudit/RedPacketCreationAuditDetail',
          component: () => import(/* webpackChunkName: " redPacketCreationAudit/RedPacketCreationAuditDetail"*/ '@views/audit/redPacketCreationAudit/RedPacketCreationAuditDetail.vue'),
          name: ' redPacketCreationAudit/RedPacketCreationAuditDetail',
          meta: {
            title: '审核详情',
            father: '红包新增审核',
            fatherUrl: '/audit/RedPacketCreationAudit'
          }

        },
        {
          path: '/audit/RedPacketUpdateAudit',
          component: () => import(/* webpackChunkName: "RedPacketUpdateAudit"*/ '@views/audit/RedPacketUpdateAudit.vue'),
          name: 'RedPacketUpdateAudit',
          meta: {
            title: '红包变更审核'
          }

        },
        {
          path: '/audit/redPacketUpdateAudit/RedPacketUpdateAuditF',
          component: () => import(/* webpackChunkName: "RedPacketUpdateAuditF"*/ '@views/audit/redPacketUpdateAudit/RedPacketUpdateAuditF.vue'),
          name: 'RedPacketUpdateAuditF',
          meta: {
            title: '审核',
            father: '红包变更审核',
            fatherUrl: '/audit/RedPacketUpdateAudit'
          }

        },
        {
          path: '/audit/redPacketUpdateAudit/RedPacketUpdateAuditDetail',
          component: () => import(/* webpackChunkName: "RedPacketUpdateAuditDetail"*/ '@views/audit/redPacketUpdateAudit/RedPacketUpdateAuditDetail.vue'),
          name: 'RedPacketUpdateAuditDetail',
          meta: {
            title: '审核详情',
            father: '红包变更审核',
            fatherUrl: '/audit/RedPacketUpdateAudit'
          }

        },
        {
          path: '/audit/DiscountPayCreationAudit',
          component: () => import(/* webpackChunkName: "DiscountPayCreationAudit"*/ '@views/audit/DiscountPayCreationAudit.vue'),
          name: 'DiscountPayCreationAudit',
          meta: {
            title: '优惠买单新增审核'
          }
        },
        {
          path: '/audit/discountPayCreationAudit/DiscountPayCreationAuditF',
          component: () => import(/* webpackChunkName: "DiscountPayCreationAuditF"*/ '@views/audit/discountPayCreationAudit/DiscountPayCreationAuditF.vue'),
          name: 'DiscountPayCreationAuditF',
          meta: {
            title: '审核',
            father: '优惠买单新增审核',
            fatherUrl: '/audit/DiscountPayCreationAudit'
          }
        },
        {
          path: '/audit/discountPayCreationAudit/DiscountPayCreationAuditDetail',
          component: () => import(/* webpackChunkName: "DiscountPayCreationAuditDetail"*/ '@views/audit/discountPayCreationAudit/DiscountPayCreationAuditDetail.vue'),
          name: 'DiscountPayCreationAuditDetail',
          meta: {
            title: '审核详情',
            father: '优惠买单新增审核',
            fatherUrl: '/audit/DiscountPayCreationAudit'
          }
        },
        {
          path: '/audit/DiscountPayUpdateAudit',
          component: () => import(/* webpackChunkName: "DiscountPayUpdateAudit"*/ '@views/audit/DiscountPayUpdateAudit.vue'),
          meta: {
            title: '优惠买单变更审核'
          }
        },
        {
          path: '/audit/discountPayUpdateAudit/DiscountPayUpdateAuditF',
          component: () => import(/* webpackChunkName: "DiscountPayUpdateAuditF"*/ '@views/audit/discountPayUpdateAudit/DiscountPayUpdateAuditF.vue'),
          name: 'DiscountPayUpdateAuditF',
          meta: {
            title: '审核',
            father: '优惠买单变更审核',
            fatherUrl: '/audit/DiscountPayUpdateAudit'
          }
        },
        {
          path: '/audit/discountPayUpdateAudit/DiscountPayUpdateAuditDetail',
          component: () => import(/* webpackChunkName: "DiscountPayUpdateAuditDetail"*/ '@views/audit/discountPayUpdateAudit/DiscountPayUpdateAuditDetail.vue'),
          name: 'DiscountPayUpdateAuditDetail',
          meta: {
            title: '审核详情',
            father: '优惠买单变更审核',
            fatherUrl: '/audit/DiscountPayUpdateAudit'
          }
        },

        {
          path: '/audit/DirectionalReleaseAudit',
          component: () => import(/* webpackChunkName: "DirectionalReleaseLis"*/ '@views/audit/DirectionalReleaseAudit.vue'),
          meta: {
            title: '定向发放审核'
          }
        },
        {
          path: '/audit/directionalReleaseAudit/DirectionalReleaseAuditF',
          component: () => import(/* webpackChunkName: "DirectionalReleaseAuditF"*/ '@views/audit/directionalReleaseAudit/DirectionalReleaseAuditF.vue'),
          name: 'DirectionalReleaseAuditF',
          meta: {
            title: '审核',
            father: '定向发放审核',
            fatherUrl: '/audit/DirectionalReleaseAudit'
          }
        },
        {
          path: '/audit/directionalReleaseAudit/DirectionalReleaseAuditDetail',
          component: () => import(/* webpackChunkName: "DirectionalReleaseAuditDetail"*/ '@views/audit/directionalReleaseAudit/DirectionalReleaseAuditDetail.vue'),
          name: 'DirectionalReleaseAuditDetail',
          meta: {
            title: '审核详情',
            father: '定向发放审核',
            fatherUrl: '/audit/DirectionalReleaseAudit'
          }
        },
        {
          path: '/audit/BroadcastAudit',
          component: () => import(/* webpackChunkName: "BroadcastAudit"*/ '@views/audit/BroadcastAudit.vue'),
          meta: {
            title: '平台广播审核'
          }
        },
        {
          path: '/audit/broadcastAudit/BroadcastAuditF',
          component: () => import(/* webpackChunkName: "BroadcastAuditF"*/ '@views/audit/broadcastAudit/BroadcastAuditF.vue'),
          name: 'BroadcastAuditF',
          meta: {
            title: '审核',
            father: '平台广播审核',
            fatherUrl: '/audit/BroadcastAudit'
          }
        },
        {
          path: '/audit/broadcastAudit/BroadcastAuditDetail',
          component: () => import(/* webpackChunkName: "BroadcastAuditDetail"*/ '@views/audit/broadcastAudit/BroadcastAuditDetail.vue'),
          name: 'BroadcastAuditDetail',
          meta: {
            title: '审核详情',
            father: '平台广播审核',
            fatherUrl: '/audit/BroadcastAudit'
          }
        },
        {
          path: '/audit/ClientPageAudit',
          component: () => import(/* webpackChunkName: "ClientPageAudit"*/ '@views/audit/ClientPageAudit.vue'),
          name: 'ClientPageAudit',
          meta: {
            title: '用户端页面审核'
          }
        },
        {
          path: '/audit/clientPageAudit/ClientPageAuditF',
          component: () => import(/* webpackChunkName: "clientPageAudit/ClientPageAuditF"*/ '@views/audit/clientPageAudit/ClientPageAuditF.vue'),
          name: 'clientPageAudit/ClientPageAuditF',
          meta: {
            title: '审核',
            father: '用户端页面审核',
            fatherUrl: '/audit/ClientPageAudit'
          }
        },
        {
          path: '/audit/clientPageAudit/ClientPageAuditDetail',
          component: () => import(/* webpackChunkName: "clientPageAudit/ClientPageAuditDetail"*/ '@views/audit/clientPageAudit/ClientPageAuditDetail.vue'),
          name: 'clientPageAudit/ClientPageAuditDetail',
          meta: {
            title: '审核详情',
            father: '用户端页面审核',
            fatherUrl: '/audit/ClientPageAudit'
          }
        },
        {
          path: '/audit/OnlinePayRefundAudit',
          component: () => import(/* webpackChunkName: "OnlinePayRefundAudit"*/ '@views/audit/OnlinePayRefundAudit.vue'),
          meta: {
            title: '在线买单退款审核'
          }
        },
        {
          path: '/audit/onlinePayRefundAudit/OnlinePayRefundAuditF',
          component: () => import(/* webpackChunkName: "OnlinePayRefundAuditF"*/ '@views/audit/onlinePayRefundAudit/OnlinePayRefundAuditF.vue'),
          name: 'OnlinePayRefundAuditF',
          meta: {
            title: '审核',
            father: '在线买单退款审核',
            fatherUrl: '/audit/OnlinePayRefundAudit'
          }
        },
        {
          path: '/audit/onlinePayRefundAudit/OnlinePayRefundAuditDetail',
          component: () => import(/* webpackChunkName: "OnlinePayRefundAuditDetail"*/ '@views/audit/onlinePayRefundAudit/OnlinePayRefundAuditDetail.vue'),
          name: 'OnlinePayRefundAuditDetail',
          meta: {
            title: '审核详情',
            father: '在线买单退款审核',
            fatherUrl: '/audit/OnlinePayRefundAudit'
          }
        },
        {
          path: '/audit/RevokeVerifiAudit',
          component: () => import(/* webpackChunkName: "RevokeVerifiAudit"*/ '@views/audit/RevokeVerifiAudit.vue'),
          name: 'RevokeVerifiAudit',
          meta: {
            title: '票券核销撤销审核'
          }
        },
        {
          path: '/audit/revokeVerifiAudit/RevokeVerifiAuditF',
          component: () => import(/* webpackChunkName: "RevokeVerifiAudit"*/ '@views/audit/revokeVerifiAudit/RevokeVerifiAuditF.vue'),
          name: 'RRevokeVerifiAuditF',
          meta: {
            father: '票券核销撤销审核',
            title: '审核',
            fatherUrl: '/audit/RevokeVerifiAudit'
          }
        },
        {
          path: '/audit/revokeVerifiAudit/RevokeVerifiDetail',
          component: () => import(/* webpackChunkName: "RevokeVerifiAudit"*/ '@views/audit/revokeVerifiAudit/RevokeVerifiDetail.vue'),
          name: 'RevokeVerifiAuditDetail',
          meta: {
            father: '票券核销撤销审核',
            title: '审核详情',
            fatherUrl: '/audit/RevokeVerifiAudit'
          }
        },
        {
          path: '/audit/CustomAggregationAudit',
          component: () => import(/* webpackChunkName: "CustomAggregationAudit"*/ '@views/audit/CustomAggregationAudit.vue'),
          name: 'CustomAggregationAudit',
          meta: {
            title: '自定义聚合审核'
          }
        },
        {
          path: '/audit/customAggregationAudit/CustomAggregationAuditF',
          component: () => import(/* webpackChunkName: "CustomAggregationAuditF"*/ '@views/audit/customAggregationAudit/CustomAggregationAuditF.vue'),
          name: 'CustomAggregationAuditF',
          meta: {
            title: '审核',
            father: '自定义聚合审核',
            fatherUrl: '/audit/CustomAggregationAudit'
          }
        },
        {
          path: '/audit/customAggregationAudit/CustomAggregationAuditDetail',
          component: () => import(/* webpackChunkName: "CustomAggregationAuditDetail"*/ '@views/audit/customAggregationAudit/CustomAggregationAuditDetail.vue'),
          name: 'CustomAggregationAuditDetail',
          meta: {
            title: '审核详情',
            father: '自定义聚合审核',
            fatherUrl: '/audit/CustomAggregationAudit'
          }
        }
      ]
    },
    {
      path: '/contentManage',
      name: 'contentManage',
      component: () => import(/* webpackChunkName: "home"*/ '@views/home/home.vue'),
      redirect: '/contentManage/Broadcast',
      meta: {
        title: '内容管理'
      },
      children: [
        {
          path: '/contentManage/Broadcast',
          component: () => import(/* webpackChunkName: "Broadcast"*/ '@views/contentManage/Broadcast.vue'),
          meta: {
            title: '平台广播'
          }
        },
        {
          path: '/contentManage/broadcast/AddMessage',
          component: () => import(/* webpackChunkName: "AddMessage"*/ '@views/contentManage/broadcast/AddMessage.vue'),
          meta: {
            title: '发布消息',
            father: '平台广播',
            fatherUrl: '/contentManage/Broadcast'

          }
        }, {
          path: '/contentManage/broadcast/MessageDetail',
          component: () => import(/* webpackChunkName: "MessageDetail"*/ '@views/contentManage/broadcast/MessageDetail.vue'),
          meta: {
            title: '查看详情',
            father: '平台广播',
            fatherUrl: '/contentManage/Broadcast'

          }
        },
        {
          path: '/contentManage/ClientPageManage/content',
          component: () => import(/* webpackChunkName: "ClientPageManageContent"*/ '@views/contentManage/ClientPageManage/content.vue'),
          meta: {
            title: '用户端页面内容管理'
          }
        },
        {
          path: '/contentManage/ClientPageManage/structure',
          component: () => import(/* webpackChunkName: "ClientPageManageStructure"*/ '@views/contentManage/ClientPageManage/structure.vue'),
          meta: {
            title: '用户端页面结构管理'
          }
        }
      ]
    },
    {
      path: '/manageRecord',
      name: 'manageRecord',
      component: () => import(/* webpackChunkName: "home"*/ '@views/home/home.vue'),
      redirect: '/manageRecord/OrderRecord',
      meta: {
        title: '经营记录'
      },
      children: [
        {
          path: '/manageRecord/OrderRecord',
          component: () => import(/* webpackChunkName: "OrderRecord"*/ '@views/manageRecord/OrderRecord.vue'),
          meta: {
            title: '订单记录'
          }
        },
        {
          path: '/manageRecord/orderRecord/OrderDetail',
          component: () => import(/* webpackChunkName: "OrderDetail"*/ '@views/manageRecord/orderRecord/OrderDetail.vue'),
          meta: {
            title: '查看详情',
            father: '订单记录',
            fatherUrl: '/manageRecord/OrderRecord'

          }
        },
        {
          path: '/manageRecord/TicketVerifiRecord',
          component: () => import(/* webpackChunkName: "ticketVerifiRecord"*/ '@views/manageRecord/TicketVerifiRecord.vue'),
          meta: {
            title: '票券核销记录'
          }
        },
        {
          path: '/manageRecord/ticketVerifiRecord/VerifiDetail',
          component: () => import(/* webpackChunkName: "ticketVerifiRecord"*/ '@views/manageRecord/ticketVerifiRecord/VerifiDetail.vue'),
          meta: {
            title: '查看详情',
            father: '票券核销记录',
            fatherUrl: '/manageRecord/TicketVerifiRecord'
          }
        }
      ]
    },
    {
      path: '/afterSaleManage',
      name: 'afterSaleManage',
      component: () => import(/* webpackChunkName: "home"*/ '@views/home/home.vue'),
      redirect: '/afterSaleManage/RefundRecord',
      meta: {
        title: '售后管理'
      },
      children: [
        {
          path: '/afterSaleManage/RefundRecord',
          component: () => import(/* webpackChunkName: "RefundRecord"*/ '@views/afterSaleManage/RefundRecord.vue'),
          name: 'RefundRecord',
          meta: {
            title: '退款记录'
          }
        },
        {
          path: '/afterSaleManage/refundRecord/RefundRecordDetail',
          component: () => import(/* webpackChunkName: "RefundRecordDetail"*/ '@views/afterSaleManage/refundRecord/RefundRecordDetail.vue'),
          name: 'RefundRecordDetail',
          meta: {
            father: '退款记录',
            title: '查看详情',
            fatherUrl: '/afterSaleManage/RefundRecord'
          }
        },
        {
          path: '/afterSaleManage/RevokeVerifi',
          component: () => import(/* webpackChunkName: "RevokeVerifi"*/ '@views/afterSaleManage/RevokeVerifi.vue'),
          name: 'RevokeVerifi',
          meta: {
            title: '票券核销撤销'
          }
        },
        {
          path: '/afterSaleManage/revokeVerifi/RevokeVerifiDetail',
          component: () => import(/* webpackChunkName: "RevokeVerifi"*/ '@views/afterSaleManage/revokeVerifi/RevokeVerifiDetail.vue'),
          name: 'RevokeVerifiDetail',
          meta: {
            title: '查看详情',
            father: '票券核销撤销',
            fatherUrl: '/afterSaleManage/RevokeVerifi'
          }
        },
        {
          path: '/afterSaleManage/revokeVerifi/NewRevoke',
          component: () => import(/* webpackChunkName: "NewRevoke"*/ '@views/afterSaleManage/revokeVerifi/NewRevoke.vue'),
          name: 'NewRevoke',
          meta: {
            title: '发起撤销',
            father: '票券核销撤销',
            fatherUrl: '/afterSaleManage/RevokeVerifi'
          }

        },
        {
          path: '/afterSaleManage/OnlinePayRefund',
          component: () => import(/* webpackChunkName: "OnlinePayRefund"*/ '@views/afterSaleManage/OnlinePayRefund.vue'),
          name: 'OnlinePayRefund',
          meta: {
            title: '在线买单退款'
          }
        },
        {
          path: '/afterSaleManage/onlinePayRefund/NewRefund',
          component: () => import(/* webpackChunkName: "NewRefund"*/ '@views/afterSaleManage/onlinePayRefund/NewRefund.vue'),
          name: 'NewRefund',
          meta: {
            title: '发起退款',
            father: '在线买单退款',
            fatherUrl: '/afterSaleManage/OnlinePayRefund'
          }
        },
        {
          path: '/afterSaleManage/onlinePayRefund/OnlinePayRefundDetail',
          component: () => import(/* webpackChunkName: "NewRefund"*/ '@views/afterSaleManage/onlinePayRefund/OnlinePayRefundDetail.vue'),
          name: 'OnlinePayRefundDetail',
          meta: {
            title: '查看详情',
            father: '在线买单退款',
            fatherUrl: '/afterSaleManage/OnlinePayRefund'
          }
        }

      ]
    },
    {
      path: '/acountStatement',
      name: 'acountStatement',
      component: () => import(/* webpackChunkName: "home"*/ '@views/home/home.vue'),
      redirect: '/acountStatement/AcountChecking',
      meta: {
        title: '对账结算报表'
      },
      children: [
        {
          path: '/acountStatement/AcountChecking',
          component: () => import(/* webpackChunkName: "AcountChecking"*/ '@views/acountStatement/AcountChecking.vue'),
          meta: {
            title: '对账报表'
          }
        },
        {
          path: '/acountStatement/acountChecking/AcountCheckingDetail',
          component: () => import(/* webpackChunkName: "AcountCheckingDetail"*/ '@views/acountStatement/acountChecking/AcountCheckingDetail.vue'),
          meta: {
            title: '查看详情',
            father: '对账报表',
            fatherUrl: '/acountStatement/AcountChecking'
          }
        },
        {
          path: '/acountStatement/ClearingStatement',
          component: () => import(/* webpackChunkName: "ClearingStatement"*/ '@views/acountStatement/ClearingStatement.vue'),
          meta: {
            title: '清分报表'
          }
        },
        {
          path: '/acountStatement/CreditAndCancelAcount',
          component: () => import(/* webpackChunkName: "CreditAndCancelAcount"*/ '@views/acountStatement/CreditAndCancelAcount.vue'),
          meta: {
            title: '挂销账报表'
          }
        },
        {
          path: '/acountStatement/ToSettleStatement',
          component: () => import(/* webpackChunkName: "ToSettleStatement"*/ '@views/acountStatement/ToSettleStatement.vue'),
          meta: {
            title: '待结算报表报表'
          }
        }

      ]
    },
    {
      path: '/tradeManagement',
      name: 'tradeManagement',
      component: () => import(/* webpackChunkName: "home"*/ '@views/home/home.vue'),
      redirect: '/tradeManagement/actualReport/DispayReport',
      meta: {
        title: '交易管理'
      },
      children: [
        {
          path: '/tradeManagement/actualReport/DispayReport',
          component: () => import(/* webpackChunkName: "AcountChecking"*/ '@views/tradeManagement/actualReport/DispayReport.vue'),
          meta: {
            title: '优惠买单报表'
          }
        },
        {
          path: '/tradeManagement/actualReport/CouponBuyOrder',
          component: () => import(/* webpackChunkName: "ClearingStatement"*/ '@views/tradeManagement/actualReport/CouponBuyOrder.vue'),
          meta: {
            title: '券购买订单'
          }
        },
        {
          path: '/tradeManagement/actualReport/CouponReceiveDetail',
          component: () => import(/* webpackChunkName: "CreditAndCancelAcount"*/ '@views/tradeManagement/actualReport/CouponReceiveDetail.vue'),
          meta: {
            title: '券及红包领取记录'
          }
        },
        {
          path: '/tradeManagement/actualReport/CouponVerifyDetail',
          component: () => import(/* webpackChunkName: "ToSettleStatement"*/ '@views/acountStatement/ToSettleStatement.vue'),
          meta: {
            title: '券/红包核销明细记录'
          }
        },
        {
          path: '/tradeManagement/actualReport/CouponInstanceStatusDetail',
          component: () => import(/* webpackChunkName: "ToSettleStatement"*/ '@views/tradeManagement/actualReport/CouponInstanceStatusDetail.vue'),
          meta: {
            title: '券码状态查询'
          }
        },
        {
          path: '/tradeManagement/acountManage/AcountChecking',
          component: () => import(/* webpackChunkName: "AcountChecking"*/ '@views/tradeManagement/acountStatement/AcountChecking.vue'),
          meta: {
            title: '对账报表'
          }
        },
        {
          path: '/tradeManagement/acountManage/CheckNoProduceCpn',
          component: () => import(/* webpackChunkName: "AcountChecking"*/ '@views/tradeManagement/acountManage/CheckNoProduceCpn.vue'),
          meta: {
            title: '对账平未生成券码报表'
          }
        },
        {
          path: '/tradeManagement/acountManage/CpnChecking',
          component: () => import(/* webpackChunkName: "AcountChecking"*/ '@views/tradeManagement/acountManage/CpnChecking.vue'),
          meta: {
            title: '券码对账报表'
          }
        },
        {
          path: '/tradeManagement/acountManage/OuterCpnCheckMistake',
          component: () => import(/* webpackChunkName: "AcountChecking"*/ '@views/tradeManagement/acountManage/OuterCpnCheckMistake.vue'),
          meta: {
            title: '外部券对账不平报表'
          }
        },
        {
          path: '/tradeManagement/acountManage/AcountCheckMistake',
          component: () => import(/* webpackChunkName: "AcountChecking"*/ '@views/tradeManagement/acountManage/AcountCheckMistake.vue'),
          meta: {
            title: '渠道方多或少对账不平报表'
          }
        },
        {
          path: '/tradeManagement/settleManage/ShopSettleSummary',
          component: () => import(/* webpackChunkName: "AcountChecking"*/ '@views/tradeManagement/settleManage/ShopSettleSummary.vue'),
          meta: {
            title: '门店结算汇总报表'
          }
        },
        {
          path: '/tradeManagement/settleManage/MerchantSettleSummary',
          component: () => import(/* webpackChunkName: "AcountChecking"*/ '@views/tradeManagement/settleManage/MerchantSettleSummary.vue'),
          meta: {
            title: '商户结算汇总报表'
          }
        },
        {
          path: '/tradeManagement/settleManage/SettleFinishReport',
          component: () => import(/* webpackChunkName: "AcountChecking"*/ '@views/tradeManagement/settleManage/SettleFinishReport.vue'),
          meta: {
            title: '已结算报表'
          }
        },
        {
          path: '/tradeManagement/settleManage/SettleUnfinishReport',
          component: () => import(/* webpackChunkName: "AcountChecking"*/ '@views/tradeManagement/settleManage/SettleUnfinishReport.vue'),
          meta: {
            title: '未结算报表'
          }
        },
        {
          path: '/tradeManagement/settleManage/ClearResultReport',
          component: () => import(/* webpackChunkName: "AcountChecking"*/ '@views/tradeManagement/settleManage/ClearResultReport.vue'),
          meta: {
            title: '清算结果报表'
          }
        },
        {
          path: '/tradeManagement/settleManage/FullRefundReport',
          component: () => import(/* webpackChunkName: "AcountChecking"*/ '@views/tradeManagement/settleManage/FullRefundReport.vue'),
          meta: {
            title: '全额退报表'
          }
        },
        {
          path: '/tradeManagement/settleManage/ReconcileBalanceSummary',
          component: () => import(/* webpackChunkName: "AcountChecking"*/ '@views/tradeManagement/settleManage/ReconcileBalanceSummary.vue'),
          meta: {
            title: '一清二清汇总'
          }
        },
        {
          path: '/tradeManagement/settleManage/ClearFailDetail',
          component: () => import(/* webpackChunkName: "AcountChecking"*/ '@views/tradeManagement/settleManage/ClearFailDetail.vue'),
          meta: {
            title: '清算失败明细'
          }
        },
        {
          path: '/tradeManagement/share/DispayShareReport',
          component: () => import(/* webpackChunkName: "AcountChecking"*/ '@views/tradeManagement/share/DispayShareReport.vue'),
          meta: {
            title: '优惠买单满减补贴分摊报表'
          }
        },
        {
          path: '/tradeManagement/share/CouponShareReport',
          component: () => import(/* webpackChunkName: "AcountChecking"*/ '@views/tradeManagement/share/CouponShareReport.vue'),
          meta: {
            title: '券补贴金额分摊报表'
          }
        },
        {
          path: '/tradeManagement/performanceReport/PerformanceOrderDetail',
          component: () => import(/* webpackChunkName: "AcountChecking"*/ '@views/tradeManagement/performanceReport/PerformanceOrderDetail.vue'),
          meta: {
            title: '业绩考核订单维度明细表'
          }
        },
        {
          path: '/tradeManagement/performanceReport/PerformanceVerifyDetail',
          component: () => import(/* webpackChunkName: "AcountChecking"*/ '@views/tradeManagement/performanceReport/PerformanceVerifyDetail.vue'),
          meta: {
            title: '业绩考核（核销及买单）维度明细报表'
          }
        },
        {
          path: '/tradeManagement/performanceReport/ValidMchtStdDetail',
          component: () => import(/* webpackChunkName: "AcountChecking"*/ '@views/tradeManagement/performanceReport/ValidMchtStdDetail.vue'),
          meta: {
            title: '有效商户达标进展明细报表'
          }
        },
        {
          path: '/tradeManagement/performanceReport/ValidMchtDetail',
          component: () => import(/* webpackChunkName: "AcountChecking"*/ '@views/tradeManagement/performanceReport/ValidMchtDetail.vue'),
          meta: {
            title: '有效商户明细'
          }
        },
        {
          path: '/tradeManagement/performanceReport/AMPerformance',
          component: () => import(/* webpackChunkName: "AcountChecking"*/ '@views/tradeManagement/performanceReport/AMPerformance.vue'),
          meta: {
            title: '客户经理绩效统计报表'
          }
        },
        {
          path: '/tradeManagement/performanceReport/BranchPerformance',
          component: () => import(/* webpackChunkName: "AcountChecking"*/ '@views/tradeManagement/performanceReport/BranchPerformance.vue'),
          meta: {
            title: '分行业绩统计报表'
          }
        },
        {
          path: '/tradeManagement/receiveCoupon/ReceiveCouponBranch',
          component: () => import(/* webpackChunkName: "AcountChecking"*/ '@views/tradeManagement/receiveCoupon/ReceiveCouponBranch.vue'),
          meta: {
            title: '领用券分行维度报表'
          }
        },
        {
          path: '/tradeManagement/receiveCoupon/ReceiveCouponMcht',
          component: () => import(/* webpackChunkName: "AcountChecking"*/ '@views/tradeManagement/receiveCoupon/ReceiveCouponMcht.vue'),
          meta: {
            title: '领用券商户维度报表'
          }
        },
        {
          path: '/tradeManagement/orientGrant/OrientGrantByDay',
          component: () => import(/* webpackChunkName: "AcountChecking"*/ '@views/tradeManagement/orientGrant/OrientGrantByDay.vue'),
          meta: {
            title: '定向发放日统计表'
          }
        },
        {
          path: '/tradeManagement/orientGrant/OrientGrantByBatch',
          component: () => import(/* webpackChunkName: "AcountChecking"*/ '@views/tradeManagement/orientGrant/OrientGrantByBatch.vue'),
          meta: {
            title: '定向发放批次汇总表'
          }
        },
        {
          path: '/tradeManagement/orientGrant/OrientGrantByTpl',
          component: () => import(/* webpackChunkName: "AcountChecking"*/ '@views/tradeManagement/orientGrant/OrientGrantByTpl.vue'),
          meta: {
            title: '定向发放券模板汇总表'
          }
        },
        {
          path: '/tradeManagement/orientGrant/OrientGrantDetail',
          component: () => import(/* webpackChunkName: "AcountChecking"*/ '@views/tradeManagement/orientGrant/OrientGrantDetail.vue'),
          meta: {
            title: '定向发放结果明细表'
          }
        },
        {
          path: '/tradeManagement/merchantRegist/RegistStatistics',
          component: () => import(/* webpackChunkName: "AcountChecking"*/ '@views/tradeManagement/merchantRegist/RegistStatistics.vue'),
          meta: {
            title: '商户入驻数据统计表'
          }
        },
        {
          path: '/tradeManagement/merchantRegist/PeriodNewMchtDetail',
          component: () => import(/* webpackChunkName: "AcountChecking"*/ '@views/tradeManagement/merchantRegist/PeriodNewMchtDetail.vue'),
          meta: {
            title: '时间段内新增商户明细表'
          }
        },
        {
          path: '/tradeManagement/manageData/PaySummary',
          component: () => import(/* webpackChunkName: "AcountChecking"*/ '@views/tradeManagement/manageData/PaySummary.vue'),
          meta: {
            title: '买单汇总报表'
          }
        },
        {
          path: '/tradeManagement/manageData/VerifyRecordSummary',
          component: () => import(/* webpackChunkName: "AcountChecking"*/ '@views/tradeManagement/manageData/VerifyRecordSummary.vue'),
          meta: {
            title: '券核销记录汇总报表'
          }
        },
        {
          path: '/tradeManagement/manageData/CpnDispayReport',
          component: () => import(/* webpackChunkName: "AcountChecking"*/ '@views/tradeManagement/manageData/CpnDispayReport.vue'),
          meta: {
            title: '优惠券/优惠买单报表'
          }
        },
        {
          path: '/tradeManagement/manageData/BranchSettleStatistics',
          component: () => import(/* webpackChunkName: "AcountChecking"*/ '@views/tradeManagement/manageData/BranchSettleStatistics.vue'),
          meta: {
            title: '分行结算统计报表'
          }
        },
        {
          path: '/tradeManagement/cpnVerify/VerifyTrendStatistics',
          component: () => import(/* webpackChunkName: "AcountChecking"*/ '@views/tradeManagement/cpnVerify/VerifyTrendStatistics.vue'),
          meta: {
            title: '核销率口径趋势统计表'
          }
        },
        {
          path: '/tradeManagement/cpnVerify/VerifyAbsStatistics',
          component: () => import(/* webpackChunkName: "AcountChecking"*/ '@views/tradeManagement/cpnVerify/VerifyAbsStatistics.vue'),
          meta: {
            title: '核销率口径绝对数统计表'
          }
        }
      ]
    },
    {
      path: '/systemManage',
      name: 'systemManage',
      component: () => import(/* webpackChunkName: "home"*/ '@views/home/home.vue'),
      redirect: '/systemManage/AcountManage',
      meta: {
        title: '系统管理'
      },
      children: [
        {
          path: '/systemManage/AcountManage',
          component: () => import(/* webpackChunkName: "RefundRecord"*/ '@views/systemManage/AcountManage.vue'),
          meta: {
            title: '账号管理'
          }
        },
        {
          path: '/systemManage/RoleManage',
          component: () => import(/* webpackChunkName: "RoleManage"*/ '@views/systemManage/RoleManage.vue'),
          meta: {
            title: '角色管理'
          }
        },
        {
          path: '/systemManage/OrgnizationManage',
          component: () => import(/* webpackChunkName: "OrgnizationManage"*/ '@views/systemManage/OrgnizationManage.vue'),
          meta: {
            title: '机构管理'
          }
        },
        {
          path: '/systemManage/SiteManage',
          component: () => import(/* webpackChunkName: "SiteManage"*/ '@views/systemManage/SiteManage.vue'),
          meta: {
            title: '站点管理'
          }
        },
        {
          path: '/systemManage/BussinessAreaManage',
          component: () => import(/* webpackChunkName: "BussinessAreaManage"*/ '@views/systemManage/BussinessAreaManage.vue'),
          meta: {
            title: '商圈管理 '
          }
        },
        {
          path: '/systemManage/CategoryManage',
          component: () => import(/* webpackChunkName: "CategoryManage"*/ '@views/systemManage/CategoryManage.vue'),
          meta: {
            title: '门店类别管理'
          }
        },
        {
          path: '/systemManage/MenuManage',
          component: () => import(/* webpackChunkName: "RoleManage"*/ '@views/systemManage/MenuManage.vue'),
          meta: {
            title: '菜单管理'
          }
        }
      ]
    },
    {
      path: '/searchManage',
      name: 'searchManage',
      component: () => import(/* webpackChunkName: "home"*/ '@views/home/home.vue'),
      redirect: '/searchManage/UserHistory',
      meta: {
        title: '搜索管理'
      },
      children: [
        {
          path: '/searchManage/UserHistory',
          component: () => import(/* webpackChunkName: "UserHistory"*/ '@views/searchManage/UserHistory.vue'),
          meta: {
            title: '用户搜索历史'
          }
        },
        {
          path: '/searchManage/HotWord',
          component: () => import(/* webpackChunkName: "HotWord"*/ '@views/searchManage/HotWord.vue'),
          meta: {
            title: '热门搜索词管理'
          }
        },
        {
          path: '/searchManage/Synonyms',
          component: () => import(/* webpackChunkName: "Synonyms"*/ '@views/searchManage/Synonyms.vue'),
          meta: {
            title: '搜索同义词管理'
          }
        },
        {
          path: '/searchManage/Dict',
          component: () => import(/* webpackChunkName: "Dict"*/ '@views/searchManage/Dict.vue'),
          meta: {
            title: '索引分词管理'
          }
        },
        {
          path: '/searchManage/SearchTemplate',
          component: () => import(/* webpackChunkName: "SearchTemplate"*/ '@views/searchManage/SearchTemplate.vue'),
          meta: {
            title: '搜索模板配置'
          }
        }
      ]

    },
    {
      path: '/systemManage/AreaManage',
      component: () => import(/* webpackChunkName: "AreaManage"*/ '@views/systemManage/AreaManage.vue'),
      meta: {
        title: '地区管理 '
      }
    }
  ]
})
