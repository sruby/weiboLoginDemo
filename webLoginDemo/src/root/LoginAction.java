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
 * ����: ��ת��������Ȩҳ��ȥ
 * ��Ȩ: Copyright (c) 2012 
 * ��˾: ˼����Ϣ
 * ����: ��ά��
 * �汾: 1.0 
 * ��������: Mar 24, 2016 
 * ����ʱ��: 3:46:21 PM
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
            String url = oauth.authorize("code");//����code����url
//            getResponse().sendRedirect(url);
            BareBonesBrowserLaunch.openURL(url);
        }
        catch (WeiboException e)
        {
            resultVo.setErrorInfo("΢����½����Code�쳣");
            resultVo.setErrorNo("-1");
           logger.error("΢����½����Code�쳣", e);
        }
        catch (Exception e)
        {
            resultVo.setErrorInfo("ϵͳ�쳣�����Ժ����ԣ�");
            resultVo.setErrorNo("-2");
           logger.error("ϵͳ�쳣�����Ժ�����", e);
        }
        this.getWriter().write(JsonHelper.getJSONString(resultVo.toMap()));
        return null;
    }
	
    /**
     * 
     * @������
     * @��˾��������˼�ϿƼ�
     * @���ߣ���ά��
     * @������ @return    
     * @return ActionResult   
     * @throws JSONException 
     * @����ʱ�䣺Mar 24, 2016 5:23:01 PM
     * @�汾��V1.0
     */
    public ResultVo doLogin(){
	    ResultVo resultVo = new ResultVo();
        //���ͻ����ȡ����Ȩ���ڴ˴���Ӧ����
        String error_uri = getRequest().getQueryString();
        logger.info("error_uri: "+error_uri);
        if(error_uri != null && error_uri.contains("error_uri="))
        {
            resultVo.setErrorInfo("΢���ʺ�δͬ����Ȩ��");
            logger.error("errMsg:  ΢���ʺ�δͬ����Ȩ��");
            resultVo.setErrorNo("-1");
        }else{
            String code = getStrParameter("code");
            logger.info("code: "+code);
            Oauth oauth = new Oauth();
            try
            {
                AccessToken access_token = oauth.getAccessTokenByCode(code);        
                logger.info("access_token: "+access_token);
              //ͨ��΢��uid������΢����ȡ���˺������Ϣ
                logger.info("access_tokenStr: "+access_token.toString());
                String accessToken = access_token.getAccessToken() ;
                String uid = access_token.getUid();
                String expireIn = access_token.getExpireIn();
                String refreshToken = access_token.getRefreshToken() ;
                logger.info("accessToken: "+accessToken+" | uid | "+uid+" | expireIn | "+expireIn+" | refreshToken | "+refreshToken);
                
                //ͨ��΢��uid������΢����ȡ���˺������Ϣ
                Users um = new Users(accessToken);
                User user = null;
                try {
                    user = um.showUserById(uid);
                    logger.info("user: "+user.toString());
                } catch (WeiboException e) {
                    e.printStackTrace();
                }
//                String id = user.getId();//����΢���ʺ�id
//                String name = user.getName(); //�Ѻ���ʾ���ƣ���Bill Gates
//                String screenName = user.getScreenName();//΢���ǳ�
//                String weiHao = user.getWeihao();
//                String statusId = user.getStatusId();
//                
//                //���˿ͻ���¼
                Map<String, Object> paraMap = new HashMap<String, Object>();
                paraMap.put("uid", uid);//id
                paraMap.put("exspireIn", expireIn);//
                paraMap.put("refreshToken",  refreshToken);//
                paraMap.put("accessToken", accessToken);//��ȡ����Ȩ�޿���
                paraMap.put("user", user);//�û���Ϣ
                resultVo.setResults(paraMap);
            } catch (WeiboException e) {
                if(401 == e.getStatusCode()){
                    resultVo.setErrorNo("-2");
                    resultVo.setErrorInfo("΢����¼����Unable to get the access token.");
                    logger.error("΢����¼����Unable to get the access token.");
                }else{
                    resultVo.setErrorNo("-3");
                    resultVo.setErrorInfo("΢����¼����Unable to get the access token.");
                    logger.error("΢����¼����");
                    e.printStackTrace();
                }
            }
        }
        
//        return resultVo;
        this.getWriter().write(JsonHelper.getJSONString(resultVo.toMap()));
        return null;
	}
	
}
