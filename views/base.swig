<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>[:.:.Brazuca's Server.:.:] {% block titulo %}Mude-me!{% endblock %}</title>
        <link rel="shortcut icon" href="/images/favicon.ico" type="image/x-icon" />
        <link type="text/css" href="/styles/bootstrap.min.css" rel="Stylesheet" />
        <link type="text/css" href="/styles/bootstrap-theme.min.css" rel="Stylesheet" />
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
        <script type="text/javascript" src="js/html2canvas.js"></script>
        <script type="text/javascript" src="js/jquery.livequery.js"></script>

        <script type="text/javascript" src="js/jquery.browser.js"></script>
        <script type="text/javascript" src="js/brz/floatTabs.js"></script>
        <script type="text/javascript" src="js/custom.protocol.detect.js"></script>

        <script type="text/javascript" src="js/brz/jqueryCustoms.js"></script>
        <script type="text/javascript" src="js/brz/core.js"></script>
        <script type="text/javascript" src="js/brz/menuEvents.js"></script>
        <script type="text/javascript" src="js/brz/socketsHook.js"></script>
        <script type="text/javascript" src="js/brz/webchat/core.js"></script>
        <script type="text/javascript" src="js/brz/sampServerNotifications.js"></script>

        <script type="text/javascript">
            // @TODO verificar uma melhor maneira de injetar arquivos de configuração server-side no cliente.
            var brazucasConfig = {{ sails.config.brazucasConfig | json | raw }};
        </script>

        {% block javascript_libs %}{% endblock %}
    </head>

    <body>
        {% block corpo %}{% endblock %}

        <div id="floatTabs" class="floatTabs"></div>

        {# Utilizado para detectar protocolos customizados (o protocolo do sa-mp, por exemplo). #}
        <input id="protocol" value="" placeholder="custom protocol" type="hidden"/>
        <iframe id="hiddenIframe" src="about:blank" style="display:none"></iframe>
        <a id="hiddenLink" style="display:none;" href="#">custom protocol</a>
    </body>
</html>