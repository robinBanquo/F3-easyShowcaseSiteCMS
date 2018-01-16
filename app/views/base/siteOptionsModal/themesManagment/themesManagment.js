var ThemeManagment = {
	themesList: themesList,
	userTheme: SiteOptions.theme,
	useCustomColorBtn: `<a class="btn-floating btn-large waves-effect waves-light hover-frama-orange frama-purple tooltipped fixed" data-position="right"
			data-delay="350" data-tooltip="Utiliser un thème personnalisé" id="useCustomColorBtn" style="bottom: 70px ; left: 15px"><i class="material-icons">palette</i></a>`,
	useThemeSelectorBtn: `<a class="btn-floating btn-large waves-effect waves-light hover-frama-orange frama-purple tooltipped fixed" data-position="right"
			data-delay="350" data-tooltip="Retour à la sélection de thème" id="useThemeSelectorBtn" style="bottom: 70px ; left: 15px"><i class="material-icons">view_module</i></a>`,
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
			htmlToInclude += `<a class="btn-floating halfway-fab waves-effect waves-light hover-frama-purple frama-orange tooltipped selectThemeBtn" data-position="bottom"
			data-delay="350" data-tooltip="Utiliser le thème ` + t.name + `" id="useTheme~` + t.name + `"><i class="material-icons">add</i></a>`
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
	render() {

		let htmlToInclude = ""
		if (this.userTheme.name === "Custom" && !themesList['Custom']) {
			themesList["Custom"]= this.userTheme
		}
		for (let theme in themesList) {
			let t = themesList[theme];
			htmlToInclude += this.renderPreview(t, true)
		}
		htmlToInclude += this.useCustomColorBtn
		setTimeout(() => {
			this.initEvents()
		}, 300)

		$('#themesManagment').html(htmlToInclude)
	},
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
	renderCustomForm() {
		let t = this.userTheme
		let htmlToInclude = ""
		htmlToInclude += this.useThemeSelectorBtn
		htmlToInclude += `<div class="row">
							<h5 class="center-align grey-text"><i class="material-icons ">palette</i>Personnaliser votre theme</h5>
							<div class="col  m2 l3 hide-on-small-only"></div>
							<div id="customThemePreview">
							
							
`

		htmlToInclude += this.renderPreview(this.userTheme, false, true)

		htmlToInclude += `		</div>
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
										  <div class="row center-align">
										    <button class="waves-effect waves-light btn frama-orange hover-frama-purple center-align"><i class="material-icons left">palette</i>Appliquer</button>
										  </div>
										</form>
									</div>
								</div>
							</div>`
		$('#themesManagment').html(htmlToInclude)
	},
	initEvents() {
		setTimeout(() => {
			$('.tooltipped').tooltip({delay: 50});
		}, 300)
		let that = this
		$('.selectThemeBtn').click(function () {
			$('.tooltipped').tooltip('remove');
			let selectedTheme = this.id.split('~')[1]
			if(that.userTheme.name === "Custom" ){
				that.themesList["Custom"] = that.userTheme
			}
			that.userTheme = that.themesList[selectedTheme]
			that.sendAjaxRequest(that.userTheme)
		})

		$('#useCustomColorBtn').click(function () {
			$('.tooltipped').tooltip('remove');
			that.renderCustomForm()
			setTimeout(() => {
				that.initCustomColorsEvents()
			}, 300)
		})
	},
	initCustomColorsEvents() {
		let that = this
		$('.tooltipped').tooltip({delay: 50});

		$('#useThemeSelectorBtn').click(function () {
			$('.tooltipped').tooltip('remove');
			that.render()
		})
		let $form = $('#customColorThemeForm')
		$form.submit(function (e) {
			e.preventDefault()
			let customTheme = {}
			for (let item in that.userTheme) {
				customTheme[item] = $('#customColorThemeForm input[name=' + item + ']').val();
			}
			that.userTheme = customTheme
			that.sendAjaxRequest(customTheme)
		})

		$('#customColorThemeForm input').change(function () {
			let previewTheme = {}
			for (let item in that.userTheme) {
				previewTheme[item] = $('#customColorThemeForm input[name=' + item + ']').val();
			}
			$('#customThemePreview').html(that.renderPreview(previewTheme, false))
		})
	},
	sendAjaxRequest(theme) {
		let data = "";
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

				if (msg.result === "success") {
					that.applyTheme(that.userTheme)
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