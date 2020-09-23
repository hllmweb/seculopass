var db = null;

document.addEventListener('deviceready', function() {
  db = window.sqlitePlugin.openDatabase({
    name: 'seculopass.db',
    location: 'default',
  });

    //dropDataBase();
    //createDataBase_Espaco();
  //  createDataBase_Localizacao();
//   createDataBase_Item();
//   createDataBase_ItemAcesso();

  //dropDataBase_TableEspaco();
  //createDataBase_Espaco();
  //deleteDataBase();
  //createDataBase_TableEspaco();
  //insertDataBase();  
  //selectDataBase();
  //selectIdDataBase();
  selectDb_Espaco();
  selectDb_Localizacao();
});

abrePagina = (href, props) => {
    const pathname = `${href}.html#${props}`

    window.plugins.nativepagetransitions.slide({
        "href": pathname
    });

    return pathname;
}

swipeTouch = () => {

}

storageData = () => {
    /*window.sqlitePlugin.echoTest(function() {
        alert('echoTest OK');
    });*/
}

//percorre os parametros da url na página
pathPage = () => {
    const params =  window.location.href.split("#");
    /*for(var i = 0; i < params.length; i++){
        var p = params[i].split('=');
            if (p[0] == theParameter) {
                return decodeURIComponent(p[1]);
            }
    }*/
 
    return decodeURIComponent(params[1]);
}

dropDataBase = () =>{
    db.transaction(function(transaction){
        transaction.executeSql('DROP TABLE ESPACO');
        transaction.executeSql('DROP TABLE espaco');
        transaction.executeSql('DROP TABLE espaco');
        transaction.executeSql('DROP TABLE LOCALIZACAO');
        transaction.executeSql('DROP TABLE ITEM'); 
        transaction.executeSql('DROP TABLE ITEM_ACESSO');
    },
    function(error){
        alert("Query Error: "+error);
    },
    function(){
        alert("Tabela Excluida com Sucesso!");
    })
}

createDataBase_Espaco = () =>{
    db.transaction(function(transaction){
        transaction.executeSql('CREATE TABLE if not exists ESPACO(IDESPACO INTEGER PRIMARY KEY, IDEMPRESA INTEGER NOT NULL, DESCRICAO text NOT NULL)');
    },
    function(error){
        alert("Query Error: "+error);
    },
    function(){
        alert("Tabela Criada com Sucesso");
    });
}

createDataBase_Localizacao = () =>{
    db.transaction(function(transaction){
        transaction.executeSql('CREATE TABLE if not exists LOCALIZACAO(IDLOCALIZACAO INTEGER PRIMARY KEY, IDESPACO INTEGER, DESCRICAO text NOT NULL)');
    },
    function(error){
        alert("Query Error "+error);
    },
    function(){
        alert("Tabela Criada com Sucesso");
    });
}

createDataBase_Item = () =>{
    db.transaction(function(transaction){
        transaction.executeSql('CREATE TABLE if not exists ITEM(IDITEM INTEGER PRIMARY KEY, IDLOCALIZACAO INTEGER, DESCRICAO text not null, CODREFERENCIA text, IMG_PRINCIPAL text)');
    },
    function(error){
        alert("Query Error"+error);
    },
    function(){
        alert("Tabela Criada com Sucesso");
    });
}

createDataBase_ItemAcesso = () =>{
    db.transaction(function(transaction){
        transaction.executeSql('CREATE TABLE if not exists ITEM_ACESSO(IDITEM_DET INTEGER PRIMARY KEY, IDACESSO INTEGER, PASSWORD text not null)');
    },
    function(error){
        alert("Query Error"+error);
    },
    function(){
        alert("Tabela Criada com Sucesso");
    })
}




/*
    insere info na tabela espaco
*/
insertDb_Espaco = () =>{
    let input_espaco = $("#input_espaco").val();
    
    if($.trim(input_espaco).length != 0){
        db.transaction((transaction) => {
            transaction.executeSql('INSERT INTO ESPACO(IDEMPRESA, DESCRICAO) VALUES (1, "'+input_espaco+'")');
        },
        (error) => {
            alert(`Query Error: ${error.mensage}`);
        },
        () => {
            alert(`Cadastro efetuado com sucesso`);
            $("#app-form")[0].reset();
        });
    }else{
        alert("Preencha o campo!");
    }
}


/*
    lista as informações da tabela espaço
*/
selectDb_Espaco = () =>{
    let element         = $("#app-menu-page-1");

    db.transaction((transaction) =>{
        transaction.executeSql('SELECT * FROM ESPACO;', [], (transaction, result)=>{
            for(let i=0; result.rows.length; i++){
               element.append(`<a href="javascript:void(0);" onclick="abrePagina('list_localizacao',${result.rows.item(i).IDESPACO});">${result.rows.item(i).DESCRICAO}</a>`);
            }
        });

    });
}



/*
    insere as informações da tabela localizacao
*/
insertDb_Localizacao = (props) => {
    let id_espaco         = props;
    let input_localizacao = $("#input_localizacao").val();

    if($.trim(input_localizacao).length != 0){
        db.transaction(function(transaction){
            transaction.executeSql('INSERT INTO LOCALIZACAO (IDESPACO, DESCRICAO) VALUES ("'+id_espaco+'", "'+input_localizacao+'")');
        },
        function(error){
            alert(`Query Error: ${error.mensage}`);
        },
        function(){
            alert("Cadastro efetuado com sucesso");
            $("#app-form")[0].reset();
        });
    }else{
        alert("Preencha o campo!");
    }
}

/*
    lista as informações da tabela espaço
*/
selectDb_Localizacao = () =>{
    let element         = $("#app-menu-page-2");
    let id_espaco  = ""; 
    if(pathPage() != "undefined"){
        id_espaco = pathPage();
    }

    db.transaction(function(tr){
        tr.executeSql('SELECT * FROM LOCALIZACAO WHERE IDESPACO=?;', [id_espaco], function(tr, result){
            // alert("Quantidade Resultados: " + result.rows.length);
            for(let i=0; result.rows.length; i++){
                element.append(`<a href="javascript:void(0);" onclick="abrePagina('list_item','${result.rows.item(i).IDLOCALIZACAO}');">${result.rows.item(i).DESCRICAO}</a>`);
            }
            
        })
    });

}



/*insertDb = () => {
    db.transaction(function(transaction) {
    // transaction.executeSql('CREATE TABLE if not exists espaco (nome)');
    //transaction.executeSql('INSERT INTO espaco values(?)', ['Servidor']);
    transaction.executeSql("INSERT INTO espaco (nome) VALUES ('Servidor')");
    },
    function(error){
       alert("Query Erro"+error.message); 
    },
    function(){
       alert("Tabela Criada e Dados Inseridos");  
    });
}*/

selectIdDataBase = () =>{
    db.transaction(function(tr){
        tr.executeSql('SELECT * FROM espaco WHERE id_espaco=?', ['1'], function(tr, result){
    
            alert(result.rows.item(0).id_espaco);
            alert(result.rows.item(0).nome);
        })
    })
}


deleteDataBase = () =>{
    db.transaction(function(tr){
        tr.executeSql('DELETE from espaco where nome="Servidor"')
    },
    function(error){
        alert("Delete Query Error: "+error);
    },
    function(){
        alert("Linha Deletada com sucesso");
    });
}


