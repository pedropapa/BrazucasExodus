{% extends '../layout.swig' %}

{% block titulo %}Início{% endblock titulo %}

{% block javascript_libs %}
    <script type="text/javascript">
        $(document).ready(function() {
            $('.publicMatch').hover(function(handlerInOut) {
                if(handlerInOut.type == 'mouseenter') {
                    $(this).find('.playButton').css('display', 'inline-block');
                    $(this).css('background', 'rgba(255,255,255,0.3)');
                    $(this).find('.player').css('opacity','0.3');
                    $(this).find('.player').addClass('shadowed');
                    $(this).addClass('shadowed');
                } else {
                    $(this).find('.playButton').hide();
                    $(this).css('background', 'rgba(255,255,255,1.0)');
                    $(this).find('.player').css('opacity','1');
                    $(this).find('.player').removeClass('shadowed');
                    $(this).removeClass('shadowed');
                }
            });

            $('.realtime .publicMatch .player').hover(function(handlerInOut) {
                if(handlerInOut.type == 'mouseenter') {
                    $(this).css('opacity', '1');
                } else {
                    $(this).css('opacity', '0.3');
                }
            })

            $('.gitHubCommits .commit').hover(function(handlerInOut) {
                if(handlerInOut.type == 'mouseenter') {
                    $(this).find('.commitUrl').css('display', 'inline-block');
                } else {
                    $(this).find('.commitUrl').hide();
                }
            });
        });
    </script>
{% endblock %}

