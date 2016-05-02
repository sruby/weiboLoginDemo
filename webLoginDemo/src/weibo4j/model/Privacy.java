package weibo4j.model;

import weibo4j.http.Response;
import weibo4j.org.json.JSONException;
import weibo4j.org.json.JSONObject;

/**
 * ��ȡ��˽������Ϣ
 * 
 * @author xiaoV
 * 
 */
public class Privacy extends WeiboResponse {

	private static final long serialVersionUID = 8055620370528957274L;
	private long badge; // ѫ���Ƿ�ɼ���0�����ɼ���1���ɼ�
	private long comment; // �Ƿ���������ҵ�΢����0�������ˡ�1����ע���ˡ�2�������û�
	private long geo; // �Ƿ���������Ϣ��0����������1������
	private long message; // �Ƿ���Ը��ҷ�˽�ţ�0�������ˡ�1���ҹ�ע���ˡ�2�������û�
	private long mobile; // �Ƿ����ͨ���ֻ������������ң�0�������ԡ�1������
	private long realname; // �Ƿ����ͨ�������������ң�0�������ԡ�1������
	private long profileUrlType;
	private long webim; // �Ƿ���webim�� 0����������1������

	public Privacy(Response res) throws WeiboException {
		super(res);
		JSONObject json = res.asJSONObject();
		try {
			badge = json.getLong("badge");
			comment = json.getLong("comment");
			geo = json.getLong("geo");
			message = json.getLong("message");
			mobile = json.getLong("mobile");
			realname = json.getLong("realname");
			profileUrlType = json.getLong("profileUrlType");
			webim = json.getLong("webim");
		} catch (JSONException je) {
			throw new WeiboException(je.getMessage() + ":" + json.toString(),
					je);
		}
	}

	public Privacy(JSONObject json) throws WeiboException {
		try {
			badge = json.getLong("badge");
			comment = json.getLong("comment");
			geo = json.getLong("geo");
			message = json.getLong("message");
			mobile = json.getLong("mobile");
			realname = json.getLong("realname");
			profileUrlType = json.getLong("profileUrlType");
			webim = json.getLong("webim");
		} catch (JSONException je) {
			throw new WeiboException(je.getMessage() + ":" + json.toString(),
					je);
		}
	}

	public long getBadge() {
		return badge;
	}

	public void setBadge(long badge) {
		this.badge = badge;
	}

	public long getComment() {
		return comment;
	}

	public void setComment(long comment) {
		this.comment = comment;
	}

	public long getGeo() {
		return geo;
	}

	public void setGeo(long geo) {
		this.geo = geo;
	}

	public long getMessage() {
		return message;
	}

	public void setMessage(long message) {
		this.message = message;
	}

	public long getMobile() {
		return mobile;
	}

	public void setMobile(long mobile) {
		this.mobile = mobile;
	}

	public long getRealname() {
		return realname;
	}

	public void setRealname(long realname) {
		this.realname = realname;
	}

	public long getProfileUrlType() {
		return profileUrlType;
	}

	public void setProfileUrlType(long profileUrlType) {
		this.profileUrlType = profileUrlType;
	}

	public long getWebim() {
		return webim;
	}

	public void setWebim(long webim) {
		this.webim = webim;
	}

	@Override
	public String toString() {
		return "Privacy [badge=" + badge
				+ ", comment=" + comment
				+ ", geo=" + geo
				+ ", message=" + message
				+ ", mobile=" + mobile
				+ ", profileUrlType=" + profileUrlType
				+ ", webim=" + webim
				+ ", realname=" + realname + "]";
	}
}
