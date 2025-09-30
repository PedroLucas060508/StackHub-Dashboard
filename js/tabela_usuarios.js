    $(document).ready(function(){
        // Inicialmente mostrar apenas a tabela de usuários
        $('.table-section').addClass('hidden');
        $('#table-usuarios').removeClass('hidden');
        
        // Configurar o dropdown para alternar entre tabelas
        $('.dropdown-item').on('click', function(e) {
            e.preventDefault();
            const tableType = $(this).data('table');
            
            // Atualizar estado ativo do dropdown
            $('.dropdown-item').removeClass('active');
            $(this).addClass('active');
            
            // Esconder todas as tabel
            $('.table-section').addClass('hidden');
            
            // Mostrar a tabela selecionada
            $(`#table-${tableType}`).removeClass('hidden');
            
            // Atualizar o texto do botão dropdown
            $('#dropdownMenuButton').html(`<i class="bi bi-table"></i> ${$(this).text().replace(/<[^>]*>/g, '')}`);
        });
        
        // Inicializar as DataTables
        let dtUsers = new DataTable('#tabela_usuarios', {
            processing: true,
            serverSide: false,
            responsive: true,
            paging: true,
            pageLength: 5,
            lengthChange: false,
            searching: true,
            ordering: true,
            order: [[0, 'asc']],
            language: {
                url: "https://cdn.datatables.net/plug-ins/1.10.20/i18n/Portuguese-Brasil.json"
            },
            ajax: {
                url: 'http://127.0.0.1:8000/api/retorna_usuarios',
                type: 'GET',
                data: function (d) {
                    d.user_id = $("#user_id").val();
                    d.token = $("#token").val();
                },
                dataSrc: 'data'
            },
            columns: [
                { data: 'id', title: 'Id' },
                { data: 'name', title: 'Nome' },
                { data: 'email', title: 'Email' },
                {
                    data: 'id',
                    title: 'Ações',
                    render: function (data, type, row) {
                        return `
                        <div class="btn-group" role="group">
                            <button class="btn btn-warning btn-sm alterar_usuario" data-id="${data}" title="Editar">
                                <i class="bi bi-pencil"></i>
                            </button>
                            <button class="btn btn-danger btn-sm deletar"_usuario data-id="${data}" title="Excluir">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>`;
                    }
                }
            ]
        });

        let dtCompanies = new DataTable('#tabela_empresas', {
            processing: true,
            serverSide: false,
            responsive: true,
            paging: true,
            pageLength: 5,
            lengthChange: false,
            searching: true,
            ordering: true,
            order: [[0, 'asc']],
            language: {
                url: "https://cdn.datatables.net/plug-ins/1.10.20/i18n/Portuguese-Brasil.json"
            },
            ajax: {
                url: 'http://127.0.0.1:8000/api/retorna_empresas',
                type: 'GET',
                data: function (d) {
                    d.user_id = $("#user_id").val();
                    d.token = $("#token").val();
                },
                dataSrc: 'data'
            },
            columns: [
                { data: 'user_id', title: 'Id' },
                { data: 'user_name', title: 'Nome' },
                { data: 'user_email', title: 'Email' },
                { data: 'empresa_telefone', title: 'Telefone' },
                { 
                    data: null,
                    title: 'Cidade',
                    render: function (data, type, row) {
                        return `${row.empresa_cidade} - ${row.empresa_estado}`;
                    }
                },
                { data: 'empresa_area_de_atuacao', title: 'Área de Atuação' },
                { 
                    data: 'empresa_saldo',
                    title: 'Saldo',
                    render: function (data, type, row) {
                        return `R$ ${parseFloat(data).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
                    }
                },
                { 
                    data: 'empresa_status',
                    title: 'Status',
                    render: function (data, type, row) {
                        if (data === 'ativo') {
                            return `<span class="badge bg-success">Ativo</span>`;
                        } else if (data === 'inativo') {
                            return `<span class="badge bg-secondary">Inativo</span>`;
                        } else {
                            return `<span class="badge bg-danger">Bloqueado</span>`;
                        }
                    }
                },
                {
                    data: 'id',
                    title: 'Ações',
                    render: function (data, type, row) {
                        return `
                        <div class="btn-group" role="group">
                            <button class="btn btn-warning btn-sm alterar_empresa" data-id="${data}" title="Editar">
                                <i class="bi bi-pencil"></i>
                            </button>
                            <button class="btn btn-danger btn-sm deletar_empresa" data-id="${data}" title="Excluir">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>`;
                    }
                }
            ]
        });

    let dtFreelancers = new DataTable('#tabela_freelancers', {
        processing: true,
        serverSide: false,
        responsive: true,
        paging: true,
        pageLength: 5,
        lengthChange: false,
        searching: true,
        ordering: true,
        order: [[0, 'asc']],
        language: {
            url: "https://cdn.datatables.net/plug-ins/1.10.20/i18n/Portuguese-Brasil.json"
        },
        ajax: {
            url: 'http://127.0.0.1:8000/api/retorna_freelancers',
            type: 'GET',
            data: function (d) {
                d.user_id = $("#user_id").val();
                d.token = $("#token").val();
            },
            dataSrc: 'data'
        },
        columns: [
            { data: 'user_id', title: 'Id' },
            { data: 'user_name', title: 'Nome' },
            { 
                data: 'freelancer_foto', // CORRIGIDO: usar freelancer_foto em vez de foto
                title: 'Foto',
                render: function (data, type, row) {
                    if (data) {
                        // Se tem URL da foto, exibe a imagem
                        return `<img src="${data}" alt="Foto" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover;">`;
                    } else {
                        // Se não tem foto, exibe um placeholder
                        return `<div style="width: 50px; height: 50px; border-radius: 50%; background: #ccc; display: flex; align-items: center; justify-content: center;">
                                    <i class="bi bi-person" style="font-size: 20px; color: #666;"></i>
                                </div>`;
                    }
                }
            },
            { data: 'user_email', title: 'Email' },
            { data: 'freelancer_telefone', title: 'Telefone' },
            { 
                data: null,
                title: 'Cidade',
                render: function (data, type, row) {
                    return `${row.freelancer_cidade} - ${row.freelancer_estado}`;
                }
            },
            { data: 'freelancer_habilidade_principal', title: 'Habilidade Principal' },
            { data: 'freelancer_senioridade', title: 'Senioridade' },
            { 
                data: 'freelancer_saldo',
                title: 'Saldo',
                render: function (data, type, row) {
                    return `R$ ${parseFloat(data).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
                }
            },
            { 
                data: 'freelancer_status',
                title: 'Status',
                render: function (data, type, row) {
                    if (data === 'ativo') {
                        return `<span class="badge bg-success">Ativo</span>`;
                    } else if (data === 'inativo') {
                        return `<span class="badge bg-secondary">Inativo</span>`;
                    } else {
                        return `<span class="badge bg-danger">Bloqueado</span>`;
                    }
                }
            },
            {
                data: 'user_id', // CORRIGIDO: usar user_id em vez de id
                title: 'Ações',
                orderable: false,
                render: function (data, type, row) {
                    return `
                    <div class="btn-group" role="group">
                        <button class="btn btn-warning btn-sm alterar_freelancer" data-id="${data}" title="Editar">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-danger btn-sm deletar_freelancer" data-id="${data}" title="Excluir">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>`;
                }
            }
        ]
    });
        
        // Adicionar event listeners para os botões de ação
        $(document).on('click', '.alterar_usuario', function() {
            const id = $(this).data('id');
            Swal.fire({
                title: 'Editar Registro',
                text: `Deseja editar o registro com ID ${id}?`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#1bdb55',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Sim, editar!',
                cancelButtonText: 'Cancelar'
            });

          
            $('#tabela_usuarios').DataTable().ajax.reload();
        });
        
        $(document).on('click', '.deletar_usuario', function() {
            const id = $(this).data('id');
            Swal.fire({
                title: 'Excluir Registro',
                text: `Tem certeza que deseja excluir o registro com ID ${id}?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#dc3545',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Sim, excluir!',
                cancelButtonText: 'Cancelar'
            });

            $('#tabela_usuarios').DataTable().ajax.reload();
        });

        $(document).on('click', '.alterar_empresa', function() {
            const id = $(this).data('id');
            Swal.fire({
                title: 'Editar Registro',
                text: `Deseja editar o registro com ID ${id}?`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#1bdb55',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Sim, editar!',
                cancelButtonText: 'Cancelar'
            });

            $('#tabela_empresas').DataTable().ajax.reload();
        });

        $(document).on('click', '.deletar_empresa', function() {
            const id = $(this).data('id');
            Swal.fire({
                title: 'Excluir Registro',
                text: `Tem certeza que deseja excluir o registro com ID ${id}?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#dc3545',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Sim, excluir!',
                cancelButtonText: 'Cancelar'
            });

            $('#tabela_empresas').DataTable().ajax.reload();
        });

        $(document).on('click', '.alterar_freelancer', function() {
            const id = $(this).data('id');
            Swal.fire({
                title: 'Editar Registro',
                text: `Deseja editar o registro com ID ${id}?`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#1bdb55',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Sim, editar!',
                cancelButtonText: 'Cancelar'
            });

            $('#tabela_freelancers').DataTable().ajax.reload();
        });

        $(document).on('click', '.deletar_freelancer', function() {
            const id = $(this).data('id');
            Swal.fire({
                title: 'Excluir Registro',
                text: `Tem certeza que deseja excluir o registro com ID ${id}?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#dc3545',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Sim, excluir!',
                cancelButtonText: 'Cancelar'
            });

            $('#tabela_freelancers').DataTable().ajax.reload();
        });

    });