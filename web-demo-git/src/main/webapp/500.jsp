<%@ page language="java" isErrorPage="true" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html>
<head>
	<meta http-equiv="content-type" content="text/html; charset=UTF-8">
</head>
<body>
对不起，服务器内部发生错误！<br>
<%
	exception.printStackTrace();
	out.print(exception);
%>
</body>
</html>