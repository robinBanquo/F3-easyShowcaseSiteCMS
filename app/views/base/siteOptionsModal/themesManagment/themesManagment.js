var ThemeManagment = {
	//liste des themes possibles, envoyé en json par le controller
	themesList: themesList,
	//theme actuel de l'utilisateur
	userTheme: SiteOptions.theme,
	//btn en bas a gauche permettant de switcher entre les deux possibilités
	useCustomColorBtn: `<a class=" btn-floating btn-large waves-effect waves-light hover-frama-orange frama-purple tooltipped fixed" data-position="right"
			data-delay="350" data-tooltip="Utiliser un thème personnalisé" id="useCustomColorBtn" style="bottom: 70px ; left: 15px"><i class="material-icons">palette</i></a>`,
	useThemeSelectorBtn: `<a class=" btn-floating btn-large waves-effect waves-light hover-frama-orange frama-purple tooltipped fixed" data-position="right"
			data-delay="350" data-tooltip="Retour à la sélection de thème" id="useThemeSelectorBtn" style="bottom: 70px ; left: 15px ;  "><i class="material-icons">view_module</i></a>`,

	//methode de rendu de la preview d'un theme, en fonction de si on est en mode previewet de si on doit afficher le selecteur
	renderPreview(t, withSelector, preview) {
		let htmlToInclude = ""
		htmlToInclude += `
		<div class="col s12 m4 l3 ">`
		if (preview) {
			htmlToInclude += '<h5 class=" center grey-text">Preview</h5>'
		}
		htmlToInclude += `
			<div class="row no-margin">
				<div class="light-shadow">
					<div class="card `
		htmlToInclude += this.userTheme.name === t.name && withSelector && !preview ? 'borderInBox' : ''
		htmlToInclude += ` ">
						<div class="card-image " style="padding: 10px">
							<div class="row no-margin" >
								<div class="col s12 no-padding">
									<div class="icon-block no-padding">
									<div  style="background-color: ` + t.menu_background + ` !important; padding: 5px 15px" >
										<h6 class=" main-color no-margin" style="padding-bottom: 0px !important; color:` + t.second_color + ` !important;" >Menu</h6>
									</div>
										<div class="row no-margin" style='; padding: 15px ; background-image: url("/public/img/aquarelle.jpg"); background-size: cover' >
											<div class="col s12">
												<h6 class="brand-logo" style="color : ` + t.contrasted_color + `">Lorem ipsum</h6>
											</div>
										</div>
										<h4 class="center no-margin" style="padding:10px 0 0 0 !important;background-color: ` + t.main_background + `;"><i class="material-icons" style=" color: ` + t.second_color + ` !important;">settings</i></h4>
										<p class="light no-margin" style="padding: 0  10px ; line-height: 140%; font-size: small; background-color: ` + t.main_background + `; color:` + t.main_color + ` "> 
										A adipisci aliquid amet ipsi aspernatur cumque
										</p>
									</div>
								</div>
							</div>
							<div class="row no-margin" >
								<div class="col s12  right-align" style="padding: 0 15px 15px 15px; background-color: ` + t.second_background + `">
									<i class="" style="color: ` + t.second_color + `">
										amet aspernatur
									</i>
								</div>
							</div>`
		if (this.userTheme.name !== t.name && withSelector) {
			htmlToInclude += `
						<a class="btn-floating halfway-fab waves-effect waves-light hover-frama-purple 
						frama-orange tooltipped selectThemeBtn" data-position="bottom"
						data-delay="350" data-tooltip="Utiliser le thème ` + t.name + `" id="useTheme~` + t.name + `">
							<i class="material-icons">add</i>
						</a>`
		}
		htmlToInclude += `
						</div>
						`
		if (withSelector) {
			htmlToInclude += `
						<div class="card-content" style="border-bottom: 1px solid grey !important; padding: 10px 15px ">
							<span class="card-title frama-purple-text">` + t.name + `</span>
						</div>`
		}
		htmlToInclude += `
					</div>
				</div>
			</div>
		</div>
			`;
		return htmlToInclude
	},
	//methode de rendu du template
	render() {
		let htmlToInclude = ""
		//si l'utilisateur utilise un theme "custom", on l'ajoute a la liste
		if (this.themesList['Custom'] && !(this.userTheme.name === 'Custom')) {
			htmlToInclude += this.renderPreview(this.themesList['Custom'], true)
		}
		if (this.userTheme.name === 'Custom') {
			htmlToInclude += this.renderPreview(this.userTheme, true)
		}

		//on boucle sur les themes pour ajouter leurs templates
		for (let theme in themesList) {
			if(theme !== "Custom"){
				let t = themesList[theme];
				htmlToInclude += this.renderPreview(t, true)
			}

		}
		htmlToInclude += this.useCustomColorBtn
		setTimeout(() => {
			this.initEvents()
		}, 300)
		//et on insere dans le html
		$('#themesManagment').html(htmlToInclude)
	},
	//methode permetant un rendu imédiat sur la page du theme selectionné
	applyTheme(theme) {
		let html = ""
		html += `
		.menu-background {
		background-color: ` + theme.menu_background + ` !important;
		}
		.main-background {
		background-color: ` + theme.main_background + ` !important;
		}
		.main-color, .main-color * {
		color:  ` + theme.main_color + ` !important;
		}
		.contrasted-color, .contrasted-color * {
		color:  ` + theme.contrasted_color + ` !important;
		}
		.second-background {
		background-color:  ` + theme.second_background + ` !important;
		}
		.second-color, .second-color * {
		color:  ` + theme.second_color + ` !important;
		}`
		$('#themeClassCSS').html(html)
	},
	//methode de rendu de la page d'edition personalisé du theme
	renderCustomForm() {
		let t = this.userTheme
		let htmlToInclude = ""
		htmlToInclude += this.useThemeSelectorBtn
		htmlToInclude += `<div class="row">
							<h5 class="center-align grey-text"><i class="material-icons ">palette</i>Personnaliser votre theme</h5>
							<div class="col  m2 l3 hide-on-small-only"></div>
							<div id="customThemePreview">`
		htmlToInclude += this.renderPreview(this.userTheme, false, true)
htmlToInclude += `			</div>
								<div class="col s12 m5 l4">
									<div class="row">
										<form id="customColorThemeForm" class="col s12" style="padding: 10px 0 0 0 !important;" >
											<input type="text" value="Custom" name="name" class="displaynone">
											<div class="row">
											  <input name="menu_background" type="color" value="` + t.menu_background + `" class="validate">
											  <i class="grey-text" style="font-size: small">couleur du menu</i>
										  </div>
										  <div class="row">
											  <input name="main_background" type="color" value="` + t.main_background + `" class="validate">
											  <i class="grey-text" style="font-size: small">couleur de fond principale</i>
										  </div>
										  <div class="row">
											  <input name="second_background" type="color" value="` + t.second_background + `" class="validate">
											  <i class="grey-text" style="font-size: small">couleur de fond secondaire</i>
										  </div>
										  <div class="row">
											  <input name="main_color" type="color" value="` + t.main_color + `" class="validate">
											  <i class="grey-text" style="font-size: small">couleur de textes principale</i>
										  </div>
										  <div class="row">
											  <input name="second_color" type="color" value="` + t.second_color + `" class="validate">
											  <i class="grey-text" style="font-size: small">couleur de textes secondaire</i>
										  </div>
										  <div class="row">
											  <input name="contrasted_color" type="color" value="` + t.contrasted_color + `" class="validate">
											  <i class="grey-text" style="font-size: small">couleur de textes contrastée</i>
										  </div>
										  <div class="row ">
										    <button class="waves-effect waves-light btn frama-orange hover-frama-purple "><i class="material-icons left">palette</i>Appliquer</button>
										  </div>
										</form>
									</div>
								</div>
							</div>`
		$('#themesManagment').html(htmlToInclude)
	},
	//initialisation des events du template de base
	initEvents() {
		setTimeout(() => {
			$('.tooltipped').tooltip({delay: 50});
		}, 300)
		let that = this
		//lorsque l'utilisateur selectionne un theme
		$('.selectThemeBtn').click(function () {
			$('.tooltipped').tooltip('remove');
			//on récupere le nom
			let selectedTheme = this.id.split('~')[1]
			if (that.userTheme.name === "Custom") {
				that.themesList["Custom"] = that.userTheme
			}
			that.userTheme = that.themesList[selectedTheme]
			//et on fait la requete ajax avec
			that.sendAjaxRequest(that.userTheme)
		})
		//lorsque l'utilisateur switch vers le template de customisation
		$('#useCustomColorBtn').click(function () {
			$('.tooltipped').tooltip('remove');
			that.renderCustomForm()
			setTimeout(() => {
				that.initCustomColorsEvents()
			}, 300)
		})
	},
	//initialisation des events du template de customisation
	initCustomColorsEvents() {
		let that = this
		$('.tooltipped').tooltip({delay: 50});
		//lorsque l'utilisateur souhaite revenir a la vue de selection simple
		$('#useThemeSelectorBtn').click(function () {
			$('.tooltipped').tooltip('remove');
			that.render()
		})

		//a la soumission du formulaire de couleurs customs
		$('#customColorThemeForm').submit(function (e) {
			e.preventDefault()
			let customTheme = {}
			//on récupere les couleurs a partir du "template de ses couleurs précedentes"
			for (let item in that.userTheme) {
				customTheme[item] = $('#customColorThemeForm input[name=' + item + ']').val();
			}
			//et on fait la requete ajax
			that.sendAjaxRequest(customTheme)
		})
		//au changement d'input, on fait une prévisualisation sur la preview
		$('#customColorThemeForm input').change(function () {
			let previewTheme = {}
			for (let item in that.userTheme) {
				previewTheme[item] = $('#customColorThemeForm input[name=' + item + ']').val();
			}
			$('#customThemePreview').html(that.renderPreview(previewTheme, false))
		})
	},
	//methode Ajax d'edition du formulaire
	sendAjaxRequest(theme) {
		let data = "";
		//on formate la data a envoyer
		for (let key in theme) {
			data += key + "=" + theme[key] + "&"
		}
		let that = this
		$.ajax({
			url: '/admin/edit/edit-theme',
			type: 'POST', // Le type de la requête HTTP, ici devenu POST
			data: data, //
			dataType: 'json',
			success(msg) {
				console.log()
				if (msg.result === "success") {//si ca marche
					that.userTheme = theme
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
		});
	}
}

$(document).ready(function () {
	ThemeManagment.render()
})