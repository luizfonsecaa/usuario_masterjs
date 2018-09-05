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
            let btn = this.formEl.querySelector("[type=submit]");
            let values = this.getValue();
            btn.disabled = true;

            this.getPhoto().then(
                (content) => {
                    values.photo = content;
                    this.addLine(values);
                    this.formEl.reset();
                    btn.disabled = false;
                },
                (e) => {
                    console.error(e);
                }
            );
        });
    }

    // percorrendo todos os elementos de user
    getValue(){
        let user = {};
        [...this.formEl.elements].forEach( field => {
            if(field.name == "gender" && field.checked){
                user[field.name] = field.value;
            }else if(field.name == "admin"){
                user[field.name] = field.checked;
            }else{
                user[field.name] = field.value;
            }
        });
        return new User(user.name, user.gender, user.birth, user.country,
                                     user.email, user.password, user.photo, user.admin);
    }

    //api de foto
    getPhoto(){
        return  new Promise((resolve, reject) => {
            let fileReader = new FileReader();
            let elements = [...this.formEl.elements].filter(item => {
                if(item.name === "photo"){
                    return item;
                }
            });
            let file = elements[0].files[0];
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (e) => {
                reject(e);
            };
            if(file){
                fileReader.readAsDataURL(file);
            } else{
                resolve('dist/img/boxed-bg.jpg');
            }
        });
    }

    //adiciona uma linha na tabela
    addLine(dataUser){
        let tr = document.createElement('tr');
        tr.innerHTML = `
                <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
                <td>${dataUser.name}</td>
                <td>${dataUser.email}</td>
                <td>${(dataUser.admin) ? 'Sim' : 'nao'}</td>
                <td>${Util.dateFormat(dataUser.register)}</td>
                <td>
                    <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                    <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
                </td>
        `;
        this.tableEl.appendChild(tr);
    }
}