package root;


import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import net.sf.json.JSONException;

import org.apache.log4j.Logger;
import weibo4j.Oauth;
import weibo4j.Users;
import weibo4j.http.AccessToken;
import weibo4j.model.User;
import weibo4j.model.WeiboException;
import weibo4j.util.BareBonesBrowserLaunch;

import com.thinkive.base.config.Configuration;
import com.thinkive.base.util.SessionHelper;
import com.thinkive.base.util.StringHelper;
import com.thinkive.tbservice.result.ResultVo;
import com.thinkive.tbservice.util.JsonHelper;
import com.thinkive.web.base.ActionResult;
import com.thinkive.web.base.BaseAction;

/**
 * 描述: 跳转到新浪授权页面去
 * 版权: Copyright (c) 2012 
 * 公司: 思迪信息
 * 作者: 孔维儒
 * 版本: 1.0 
 * 创建日期: Mar 24, 2016 
 * 创建时间: 3:46:21 PM
 */
public class LoginAction extends BaseAction
{
	
	private static Logger logger = Logger.getLogger(LoginAction.class);
	
    public ActionResult doDefault() throws IOException, JSONException
    {
        ResultVo resultVo = new ResultVo();
        try
        {
            Oauth oauth = new Oauth();
            String url = oauth.authorize("code");//根据code返回url
//            getResponse().sendRedirect(url);
            BareBonesBrowserLaunch.openURL(url);
        }
        catch (WeiboException e)
        {
            resultVo.setErrorInfo("微薄登陆请求Code异常");
            resultVo.setErrorNo("-1");
           logger.error("微薄登陆请求Code异常", e);
        }
        catch (Exception e)
        {
            resultVo.setErrorInfo("系统异常，请稍后再试！");
            resultVo.setErrorNo("-2");
           logger.error("系统异常，请稍后再试", e);
        }
        this.getWriter().write(JsonHelper.getJSONString(resultVo.toMap()));
        return null;
    }
	
    /**
     * 
     * @描述：
     * @公司：深圳市思迪科技
     * @作者：孔维儒
     * @参数： @return    
     * @return ActionResult   
     * @throws JSONException 
     * @创建时间：Mar 24, 2016 5:23:01 PM
     * @版本：V1.0
     */
    public ResultVo doLogin(){
	    ResultVo resultVo = new ResultVo();
        //若客户点击取消授权，在此处响应拦截
        String error_uri = getRequest().getQueryString();
        logger.info("error_uri: "+error_uri);
        if(error_uri != null && error_uri.contains("error_uri="))
        {
            resultVo.setErrorInfo("微博帐号未同意授权！");
            logger.error("errMsg:  微博帐号未同意授权！");
            resultVo.setErrorNo("-1");
        }else{
            String code = getStrParameter("code");
            logger.info("code: "+code);
            Oauth oauth = new Oauth();
            try
            {
                AccessToken access_token = oauth.getAccessTokenByCode(code);        
                logger.info("access_token: "+access_token);
              //通过微博uid从新浪微博获取该账号相关信息
                logger.info("access_tokenStr: "+access_token.toString());
                String accessToken = access_token.getAccessToken() ;
                String uid = access_token.getUid();
                String expireIn = access_token.getExpireIn();
                String refreshToken = access_token.getRefreshToken() ;
                logger.info("accessToken: "+accessToken+" | uid | "+uid+" | expireIn | "+expireIn+" | refreshToken | "+refreshToken);
                
                //通过微博uid从新浪微博获取该账号相关信息
                Users um = new Users(accessToken);
                User user = null;
                try {
                    user = um.showUserById(uid);
                    logger.info("user: "+user.toString());
                } catch (WeiboException e) {
                    e.printStackTrace();
                }
//                String id = user.getId();//新浪微博帐号id
//                String name = user.getName(); //友好显示名称，如Bill Gates
//                String screenName = user.getScreenName();//微博昵称
//                String weiHao = user.getWeihao();
//                String statusId = user.getStatusId();
//                
//                //新浪客户登录
                Map<String, Object> paraMap = new HashMap<String, Object>();
                paraMap.put("uid", uid);//id
                paraMap.put("exspireIn", expireIn);//
                paraMap.put("refreshToken",  refreshToken);//
                paraMap.put("accessToken", accessToken);//获取到的权限口令
                paraMap.put("user", user);//用户信息
                resultVo.setResults(paraMap);
            } catch (WeiboException e) {
                if(401 == e.getStatusCode()){
                    resultVo.setErrorNo("-2");
                    resultVo.setErrorInfo("微博登录出错：Unable to get the access token.");
                    logger.error("微博登录出错：Unable to get the access token.");
                }else{
                    resultVo.setErrorNo("-3");
                    resultVo.setErrorInfo("微博登录出错：Unable to get the access token.");
                    logger.error("微博登录出错");
                    e.printStackTrace();
                }
            }
        }
        
//        return resultVo;
        this.getWriter().write(JsonHelper.getJSONString(resultVo.toMap()));
        return null;
	}
	
}
