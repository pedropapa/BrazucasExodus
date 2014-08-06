{% extends '../layout.swig' %}

{% block javascript_libs %}
    <script type="text/javascript">
        $(document).ready(function() {
            socket.get('/echo',{
                message: 'hi there!'
            }, function (response) {
                console.log(response);
            });

            socket.on('gotUsuario', function(data) {
                console.log('user '+data);
            });

            socket.on('message', function(data) {
                console.log(data);
            });
        })

    </script>
{% endblock %}

{% block titulo %}Início{% endblock titulo %}