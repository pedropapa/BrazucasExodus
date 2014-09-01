{% extends 'base.swig' %}

{% block javascript_libs %}
    <script type="text/javascript">
        $(document).ready(function() {
            // Responsável por receber qualquer tipo de dado enviado pela aplicação via socket.
            socket.on('message', function(data) {
                console.log(data);
                // Onde o modelsHook é iniciado.
                if(data.model) {
                    modelsHook[data.model][data.verb]((data.data)?data.data:data.previous);
                }

                if(data.sampAction) {
                    switch(data.sampAction) {
                        // Evento de morte no servidor
                        case 'sampServerKill':
                            sampServerNotifications.killEvent(data.killerName, data.deadName, data.reason, (new Date()).getTime(), 'TODO');
                        break;
                        case 'chatMessage':
                        case 'particularMessage':
                            webchat.othersMessage.create(data);
                        break;
                    }
                }
            });

            socket.on('disconnect', function(data) {
                // @TODO
                // Desativar o webchat, competitivo e qualquer outro módulo do ucp que tenha conectividade via socket.
                // Obrigar o usuário a atualizar a página ao reestabelecer a conexão.
                noty({text: 'A conexão com o servidor foi perdida, tentando reconnectar...', type: 'error', killer: true, timeout: false, closeWith: []});
            });

            socket.on('connect', function(data) {
                // @TODO
                // Se for um reconnect, obrigar o usuário a atualizar a página.
                $.noty.closeAll();
                noty({text: 'Conexão reestabelecida!', type: 'success', killer: true, timeout: 3000});
            });
        });

        /**
         * modelsHook
         * Responsável por receber qualquer tipo de instrução realizada em uma determinada model.
         * Sendo a instrução de cada model criada da seguinte maneira: 'model.instrução()'.
         */
        var modelsHook = {
            // Usuario.js Model
            // Responsável por gerenciar os usuários da aplicação.
            usuario: {
                update: function(data) {
                    alert(data.toSource());
                },
                create: function(data) {
                    if(data.length > 0) {
                        for(x in data) {
                            webchat.users.login(data[x].username, data[x].source);
                        }
                    } else {
                        webchat.users.login(data.username, data.source);
                    }
                },
                destroy: function(data) {
                    webchat.users.logout(data.username);
                },
                init: function(data) {
                    session.socketId = data;
                }
            }
        }
    </script>
{% endblock %}

{% block corpo %}
    <div class="layout row center-block">
        <div class="header container-fluid">
            <div class="logo">
                {% block logo_principal %}<a href="/"><img src="/images/logo.png" alt="Brazuca's Server" /></a>{% endblock %}
            </div>
        </div>
        {% block menu_principal %}
            <div class="rounded shadowed menu container-fluid">
                <ul class="menu">
                    <a href="/"><li class="active" id="menu-home">HOME</li></a>
                    <a href="/servidor.php"><li id="menu-servidor">SERVIDOR</li></a>
                    <a href="/ranking.php"><li id="menu-ranking">RANKING</li></a>
                    <a href="/faq.php"><li id="menu-faq">F.A.Q.</li></a>
                    <a href="/forum"><li id="menu-forum">FÓRUM</li></a>
                    <a href="/ucp"><li id="menu-ucp">UCP</li></a>
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
                    <span>Desenvolvido por</span><br />
                    <span><a class="highlight" href="/servidor.php#credits">Equipe do Brazuca's</a></span>
                </div>
                <div class="right">
                    <span>Copyright© 2006-2014 Brazucas-Server.com</span><br />
                    <span>Versão atual: <font color="#990000">{{ sails.config.brazucasConfig.version }}</font></span>
                </div>
            </div>
        {% endblock %}
    </div>
{% endblock %}