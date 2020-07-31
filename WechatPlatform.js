import WxApi from "./WxApi";


cc.Class({


    platformGridAdCreate(adContent){//根据场景中的指定 node 定位
        
        let btnSize = cc.size(adContent.width+10,adContent.height+10);
        let frameSize = cc.view.getFrameSize();
        let winSize = cc.director.getWinSize();
    
        console.log("winSize: ",winSize);
        console.log("frameSize: ",frameSize);
        //适配不同机型来创建格子广告
        let left = (winSize.width*0.5+adContent.x-btnSize.width*0.5)/winSize.width*frameSize.width;
        // let top = (winSize.height*0.5-adContent.y-btnSize.height*0.5)/winSize.height*frameSize.height;
      
        let width = btnSize.width/winSize.width*frameSize.width;
        let height = btnSize.height/winSize.height*frameSize.height;
        let top =  winSize.height - adContent.getComponent(cc.Widget).bottom; 
        console.log("button pos: ",cc.v2(left,top));
        console.log("button size: ",cc.size(width,height));
    
        var data = {
            adUnitId:'',  //广告id
            adTheme: 'black',
            gridCount: 5,
            style: {
                left: left,
                top: top/winSize.height*frameSize.height - height,
                width: width,
                opacity: 0.8
            }
        }
    
    
        var that = this;
     
        if(window.gridAd){ //有的话 先销毁 再创建新的
            window.gridAd.destroy();
        }
        window.gridAd = WxApi.createGridAd(data);
        window.gridAd.onLoad(() => {
            window.gridAd.offLoad();
            console.log('Grid 广告加载成功')
        })
        window.gridAd.onError(err => {
            SLog.logEvent('gridAd_error', "code=" + err.errCode + "&msg=" + err.errMsg + "&err=" + JSON.stringify(err));
            window.gridAd.offError();
            console.log(err)
        })
        // window.gridAd.show();
       
    },
    //格子广告的显示或隐藏
    platformGridAdShowOrHide(isShow){
        if(window.gridAd){
            if(isShow){
                window.gridAd.show();
            }
            else{
                window.gridAd.hide();
            }
        }else{
            console.log('没有创建格子广告')
        }
    },
    
    
    /**
     * @description: 原生广告模板
     * @param {adUnitId,left,top,fixed}  amount (需要几个原生格子)
     * @return: 
     */
    platformCustomAdCreate(obj,amount){
    
        let frameSize = cc.view.getFrameSize();
        let frameHeight = frameSize.height;
        console.log(frameHeight / 2 - ((amount * 120) / 2));
        
        window.customAdAmount = amount;
        var obj = {
            adUnitId : '', //广告id
            left : 0,
            top : frameHeight / 2 - ((amount * 120) / 2) - 60, //每个格子约120 rpx
            fixed : false,
        } 
       
    
        if(window.customAd){ //有的话 
            return;
        }
        else{
            window.customAd = new Array;
            for(let i = 0; i < amount ; i++){
                console.log(' window.customAd ', window.customAd);
                window.customAd[i] = WxApi.createCustomAd(obj);
    
                obj.top = obj.top + 120;
    
            }
            
        }
        for(let i = 0; i < amount ; i++){
            window.customAd[i].onLoad(() => {
                window.customAd[i].offLoad();
                console.log('原生 广告加载成功')
            })
            window.customAd[i].onError(err => {
                SLog.logEvent('customAd_error', "code=" + err.errCode + "&msg=" + err.errMsg + "&err=" + JSON.stringify(err));
                window.customAd[i].offError();
                console.log(err)
            })
        }
      
    },
    platformCustomAdShowOrHide(isShow){
        if(window.customAd){
            for(let i = 0; i < window.customAdAmount ; i++){
                if(isShow){
                    window.customAd[i].show();
                }
                else{
                    window.customAd[i].hide();
                }
            }
        }else{
            console.log('没有创建原生模板广告')
        }
    },

})

