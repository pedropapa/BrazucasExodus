<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="author" content="Paulo Vianna Mu (paulomu@live.com)" />
    <title>[:.:.Brazuca's Server.:.:] {% block titulo %}Mude-me!{% endblock %}</title>
    <link rel="shortcut icon" href="/images/favicon.ico" type="image/x-icon" />
    <link type="text/css" href="/styles/bootstrap.min.css" rel="Stylesheet" />
    <link type="text/css" href="/styles/style.css" rel="stylesheet" />
    <link type="text/css" href="/styles/bjqs.css" rel="Stylesheet" />
    <link type="text/css" href="/styles/brazucas.css" rel="Stylesheet" />
    {% block css_libs %}{% endblock %}

    <script type="text/javascript" src="js/socket.io.js"></script>
    <script type="text/javascript" src="js/sails.io.js"></script>
    <script type="text/javascript" src="js/app.js"></script>
    <script type="text/javascript" src="js/jquery-2.1.1.min.js"></script>
    <script type="text/javascript" src="js/bootstrap.min.js"></script>
    <script type="text/javascript" src="js/jquery.noty.packaged.min.js"></script>

    <script type="text/javascript" src="js/brz/jqueryCustoms.js"></script>
    <script type="text/javascript" src="js/brz/core.js"></script>
    {% block javascript_libs %}{% endblock %}
</head>

<body>
    {% block corpo %}{% endblock %}

    <div id="floatTabs" class="floatTabs"></div>
</body>
</html>