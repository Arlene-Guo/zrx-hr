package com.zrx.hr.common.web.filter;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.filter.OncePerRequestFilter;

/**
 * Description: 
 * @author wangxiaoming
 * @date 2016年9月12日 下午1:34:26
 */
public class RequestCharacterDecodingFilter extends OncePerRequestFilter {
	
	private String decoding;

	public String filter(HttpServletRequest request, String input) {
		String ret = input;
		if (input == null || input.trim().equals("(null)")) {
			ret = null;
			return ret;
		}
		try {
			ret = URLDecoder.decode(ret, decoding);
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return ret;
	}

	@Override
	protected void doFilterInternal(final HttpServletRequest request, 
			HttpServletResponse response, FilterChain chain)
			throws ServletException, IOException {
		chain.doFilter(new HttpServletRequestWrapper(request) {

			@Override
			public String getParameter(String name) {
				String value = super.getParameter(name);
				return filter(this, value);
			}

			@Override
			public String[] getParameterValues(String name) {
				String[] values = super.getParameterValues(name);
				if (values == null) {
					return null;
				}
				for (int i = 0; i < values.length; i++) {
					values[i] = filter(this, values[i]);
				}
				return values;
			}
		}, response);
	}

	public String getDecoding() {
		return decoding;
	}

	public void setDecoding(String decoding) {
		this.decoding = decoding;
	}
}
