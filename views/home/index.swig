{% extends '../layout.swig' %}

{% block titulo %}Início{% endblock titulo %}
{% block conteudo %}
    <div id="banner" class="container-fluid">
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