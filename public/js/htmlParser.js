htmlParser = {
	//liste des caractères reformatés
	tags: [{
		html: '</p>',//le code html
		htmlRegex: /<\/p>/gi,//le regex pour les retrouver tous dans le texte
		inDb: '|§p|',//le code avec lequel on le garde en base
		inDbRegex: /\|§p\|/gi//le code avec lequel on retrouve toutes nos balises formatées pour la base
	}, {
		html: '<p>',
		htmlRegex: /<p>/gi,
		inDb: '|p|',
		inDbRegex: /\|p\|/gi
	}, {
		html: '<ul>',
		htmlRegex: /<ul>/gi,
		inDb: '|ul|',
		inDbRegex: /\|ul\|/gi
	}, {
		html: '</ul>',
		htmlRegex: /<\/ul>/gi,
		inDb: '|§ul|',
		inDbRegex: /\|§ul\|/gi
	}, {
		html: '<li>',
		htmlRegex: /<li>/gi,
		inDb: '|li|',
		inDbRegex: /\|li\|/gi
	}, {
		html: '</li>',
		htmlRegex: /<\/li>/gi,
		inDb: '|§li|',
		inDbRegex: /\|§li\|/gi
	}, {
		html: '<b>',
		htmlRegex: /<b>/gi,
		inDb: '|b|',
		inDbRegex: /\|b\|/gi
	}, {
		html: '</b>',
		htmlRegex: /<\/b>/gi,
		inDb: '|§b|',
		inDbRegex: /\|§b\|/gi
	}, {
		html: '<h4>',
		htmlRegex: /<h4>/gi,
		inDb: '|h4|',
		inDbRegex: /\|h4\|/gi
	}, {
		html: '</h4>',
		htmlRegex: /<\/h4>/gi,
		inDb: '|§h4|',
		inDbRegex: /\|§h4\|/gi
	},{
		html: '</p>',
		htmlRegex: /<\/h6>/gi,
		inDb: '|§h6|',
		inDbRegex: /\|§h6\|/gi
	}, {
		html: '<h6>',
		htmlRegex: /<h6>/gi,
		inDb: '|p|',
		inDbRegex: /\|h6\|/gi
	}, {
		html: '</h5>',
		htmlRegex: /<\/h5>/gi,
		inDb: '|§h5|',
		inDbRegex: /\|§h5\|/gi
	}, {
		html: '<h5>',
		htmlRegex: /<h5>/gi,
		inDb: '|h5|',
		inDbRegex: /\|h5\|/gi
	},  {
		html: '<i>',
		htmlRegex: /<i>/gi,
		inDb: '|i|',
		inDbRegex: /\|i\|/gi
	}, {
		html: '</i>',
		htmlRegex: /<\/i>/gi,
		inDb: '|§i|',
		inDbRegex: /\|§i\|/gi
	}, {
		html: '<u>',
		htmlRegex: /<u>/gi,
		inDb: '|u|',
		inDbRegex: /\|u\|/gi
	}, {
		html: '</u>',
		htmlRegex: /<\/u>/gi,
		inDb: '|§u|',
		inDbRegex: /\|§u\|/gi
	}, {
		html: '<a href="$1">$2</a>',
		htmlRegex: /<a href="(https?:\/\/[^\s<>'"]+)">([^\s<>'"]+)<\/a>/gi,
		inDb: '|a href="$1"|$2|§a|',
		inDbRegex: /\|a href="(https?:\/\/[^\s<>'"]+)"\|([^\s<>'"]+)\|§a\|/gi
	},
	],
	//action a executer avant la sauvegarde en bdd,
	formatBeforeSave: function (text) {
		//on parcours le tableau de tags concernés
		this.tags.forEach((tag) => {
			//et on remplace le regex par la valeur correspondante
			text = text.replace(tag.htmlRegex, tag.inDb)
		});
		return text
	},
	//action remplacant les balise de mise en base par des vrais balise,
	// à appeler au on rendered des balises concernées
	unformatBySelector: function (jQuerySelector) {
		let that =this
		$(jQuerySelector).each(function () {
			let text = $(this).text();

			//on parcours toutes nos balises
			that.tags.forEach((tag) => {
				//et on remplace les fausse balises par des vraies balises
				text = text.replace(tag.inDbRegex, tag.html)
			})
			//et on remplace aussi les urls stockées en dur pa des liens pour etre sympa avec les utilisateurs
			$(this).html(text
				.replace(/[\s](https?:\/\/[^\s<>'"]+)[\s]/gi, '<a href="$1">$1</a>')
			);
		})

	},
}