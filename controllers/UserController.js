class UserController{

    constructor(formIdCreate, formIdUpdate, tableId){
        this.formEl = document.getElementById(formIdCreate);
        this.formUpdateEl = document.getElementById(formIdUpdate);
        this.tableEl = document.getElementById(tableId);
        this.onSubmit();
        this.OnEdit();
    }

    OnEdit(){
        document.querySelector("#box-id-user-update .btn-cancel").addEventListener('click', e=>{
            this.showPanelCreate();
        });

        this.formUpdateEl.addEventListener("submit", event =>{
            event.preventDefault();
            let btn = this.formUpdateEl.querySelector("[type=submit]");
            btn.disabled = true;
            let values = this.getValue(this.formUpdateEl);
            let index = this.formUpdateEl.dataset.trIndex;
            let tr = this.tableEl.rows[index];
            tr.dataset.user = JSON.stringify(values);
            tr.innerHTML = `
                <td><img src="${values.photo}" alt="User Image" class="img-circle img-sm"></td>
                <td>${values.name}</td>
                <td>${values.email}</td>
                <td>${(values.admin) ? 'Sim' : 'nao'}</td>
                <td>${Util.dateFormat(values.register)}</td>
                <td>
                    <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
                    <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
                </td>
            `;
            this.addEventsTr(tr);
            this.updateCount();
            this.showPanelCreate();
        });

    }

    //metodo disparado quando o botao for clicado
    onSubmit(){
        this.formEl.addEventListener("submit", event => {
            event.preventDefault();
            let btn = this.formEl.querySelector("[type=submit]");
            let values = this.getValue(this.formEl);

            btn.disabled = true;
            if(typeof(values) == 'boolean'){
                btn.disabled = false;
                return false;
            }
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
    getValue(formEl){
        let user = {};
        let isValid = true;
        [...formEl.elements].forEach( field => {
            //verifico se existe e se nao esta vazio
            if(['name', 'email', 'password'].indexOf(field.name) > -1 && !field.value){
                console.log('entrei');
                field.parentElement.classList.add('has-error');
                isValid = false;
            }

            if(field.name == "gender" && field.checked){
                user[field.name] = field.value;
            }else if(field.name == "admin"){
                user[field.name] = field.checked;
            }else{
                user[field.name] = field.value;
            }
        });
        if(!isValid){
            return false;
        }

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
                console.log('passando')
                resolve('dist/img/boxed-bg.jpg');
            }
        });
    }

    //adiciona uma linha na tabela
    addLine(dataUser){

        let tr = document.createElement('tr');
        tr.dataset.user = JSON.stringify(dataUser);
        tr.innerHTML = `
                <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
                <td>${dataUser.name}</td>
                <td>${dataUser.email}</td>
                <td>${(dataUser.admin) ? 'Sim' : 'nao'}</td>
                <td>${Util.dateFormat(dataUser.register)}</td>
                <td>
                    <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
                    <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
                </td>
        `;
       
        this.addEventsTr(tr);
        this.tableEl.appendChild(tr);
        this.updateCount();
    }

    //metodo que adiciona o evento no botao da tr (editar)
    addEventsTr(tr){
        tr.querySelector(".btn-edit").addEventListener("click", e=>{
            let json = JSON.parse(tr.dataset.user);
            let form = document.querySelector("#form-user-update");
            // index da linha
            form.dataset.trIndex = tr.sectionRowIndex;
            for(let name in json){
                let field = form.querySelector("[name=" + name.replace("_","") + "]");
                if(field){

                    switch (field.type){
                        case 'file':
                            continue;
                        break;
                        case 'radio':
                            field = form.querySelector("[name=" + name.replace("_","") + "][value=" + json[name] + "]");
                            field.checked = true;
                        break;
                        case'checkbox':
                            field.checked =  json[name];
                        break;
                        default:
                            field.value = json[name];
                    }
                }
            }
            this.showPanelUpdate();
        });
    }

    //Apresenta o formulario de criação
    showPanelCreate(){
        document.querySelector('#box-id-user-create').style.display = "block";
        document.querySelector('#box-id-user-update').style.display = "none";
    }
  
    //apresenta o formulario de edição
    showPanelUpdate(){

        document.querySelector('#box-id-user-create').style.display = "none";
        document.querySelector('#box-id-user-update').style.display = "block";
    }

    // calculando a quantidade de usuario
    updateCount(){
        let numberUser = 0;
        let numberAdmin = 0;
        [...this.tableEl.children].forEach(tr=>{
            numberUser++
            let user = JSON.parse(tr.dataset.user);
            if(user._admin) numberAdmin++;

        });

        document.querySelector('#number-users').innerHTML = numberUser;
        document.querySelector('#number-users-admin').innerHTML = numberAdmin;
    }
}