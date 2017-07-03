package com.zrx.hr.common.util.http;

import java.net.InetAddress;
import java.net.URI;
import java.security.GeneralSecurityException;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.Collection;
import java.util.List;

import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

import org.apache.http.Header;
import org.apache.http.HttpHost;
import org.apache.http.HttpInetConnection;
import org.apache.http.HttpResponse;
import org.apache.http.ProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.client.RedirectLocations;
import org.apache.http.protocol.HttpContext;

public class HttpClient4 {

    private static final String REDIRECT_LOCATION = "http.protocol.redirect-location";

    // 超时5秒
    private static final int CONNECTION_TIMEOUT = 5000;
    
    // 最大连接数 
    public final static int MAX_TOTAL_CONNECTIONS = 200;
    
    // 每个路由最大连接数 
    public final static int MAX_ROUTE_CONNECTIONS = 20;

    private HttpClient4() {
    }

    public static InetAddress getRemoteAddress(HttpContext context) {
        HttpInetConnection connection = (HttpInetConnection) context.getAttribute("http.connection");
        if (connection != null) {
            return connection.getRemoteAddress();
        } else {
            return null;
        }
    }

    private static URI getLocation(RedirectLocations locations) {
        List<URI> uris = locations.getAll();
        if (uris != null) {
            return uris.get(uris.size() - 1);
        } else {
            return null;
        }
    }

    public static URI getLocation(HttpContext context) {
        RedirectLocations locations = (RedirectLocations) context.getAttribute("http.protocol.redirect-locations");
        if (locations == null) {
            return null;
        }
        try {
            // since 4.1
            return getLocation(locations);
        } catch (LinkageError e) { // NOSONAR
            return (URI) context.getAttribute(REDIRECT_LOCATION);
        }
    }

    public static HttpClient getDefaultHttpClient(int timeout, HttpHost proxy, Collection<? extends Header> headers) {
        HttpClient client;
        try {
            RequestConfig config = RequestConfig.custom().setSocketTimeout(timeout)
                    .setConnectTimeout(timeout > CONNECTION_TIMEOUT ? CONNECTION_TIMEOUT : timeout).setConnectionRequestTimeout(timeout).build();
            client = HttpClients.custom()
            		.setDefaultHeaders(headers)
            		.setProxy(proxy)
            		.setDefaultRequestConfig(config)
            		.setSslcontext(getFakeSSLContext())
            		.setMaxConnTotal(MAX_TOTAL_CONNECTIONS)
            		.setMaxConnPerRoute(MAX_ROUTE_CONNECTIONS)
            		.build();
        } catch (LinkageError e) { // NOSONAR
            client = getDefaultHttpClientDeprecated(timeout, proxy, headers);
        }
        return client;
    }

    @SuppressWarnings("deprecation")
    private static HttpClient getDefaultHttpClientDeprecated(int timeout, HttpHost proxy, Collection<? extends Header> headers) {
        HttpClient client;
        try {
            // since 4.2
            client = new org.apache.http.impl.client.DecompressingHttpClient(new org.apache.http.impl.client.DefaultHttpClient());
        } catch (LinkageError e) { // NOSONAR
            client = new org.apache.http.impl.client.DefaultHttpClient() {
                @Override
                protected org.apache.http.client.RedirectHandler createRedirectHandler() {
                    return new org.apache.http.impl.client.DefaultRedirectHandler() {
                        @Override
                        public URI getLocationURI(final HttpResponse response, final HttpContext context) throws ProtocolException {
                            URI uri = super.getLocationURI(response, context);
                            context.setAttribute(REDIRECT_LOCATION, uri);
                            return uri;
                        }
                    };
                }
            };
        }

        org.apache.http.conn.ssl.SSLSocketFactory factory = new org.apache.http.conn.ssl.SSLSocketFactory(getFakeSSLContext());
        factory.setHostnameVerifier(new org.apache.http.conn.ssl.AllowAllHostnameVerifier());
        org.apache.http.conn.scheme.Scheme https = new org.apache.http.conn.scheme.Scheme("https", factory, 443);
        client.getConnectionManager().getSchemeRegistry().register(https);
        client.getParams().setIntParameter(org.apache.http.client.params.AllClientPNames.CONNECTION_TIMEOUT,
                timeout > CONNECTION_TIMEOUT ? CONNECTION_TIMEOUT : timeout);
        client.getParams().setIntParameter(org.apache.http.client.params.AllClientPNames.SO_TIMEOUT, timeout);
        // since 4.2
        client.getParams().setLongParameter(org.apache.http.client.params.AllClientPNames.CONN_MANAGER_TIMEOUT, timeout);
        client.getParams().setParameter(org.apache.http.client.params.AllClientPNames.DEFAULT_HEADERS, headers);
        client.getParams().setParameter(org.apache.http.client.params.AllClientPNames.DEFAULT_PROXY, proxy);
        return client;
    }

    private static SSLContext getFakeSSLContext() {
        try {
            SSLContext sslContext = SSLContext.getInstance("TLS");
            sslContext.init(null, new TrustManager[] { new FakeTrustManager() }, null);
            return sslContext;
        } catch (GeneralSecurityException e) {
            return null;
        }
    }

    private static class FakeTrustManager implements X509TrustManager {

        @Override
        public void checkClientTrusted(X509Certificate[] chain, String authType) throws CertificateException {
            // do nothing
        }

        @Override
        public void checkServerTrusted(X509Certificate[] chain, String authType) throws CertificateException {
            // do nothing
        }

        @Override
        public X509Certificate[] getAcceptedIssuers() {
            return new X509Certificate[0];
        }
    }
}
