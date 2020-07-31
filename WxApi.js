import Util from "./Util";

var WxApi = {
 /**
    * @description: 
    * 原生模板广告
    * 1、 开发者参考下方使用说明，完成接入（小程序与小游戏不同）
    * 2、 内测期间最低的基础库版本为2.10.4，格子模板最低基础库为2.11.1
    * 小游戏仅格子模板
    * 原生模板广告组件默认是隐藏的，需要调用 CustomAd.show() 进行显示
    * (要求基础库版本 >= 2.11.2 )部分非全屏的广告模板支持隐藏 API，CustomAd.hide()，可将广告临时隐藏，再调用 show 会再次展示
    * @param {type} 
    * @return: 
    */ 
   createCustomAd : function(obj){
        let verison = this.getSystemInfoSync().SDKVersion;
        if (cc.sys.browserType === cc.sys.BROWSER_TYPE_WECHAT_GAME && Util.versionCompare(verison,'2.11.2') >= 0) {
            console.log('创建原生模板广告');
            return  wx.createCustomAd({
                adUnitId: obj.adUnitId,
                left: obj.left,
                top: obj.top,
                fixed: false
            })
        }
        else{
            console.log('createCustomAd，在微信环境下才生效');
            LOG('createCustomAd，在微信环境下才生效');
        }
    },
    /**
    * 创建 格子gezi 广告组件
    * @param  obj adUnitId	广告单元id	style 广告组件的样式
    */
    // adUnitId: 'xxxx',
    // adTheme: 'white',
    // gridCount: 5,
    // style: {
    //   left: 10,
    //   top: 76,
    //   width: 330,
    //   opacity: 0.8
    // }
    createGridAd : function(obj){
        if (cc.sys.browserType === cc.sys.BROWSER_TYPE_WECHAT_GAME) {
            return  wx.createGridAd({
                adUnitId: obj.adUnitId,
                adTheme: obj.adTheme,
                gridCount: obj.gridCount,
                style: obj.style
            });
        } else {
            LOG('createBannerAd，在微信环境下才生效');
        }
    },
}


export default WxApi;