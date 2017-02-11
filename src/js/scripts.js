global.jQuery = require('jquery');
bootstrap = require('bootstrap');
mustache = require('mustache');

jQuery(document).ready(function($) {
    //alert("Hello!");
    
    var jqxhr = $.getJSON('data.json', function() {
        
    }).done(function(data) {
        var template = $('#template').html();
        var showTemplate = mustache.render(template, data);
        $('#gallery').html(showTemplate);
    });
});