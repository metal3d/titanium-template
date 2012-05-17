titanium-template
=================

Titanium template system using webViews

Why ?
-----

For some reasons, you could need a template system to set values inside webview. But the real reason was here:
http://developer.appcelerator.com/question/21941/javascript-include-in-webview-not-working

This template system fix the script tag problem with android. 

How to use
----------

Simply import template.js inside your main app.js to have Ti.App.Template class activated. Afterward, you can use template like this:


    var win = Ti.UI.currentWindow;

    var webview = Ti.UI.createWebView();
    var template = new Ti.App.Template('ui/templates/myfile.html');

    //set vars
    template.vars.var1 = "hello";
    template.vars.var2 = "world";

    webview.setHtml(template.toSting());
    win.add(webview)

and the template is like this:

    <html>
        <head>
            <script src="ui/templates/myjsfile.js.txt"></script>
        </head>
        <body>
            this is a var: {var1} and another var {var2}...
        </body>
    </html>

{var1} and {var2} are referenced inside template object in "vars" property.

Note that script src attribute must be relative from the resources directory.


Remember to use "new" keyword to instanciate template

