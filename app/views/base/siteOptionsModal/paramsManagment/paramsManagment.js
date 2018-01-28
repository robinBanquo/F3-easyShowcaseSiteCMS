ParamsManagment = {
	//parametres du site donnés en json
	params: siteParams,
	paramsForm() {
		let htmlToInclude = ""
	},
	render() {
		let htmlToInclude = `
		<form class="col s12" id="siteParamsForm">
			<div class="row">
				<div class="col s12 l6">
					<div class="row card light-shadow" style="background-color: white; padding: 30px !important; min-height: 460px !important;">
						<div class="row">
							<h5 class="center-align grey-text text-darken-2">Personaliser l'affichage</h5>
						</div>
						
					
						<div class="input-field col s12 ">
							<input id="siteName" name="siteName" type="text" required class="validate" value="` + this.params.title + `">
							<label for="siteName">Intitulé du site à afficher</label>
						</div>
						<div class="input-field col s12 ">
							<select id="titleSize">
								<option class="grey-text text-darken-2" value="large" ` + this.autoSelect(this.params.titleSize, 'small') + `>Large</option>
								<option class="grey-text text-darken-2" value="medium" ` + this.autoSelect(this.params.titleSize, 'medium') + `>Medium</option>
								<option class="grey-text text-darken-2" value="small" ` + this.autoSelect(this.params.titleSize, 'large') + `>Small</option>
							</select>
							<label>Taille du titre</label>
						</div>
						<div class="col s12">
							<div class="row">
								<div class="col s6 ">
									<p class="grey-text center-align" style="font-size: 0.8em">Image d'onglet</p>
									<p class="center-align">
										<input type="text" class="displaynone" name="favIcon" value="${this.params.favIcon}">
										<img class="center-align" style="width: 60px !important;height: 60px !important;" src="` + this.imgOrDefault(this.params.favIcon) + `" alt="">
									</p>
								</div>
								<div class="col s6 ">
									<p class="grey-text center-align" style="font-size: 0.8em">Logo</p>
									<p class="center-align">
										<input type="text" class="displaynone" name="siteLogo" value="${this.params.siteLogo}">
										<img style="width: 60px !important;height: 60px !important;" src="` + this.imgOrDefault(this.params.siteLogo) + `" alt="">
									</p>
									
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col s12 l6">
					<div class="row card light-shadow" style="background-color: white; padding: 30px !important; min-height: 460px !important;">
						<div class="row">
							<h5 class="center-align grey-text text-darken-2">Optimiser le référencement </h5>
						</div>
						<div class="input-field col s12 ">
								<select id="lang">
									<option class="grey-text text-darken-2" value="fr" ` + this.autoSelect(this.params.lang, 'fr') + `>Français</option>
									<option class="grey-text text-darken-2" value="en" ` + this.autoSelect(this.params.lang, 'en') + `>English</option>
								</select>
								<label>Language du contenu</label>
						</div>
						<div class="input-field col s12">
							<textarea id="description" class="materialize-textarea" placeholder="Entrez ici un texte qui sera affiché sous le nom de votre site dans les moteurs de recherche"></textarea>
							<label for="description">Description du site</label>
						</div>
						<div class="input-field col s12">
							<div id="keywords" class="chips"></div>
							<label for="keywords">Mots clefs</label>
						</div>
					</div>
				</div>
			<div class="row">
				<div class="col s12 center-align" style="margin-top: 20px !important;">
					<button id="submitParamsBtn" type="submit" class="light-shadow btn-large frama-orange hover-frama-purple waves-effect waves-light btn"><i class="material-icons white-text right">save</i>Enregistrer</button>
				</div>
			</div>
		</form>
		`
		$('#paramsManagment').html(htmlToInclude)
		setTimeout(() => {
			this.initFormEvents()
		}, 300)

	},
	imgOrDefault(url) {
		if (url) {
			return url
		} else {
			return "public/img/no-logo.png"
		}
	},
	autoSelect(inputName, value) {
		if (inputName === value) {
			return " selected "
		}
	},
	initFormEvents() {
		let that = this;
		Materialize.updateTextFields();
		$('select').material_select();
		$('#description').val(this.params.description);
		$('#description').trigger('autoresize');
		let keywords = this.params.keywords.split(", ")
		let chipData = []
		keywords.forEach((keyword) => {
			chipData.push({tag: keyword})
		})
		$('#keywords').material_chip({
			data: chipData,
			placeholder: 'ajouter un mot clef',
			secondaryPlaceholder: 'ajouter',
		});
		$('#siteParamsForm').submit(function (e) {
			e.preventDefault()
		})
		$('#submitParamsBtn').click(function () {
			let data= that.getFormValues()
				$.ajax({
					url: 'admin/edit/edit-params',
					type: 'POST', // Le type de la requête HTTP, ici devenu POST
					data: data, //
					dataType: 'json',
					success(msg) {
						console.log()
						if (msg.result === "success") {//si ca marche
							that.params = theme
							//on applique le theme
							that.applyTheme(that.userTheme)
							//et on re-rends le template
							that.render()
							$('.tooltipped').tooltip({delay: 50});

						} else {
							console.log(msg)
							Materialize.toast("Une erreur s'est produite", 4000, 'red')
							$('.tooltipped').tooltip({delay: 50});
						}
					},
					error: function () {
						Materialize.toast("Une erreur s'est produite", 4000, 'red')
						$('.tooltipped').tooltip({delay: 50});

					}
				})
		})

	},
	getFormValues() {
		let data = ""
		data += 'CSRFToken=' + CSRFToken
		let submittedValues = {
			title: $('#siteParamsForm #siteName').val(),
			titleSize: $('#siteParamsForm #titleSize').val(),
			favIcon: $('#siteParamsForm input[name=favIcon]').val(),
			siteLogo: $('#siteParamsForm input[name=siteLogo]').val(),
			lang: $('#siteParamsForm #lang').val(),
			description: $('#siteParamsForm #description').val(),

		}
		for(key in submittedValues){
			data+= "&"+key+"="+submittedValues[key];
		}
	let keywords = ""
			$('#siteParamsForm #keywords').material_chip('data').forEach((tag) => {
				keywords += tag.tag + ", "
			});
		data+= "&keywords="+keywords;
		console.log(data)
		return data;
	}

}

$(document).ready(function () {
	ParamsManagment.render();
})