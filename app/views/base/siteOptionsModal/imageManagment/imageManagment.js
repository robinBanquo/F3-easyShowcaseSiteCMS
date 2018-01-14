$(document).ready(function () {
	/************************
	 * Objet permettant l'affichage de la bibliotheque d'image
	 * @type {{files(): *, initialFiles, recentlyAddedFiles: Array, onlyForPickUp: boolean, addButon: string, waitingSpinner: string, getHtmlItem(*): *, initAddFileEvent(): void, render(*=): void, initAddFiles(): void, addFileCallback(*=): void}}
	 */
	var ImageManagment = {
		//les fichier a partir desquels doit travailler l'objet pour le rendus
		files() {
			return this.recentlyAddedFiles.concat(this.initialFiles)
		},
		//liste des fichiers donnés en json
		initialFiles: initialFiles,
		//liste des fichiers que vient de rajouter l'utilisateur
		recentlyAddedFiles: [],
		//true si on est en mode selection d'image à inserer dans le template
		onlyForPickUp: false,
		//bouton d'aijout d'une nouvelle image
		addButon: `<a href="#!" class="card light-shadow columnItem" id="addImageToLibrary" style="background-color: rgb(255,255,255) !important;">
						<div class="card-content light-shadow frama-border-orange tooltipped" data-position="top"
							 data-delay="350" data-tooltip="Ajouter une image à votre bibliothèque" style="text-align: center; background-color: rgb(255,255,255) !important;  margin-bottom: 20px !important;">
							<i class="material-icons frama-orange-text  lighten-2 large" style="margin: 50px">add</i>
						</div>
					</a>`
		,
		//spinner d'attente
		waitingSpinner: `<div  class="card light-shadow columnItem"  style="background-color: rgb(255,255,255) !important;">
					<div class="card-content light-shadow frama-border-orange tooltipped" data-position="top"
						 data-delay="350" data-tooltip="Ajouter une image à votre bibliothèque" style="text-align: center; background-color: rgb(255,255,255) !important;  margin-bottom: 20px !important;">
							   <div class="preloader-wrapper big active center-align">
									<div class="spinner-layer spinner-yellow-only">
										  <div class="circle-clipper left">
												<div class="circle"></div>
										  </div><div class="gap-patch">
												<div class="circle"></div>
										  </div><div class="circle-clipper right">
												<div class="circle"></div>
										  </div>
									</div>
							   </div>
					</div>
				</div>`
		,
		//template de l'affichage d'une image seule
		getHtmlItem(file) {
			let htmlToInsert = ""
			htmlToInsert += `
			<div class="blockList">
				<div class=" light-shadow relative parent-hover" style="background-color: rgb(255,255,255) !important;">
					<i class="absolute white-text" style="margin:20px 0 0 10px; font-size: small">` + file.size + `</i>
					<img class="responsive-img" src="` + file.url + `" alt="` + file.alt + `">
					<a href="#!" id="/admin/edit/delete-image?id=`+ file.id+`" class="children-hover btn-floating  waves-effect waves-light lightButton absolute tooltipped removeImageFromLibrary" data-position="top"
								 data-delay="350" data-tooltip="Supprimer l'image de votre bibliothèque" 
								 style="top: 10px ; right: 10px">
						<i class="material-icons " >clear</i>
					</a>
					`
			if (!this.onlyForPickUp) {
				htmlToInsert += `
					<div class="absolute children-hover" style="bottom: 0; width: 100%; background-color: rgba(0,0,0,0.52)">
						<form action="" style="margin: 0 10px 0 10px !important;">
							<input type="text" `
				htmlToInsert += file.alt? 'value="' + file.alt+'"':"";
				htmlToInsert+= `  placeholder="Donner un titre a votre image" class="tooltipped white-text" data-position="top"
						data-delay="350" data-tooltip="Editer le nom de votre image, utile pour l'accessibilité de votre site et son référencent" style="width: 100%; margin-bottom: 10px!important; ">
						</form>
						<a class=" btn-floating  waves-effect waves-light lightButton absolute tooltipped" data-position="top"
								 data-delay="350" data-tooltip="Editer" 
								 style="top: -10px ; right: 10px">
							<i class="material-icons " >edit</i>
						</a>
					</div>
				</div>
			</div>`
			} else {
				htmlToInsert += `</div></div>`
			}
			return htmlToInsert
		},
		//methode d'initialisation des events liés au templates
		initAddFileEvent() {
			//ajout d'images à la librairie
			$('#addImageToLibrary').click(function () {
				let $addImageForm = $('#addImageForm input[type=file]')
				$addImageForm.click()
				$addImageForm.change(function () {
					$('#addImageForm').submit()
				})
			})
			//soumission du formulaire caché
			let that = this
			$("#addImageForm").submit(function (e) {
				e.preventDefault();
				that.initAddFiles()
				let formData = new FormData($(this)[0]);
				$.ajax({
					url: "/admin/edit/add-img-to-librairie",
					type: "POST",
					data: formData,
					async: false,
					success(msg) {
						let parsedMsg = JSON.parse(msg)
						if (parsedMsg.errorMsg) {
							console.log(parsedMsg)
							Materialize.toast(parsedMsg.errorMsg, 4000, 'red')
							that.render()
						} else {
							that.addFileCallback(parsedMsg)
						}

					},
					cache: false,
					contentType: false,
					processData: false
				});

			});
			//supression d'images
			$('.removeImageFromLibrary').click(function (e) {
				e.preventDefault();
				let url= this.id;
				$.getJSON(url,(response)=>{
					if (!response.deletedId) {
						console.log(response)
						Materialize.toast("Une erreur s'est produite", 4000, 'red')
					} else {
						that.removeImg(response.deletedId)
					}

				})
			})
		},
		removeImg(id){
			console.log(id)
			this.initialFiles.forEach((file,i)=>{
				console.log(file.id)
				if(file.id === id){
					console.log("1")
					this.initialFiles.splice(i,1)
				}
			});
			this.recentlyAddedFiles.forEach((file,i)=>{
				if(file.id === id){
					console.log("2")
					this.recentlyAddedFiles.splice(i,1)
				}
			})
			console.log(this.files())
			this.render()

		},
		/*********************************
		 * Rendu du template general
		 * @param onlyForPickUp //true si on veut que la page soit en mode selection d'image
		 */
		render(onlyForPickUp) {
			$('.tooltipped').tooltip('remove');
			//si ya quelquechose de rentré, on le passe
			if (typeof onlyForPickUp !== 'undefined') {
				this.onlyForPickUp = onlyForPickUp
			}
			let htmlToInsert = ""
			//ajout du bouton d'ajout
			htmlToInsert += `<div class="blockList" id="addNewFileToListContainer" >` +
				this.addButon + `</div>
						<form id="addImageForm" action="#!" class="displaynone">
							<input type="file" name="file">
						</form>`
			//ajout de toutes le images
			this.files().forEach((file) => {
				htmlToInsert += this.getHtmlItem(file)
			})
			for(let i=0;i<6-this.files().length; i++){
				htmlToInsert += `<div style="width: 100%;height: 250px"></div>`
			}
				//on attends que ca soit dait, puis on initialise le tout
				$('#imageManagment').html(htmlToInsert)

			setTimeout(() => {
				$('.tooltipped').tooltip({delay: 50});
				this.initAddFileEvent()
				Materialize.updateTextFields();
			}, 300)
		},
		//methode a appeller avant la requete ajax
		initAddFiles() {
			$("#addNewFileToListContainer").html("")
			$("#addNewFileToListContainer").html(this.waitingSpinner)
		},
		//callBack de la requete ajax
		addFileCallback(fileInfo) {
			this.recentlyAddedFiles.unshift(fileInfo)
			this.render()
		}
	}
	ImageManagment.render();
})