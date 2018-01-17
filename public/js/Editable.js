/***********************************************
 * Fonctions gérant l'editeur wisiwig du site
 * @type {{fullEditableEditor: {}, restrictedEditableEditor: {}, MediumEditor(*=, *=): *, fullEditableOptions: {disableExtraSpace: boolean, disableDoubleReturn: boolean, placeholder: {text: string}, imageDragging: boolean, autoLink: boolean, toolbar: {allowMultiParagraphSelection: boolean, buttons: string[], diffLeft: number, diffTop: number, firstButtonClass: string, lastButtonClass: string, standardizeSelectionStart: boolean, align: string, sticky: boolean, updateOnEmptySelection: boolean}}, restrictedEditableOptions: {disableExtraSpace: boolean, disableDoubleReturn: boolean, placeholder: {text: string}, imageDragging: boolean, autoLink: boolean, toolbar: {allowMultiParagraphSelection: boolean, buttons: string[], diffLeft: number, diffTop: number, firstButtonClass: string, lastButtonClass: string, standardizeSelectionStart: boolean, align: string, sticky: boolean, updateOnEmptySelection: boolean}}, startUp(): void}}
 */


var Editable = {
	EditableEditor : {},
	MediumEditor(el) {
		return new MediumEditor(el, this.EditableOptions)
	},
	EditableOptions: {
		disableExtraSpace: true,
		disableDoubleReturn: true,
		placeholder: {
			/* This example includes the default options for placeholder,
			   if nothing is passed this is what it used */
			text: "Entrez le texte ici"
		},
		imageDragging: false,
		autoLink: true,
		toolbar: {
			/* These are the default options for the toolbar,
			   if nothing is passed this is what is used */
			allowMultiParagraphSelection: true,
			buttons: ['bold', 'italic', 'underline', 'anchor', 'unorderedlist'],
			diffLeft: 0,
			diffTop: -10,
			firstButtonClass: 'medium-editor-button-first',
			lastButtonClass: 'medium-editor-button-last',
			standardizeSelectionStart: false,
			/* options which only apply when static is true */
			align: 'center',
			sticky: false,
			static: true,
			updateOnEmptySelection: true

		}
	},
	editBtn(id){return `<div class="relative "> <a class="btn-floating waves-effect waves-light lightButton absolute tooltipped moduleBtn editableTextBtn" data-position="left"
			   data-delay="250" data-tooltip="Editer" id="`+ id +`" style=" right: -15px; top: -15px; z-index: 1000">
<i class="material-icons">edit</i></a></div>`},
	launchEditor(selector){
			this.EditableEditor = this.MediumEditor($(selector))

	},
	startUp(){
		let that = this
		$('.editable').each(function(index, el){
			$(el).before(that.editBtn("editable~"+this.id));
		})
		setTimeout(()=>{
			$('.editableTextBtn').click(function () {
				let target = this.id.split("~")[1]
				let currentModuleId = $(this).closest("section").attr('id')

				that.launchEditor("#"+currentModuleId+ " #"+target)
				$('.tooltipped').tooltip('remove');
				$(this).parent().remove()
				setTimeout(()=>{
					$('.tooltipped').tooltip({delay: 50})
				},300)
			})
		},300)
	}
}


$(document).ready(function () {
	Editable.startUp()
})