{% block conteudo %}
    <div id="banner" class="rounded shadowed content introduction container-fluid realtime">
        <div class="col-md-7">
            <div class="title text-center">ASSISTA AGORA</div>
            <div class="text-center publicMatch rounded">
                <div class="player"><img width="40px" height="40px" src="https://pbs.twimg.com/profile_images/513078971802853376/gg13cJ66_bigger.jpeg"></div>
                <div class="player"><img width="40px" height="40px" src="https://pbs.twimg.com/profile_images/485246365027414016/hilpnRUD_bigger.jpeg"></div>
                <div class="player"><img width="40px" height="40px" src="https://pbs.twimg.com/profile_images/378800000498422605/276ef6752992a46da6155842b63845d0_bigger.jpeg"></div>
                <div class="player"><img width="40px" height="40px" src="https://pbs.twimg.com/profile_images/486893820152258560/-ZS5Vmlw_bigger.jpeg"></div>
                <div class="player"><img width="40px" height="40px" src="https://pbs.twimg.com/profile_images/520012656091336705/WTdEvg-0_bigger.jpeg"></div>
                <div class="versus">X</div>
                <div class="player"><img width="40px" height="40px" src="https://pbs.twimg.com/profile_images/510802001492729857/WDyQ3QR0_bigger.jpeg"></div>
                <div class="player"><img width="40px" height="40px" src="https://pbs.twimg.com/profile_images/480491505321127937/1LVPi3IK_bigger.jpeg"></div>
                <div class="player"><img width="40px" height="40px" src="https://pbs.twimg.com/profile_images/519199989512552449/0LJTObJH_bigger.jpeg"></div>
                <div class="player"><img width="40px" height="40px" src="https://pbs.twimg.com/profile_images/57055858/1213982736152_bigger.png"></div>
                <div class="player"><img width="40px" height="40px" src="https://pbs.twimg.com/profile_images/378800000129127173/1497f21c43386a3c867db12d49b0e97b_bigger.png"></div>

                <button ip="198.211.116.169" class="btn btn-warning playButton">Assistir</button>
            </div>

            <div class="text-center publicMatch rounded">
                <div class="player"><img width="40px" height="40px" src="https://pbs.twimg.com/profile_images/513078971802853376/gg13cJ66_bigger.jpeg"></div>
                <div class="player"><img width="40px" height="40px" src="https://pbs.twimg.com/profile_images/485246365027414016/hilpnRUD_bigger.jpeg"></div>
                <div class="player"><img width="40px" height="40px" src="https://pbs.twimg.com/profile_images/378800000498422605/276ef6752992a46da6155842b63845d0_bigger.jpeg"></div>
                <div class="player"><img width="40px" height="40px" src="https://pbs.twimg.com/profile_images/486893820152258560/-ZS5Vmlw_bigger.jpeg"></div>
                <div class="player"><img width="40px" height="40px" src="https://pbs.twimg.com/profile_images/520012656091336705/WTdEvg-0_bigger.jpeg"></div>
                <div class="versus">X</div>
                <div class="player"><img width="40px" height="40px" src="https://pbs.twimg.com/profile_images/510802001492729857/WDyQ3QR0_bigger.jpeg"></div>
                <div class="player"><img width="40px" height="40px" src="https://pbs.twimg.com/profile_images/480491505321127937/1LVPi3IK_bigger.jpeg"></div>
                <div class="player"><img width="40px" height="40px" src="https://pbs.twimg.com/profile_images/519199989512552449/0LJTObJH_bigger.jpeg"></div>
                <div class="player"><img width="40px" height="40px" src="https://pbs.twimg.com/profile_images/57055858/1213982736152_bigger.png"></div>
                <div class="player"><img width="40px" height="40px" src="https://pbs.twimg.com/profile_images/378800000129127173/1497f21c43386a3c867db12d49b0e97b_bigger.png"></div>

                <button ip="198.211.116.169" class="btn btn-warning playButton">Assistir</button>
            </div>

            <div class="text-center publicMatch rounded">
                <div class="player"><img width="40px" height="40px" src="https://pbs.twimg.com/profile_images/513078971802853376/gg13cJ66_bigger.jpeg"></div>
                <div class="player"><img width="40px" height="40px" src="https://pbs.twimg.com/profile_images/485246365027414016/hilpnRUD_bigger.jpeg"></div>
                <div class="player"><img width="40px" height="40px" src="https://pbs.twimg.com/profile_images/378800000498422605/276ef6752992a46da6155842b63845d0_bigger.jpeg"></div>
                <div class="player"><img width="40px" height="40px" src="https://pbs.twimg.com/profile_images/486893820152258560/-ZS5Vmlw_bigger.jpeg"></div>
                <div class="player"><img width="40px" height="40px" src="https://pbs.twimg.com/profile_images/520012656091336705/WTdEvg-0_bigger.jpeg"></div>
                <div class="versus">X</div>
                <div class="player"><img width="40px" height="40px" src="https://pbs.twimg.com/profile_images/510802001492729857/WDyQ3QR0_bigger.jpeg"></div>
                <div class="player"><img width="40px" height="40px" src="https://pbs.twimg.com/profile_images/480491505321127937/1LVPi3IK_bigger.jpeg"></div>
                <div class="player"><img width="40px" height="40px" src="https://pbs.twimg.com/profile_images/519199989512552449/0LJTObJH_bigger.jpeg"></div>
                <div class="player"><img width="40px" height="40px" src="https://pbs.twimg.com/profile_images/57055858/1213982736152_bigger.png"></div>
                <div class="player"><img width="40px" height="40px" src="https://pbs.twimg.com/profile_images/378800000129127173/1497f21c43386a3c867db12d49b0e97b_bigger.png"></div>

                <button ip="198.211.116.169" class="btn btn-warning playButton">Assistir</button>
            </div>

            <div class="text-center publicMatch rounded">
                <div class="player"><img width="40px" height="40px" src="https://pbs.twimg.com/profile_images/513078971802853376/gg13cJ66_bigger.jpeg"></div>
                <div class="player"><img width="40px" height="40px" src="https://pbs.twimg.com/profile_images/485246365027414016/hilpnRUD_bigger.jpeg"></div>
                <div class="player"><img width="40px" height="40px" src="https://pbs.twimg.com/profile_images/378800000498422605/276ef6752992a46da6155842b63845d0_bigger.jpeg"></div>
                <div class="player"><img width="40px" height="40px" src="https://pbs.twimg.com/profile_images/486893820152258560/-ZS5Vmlw_bigger.jpeg"></div>
                <div class="player"><img width="40px" height="40px" src="https://pbs.twimg.com/profile_images/520012656091336705/WTdEvg-0_bigger.jpeg"></div>
                <div class="versus">X</div>
                <div class="player"><img width="40px" height="40px" src="https://pbs.twimg.com/profile_images/510802001492729857/WDyQ3QR0_bigger.jpeg"></div>
                <div class="player"><img width="40px" height="40px" src="https://pbs.twimg.com/profile_images/480491505321127937/1LVPi3IK_bigger.jpeg"></div>
                <div class="player"><img width="40px" height="40px" src="https://pbs.twimg.com/profile_images/519199989512552449/0LJTObJH_bigger.jpeg"></div>
                <div class="player"><img width="40px" height="40px" src="https://pbs.twimg.com/profile_images/57055858/1213982736152_bigger.png"></div>
                <div class="player"><img width="40px" height="40px" src="https://pbs.twimg.com/profile_images/378800000129127173/1497f21c43386a3c867db12d49b0e97b_bigger.png"></div>

                <button ip="198.211.116.169" class="btn btn-warning playButton">Assistir</button>
            </div>

            <div class="text-center publicMatch rounded">
                <div class="player"><img width="40px" height="40px" src="https://pbs.twimg.com/profile_images/513078971802853376/gg13cJ66_bigger.jpeg"></div>
                <div class="player"><img width="40px" height="40px" src="https://pbs.twimg.com/profile_images/485246365027414016/hilpnRUD_bigger.jpeg"></div>
                <div class="player"><img width="40px" height="40px" src="https://pbs.twimg.com/profile_images/378800000498422605/276ef6752992a46da6155842b63845d0_bigger.jpeg"></div>
                <div class="player"><img width="40px" height="40px" src="https://pbs.twimg.com/profile_images/486893820152258560/-ZS5Vmlw_bigger.jpeg"></div>
                <div class="player"><img width="40px" height="40px" src="https://pbs.twimg.com/profile_images/520012656091336705/WTdEvg-0_bigger.jpeg"></div>
                <div class="versus">X</div>
                <div class="player"><img width="40px" height="40px" src="https://pbs.twimg.com/profile_images/510802001492729857/WDyQ3QR0_bigger.jpeg"></div>
                <div class="player"><img width="40px" height="40px" src="https://pbs.twimg.com/profile_images/480491505321127937/1LVPi3IK_bigger.jpeg"></div>
                <div class="player"><img width="40px" height="40px" src="https://pbs.twimg.com/profile_images/519199989512552449/0LJTObJH_bigger.jpeg"></div>
                <div class="player"><img width="40px" height="40px" src="https://pbs.twimg.com/profile_images/57055858/1213982736152_bigger.png"></div>
                <div class="player"><img width="40px" height="40px" src="https://pbs.twimg.com/profile_images/378800000129127173/1497f21c43386a3c867db12d49b0e97b_bigger.png"></div>

                <button ip="198.211.116.169" class="btn btn-warning playButton">Assistir</button>
            </div>
        </div>

        <div class="col-md-5">
            <div class="title text-center">ATUALIZAÇÕES</div>
            <div class="gitHubCommits">
                {% for lastCommit in GitHubAPI.lastCommits %}
                    {% if loop.index <= 6 %}
                        <div class="commit rounded">
                            <span class="date">{{ lastCommit.commit.author.date | date('d/m/Y') }}</span>
                            {% if lastCommit.commit.message.length > 115 %}
                                {{ lastCommit.commit.message.substr(0,115) }}...
                            {% else %}
                                {{ lastCommit.commit.message }}
                            {% endif %}
                            <a href="{{ lastCommit.html_url }}" target="_blank" class="commitUrl">ver commit</a>
                        </div>
                    {% endif %}
                {% endfor %}
            </div>
        </div>

        <div class="col-md-7">
            <button class="btn btn-danger" style="margin: 0 auto; display: block">Ver Mais</button>
        </div>

        <div class="col-md-5">
            <a target="_blank" href="https://github.com/{{ sails.config.brazucasConfig.gitHubAppPath }}/" style="text-decoration: none">
                <button class="btn btn-primary" style="margin: 0 auto; display: block">Ver no GitHub</button>
            </a>
        </div>
    </div>

    <div class="rounded shadowed content introduction container-fluid">
        <ul class="featured col-md-12">
            <li id="featured-minigames" class="col-md-4">
                <h2 class="sub-title">Minigames</h2>
                        <span class="description">Os minigames do servidor ocorrem geralmente entre 03:00 e 19:00 de cada dia, são mais de 100 minigames diferentes para se jogar onde os jogadores podem completar até 50 proezas que dão bônus de score e outras recompensas para o jogador.<br /><br />
        Além de vencer as partidas e conquistar pontos, os jogadores também podem personalizar sua skin, comprar armas melhores e outros especiais com os créditos que são comprados por dinheiro real através do nosso UCP.<br /><br />
        Existem vários rankings dos minigames, sendo eles: Diário, semanal, mensal e geral, os rankings podem ser vistos in-game através do comando /rank ou através do UCP.</span>
                <a class="highlight" href="servidor.php#minigames">» Conheça os minigames!</a>
            </li>
            <li class="middle col-md-4" id="featured-rpg">
                <h2 class="sub-title">RPG</h2>
                        <span class="description">O RPG do Brazucas existe desde 2006, entra logo após os minigames, entre 19:00 até 03:00 e possui diversas funcionalidades como sistema de leilões, rádio e veículos especiais.<br /><br />
        Os pontos angariados nos Minigames podem ser convertidos no RPG em forma de diárias da profissão, dinheiro do jogo e nível, só é possível resgatar os pontos dos minigames caso a conta do jogador no RPG e nos Minigames tenham o mesmo nick.<br /><br />
        Através dos créditos comprados com dinheiro real no UCP, é possível comprar casas, veículos especiais (nitro infinito, jumper, fantasma, entre outros) e outras vantagens no RPG. Os créditos não podem ser transferidos para outros jogadores.</span>
                <a class="highlight" href="servidor.php#rpg">» Conheça o RPG!</a>
            </li>
            <li id="featured-competitivo" class="col-md-4">
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