

var ThemeManagment = {
	themesList: themesList,
	userTheme : SiteOptions.theme,
	render(){

		let htmlToInclude = ""
		for(theme in themesList){
			let t=themesList[theme];
			htmlToInclude += `
			<div class="col s12 m4 l3 ">
			<div class="row no-margin">
					<div class="card" style="`
			htmlToInclude +=this.userTheme.name === t.name? "border : 4px solid #C48A1B" : ""
			htmlToInclude +=` ">
						<div class="card-image">
							<div class="row no-margin" >
								<div class="col s12 no-padding">
									<div class="icon-block no-padding">
									<div class="" style="background-color: `+ t.main_background+`">
										<h4 class="center no-margin" style="padding: 10px 0 0 0 !important;"><i class="material-icons" style=" color: `+ t.second_color+` !important;">settings</i></h4>
											<h6 class="center main-color no-margin" style="padding-bottom: 10px !important; color:`+ t.main_color+` !important;" >Lorem ipsum</h6>
									</div>
										
										<div class="row no-margin" style='; padding: 15px ; background-image: url("/public/img/aquarelle.jpg"); background-size: cover' >
											<div class="col s12">
												<h6 class="brand-logo" style="color : `+ t.contrasted_color+`">Lorem ipsum</h6>
											</div>

										</div>
										<p class="light no-margin" style="padding: 10px ; font-size: small; background-color: `+ t.main_background+`; color:`+ t.main_color+` "> 
										A adipisci aliquid amet aspernatur cumque
										</p>
									</div>
								</div>
							</div>
							<div class="row no-margin" >
								<div class="col s12  right-align" style="padding: 0 15px 15px 15px; background-color: `+ t.second_background+`">
									<i class="" style="color: `+ t.second_color+`">
										amet aspernatur
									</i>

								</div>
							</div>`
			if(this.userTheme.name !== t.name){
				htmlToInclude +=`<a class="btn-floating halfway-fab waves-effect waves-light hover-frama-purple frama-orange tooltipped" data-position="bottom"
			data-delay="350" data-tooltip="Utiliser ce thème" id="useTheme-`+ t.name +`"><i class="material-icons">add</i></a>`
			}
			htmlToInclude +=`
							
						</div>
						<div class="card-content" style="border-bottom: 1px solid grey !important; padding: 10px 15px ">
							<span class="card-title frama-purple-text">`+ t.name+`</span>
						</div>
					</div>

			</div>
		</div>
			`

		}

		$('#themesManagment').html(htmlToInclude)
	}
}

$(document).ready(function () {
	ThemeManagment.render()
})