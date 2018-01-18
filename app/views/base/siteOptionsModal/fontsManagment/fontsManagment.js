var FontsManagment = {
	importDone: false,
	//liste des themes possibles, envoyé en json par le controller
	fontsList: fontsList,
	//theme actuel de l'utilisateur
	userFont: SiteOptions.font,
	//methode de rendu de la preview d'un jeu de police
	renderPreview(f) {
		let htmlToInclude = ""
		htmlToInclude += `
		<div class="col s12 m4 l3 ">`

		htmlToInclude += `
			<div class="row no-margin">
				<div class="light-shadow">
					<div class="card `
		htmlToInclude += this.userFont.name === f.name ? 'borderInBox' : ''
		htmlToInclude += ` ">
						<div class="card-image " style="padding: 10px 10px 0 10px; ">
							<div class="row no-margin" style="height: 230px; overflow: hidden" >
							<div class="row no-margin menu-background">
								<h5 class="second-color no-margin" style="font-family: '` + f.title.css1 + `',` + f.title.css2 + ` ; padding: 15px">Texte des titres</h5>
							</div>
							<div class="row main-background no-margin" style="padding: 15px">
								<p class="main-color no-padding" style="font-family: '` + f.main.css1 + `',` + f.main.css2 + `; font-size: 0.9em; "><b>Paragraphes :</b> 
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aspernatur, dignissimos dolor earum enim <br>
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aspernatur, dignissimos dolor earum enim
								</p>
							</div>
						</div>`
		if (this.userFont.name !== f.name) {
			htmlToInclude += `
						<a class="btn-floating halfway-fab waves-effect waves-light hover-frama-purple 
						frama-orange tooltipped selectFontBtn" data-position="bottom"
						data-delay="350" data-tooltip="Utiliser le jeu de police ` + f.name + `" id="useFont~` + f.name + `">
							<i class="material-icons">add</i>
						</a>`
		}
		htmlToInclude += `
						</div>
		
						<div class="card-content" style="border-bottom: 1px solid grey !important; padding: 10px 15px ">
							<span class="card-title frama-purple-text">` + f.name + `</span>
						</div>`
		htmlToInclude += `
					</div>
				</div>
			</div>
		</div>
			`;
		return htmlToInclude
	},
	//methode permettant de venir recuperer toutes les fonts utilisées via cdn
	importFonts() {
		let toImport = []
		this.fontsList.forEach((font) => {
			if (!toImport.includes(font.title.cdn)) {
				toImport.push(font.title.cdn);
			}
			if (!toImport.includes(font.main.cdn)) {
				toImport.push(font.main.cdn);
			}
		})
		let importHtml = ""
		toImport.forEach((cdn) => {
			importHtml += '<link href="' + cdn + '" rel="stylesheet">'
		})
		$('#importFont').html(importHtml)
		this.importDone = true
	},
	//methode de rendu du template
	render() {
		if (!this.importDone) {
			this.importFonts()
		}
		let htmlToInclude = ""
		//on boucle sur les fonts pour ajouter leurs templates
		this.fontsList.forEach((font) => {
			htmlToInclude += this.renderPreview(font)
		})
		setTimeout(() => {
			this.initEvents()
		}, 300)
		//et on insere dans le html
		$('#fontsManagment').html(htmlToInclude)
	},
	//methode permetant un rendu imédiat sur la page des polices selectionnées
	applyFont(font) {
		let html = ""
		html += `
			.title-font,.title-font *  {
		font-family: '` + font.title.css1 + `',` + font.title.css2 + ` ;
		}
		.main-font ,.main-font * {
		font-family:'` + font.main.css1 + `', ` + font.title.css2 + `;
		}`
		$('#fontClassCSS').html(html)
	},
	//initialisation des events du template de base
	initEvents() {
		$('.tooltipped').tooltip({delay: 50});
		let that = this
		//lorsque l'utilisateur selectionne un theme
		$('.selectFontBtn').click(function () {
			$('.tooltipped').tooltip('remove');
			//on récupere le nom
			let selectedFont = this.id.split('~')[1]
			that.fontsList.forEach((font) => {
				if (font.name === selectedFont) {
					that.userFont = font
				}
			})
			//et on fait la requete ajax avec
			that.sendAjaxRequest(that.userFont)
		})

	},

	//methode Ajax d'edition du formulaire
	sendAjaxRequest(font) {
		let data = "name="+font.name;
		data+= '&CSRFToken='+CSRFToken
		let that = this
		$.ajax({
			url: '/admin/edit/edit-font',
			type: 'POST', // Le type de la requête HTTP, ici devenu POST
			data: data, //
			dataType: 'json',
			success(msg) {
				console.log()
				if (msg.result === "success") {//si ca marche
					that.userFont = font
					//on applique le theme
					that.applyFont(font)
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
	FontsManagment.render()
})