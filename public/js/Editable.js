/***********************************************
 * Fonctions gérant l'editeur wisiwig du site
 * documentation de l'éditeur ici : https://github.com/yabwe/medium-editor/blob/master/API.md
 * @type {{fullEditableEditor: {}, restrictedEditableEditor: {}, MediumEditor(*=, *=): *, fullEditableOptions: {disableExtraSpace: boolean, disableDoubleReturn: boolean, placeholder: {text: string}, imageDragging: boolean, autoLink: boolean, toolbar: {allowMultiParagraphSelection: boolean, buttons: string[], diffLeft: number, diffTop: number, firstButtonClass: string, lastButtonClass: string, standardizeSelectionStart: boolean, align: string, sticky: boolean, updateOnEmptySelection: boolean}}, restrictedEditableOptions: {disableExtraSpace: boolean, disableDoubleReturn: boolean, placeholder: {text: string}, imageDragging: boolean, autoLink: boolean, toolbar: {allowMultiParagraphSelection: boolean, buttons: string[], diffLeft: number, diffTop: number, firstButtonClass: string, lastButtonClass: string, standardizeSelectionStart: boolean, align: string, sticky: boolean, updateOnEmptySelection: boolean}}, startUp(): void}}
 */


var Editable = {
	mainSaveBtnVisible :  false,
	EditableEditor : {},
	MediumEditor(el) {
		return new MediumEditor(el, this.EditableOptions)
	},
	//documentation des options de configuration de l'editeur ici :
	// https://github.com/yabwe/medium-editor/blob/master/OPTIONS.md
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
			buttons: [
				'bold',
				'italic',
				'underline',
				{
					name: 'justifyLeft',
					aria: 'Aligner à gauche',
					contentDefault: '<i class="material-icons">format_align_left</i>'},
				{
					name: 'justifyCenter',
					aria: 'Centrer',
					contentDefault: '<i class="material-icons">format_align_center</i>'},
				{
					name: 'justifyRight',
					aria: 'Aligner à droite',
					contentDefault: '<i class="material-icons">format_align_right</i>'},
				{
					name: 'justifyFull',
					aria: 'Justifier',
					contentDefault: '<i class="material-icons">format_align_justify</i>'},
				'anchor',
				'unorderedlist',
				{
					name: 'h6',
					tagNames: ['h6'],
					aria: 'small',
					contentDefault: '<i style="font-size: small"><i>A</i></i>'},
				{
					name: 'h5',
					aria: 'medium',
					contentDefault: '<i style="font-size: medium"><i>A</i></i>'},
				{
					name: 'h4',
					aria: 'large',
					contentDefault: '<i style="font-size: large;"><i>A</i></i>'},
				],
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
	editBtn(id){
		return `<div class="relative ">
					<a class="btn-floating waves-effect waves-light lightButton absolute tooltipped moduleBtn editableTextBtn" data-position="left"
						data-delay="250" data-tooltip="Editer" id="`+ id +`" style=" right: -25px; top: -15px; z-index: 1000">
						<i class="material-icons">edit</i>
					</a>
				</div>`
	},
	initEditBtn(){
		let that = this
		$('.editableTextBtn').click(function () {
			let targetId = this.id.split("~")[1]
			let currentModuleId = $(this).closest("section").attr('id')
			let $target = $("#"+currentModuleId+ " #"+targetId)
			$target.focus()
			$target.focusout(function () {
				setTimeout(()=>{
					that.initEditBtn()
				},300)
			})
			$('.tooltipped').tooltip('remove');
			$(this).parent().remove()


		})
		$(".editable").focusin(function () {
			$("#medium-editor-toolbar-1").click(function () {

			})
		})
	},
	popSaveBtn(){
		if(!this.mainSaveBtnVisible){
			initMainSaveBtn()
			this.mainSaveBtnVisible =  true
		}
	},
	startUp(){
		let that = this
		$editable =$('.editable')
		$editable.each(function(index, el){
			$(el).before(that.editBtn("editable~"+this.id));
		})
		this.EditableEditor = this.MediumEditor('.editable')
		setTimeout(()=>{
		this.initEditBtn()
			$editable.keyup(function () {
				that.popSaveBtn()
			})
		},300)
		$editable.click(function () {
			setTimeout(()=> {
				$(".medium-editor-action").click(function () {
					that.popSaveBtn()
				})
				$('.tooltipped').tooltip({delay: 50})
			},300);
		})

	}
}


$(document).ready(function () {
	Editable.startUp()
	$("#medium-editor-toolbar-1").click(function () {
		if(!Editable.mainSaveBtnVisible){
			initMainSaveBtn()
			Editable.mainSaveBtnVisible =  true
		}
	})
})