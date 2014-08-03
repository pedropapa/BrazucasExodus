{% extends '../layout.swig' %}

{% block javascript_libs %}
    <script type="text/javascript">
        socket.get('/echo',{
            message: 'hi there!'
        }, function (response) {
            console.log(response);
        });

        socket.on('message', function(data) {
            console.log(data);
        });
    </script>
{% endblock %}

{% block titulo %}Início{% endblock titulo %}