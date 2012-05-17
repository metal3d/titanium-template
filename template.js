/**
 * Template system class for Appcelerator Titanium
 * @author Patrice FERLET (metal3d@gmail.com)
 * @license BSD
 * 
 * This class was previously made to fix a script tag problem that appears with
 * Android. 
 * @see http://developer.appcelerator.com/question/21941/javascript-include-in-webview-not-working#comment-127121
 * 
 * The goal was to add {myscript} in template file, then set js source inside script tag
 * compiling html.
 * 
 * It could now be used to set values inside html template and put html in webview.
 * 
 */

template.prototype.constructor = template;

function template(filename){
	this.file = filename;
	this.vars = {};
}

template.prototype.toString = function (){
	
	//open template
	try{
		var f = this.file;
		var content = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, this.file).read().text;
	}catch(e){
		Ti.API.error("Error while reading "+this.file);
		return false;
	}
	//find script src, read file and set it to script content
	var reg = new RegExp('<script(.*?)src="(.*?)".*?>\s*</script>');
	var r = reg.exec(content);
	while (r) {
		try{
			var script = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, r[2]).read().text
			content = content.replace(r[0],'<script type="text/javascript">'+script+'</script>');
		} catch(e) {
			Ti.API.error("Error while trying to read: "+r[2]);
			Ti.API.error(JSON.stringify(r));
		}
		r = reg.exec(content);
	}
	
	//replace {varname} with values from this.vars
	for (var i in this.vars) {
		content = content.replace('{'+i+'}',this.vars[i]);
	}
	
	return content;
}

Ti.App.Template = template;
