    $(document).ready(function(){
$(document).ready(function() {

        // Inicializar DataTable para habilidades
        let dtHabilidades = new DataTable('#tabela_habilidades', {
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
                url: 'http://127.0.0.1:8000/api/retorna_habilidades',
                type: 'GET',
                dataSrc: 'data'
            },
            columns: [
                { data: 'id', title: 'Id' },
                { data: 'nome_habilidade', title: 'Nome' },
                { data: 'descricao', title: 'Descrição' },
                {
                    data: 'id',
                    title: 'Ações',
                    render: function (data, type, row) {
                        return `
                        <div class="btn-group">
                            <button class="btn btn-warning btn-sm editar_habilidade" data-id="${data}" data-nome="${row.nome_habilidade}" data-desc="${row.descricao}">
                                <i class="bi bi-pencil"></i>
                            </button>
                            <button class="btn btn-danger btn-sm deletar_habilidade" data-id="${data}">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>`;
                    }
                }
            ]
        });

    });

    $("#btnAdicionar").on("click", function () {
        let nome = $("#nome_habilidade").val();
        let descricao = $("#descricao_habilidade").val();

        if (nome.trim() === "") {
            Swal.fire("Atenção", "O nome da habilidade é obrigatório!", "warning");
            return;
        }

        $.ajax({
            url: "http://127.0.0.1:8000/api/criar_habilidade",
            type: "POST",
            data: JSON.stringify({
                nome_habilidade: nome,
                descricao: descricao
            }),
            contentType: "application/json",
            success: function (response) {
                Swal.fire("Sucesso", response.mensagem, "success");

                // Fecha a modal
                $("#staticBackdrop").modal("hide");

                // Limpa os campos
                $("#nome_habilidade").val("");
                $("#descricao_habilidade").val("");

                $('#tabela_habilidades').DataTable().ajax.reload();
            },
            error: function (xhr) {
                Swal.fire("Erro", "Não foi possível adicionar a habilidade.", "error");
                console.error(xhr.responseText);
            }
        });
    });

    // Abrir modal preenchido
    $(document).on("click", ".editar_habilidade", function () {
        let id = $(this).data("id");
        let nome = $(this).data("nome");
        let desc = $(this).data("desc");

        $("#edit_id").val(id);
        $("#edit_nome").val(nome);
        $("#edit_descricao").val(desc);

        $("#modalEditar").modal("show");
    });

    // Salvar edição
    $("#btnSalvarEdicao").on("click", function () {
        let id = $("#edit_id").val();
        let nome = $("#edit_nome").val();
        let descricao = $("#edit_descricao").val();

        $.ajax({
            url: `http://127.0.0.1:8000/api/editar_habilidade/${id}`,
            type: "PUT",
            data: JSON.stringify({
                nome_habilidade: nome,
                descricao: descricao
            }),
            contentType: "application/json",
            success: function (response) {
                Swal.fire("Sucesso", response.mensagem, "success");
                $("#modalEditar").modal("hide");
                $("#tabela_habilidades").DataTable().ajax.reload();
            },
            error: function (xhr) {
                Swal.fire("Erro", "Não foi possível editar a habilidade.", "error");
                console.error(xhr.responseText);
            }
        });
    });


    $(document).on("click", ".deletar_habilidade", function () {
        let id = $(this).data("id");

            Swal.fire({
                title: 'Excluir Habilidade',
                text: `Tem certeza que deseja excluir a habilidade com ID ${id}?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#dc3545',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Sim, excluir!',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: `http://127.0.0.1:8000/api/deletar_habilidade/${id}`,
                    type: "DELETE",
                    success: function (response) {
                        Swal.fire("Excluído!", response.mensagem, "success");
                        $("#tabela_habilidades").DataTable().ajax.reload();
                    },
                    error: function (xhr) {
                        Swal.fire("Erro", "Não foi possível excluir a habilidade.", "error");
                        console.error(xhr.responseText);
                    }
                });
            }
        });
    });


});