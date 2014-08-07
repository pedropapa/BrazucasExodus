{% extends 'base.swig' %}

{% block javascript_libs %}
    <script type="text/javascript">
        $(document).ready(function() {
            // Enviar para a aplicação o pedido de autenticação e estabelecer a conexão com a mesma.
            socket.get('/socket/go');

            // Responsável por receber qualquer tipo de dado enviado pela aplicação via socket.
            socket.on('message', function(data) {

                // Onde o modelHooks é iniciado.
                if(data.model) {
                    modelHooks[data.model][data.verb](data.data);
                }
            });
        });

        /**
         * modelHooks
         * Responsável por receber qualquer tipo de instrução realizada em uma determinada model.
         * Sendo a instrução de cada model criada da seguinte maneira: 'model.instrução()'.
         */
        var modelHooks = {
            // Usuario.js Model
            // Responsável por gerenciar os usuários da aplicação.
            usuario: {
                update: function(data) {
                    alert(data.toSource());
                },
                create: function(data) {
                    alert(data.toSource());
                }
            }
        }
    </script>
{% endblock %}

{% block corpo %}
    <div class="layout">
        <div class="header">
            <div class="logo">
                <a href="/"><img src="/images/logo.png" alt="Brazuca's Server" /></a>
            </div>
        </div>
        <div class="rounded shadowed menu">
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

        {% block conteudo %}
            <div id="banner">
                <ul class="bjqs">
                    <li id="samp" style="background: url(/images/banners/1/bg.png) no-repeat center center;">
                        <div class="padding">
                            <h1 class="title" style="background: url(/images/banners/1/title-icon.png) no-repeat left center;">San Andreas: Multiplayer</h1>
                            <div class="video"></div>
                            <div class="auto-fill">
                                <span class="description" style="text-align: justify;">O <b>Brazuca’s</b> é um servidor de pequeno porte de GTA SA-MP que existe desde 2006. Possui minigames e RPG como gamemodes e um painel de controle online para os jogadores acompanharem as estatísticas de sua conta detalhadamente.<br /><br />Requer o SA:MP 0.3x para jogar.</span>
                                <div class="buttons">
                                    <button id="download">Download SA:MP 0.3x R2</button>
                                    <button id="play"><b>Jogar!</b><br />198.211.116.169</button>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li id="test" style="background: #09C;"></li>
                </ul>
            </div>
            <div class="rounded shadowed content introduction">
                <ul class="featured">
                    <li id="featured-minigames">
                        <h2 class="sub-title">Minigames</h2>
                        <span class="description">Os minigames do servidor ocorrem geralmente entre 03:00 e 19:00 de cada dia, são mais de 100 minigames diferentes para se jogar onde os jogadores podem completar até 50 proezas que dão bônus de score e outras recompensas para o jogador.<br /><br />
        Além de vencer as partidas e conquistar pontos, os jogadores também podem personalizar sua skin, comprar armas melhores e outros especiais com os créditos que são comprados por dinheiro real através do nosso UCP.<br /><br />
        Existem vários rankings dos minigames, sendo eles: Diário, semanal, mensal e geral, os rankings podem ser vistos in-game através do comando /rank ou através do UCP.</span>
                        <a class="highlight" href="servidor.php#minigames">» Conheça os minigames!</a>
                    </li>
                    <li class="middle" id="featured-rpg">
                        <h2 class="sub-title">RPG</h2>
                        <span class="description">O RPG do Brazucas existe desde 2006, entra logo após os minigames, entre 19:00 até 03:00 e possui diversas funcionalidades como sistema de leilões, rádio e veículos especiais.<br /><br />
        Os pontos angariados nos Minigames podem ser convertidos no RPG em forma de diárias da profissão, dinheiro do jogo e nível, só é possível resgatar os pontos dos minigames caso a conta do jogador no RPG e nos Minigames tenham o mesmo nick.<br /><br />
        Através dos créditos comprados com dinheiro real no UCP, é possível comprar casas, veículos especiais (nitro infinito, jumper, fantasma, entre outros) e outras vantagens no RPG. Os créditos não podem ser transferidos para outros jogadores.</span>
                        <a class="highlight" href="servidor.php#rpg">» Conheça o RPG!</a>
                    </li>
                    <li id="featured-competitivo">
                        <h2 class="sub-title">Competitivo</h2>
                        <span class="description">O modo competitivo do Brazucas será um estilo de jogo focado no pro gaming, ou seja, irá exigir o máximo do jogador no quesito utilização de bugs como o Glitch e Slide.<br /><br />
        Para jogar, o servidor irá baixar um programa, que será um match maker, a função do programa é logar os jogadores no sistema e montar as partidas, que serão jogadas em diversos servidores que terão o mesmo gamemode.<br /><br />
        Um exemplo muito próximo do que será o Brazucas’Competitivo é o modo co-op do jogo TeamFortress 2.<br /><br />
        A vantagem do sistema rodar a partir de um programa cliente é que será possível criar um anti-cheat bastante eficiente.</span>
                        <a class="highlight" href="servidor.php#competitivo">» Conheça o modo competitivo!</a>
                    </li>
                </ul>
            </div>
        {% endblock %}

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
    </div>
{% endblock %}