package com.zrx.hr.common.util.http;

import java.io.Closeable;
import java.io.IOException;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.entity.StringEntity;
import org.apache.http.util.EntityUtils;

public class FakeHttpsUtil {

    protected FakeHttpsUtil() {
    }

    private static HttpClient client = HttpClient4.getDefaultHttpClient(100000, null, null);

    /**
     * 
     * Description: 使用默认的client进行http get请求 <br/>
     * 
     * @author wangxiaoming
     * @date 2016年3月22日 上午9:16:05
     * @param url
     * @param headers
     * @return
     * @throws ClientProtocolException
     * @throws IOException
     */
    public static String getContent(String url, Header... headers) throws ClientProtocolException, IOException {
        return getContent(client, url, headers);
    }
    

    /**
     * 
     * Description: 使用自定义client进行http get请求 <br/>
     * 
     * @author wangxiaoming
     * @date 2016年3月22日 上午9:20:28
     * @param httpClient
     * @param url
     * @param headers
     * @return
     * @throws ClientProtocolException
     * @throws IOException
     */
    public static String getContent(HttpClient httpClient, String url, Header... headers) throws ClientProtocolException, IOException {
        return getContent(httpClient, HttpPost.METHOD_NAME, url, null, false, headers);
    }
    
    public static String getContentPut(String url, final String data) throws ClientProtocolException, IOException {
        return getContent(client, HttpPut.METHOD_NAME, url, data, true, null);
    }
    
    public static String getContentGet(String url, final String data) throws ClientProtocolException, IOException {
    	String result = getContent(client, HttpGet.METHOD_NAME, url, data, true, null);
        return new String(Base64.decodeBase64(result),"utf-8");
    }

    /**
     * 
     * Description: POST请求数据 <br/>
     * 
     * @author wangxiaoming
     * @date 2016年4月7日 下午4:14:40
     * @param url
     * @param requestData
     * @param post
     * @param headers
     * @return
     * @throws ClientProtocolException
     * @throws IOException
     */
    public static String getContent(String url, HttpEntity entity, Header... headers) throws ClientProtocolException, IOException {
        HttpPost request = new HttpPost(url);
        request.setEntity(entity);
        if (null != headers) {
            for (Header header : headers) {
                request.setHeader(header);
            }
        }
        return doRequest(client, request);
    }

    /**
     * 
     * Description: 请求并返回数据 <br/>
     * 
     * @author wangxiaoming
     * @date 2016年4月8日 上午10:51:36
     * @param client
     * @param request
     * @return
     * @throws ClientProtocolException
     * @throws IOException
     */
    private static String doRequest(HttpClient client, HttpUriRequest request) throws ClientProtocolException, IOException {
        HttpResponse response = client.execute(request);
        String result = "";
        try {
            int status = response.getStatusLine().getStatusCode();
            if (status == HttpStatus.SC_OK) {
            	result = EntityUtils.toString(response.getEntity());
            }
        } catch(Exception e){
        	request.abort();
        	e.printStackTrace();
        } finally {
        	EntityUtils.consumeQuietly(response.getEntity());
        }
        return result;
    }

    /**
     * 
     * Description: <br/>
     * 
     * @author caohui2
     * @date 2016年4月18日 下午5:05:28
     * @param url
     * @return
     * @throws ClientProtocolException
     * @throws IOException
     */
    public static String getContent(String url) throws ClientProtocolException, IOException {
        HttpUriRequest request = new HttpGet(url);
        return doRequest(client, request);
    }

    /**
     * 
     * Description: 使用自定义client请求 url数据 <br/>
     * 
     * @author wangxiaoming
     * @date 2016年3月22日 上午9:21:27
     * @param httpClient
     * @param method
     *            (GET|POST|PUT|DELETE)
     * @param url
     * @param headers
     * @return
     * @throws ClientProtocolException
     * @throws IOException
     */
    public static String getContent(HttpClient httpClient, String method, String url, final String data, boolean base64, Header... headers)
            throws ClientProtocolException, IOException {
        HttpUriRequest request;

        String requestData = data;
        if (StringUtils.isNotBlank(data) && base64) {
            requestData = Base64.encodeBase64String(data.getBytes("UTF-8"));
        }

        if (null == requestData) {
            requestData = "";
        }

        // 判断是否是post请求
        if (HttpPost.METHOD_NAME.equalsIgnoreCase(method)) {
            request = new HttpPost(url);
            StringEntity entity = new StringEntity(requestData, "UTF-8");

            ((HttpPost) request).setEntity(entity);
        } else if (HttpPut.METHOD_NAME.equalsIgnoreCase(method)) {
            request = new HttpPut(url);
            StringEntity entity = new StringEntity(requestData, "UTF-8");

            ((HttpPut) request).setEntity(entity);
        } else {
            if (url.contains("?")) {
                url += "&" + requestData;
            } else {
                url += "?" + requestData;
            }
            request = new HttpGet(url);
        }
        if (base64) {
            request.setHeader("Content-Transfer-Encoding", "base64");
        }

        if (null != headers) {
            for (Header header : headers) {
                request.setHeader(header);
            }
        }

        return doRequest(httpClient, request);
    }

    /**
     * 
     * Description: base64 编码 <br/>
     * 
     * @author wangxiaoming
     * @date 2016年3月22日 上午9:36:57
     * @param httpClient
     * @param method
     *            (GET|PUT|POST|DELETE)
     * @param url
     * @param data
     * @param headers
     * @return
     * @throws ClientProtocolException
     * @throws IOException
     */
    public static String retrieveContentBase64(HttpClient httpClient, String method, String url, String data, Header... headers)
            throws ClientProtocolException, IOException {
        return getContent(httpClient, method, url, data, true, headers);
    }

    /**
     * 
     * Description: 使用默认httpclient请求url数据 <br/>
     * 
     * @author wangxiaoming
     * @date 2016年3月22日 上午9:37:56
     * @param url
     * @param body
     * @return
     * @throws ClientProtocolException
     * @throws IOException
     */
    public static String retrieveContentBase64(String url, String body) throws ClientProtocolException, IOException {
        return retrieveContentBase64(url, body, HttpGet.METHOD_NAME);
    }

    /**
     * 
     * Description: <br/>
     * 
     * @author wangxiaoming
     * @date 2016年4月15日 下午4:02:30
     * @param url
     * @param body
     * @param method
     *            (GET|POST|PUT|DELETE)
     * @return
     * @throws ClientProtocolException
     * @throws IOException
     */
    public static String retrieveContentBase64(String url, String body, String method) throws ClientProtocolException, IOException {
        String retrieveContentBase64 = retrieveContentBase64(client, method, url, body, new Header[0]);
        if (Base64.isBase64(retrieveContentBase64)) {
            byte[] decodeBase64 = Base64.decodeBase64(retrieveContentBase64);
            return new String(decodeBase64);
        }
        return retrieveContentBase64;
    }

}