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
                    <span id="menu-home">
                        <a href="/"><li class="active">HOME</li></a>
                        <div class="menuItem rounded shadowed"></div>
                    </span>
                    <span id="menu-servidor">
                        <a href="/servidor.php"><li>RANKING</li></a>
                        <div class="menuItem rounded shadowed"></div>
                    </span>
                    <span id="menu-ranking">
                        <a href="/ranking.php"><li>F.A.Q.</li></a>

                        <div class="menuItem rounded shadowed"></div>
                    </span>
                    <span id="menu-faq">
                        <a href="/faq.php"><li>FÓRUM</li></a>

                        <div class="menuItem rounded shadowed"></div>
                    </span>
                    <span id="menu-forum">
                        <a href="/forum"><li>UCP</li></a>

                        <div class="menuItem rounded shadowed" style="width: 350px;">
                            <a href="#" class="col-md-4 text-center">Minha conta</a>
                            <a href="#" class="col-md-4 text-center">Torneios</a>
                            <a href="#" class="col-md-4 text-center">Objetos SA-MP</a>
                            <a href="#" class="col-md-4 text-center">Mapa do Servidor</a>
                            <a href="#" class="col-md-4 text-center">Loja Virtual</a>
                        </div>
                    </span>
                    <span id="menu-competitivo">
                        <a href="/competitivo"><li style="width: 140px;">COMPETITIVO</li></a>

                        <div class="menuItem rounded shadowed"></div>
                    </span>
                </ul>
                <div class="server-widget">
                    <h1 class="title">[:.:.Brazuca’s Server (Nova versão a caminho!) .:.:]</h1>
                    <table class="details" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                            <td class="ip">{{ sails.config.brazucasConfig.serverIp }}:{{ sails.config.brazucasConfig.serverPort }}</td>
                            <td class="players"><span id="players">-</span>/<span id="maxplayers">-</span></td>
                        </tr>
                        <tr>
                            <td class="mode"><span id="mode">-</span></td>
                            <td class="map"><span id="map">-</span></td>
                        </tr>
                    </table>

                    <button class="playRpgMinigames btn btn-primary">Jogar RPG/Minigames</button>
                </div>
                <div class="auto-fill social" id="loginForm" style="padding-left: 0px; position: relative;">
                    <div class="noty-container no-opacity" style="position: absolute;width: 90%; left: 5%; z-index:2000;"></div>
                    <div class="ajaxWait"><div class="no-copy">Aguarde...</div></div>

                    <div class="container-fluid col-md-7" style="padding-left: 0px; padding-right: 0px;">
                        <div class="col-md-12" style="margin-bottom: 3px;">
                            <input type="text" placeholder="Nick" id="nick" style="height: 27px;" class="form-control col-md-12"/>
                        </div>

                        <div class="col-md-12">
                            <input type="text" placeholder="Senha" id="senha" style="height: 27px;" class="form-control col-md-12"/>
                        </div>
                    </div>

                    <div class="col-md-5 text-center" style="padding: 0px; margin: 0px; position: relative; height: 100%">
                        <button id="login" class="btn btn-primary">Login</button>
                        <br />
                        <div style="position: absolute; text-align: center; bottom: 0;">
                            <a href="#"><small><small>Esqueci minha senha</small></small></a>
                        </div>
                    </div>
                    {#<div class="networks">#}
                        {#<a href="http://www.facebook.com/BrazucasServer"><img src="images/social-facebook-icon.png" alt="Facebook" /></a>#}
                        {#<a href=""><img src="images/social-gplus-icon.png" alt="G+" /></a>#}
                        {#<a href=""><img src="images/social-twitter-icon.png" alt="Twitter" /></a>#}
                        {#<a href=""><img src="images/social-youtube-icon.png" alt="YouTube" /></a>#}
                    {#</div>#}
                </div>

                <div class="auto-fill social" style="padding-left: 0px; position: relative; display: none;" id="loggedUserInfo">
                    <div class="col-md-8"><b>Olá</b>, <span id="nickname">Mandrakke_Army</span>.</div>
                    <div class="col-md-4 text-right"><a href="#"><button style="padding: 4px; font-size: 10px;" class="btn btn-primary">Sair</button></a></div>
                    <div class="col-md-6 text-left" style="margin-top: 10px; font-size:15px">#33 <span style="font-size:15px; color: #006600" id="kills">99</span>/<span style="font-size: 15px; color: #aaaa00" id="deaths">99</span>/<span style="font-size: 15px; color: #cc0000" id="assists">99</span></div>
                    <div class="col-md-6 text-right" style="margin-top: 13px;"><a href="#"></a><a href="#"></a><a href="#">Minha Conta</a></div>
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