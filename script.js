var testing = location.hostname===''||location.hostname==='localhost',
	  articles = {
	projects:{title:'Projecten',text:['Een aantal dingen die ik heb gemaakt.'],
	sections:
	  [
	    {
	      title:'Muziek',
	      text:[
		'Met het programma Fruityloops 12 en Musescore heb ik een aantal kleine composities gemaakt.',
		'<a href="https://drive.google.com/open?id=0B0dKf41Li88gS2lDMU91akxxNEU">Opus prime</a><br>'+
		'<a href="https://drive.google.com/open?id=0B0dKf41Li88gbTFURDlxLWIzR1U">Polyushka-Polye</a><br>'+
		'<a href="https://drive.google.com/open?id=0B0dKf41Li88gb0ttdW1WR0tWdFU">Klein probeersel</a>'
	      ]
	    },
	    {
	      title:'Kartonnen AT-AT',
	      text:[
		'In twee uur gemaakt, alleen van karton en servomotoren.',
		'<a href="https://drive.google.com/open?id=0B0dKf41Li88gd09GQWFycU83eHM">Video</a><br>'
	      ]
	    },
	    {
	      title:'Werkplek van de toekomst',
	      link:['https://twitter.com/heijmansnl/status/743503579969880070'],
	      text:[
	        'Voor Heijmans ontwierpen we een werkplek van de toekomst, en ons idee kwam als beste naar voren, waarna we het mochten presenteren in het NMM.',
		'<a href="https://twitter.com/heijmansnl/status/743503579969880070">Tweet van Heijmans</a><br>'+
		'<a href="https://drive.google.com/open?id=0BxiIlO7qIuDjUmJJMmMwVmxaOVE">Video</a>'
	      ]
	    },
	    {
	      title:'IJSO',
	      text:[
	        'Bij de Internationale Junior Science Olympiad eindigde ik in de nationale eindronde op de 9e plek.',
	      ]
	    },
            {
	      title:'TTA',
	      text:[
		      'Bij de Technasium Top Award van 2015 werd ik met mijn groepje tweede, achteraf bleek dat de eerste plaats onterecht niet naar ons was gegaan.',
	              '<a href="https://www.facebook.com/technasiumtop/posts/914207188599945">Link</a>'
	      ]
	    }
	  ]
	}
      };
      
      console.oldlog=console.log,
      console.log=function(){if(testing)(new Function('console.oldlog('+Array.prototype.slice.call(arguments).join(',')+')'))();return undefined;};
      
      var ssf = function(ns,nd){
	$('.slide,.dot').removeClass('active');
	ns.add(nd).addClass('active');
	$('.slides').css('left',$('.slider').outerWidth()*ns.index()*-1);
      };
      
      var nsf = function(){
	var cs=$('.slide.active'),ns=cs.next('.slide'),cd=$('.dot.active'),nd=cd.next('.dot');
	if(ns.length===0)ns=$('.slide').first(),nd=$('.dot').first();
	ssf(ns,nd);
      };
      
      var psf = function(){
	var cs=$('.slide.active'),ps=cs.prev('.slide'),cd=$('.dot.active'),pd=cd.prev('.dot');
	if(ps.length===0)ps=$('.slide').last(),pd=$('.dot').last();
	ssf(ps,pd);
      };
      
      var interval = testing?undefined:setInterval(nsf,4500);
      
      function getLinks(v){var r=[];$.each(v.link,function(i,v){r.push('<a href="'+v+'">'+(v||'')+'</a>')});return r.join('<br>')}
      function getID   (v){return(v.title||'').toLowerCase().replace(/\.|\s/g,'')}
      function  pif() { clearInterval(interval); };
      function upif() { interval = setInterval(nsf,4500); };
      jQuery.fn.extend({
	ripple:function(n){
	  $(this).addClass('C-r').on(n||'mousedown',function(e){
	    var b = $(this),
		t = $('<div class="C-re"></div>'),
		o = b.offset(),
		x = e.pageX - o.left,
		y = e.pageY - o.top,
		d = b.outerHeight(),
		r = d / 2;
	    t.css({
	      height:d     + 'px',
	      width :d     + 'px',
	      top   :y - r + 'px',
	      left  :x - r + 'px'
	    });
	    b.append(t);
	    window.setTimeout(function() {
	      var parentNode = t[0].parentNode;
	      if (parentNode) parentNode.removeChild(t[0]);
	    }, 2000);
	  })
	}
      });
	
      $(window).resize(function(){
	$('.slide ').css('width', $('.slider').width() );
	$('.slides').css('left' , $('.slider').width() * $('.slide.active').index()  * -1);
	$('.slider-dots')
		    .css('left' ,($('.slider').width() - $('.slider-dots ').width()) /  2);
      });
      
      $(window).on('load',function(){
	$('body').removeClass('loading');
	
	$.each(articles,function(i,v){
	  var b=i==='projects';
	  $('body>main article').append('\
	    <section id="'+getID(v)+'"><h2>'+v.title+'</h2>'+
	      (v.img?
		'<figure>\
		  <img src="'+v.img+'" />\
		  <figcaption>'+(v.caption||'')+'</figcaption>\
		</figure>'
	      :
		''
	      )+'\
	      <p>'+(v.text||[]).join('</p><p>')+'</p>\
	    </section>\
	  ');
	  
	  $('body>main>aside>nav>ul').append(v.title?'<li><a href="#'+getID(v)+'">'+v.title+'</a><ul></ul></li>':'');
	  
	  $.each(v.sections,function(i,v){
	    if(b){$('.slides').append('\
	      <div style="background-position:'+v.pos+';background-image:url(\''+v.img+'\');"\
		  class="slide'+(i===0?' active':'')+'">\
		<header>\
		  <a href="#'+getID(v)+'"><h4>'+(v.title||'')+'</h4></a>\
		  <p>'+getLinks(v)+'</p>\
		</header>\
	      </div>\
	    ');
	    $('.slider-dots').append('<li class="dot'+(i===0?' active':'')+'"><div></div></li>');}
	    $('body>main article>section').last().append('\
	      <section '+(testing&&i===0?'class="nfld" ':'')+'id="'+getID(v)+'"><h3>'+v.title+'</h3>'+
		(v.img?
		  '<figure>\
		    <img src="'+v.img+'" />\
		    <figcaption>'+(v.caption||'')+'</figcaption>\
		  </figure>'
		:
		  ''
		)+'\
		<p>'+(v.text||[]).join('</p><p>')+'</p>\
	      </section>\
	    ');
	    $('body>main>aside>nav>ul>li').last().find('ul').append(v.title?'<li><a href="#'+getID(v)+'">'+v.title+'</a></li>':'');
	  });
	
	});
	
	$('.slides').css('width',(articles['projects'].sections.length)+'01%');
      
	$('.slide-next').click(nsf);
	$('.slide-prev').click(psf);
	
	$('.dot').click(function(){
	  var i  = $(this).index() + 1,
	      ns = $('.slide:nth-child(' + i + ')'),
	      nd = $('.dot:nth-child(' + i + ')');
	  ssf(ns,nd);
	});
	
	if(!testing)$('.slider').hover(pif,upif);
	
	// Other things
	$('.slider h4,nav a').click(function(){$('body > main article section section').removeClass('flod nfld')});
	$('body > main article section section h3').click(function(){
	  var t=$(this).parent(),b=(t.is(':target')&&!t.is('.fold'))||t.is('.nfld');
	  t.removeClass('fold nfld').addClass((!b?'nf':'fo')+'ld');
	});
	
	$('body>header>i,.slide-next,.slide-prev,body>main article section section h3').ripple();
	
	setTimeout(function(){$(window).resize();},100);
	
      });
