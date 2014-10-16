{% extends 'base.swig' %}

{% block corpo %}
    <div class="layout row center-block">
        <div class="header container-fluid">
            <div class="logo">
                {% block logo_principal %}<a href="/"><img src="/images/logo.png" alt="Brazuca's Server" /></a>{% endblock %}
            </div>
        </div>
        {% block menu_principal %}
            <div class="rounded shadowed menu container-fluid main-menu">
                <ul class="menu nav">
                    <a href="/"><li class="active" id="menu-home">HOME</li></a>
                    <a href="/servidor.php"><li id="menu-servidor">RANKING</li></a>
                    <a href="/ranking.php"><li id="menu-ranking">F.A.Q.</li></a>
                    <a href="/faq.php"><li id="menu-faq">FÓRUM</li></a>
                    <a href="/forum"><li id="menu-forum">UCP</li></a>
                    <a href="/competitivo"><li id="menu-competitivo" style="width: 140px;">COMPETITIVO</li></a>
                </ul>
                <div class="server-widget">
                    <h1 class="title">[:.:.Brazuca’s Server (Nova versão a caminho!) .:.:]</h1>
                    <table class="details" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                            <td class="ip"><a class="highlight" id="ip" href="#">-</a></td>
                            <td class="players"><span id="players">-</span>/<span id="maxplayers">-</span></td>
                        </tr>
                        <tr>
                            <td class="mode"><span id="mode">-</span> (<span id="nextMode"></span> em <span id="nextModeCountdown">-</span>)</td>
                            <td class="map"><span id="map">-</span></td>
                        </tr>
                    </table>

                    <button class="playRpgMinigames btn btn-primary">Jogar RPG/Minigames</button>
                </div>
                <div class="auto-fill social">
                    <div class="networks">
                        <a href="http://www.facebook.com/BrazucasServer"><img src="images/social-facebook-icon.png" alt="Facebook" /></a>
                        <a href=""><img src="images/social-gplus-icon.png" alt="G+" /></a>
                        <a href=""><img src="images/social-twitter-icon.png" alt="Twitter" /></a>
                        <a href=""><img src="images/social-youtube-icon.png" alt="YouTube" /></a>
                    </div>
                </div>
            </div>
        {% endblock %}

        {% block conteudo %}
        {% endblock %}

        {% block rodape %}
            <div class="rounded shadowed footer">
                <div class="left">
                    <span>Este é um projeto Open-Source</span><br />
                    <span><a class="highlight" target="_blank" href="https://github.com/{{ sails.config.brazucasConfig.gitHubAppPath }}/">Acesse nosso GitHub</a></span>
                </div>
                <div class="right">
                    <span>Copyright© 2006-2014 Brazucas-Server.com</span><br />
                    <span>Versão atual: <font color="#990000">{{ sails.config.brazucasConfig.version }}</font></span>
                </div>
            </div>
        {% endblock %}
    </div>

    <br />
{% endblock %}