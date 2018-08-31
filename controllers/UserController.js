class UserController{

    constructor(formId, tableId){
        this.formEl = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);
        this.onSubmit();
    }
    
    //metodo disparado quando o botao for clicado
    onSubmit(){
        this.formEl.addEventListener("submit", event => {
            event.preventDefault();
            let values = this.getValue();
            values.photo = "";
            //pega os valores do formulario e passa para o metodo de adicionar linha
            this.getPhoto();
            this.addLine(values);
        });
    }

    // percorrendo todos os elementos de user 
    getValue(){
        let user = {};
        [...this.formEl.elements].forEach((field, index)=>{
            if(field.name == "gender" && field.checked){
                user[field.name] = field.value;
            }else{
                user[field.name] = field.value;
            }
        });
        return new User(user.name, user.gender, user.birth, user.country, 
                                     user.email, user.password, user.photo, user.admin);
    }

    //api de foto
    getPhoto(){
        let fileReader = new FileReader();
        let elements = [...this.formEl.elements].filter(item =>{
            if(item.name === "photo"){
                return item;
            }
            return
        });
        let file = elements[0].files[0];
        fileReader.onload = () =>{};
        fileReader.readAsDataURL(file);
    }

    //adiciona uma linha na tabela
    addLine(dataUser){
        this.tableEl.innerHTML = `
            <tr>
                <td><img src="${dataUser.foto}" alt="User Image" class="img-circle img-sm"></td>
                <td>${dataUser.name}</td>
                <td>${dataUser.email}</td>
                <td>${dataUser.admin}</td>
                <td>${dataUser.birth}</td>
                <td>
                    <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                    <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
                </td>
            </tr>
        `;
    }
    
}